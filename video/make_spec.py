# -*- coding: utf-8 -*-
"""
동화 슬러그로부터 영상 스펙(JSON) 자동 생성
- 한국어: pages/family/<slug>-story.html 의 story-spread(h2/본문 p/대사 p.line)
- 영어:   assets/js/pages/story-reader.js 의 ENGLISH_STORIES (node extract_en.js)
- 삽화:   assets/images/<slug>-story-NN.png
usage: py -3 make_spec.py <slug>
"""
import sys, re, json, subprocess, html
from pathlib import Path

from config import ROOT, REPO


def clean(t):
    t = re.sub(r'<[^>]+>', '', t)
    return html.unescape(t).strip()


def parse_kr_title(slug):
    src = (REPO / "pages" / "family" / f"{slug}-story.html").read_text(encoding="utf-8")
    m = re.search(r'<h1>(.*?)</h1>', src, re.S)
    return clean(m.group(1)) if m else ""


def parse_kr(slug):
    p = REPO / "pages" / "family" / f"{slug}-story.html"
    src = p.read_text(encoding="utf-8")
    scenes = []
    for art in re.findall(r'<article class="story-spread[^"]*">.*?</article>', src, re.S):
        copy = re.search(r'<div class="scene-copy">(.*?)</div>', art, re.S)
        block = copy.group(1) if copy else art
        h2 = re.search(r'<h2>(.*?)</h2>', block, re.S)
        title = clean(h2.group(1)) if h2 else ""
        line_m = re.search(r'<p class="line">(.*?)</p>', block, re.S)
        line = clean(line_m.group(1)) if line_m else ""
        bodies = re.findall(r'<p(?!\s+class="line")[^>]*>(.*?)</p>', block, re.S)
        body = " ".join(clean(b) for b in bodies if clean(b))
        scenes.append({"title": title, "body": body, "line": line})
    return scenes


def parse_en(slug):
    r = subprocess.run(["node", str(ROOT / "extract_en.js"), slug],
                       capture_output=True, text=True, encoding="utf-8")
    if r.returncode != 0:
        raise SystemExit(f"영어 데이터 추출 실패({slug}): {r.stderr.strip()}")
    data = json.loads(r.stdout)
    scenes = [{"title": p[0], "body": p[1], "line": p[2]} for p in data["pages"]]
    return data.get("title", ""), scenes


def main(slug):
    kr = parse_kr(slug)
    en_title, en = parse_en(slug)
    n = min(len(kr), len(en))
    imgs = []
    for i in range(1, n + 1):
        img = REPO / "assets" / "images" / f"{slug}-story-{i:02d}.png"
        if not img.exists():
            raise SystemExit(f"삽화 없음: {img.name}")
        imgs.append(f"assets/images/{slug}-story-{i:02d}.png")
    if len(kr) != len(en):
        print(f"  ! 장면 수 불일치 KR={len(kr)} EN={len(en)} -> {n} 사용", file=sys.stderr)

    scenes = [{"image": imgs[i], "ko": kr[i], "en": en[i]} for i in range(n)]
    spec = {"slug": slug,
            "title": {"ko": parse_kr_title(slug), "en": en_title},
            "scenes": scenes}
    out = ROOT / "specs" / f"{slug}.json"
    out.parent.mkdir(exist_ok=True)
    out.write_text(json.dumps(spec, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{slug}: {n} 장면 -> {out}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("usage: make_spec.py <slug>"); raise SystemExit(2)
    main(sys.argv[1])
