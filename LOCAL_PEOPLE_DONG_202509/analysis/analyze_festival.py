# -*- coding: utf-8 -*-
"""서울 생활인구(행정동 단위) 2025-09 — 서울세계불꽃축제(9/27 토) 분석 집계.

입력 : LOCAL_PEOPLE_DONG_202509.csv (cp949, 시간대별 행정동 생활인구)
       analysis/dong_map.json (행정동코드 8자리 → 동 이름)
출력 : analysis/agg.json (보고서용 집계 결과)

비교 기준: 축제일 9/27(토) vs 평상 토요일 9/13·9/20 평균
"""
import pandas as pd
import json
import os

BASE_DIR = os.path.dirname(__file__)
SRC = os.path.join(BASE_DIR, '..', 'data', 'LOCAL_PEOPLE_DONG_202509.csv')
OUT = os.path.join(BASE_DIR, 'agg.json')

GU = {
    "11110": "종로구", "11140": "중구", "11170": "용산구", "11200": "성동구", "11215": "광진구",
    "11230": "동대문구", "11260": "중랑구", "11290": "성북구", "11305": "강북구", "11320": "도봉구",
    "11350": "노원구", "11380": "은평구", "11410": "서대문구", "11440": "마포구", "11470": "양천구",
    "11500": "강서구", "11530": "구로구", "11545": "금천구", "11560": "영등포구", "11590": "동작구",
    "11620": "관악구", "11650": "서초구", "11680": "강남구", "11710": "송파구", "11740": "강동구",
}

with open(os.path.join(BASE_DIR, 'dong_map.json'), encoding='utf-8') as f:
    DONG_FULL = json.load(f)  # "11560540" -> "서울특별시 영등포구 여의동"
DONG = {k: v.split()[-1] for k, v in DONG_FULL.items()}  # -> "여의동"

df = pd.read_csv(SRC, encoding='cp949', usecols=[0, 1, 2, 3], header=0, index_col=False)
df.columns = ['date', 'hour', 'dong', 'pop']
df['date'] = df['date'].astype(str)
df['dong'] = df['dong'].astype(str)
df['hour'] = df['hour'].astype(int)
df['pop'] = pd.to_numeric(df['pop'], errors='coerce')
df['gu'] = df['dong'].str[:5].map(GU)

FESTIVAL = '20250927'
BASE = ['20250913', '20250920']
SATS = ['20250906', '20250913', '20250920', '20250927']

out = {}

# ── 1) 서울 전체 시간대별: 9월 토요일 4일 + 기준 토요일 평균 ──
seoul = df.groupby(['date', 'hour'])['pop'].sum()
out['seoul_hourly'] = {d: [round(seoul.get((d, h), 0)) for h in range(24)] for d in SATS}
out['seoul_base_avg'] = [round((seoul.get((BASE[0], h), 0) + seoul.get((BASE[1], h), 0)) / 2)
                         for h in range(24)]

# ── 2) 자치구별 저녁(18~21시) 평균: 축제일 vs 기준 토요일 ──
gu_h = df[df['date'].isin([FESTIVAL] + BASE)].groupby(['date', 'gu', 'hour'])['pop'].sum()
evening = range(18, 22)
gu_rows = []
for gu in sorted(set(GU.values())):
    fest = sum(gu_h.get((FESTIVAL, gu, h), 0) for h in evening) / 4
    base = sum(gu_h.get((d, gu, h), 0) for d in BASE for h in evening) / 8
    gu_rows.append({'gu': gu, 'fest': round(fest), 'base': round(base),
                    'diff': round(fest - base),
                    'pct': round((fest / base - 1) * 100, 1) if base else None})
gu_rows.sort(key=lambda r: r['diff'], reverse=True)
out['gu_evening'] = gu_rows

# 주요 자치구 시간대별 곡선 (축제일 vs 기준 평균)
out['gu_hourly'] = {}
for gu in ['영등포구', '용산구', '동작구', '마포구']:
    out['gu_hourly'][gu] = {
        'festival': [round(gu_h.get((FESTIVAL, gu, h), 0)) for h in range(24)],
        'base': [round(sum(gu_h.get((d, gu, h), 0) for d in BASE) / 2) for h in range(24)],
    }

# ── 3) 동 단위 스파이크: 축제일 19~20시 vs 기준 토요일 동시간 ──
dong_h = df[df['date'].isin([FESTIVAL] + BASE)].groupby(['date', 'dong', 'hour'])['pop'].sum()
peak_hours = [19, 20]
spike = []
for dg in df['dong'].unique():
    fest = sum(dong_h.get((FESTIVAL, dg, h), 0) for h in peak_hours) / 2
    base = sum(dong_h.get((d, dg, h), 0) for d in BASE for h in peak_hours) / 4
    spike.append({'code': dg, 'name': DONG.get(dg, dg), 'gu': GU.get(dg[:5], '?'),
                  'fest': round(fest), 'base': round(base), 'diff': round(fest - base),
                  'pct': round((fest / base - 1) * 100, 1) if base else None})
spike.sort(key=lambda r: r['diff'], reverse=True)
out['dong_spike_top15'] = spike[:15]
out['dong_spike_bottom10'] = sorted(spike, key=lambda r: r['diff'])[:10]

# 상위 동 시간대별 곡선 — 여의동 + 6개 (확산 섹션용)
# 북아현동은 평상 토요일 저녁마다 규칙적으로 급감하는 기저 패턴 탓에
# 증가율이 과대 산출되므로 스몰 멀티플에서 제외 (check_baseline.py 참고)
EXCLUDE_SM = {'북아현동'}
out['top_dong_hourly'] = {}
for r in [r for r in spike if r['name'] not in EXCLUDE_SM][:7]:
    dg = r['code']
    out['top_dong_hourly'][r['name']] = {
        'gu': r['gu'],
        'festival': [round(dong_h.get((FESTIVAL, dg, h), 0)) for h in range(24)],
        'base': [round(sum(dong_h.get((d, dg, h), 0) for d in BASE) / 2) for h in range(24)],
    }

# ── 4) 여의동 9월 한 달 일자별 19~20시 평균 (월간 맥락) ──
YEOUI = '11560540'
yeoui = df[df['dong'] == YEOUI].groupby(['date', 'hour'])['pop'].sum()
dates = sorted(df['date'].unique())
out['yeoui_daily_evening'] = [
    {'date': d, 'dow': pd.Timestamp(d).dayofweek,  # 0=월
     'pop': round((yeoui.get((d, 19), 0) + yeoui.get((d, 20), 0)) / 2)}
    for d in dates
]

# ── 5) 축제일 시간대별 최대 밀집 동 top5 (절대 인구) ──
fest_only = df[df['date'] == FESTIVAL]
rank = {}
for h in range(24):
    top = fest_only[fest_only['hour'] == h].nlargest(5, 'pop')[['dong', 'gu', 'pop']]
    rank[h] = [{'name': DONG.get(r.dong, r.dong), 'gu': r.gu, 'pop': round(r.pop)}
               for r in top.itertuples()]
out['hourly_top5'] = rank

# ── 메타 ──
fest_series = out['seoul_hourly'][FESTIVAL]
out['meta'] = {
    'n_rows': len(df), 'n_dongs': int(df['dong'].nunique()),
    'festival_date': FESTIVAL, 'base_dates': BASE,
    'yeoui_19h_fest': round(dong_h.get((FESTIVAL, YEOUI, 19), 0)),
    'yeoui_19h_base': round(sum(dong_h.get((d, YEOUI, 19), 0) for d in BASE) / 2),
}

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=1)

print('rows:', len(df), '| dongs:', df['dong'].nunique())
print('여의동 19시:', out['meta']['yeoui_19h_fest'], 'vs 평상', out['meta']['yeoui_19h_base'])
print('\nTOP10 동별 스파이크 (19~20시, 증가량):')
for r in spike[:10]:
    print(f"  {r['name']:8s} ({r['gu']}) {r['base']:>8,} -> {r['fest']:>8,}  +{r['diff']:,} ({r['pct']}%)")
print('\n자치구 TOP5 (18~21시 증가량):')
for r in gu_rows[:5]:
    print(f"  {r['gu']:6s} {r['base']:>9,} -> {r['fest']:>9,}  +{r['diff']:,} ({r['pct']}%)")
