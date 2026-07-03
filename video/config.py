# -*- coding: utf-8 -*-
"""영상 파이프라인 공통 설정: 경로, 언어/음성, 레이아웃 상수.

import 시 stdout/stderr를 UTF-8로 재설정한다(Windows 콘솔 한글 출력용).
"""
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
except Exception:
    pass

ROOT = Path(__file__).resolve().parent   # video/
REPO = ROOT.parent                       # 저장소 루트
BUILD = ROOT / "build"
OUT = ROOT / "out"
SPECS = ROOT / "specs"

# 언어별 TTS 음성/속도, 자막 폰트 크기
LANGS = {
    "ko": {"voice": "ko-KR-SunHiNeural", "rate": "-6%", "fs": 60},
    "en": {"voice": "en-US-AvaNeural",   "rate": "-6%", "fs": 56},
}

# 영상 캔버스(16:9)와 문장 앞뒤 여유 시간(초)
W, H = 1920, 1080
LEAD, TAIL = 0.35, 0.65
# 타이틀 장면(표지+제목)은 여유를 더 두어 차분하게 시작
TITLE_LEAD, TITLE_TAIL = 0.8, 1.2

# 자막 색 (ASS BGR 형식)
C_BODY = "&H00FFFFFF&"   # white
C_LINE = "&HE6F0BF&"     # light teal #BFF0E6

# 카드/삽화 레이아웃 (gen_assets.py 배경 생성과 build_story_video.py가 공유)
CARD_X, CARD_Y, CARD_W, CARD_H = 70, 60, 1780, 960
CARD_R = 48
ILLO_X, ILLO_Y, ILLO_W, ILLO_H = 400, 102, 1119, 700
ILLO_R = 28
