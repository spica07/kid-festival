# -*- coding: utf-8 -*-
"""행정동 geojson(vuski/admdongkor)에서 서울 행정동 코드(통계청 8자리)→이름 매핑 추출.

입력: 스크래치패드에 내려받은 HangJeongDong_ver20250401.geojson
출력: analysis/dong_map.json  { "11560540": "서울특별시 영등포구 여의동", ... }
"""
import re
import json
import os

SCRATCH = (r'C:\Users\70705\AppData\Local\Temp\claude\D--LOCAL-PEOPLE-DONG-202509'
           r'\cf00d08d-8a5a-46f4-98b3-51cd450a2c55\scratchpad')
OUT = os.path.join(os.path.dirname(__file__), 'dong_map.json')

txt = open(os.path.join(SCRATCH, 'hjd.geojson'), encoding='utf-8').read()
# 생활인구 데이터의 행정동코드 = 행자부 코드(adm_cd2, 10자리)의 앞 8자리
props = re.findall(r'"adm_nm":\s*"([^"]+)",\s*"adm_cd2":\s*"(\d{10})"', txt)
m = {cd[:8]: nm for nm, cd in props if nm.startswith('서울')}
print('seoul dongs:', len(m))
for c in ['11560540', '11170640', '11170630', '11170625', '11590510', '11170570']:
    print(c, m.get(c))
json.dump(m, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
