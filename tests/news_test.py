import datetime as dt
import importlib.util
import pathlib
import unittest

spec = importlib.util.spec_from_file_location('news', pathlib.Path(__file__).resolve().parents[1] / 'scripts/update-news.py')
news = importlib.util.module_from_spec(spec)
spec.loader.exec_module(news)
TODAY = dt.date(2026, 11, 2)
NOW = dt.datetime(2026, 11, 2, 5, 17, tzinfo=dt.timezone.utc)


def feed(title='Roman coins found near ancient settlement', date='Fri, 30 Oct 2026 19:00:00 +0000', link='https://archaeology.org/news/2026/10/30/coins/'):
    return f'<rss><channel><item><title>{title}</title><link>{link}</link><pubDate>{date}</pubDate><description>&lt;p&gt;Researchers discovered Roman coins during an excavation in a field near a settlement. They are investigating the site.&lt;/p&gt;</description></item></channel></rss>'.encode()


class NewsTests(unittest.TestCase):
    def test_dated_attributed_bounded_extract(self):
        rows = news.parse_feed(feed(), 'Test source', 'archaeology.org', TODAY)
        self.assertEqual(len(rows), 1)
        row = rows[0]
        self.assertEqual(row['published'], '2026-10-30')
        self.assertLessEqual(len((row['title'] + ' ' + row['body']).split()), 24)
        self.assertTrue(row['feedExtract'])
        self.assertIn('not a photograph', row['caption'])

    def test_future_stale_and_wrong_hosts_excluded(self):
        for raw in [feed(date='Tue, 03 Nov 2026 12:00:00 +0000'), feed(date='Thu, 01 Jan 2026 12:00:00 +0000'), feed(link='https://example.com/news/fake'), feed(link='javascript:alert(1)')]:
            self.assertEqual(news.parse_feed(raw, 'Test source', 'archaeology.org', TODAY), [])

    def test_unrelated_stories_and_unsafe_xml_excluded(self):
        raw = b'<rss><channel><item><title>Modern sports results</title><link>https://archaeology.org/news/sports/</link><pubDate>Fri, 30 Oct 2026 19:00:00 +0000</pubDate><description>A football team wins</description></item></channel></rss>'
        self.assertEqual(news.parse_feed(raw, 'Test source', 'archaeology.org', TODAY), [])
        with self.assertRaises(ValueError):
            news.parse_feed(b'<!DOCTYPE rss [<!ENTITY a "x">]><rss/>', 'Test', 'archaeology.org', TODAY)
        with self.assertRaises(ValueError):
            news.parse_feed(b'<html/>', 'Test', 'archaeology.org', TODAY)

    def test_deduplication_and_retention_outside_feed_window(self):
        data = {'news': []}
        first = news.refresh(data, lambda url: feed(), NOW)
        second = news.refresh(first, lambda url: feed(), NOW)
        self.assertEqual(len(second['news']), 1)
        third = news.refresh(second, lambda url: b'<rss><channel/></rss>', NOW)
        self.assertEqual(third['news'], second['news'])

    def test_new_sources_require_the_correct_news_section(self):
        url = 'https://www.thecollector.com/roman-coins-found/'
        raw = feed(link=url)
        self.assertEqual(news.parse_feed(raw, 'Collector', 'www.thecollector.com', TODAY), [])
        self.assertEqual(len(news.parse_feed(raw, 'Collector', 'www.thecollector.com', TODAY, {url})), 1)
        self.assertEqual(news.parse_feed(raw, 'Collector', 'www.thecollector.com', TODAY, set()), [])
        greek = feed(link='https://greekreporter.com/2026/10/30/roman-coins/').replace(b'</item>', b'<category>Archaeology</category></item>')
        self.assertEqual(len(news.parse_feed(greek, 'Greek Reporter', 'greekreporter.com', TODAY)), 1)
        self.assertEqual(news.parse_feed(greek.replace(b'Archaeology', b'Politics'), 'Greek Reporter', 'greekreporter.com', TODAY), [])
        self.assertEqual(news.parse_feed(greek.replace(b'</item>', b'<category>evergreen</category></item>'), 'Greek Reporter', 'greekreporter.com', TODAY), [])
        self.assertIn(url, news.news_links(b'<a href="/roman-coins-found/">Roman discovery</a>'))

    def test_one_failed_publisher_preserves_notices_from_other_sources(self):
        def fetch(url):
            if 'archaeology.org' in url:
                return feed()
            raise TimeoutError()
        result = news.refresh({'news': []}, fetch, NOW)
        self.assertEqual(len(result['news']), 1)
        self.assertEqual(len(result['newsStatus']['failedSources']), 2)
        self.assertEqual(result['newsStatus']['sources'], ['Archaeology magazine · AIA'])

    def test_total_failure_preserves_original(self):
        data = {'news': [{'id': 'original'}]}
        def fail(url):
            raise TimeoutError()
        with self.assertRaises(RuntimeError):
            news.refresh(data, fail, NOW)
        self.assertEqual(data, {'news': [{'id': 'original'}]})


if __name__ == '__main__':
    unittest.main()
