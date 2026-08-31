# -*- coding: utf-8 -*-
"""agg.json → report_template.html의 __DATA_JSON__에 주입해 최종 보고서 생성.

출력: report/서울불꽃축제_인구분석_202509.html
"""
import json
import os

BASE = os.path.dirname(__file__)
ROOT = os.path.abspath(os.path.join(BASE, '..'))

with open(os.path.join(BASE, 'agg.json'), encoding='utf-8') as f:
    a = json.load(f)

data = {
    'seoul': {
        'festival': a['seoul_hourly']['20250927'],
        'base': a['seoul_base_avg'],
    },
    'yeoui': {
        'festival': a['top_dong_hourly']['여의동']['festival'],
        'base': a['top_dong_hourly']['여의동']['base'],
    },
    'yeouiDaily': a['yeoui_daily_evening'],
    'topDongs': [
        {
            'name': name, 'gu': d['gu'],
            'festival': d['festival'], 'base': d['base'],
            'fest1920': next(r['fest'] for r in a['dong_spike_top15'] if r['name'] == name),
            'base1920': next(r['base'] for r in a['dong_spike_top15'] if r['name'] == name),
            'pct': next(r['pct'] for r in a['dong_spike_top15'] if r['name'] == name),
        }
        # 여의동은 별도 대형 차트가 있으므로 확산 섹션에서는 2~7위 6개 동
        for name, d in a['top_dong_hourly'].items() if name != '여의동'
    ],
    'gu': a['gu_evening'],
    'spikeTop': a['dong_spike_top15'],
    'hourlyTop5': a['hourly_top5'],
    'outflow': a['dong_spike_bottom10'][:7],
}

with open(os.path.join(BASE, 'report_template.html'), encoding='utf-8') as f:
    html = f.read()
html = html.replace('__DATA_JSON__', json.dumps(data, ensure_ascii=False))

out_dir = os.path.join(ROOT, 'report')
os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, '서울불꽃축제_인구분석_202509.html')
with open(out, 'w', encoding='utf-8') as f:
    f.write(html)
print('written:', out, f'({os.path.getsize(out):,} bytes)')
print('topDongs:', [d['name'] for d in data['topDongs']])
