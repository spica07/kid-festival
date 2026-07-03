# -*- coding: utf-8 -*-
"""pages/family 동화 HTML의 <img>에 loading="lazy"·decoding="async"·width/height를 일괄 추가.

- 페이지의 첫 번째 이미지(표지)는 즉시 로드 유지(lazy 제외), 나머지는 lazy.
- width/height는 실제 PNG 크기에서 읽음. 파일이 없으면 시리즈 표준 1586x992 사용.
- 이미 loading= 속성이 있는 img는 건너뜀.
"""
import re
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

from PIL import Image

REPO = Path(__file__).resolve().parent.parent
IMAGES = REPO / "assets" / "images"
DEFAULT_SIZE = (1586, 992)

IMG_RE = re.compile(r'<img\s+([^>]*?)>')
SRC_RE = re.compile(r'src="([^"]*assets/images/[^"]+)"')

def png_size(src):
    name = src.split("/")[-1]
    path = IMAGES / name
    if path.exists():
        try:
            with Image.open(path) as im:
                return im.size
        except Exception:
            pass
    return DEFAULT_SIZE

def process(path):
    text = path.read_text(encoding="utf-8")
    count = [0]
    changed = [0]

    def repl(m):
        attrs = m.group(1)
        src_m = SRC_RE.search(attrs)
        if not src_m:
            return m.group(0)
        count[0] += 1
        if "loading=" in attrs:
            return m.group(0)
        w, h = png_size(src_m.group(1))
        extra = f' width="{w}" height="{h}" decoding="async"'
        if count[0] > 1:  # 첫 이미지는 표지라 즉시 로드 유지
            extra += ' loading="lazy"'
        changed[0] += 1
        return f"<img {attrs.rstrip()}{extra}>"

    new_text = IMG_RE.sub(repl, text)
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
    return count[0], changed[0]

def main():
    total_imgs = total_changed = files = 0
    for path in sorted((REPO / "pages" / "family").glob("*.html")):
        n, c = process(path)
        if c:
            files += 1
            total_imgs += n
            total_changed += c
            print(f"{path.name}: {c}/{n} imgs updated")
    print(f"\n{files} files, {total_changed} imgs updated")

if __name__ == "__main__":
    main()
