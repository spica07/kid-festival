# -*- coding: utf-8 -*-
"""
여러 동화 영상 일괄 제작.
usage:
  py -3 build_all.py all              # 삽화 10장 완비된 동화 전체
  py -3 build_all.py jupiter mars ... # 지정 slug
이미 out/<slug>_ko.mp4 & _en.mp4 가 있으면 건너뜀(이어하기).
"""
import sys, subprocess, re
from pathlib import Path

from config import ROOT, REPO, OUT

PY = sys.executable


def all_ready_slugs():
    slugs = []
    src = (REPO / "assets" / "js" / "pages" / "story-reader.js").read_text(encoding="utf-8")
    for html in sorted((REPO / "pages" / "family").glob("*-story.html")):
        slug = html.name[:-len("-story.html")]
        imgs = [REPO / "assets" / "images" / f"{slug}-story-{i:02d}.png" for i in range(1, 11)]
        # 삽화 10장 완비 + 영어 항목 존재 확인
        if all(p.exists() for p in imgs) and f'"{slug}-story.html"' in src:
            slugs.append(slug)
    return slugs


def done(slug):
    return (OUT / f"{slug}_ko.mp4").exists() and (OUT / f"{slug}_en.mp4").exists()


def run(args):
    return subprocess.run([PY] + args, cwd=str(ROOT)).returncode


def main(slugs):
    OUT.mkdir(exist_ok=True)
    total = len(slugs)
    ok, skip, fail = [], [], []
    for idx, slug in enumerate(slugs, 1):
        print(f"\n===== [{idx}/{total}] {slug} =====", flush=True)
        if done(slug):
            print(f"  이미 완료 - 건너뜀"); skip.append(slug); continue
        if run(["make_spec.py", slug]) != 0:
            print(f"  스펙 실패"); fail.append((slug, "spec")); continue
        if run(["build_story_video.py", f"{slug}.json", "both"]) != 0:
            print(f"  빌드 실패"); fail.append((slug, "build")); continue
        if done(slug):
            ok.append(slug)
        else:
            fail.append((slug, "no-output"))

    print("\n========== 요약 ==========")
    print(f"완료 {len(ok)}: {', '.join(ok)}")
    print(f"건너뜀 {len(skip)}: {', '.join(skip)}")
    print(f"실패 {len(fail)}: {fail}")
    if fail:
        raise SystemExit(1)


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        print("usage: build_all.py all | <slug...>"); raise SystemExit(2)
    slugs = all_ready_slugs() if args == ["all"] else args
    print("대상:", slugs)
    main(slugs)
