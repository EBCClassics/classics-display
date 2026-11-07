"""Regenerate static SVG previews from the shared moving artwork."""
from pathlib import Path
import subprocess

OUTPUT = Path(__file__).resolve().parent.parent / 'dist/assets/seasons'
OUTPUT.mkdir(parents=True, exist_ok=True)
INK = '#101522'
subprocess.run(['node', str(Path(__file__).with_suffix('.cjs'))], check=True)

def leaf(x, y, scale=1, angle=0, colour='#82D29B'):
    return f'<g transform="translate({x} {y}) rotate({angle}) scale({scale})"><path d="M0 0C-42-8-52-39-43-59 0-54 12-24 0 0Z" fill="{colour}"/><path d="M0 0-35-47" fill="none" stroke="{INK}" stroke-opacity=".24" stroke-width="2"/></g>'


# Compact companions for the calendar reference page.
icons = {
    'wellbeing': '<path d="M80 93C25 49 31 8 61 16c41 12 42 48-4 77M61 16C40 41 51 70 80 93" stroke="#82D29B" stroke-width="12" fill="none"/>',
    'inclusion': '<path d="M80 54c-52-65-99 20-47 20 35 0 48-77 87-40 43 41-4 76-40 20Z" fill="none" stroke="#80D9D1" stroke-width="9"/>',
    'earth': '<circle cx="80" cy="51" r="40" fill="none" stroke="#86B788" stroke-width="5"/><path d="M43 31h74M41 62h78M80 11q-32 40 0 80 32-40 0-80Z" fill="none" stroke="#85BFC5" stroke-width="4"/>',
    'peace': '<path d="M22 88Q85 76 134 14" fill="none" stroke="#D7E2CC" stroke-width="4"/>' + ''.join(leaf(x,y,.45,-20,'#B5C6A4') for x,y in [(48,81),(73,65),(101,44),(126,22)]),
    'kindness': '<path d="M58 83C-8 37 25 1 58 35 91 1 124 37 58 83Z" fill="#CF819C"/><path d="M103 94C57 61 79 36 103 59 127 36 151 61 103 94Z" fill="#E8CC8A"/>'
}
for name, artwork in icons.items():
    (OUTPUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 105"><title>Original {name} illustration</title>{artwork}</svg>\n')
