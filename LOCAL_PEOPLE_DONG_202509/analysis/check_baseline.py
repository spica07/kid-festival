# -*- coding: utf-8 -*-
"""기준 토요일(9/13·9/20)의 신촌 일대 이상 여부 점검.

유출 상위(충현동·신촌동·서교동)와 북아현동의 9월 일자별 19~20시 평균을 출력해
기준 토요일이 특이하게 높/낮았는지 확인한다.
"""
import pandas as pd
import json
import os

BASE = os.path.dirname(__file__)
df = pd.read_csv(os.path.join(BASE, '..', 'data', 'LOCAL_PEOPLE_DONG_202509.csv'),
                 encoding='cp949', usecols=[0, 1, 2, 3], header=0, index_col=False)
df.columns = ['date', 'hour', 'dong', 'pop']
df['date'] = df['date'].astype(str)
df['dong'] = df['dong'].astype(str)

with open(os.path.join(BASE, 'dong_map.json'), encoding='utf-8') as f:
    DONG = {k: v.split()[-1] for k, v in json.load(f).items()}
CODE = {v: k for k, v in DONG.items()}

targets = ['신촌동', '충현동', '서교동', '북아현동']
sel = df[df['dong'].isin([CODE[t] for t in targets]) & df['hour'].isin([19, 20])]
piv = sel.groupby(['date', 'dong'])['pop'].mean().unstack()
piv.columns = [DONG[c] for c in piv.columns]
piv = piv[targets].round(0).astype(int)
piv.index = [f"{d[4:6]}/{d[6:]}" + ('토' if pd.Timestamp(d).dayofweek == 5 else
             '일' if pd.Timestamp(d).dayofweek == 6 else '') for d in piv.index]
print(piv.to_string())
