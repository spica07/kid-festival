# -*- coding: utf-8 -*-
"""그림동화 영상용 배경/카드/마스크 PNG 생성 (Pillow)"""
from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path

from config import (BUILD, W, H,
                    CARD_X, CARD_Y, CARD_W, CARD_H, CARD_R,
                    ILLO_X, ILLO_Y, ILLO_W, ILLO_H, ILLO_R)

ASSETS = BUILD / "assets"
ASSETS.mkdir(exist_ok=True)


def lerp(a, b, t):
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


def ramp(t, stops):
    # stops: list of (pos, (r,g,b))
    for i in range(len(stops) - 1):
        p0, c0 = stops[i]
        p1, c1 = stops[i + 1]
        if t <= p1:
            tt = 0 if p1 == p0 else (t - p0) / (p1 - p0)
            return lerp(c0, c1, tt)
    return stops[-1][1]


def make_bg():
    stops = [(0.0, (0xFF, 0xF7, 0xE8)), (0.5, (0xE8, 0xF7, 0xFF)), (1.0, (0xF4, 0xEE, 0xFF))]
    n = 256
    small = Image.new("RGB", (n, n))
    px = small.load()
    for y in range(n):
        for x in range(n):
            t = (x + y) / (2 * (n - 1))
            px[x, y] = ramp(t, stops)
    bg = small.resize((W, H), Image.BILINEAR)
    bg.save(ASSETS / "bg.png")


def make_card():
    card = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    # 그림자
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle([CARD_X, CARD_Y + 16, CARD_X + CARD_W, CARD_Y + CARD_H + 16],
                         radius=CARD_R, fill=(90, 99, 128, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    card = Image.alpha_composite(card, shadow)
    # 흰 카드
    d = ImageDraw.Draw(card)
    d.rounded_rectangle([CARD_X, CARD_Y, CARD_X + CARD_W, CARD_Y + CARD_H],
                        radius=CARD_R, fill=(255, 255, 255, 250),
                        outline=(216, 238, 233, 255), width=3)
    # 삽화 자리 그림자(액자 느낌)
    illo_sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    isd = ImageDraw.Draw(illo_sh)
    isd.rounded_rectangle([ILLO_X - 6, ILLO_Y + 10, ILLO_X + ILLO_W + 6, ILLO_Y + ILLO_H + 14],
                          radius=ILLO_R + 6, fill=(120, 128, 150, 110))
    illo_sh = illo_sh.filter(ImageFilter.GaussianBlur(14))
    card = Image.alpha_composite(card, illo_sh)
    card.save(ASSETS / "card.png")


def make_illo_mask():
    mask = Image.new("L", (ILLO_W, ILLO_H), 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, ILLO_W - 1, ILLO_H - 1], radius=ILLO_R, fill=255)
    mask.save(ASSETS / "illo_mask.png")


def make_scrim():
    # 하단 부드러운 어둠 그라데이션 (가독성용)
    col = Image.new("RGBA", (1, H), (0, 0, 0, 0))
    px = col.load()
    top = 600
    base = (20, 26, 44)
    for y in range(H):
        if y <= top:
            a = 0
        else:
            a = int(205 * ((y - top) / (H - top)) ** 1.35)
        px[0, y] = (base[0], base[1], base[2], a)
    col.resize((1920, H), Image.BILINEAR).save(ASSETS / "scrim.png")


if __name__ == "__main__":
    make_bg()
    make_card()
    make_illo_mask()
    make_scrim()
    print("assets ->", ASSETS)
