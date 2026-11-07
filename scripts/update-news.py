"""Fetch short, attributed discovery notices; never generate or invent reporting."""
import argparse
import datetime as dt
import email.utils
import hashlib
import html
from html.parser import HTMLParser
import json
import pathlib
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

BASE = pathlib.Path(__file__).resolve().parent.parent
FEEDS = [
    ('https://archaeology.org/feed/', 'Archaeology magazine · AIA', 'archaeology.org'),
    ('https://www.thecollector.com/rss/', 'TheCollector · News & Discoveries', 'www.thecollector.com'),
    ('https://greekreporter.com/feed/', 'Greek Reporter · archaeology', 'greekreporter.com'),
]
CLASSICAL = re.compile(r'\b(roman|romans|greek|greeks|greece|pompeii|herculaneum|athens|athenian|byzantine|etruscan|hellenistic|latin|hadrian|colosseum|ephesus)\b', re.I)
DISCOVERY = re.compile(r'\b(discover\w*|excavat\w*|unearthed|found|finds?|recover\w*|reveal\w*|research\w*|study|survey|inscription\w*|coin\w*|mosaic\w*|temple\w*|tomb\w*|sarcophagus|shipwreck\w*|papyr\w*)\b', re.I)


def plain(value):
    value = html.unescape(value)
    value = re.sub(r'<(script|style)\b[^>]*>.*?</\1>', '', value, flags=re.I | re.S)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]*>', ' ', value))).strip()


def news_links(raw):
    if len(raw) > 2_000_000:
        raise ValueError('Excessive listing')
    class Links(HTMLParser):
        urls = set()
        def handle_starttag(self, tag, attrs):
            if tag != 'a':
                return
            url = urllib.parse.urljoin('https://www.thecollector.com/news/', dict(attrs).get('href', ''))
            parts = urllib.parse.urlsplit(url)
            if parts.scheme == 'https' and parts.hostname == 'www.thecollector.com' and not parts.username and not parts.password:
                self.urls.add(urllib.parse.urlunsplit((parts.scheme, parts.netloc, parts.path, '', '')))
    parser = Links()
    parser.feed(raw.decode('utf-8', 'replace'))
    if not parser.urls:
        raise ValueError('News listing contained no publisher links')
    return parser.urls


def parse_feed(raw, source_label, host, today, allowed_urls=None):
    if len(raw) > 2_000_000 or b'<!DOCTYPE' in raw.upper() or b'<!ENTITY' in raw.upper():
        raise ValueError('Unsafe or excessive feed')
    root = ET.fromstring(raw)
    if root.tag != 'rss' or root.find('channel') is None:
        raise ValueError('Expected an RSS channel')
    notices = []
    for item in root.findall('./channel/item')[:100]:
        title = plain(item.findtext('title') or '')
        description = plain((item.findtext('description') or '').split('</p>')[0])
        url = (item.findtext('link') or '').strip()
        parts = urllib.parse.urlsplit(url)
        try:
            date = email.utils.parsedate_to_datetime(item.findtext('pubDate') or '').date()
        except (TypeError, ValueError, AttributeError):
            continue
        text = title + ' ' + description
        categories = {plain(c.text or '').lower() for c in item.findall('category')}
        route_ok = (host == 'archaeology.org' and parts.path.startswith('/news/')) or (host == 'greekreporter.com' and bool(re.match(r'^/\d{4}/\d{2}/\d{2}/', parts.path)) and 'archaeology' in categories and 'evergreen' not in categories) or (host == 'www.thecollector.com' and allowed_urls is not None and url in allowed_urls)
        if (parts.scheme != 'https' or parts.hostname != host or not route_ok
                or parts.username or parts.password or not title or len(title) > 65
                or not 0 <= (today - date).days <= 30
                or not CLASSICAL.search(text) or not DISCOVERY.search(text)):
            continue
        # Keep the combined headline and quotation below 25 words per report.
        budget = max(0, 24 - len(title.split()))
        excerpt = ' '.join(description.split()[:budget]).rstrip(' .,…')
        if not excerpt:
            continue
        notices.append({
            'id': 'feed-' + hashlib.sha256(url.encode()).hexdigest()[:16],
            'mode': 'news', 'title': title, 'published': date.isoformat(),
            'publishedLabel': f'{date.day} {date:%B %Y}',
            'body': excerpt + '…',
            'why': 'What evidence supports the discovery, and what remains uncertain?',
            'image': 'assets/discoveries.svg',
            'imageAlt': 'Illustration of an ancient pot and magnifying glass',
            'caption': 'Discovery illustration · not a photograph of the find',
            'sourceLabel': source_label, 'sourceUrl': url, 'feedExtract': True,
        })
    return notices


def refresh(data, fetch, now, annotate=False):
    today = now.date()
    result = json.loads(json.dumps(data))
    previous = data.get('newsStatus', {})
    found, succeeded, failed = [], [], []
    for url, label, host in FEEDS:
        try:
            allowed = news_links(fetch('https://www.thecollector.com/news/')) if host == 'www.thecollector.com' else None
            found.extend(parse_feed(fetch(url), label, host, today, allowed))
            succeeded.append(label)
        except Exception as error:
            failed.append(label)
            prefix = '::warning::' if annotate else ''
            print(f'{prefix}Source unavailable: {label} ({type(error).__name__}); keeping valid stories.')
    if not succeeded:
        raise RuntimeError('All news sources failed; no files changed')
    manual = [row for row in data['news'] if not row.get('feedExtract')]
    # Retain notices no longer in the ten-item RSS window, including over weekends.
    retained = {row['id']: row for row in data['news'] if row.get('feedExtract')
                and 0 <= (today - dt.date.fromisoformat(row['published'])).days <= 30}
    manual_urls = {row['sourceUrl'] for row in manual}
    retained.update({row['id']: row for row in found if row['sourceUrl'] not in manual_urls})
    result['news'] = manual + sorted(retained.values(), key=lambda row: (row['published'], row['id']), reverse=True)[:16]
    result['newsStatus'] = {
        'lastSuccess': now.isoformat(timespec='seconds').replace('+00:00', 'Z'),
        'sources': succeeded, 'failedSources': failed,
        'latestPublication': max((row['published'] for row in result['news'] if row['mode'] == 'news'), default=previous.get('latestPublication')),
    }
    return result


def download(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'EBCClassicsDisplay/2.0 (+https://github.com/EBCClassics/classics-display)'})
    with urllib.request.urlopen(request, timeout=25) as response:
        if urllib.parse.urlsplit(response.url).hostname != urllib.parse.urlsplit(url).hostname:
            raise ValueError('Unexpected feed redirect')
        return response.read(2_000_001)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--fixture', type=pathlib.Path, help='Read a saved RSS feed instead of using the network')
    args = parser.parse_args()
    path = BASE / 'dist/content.json'
    data = json.loads(path.read_text())
    fetch = (lambda url: args.fixture.read_bytes()) if args.fixture else download
    updated = refresh(data, fetch, dt.datetime.now(dt.timezone.utc), annotate=True)
    path.write_text(json.dumps(updated, ensure_ascii=False, indent=2) + '\n')
    print(f'Checked sources; {sum(bool(row.get("feedExtract")) for row in updated["news"])} current discovery notices retained.')
