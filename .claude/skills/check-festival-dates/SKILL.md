---
name: check-festival-dates
description: 꼬마 축제 데이터(assets/data/festivals.js)의 행사 날짜가 실제와 맞는지 재검증한다. 전국문화축제표준데이터(data.go.kr)나 지자체 SNS 그래픽 같은 1차 출처가 작년 회차 정보를 그대로 남겨두거나 요일 표기가 실제와 어긋난 경우가 실제로 있었다. 최근 언론 보도·공식 공지로 교차 확인해 틀린 날짜를 찾아 고친다. "축제 날짜 확인해줘", "표준데이터 다시 확인", "행사 일정 재검증", "needsRecheck 항목 확인" 같은 요청에 사용.
---

# 꼬마 축제 날짜 재검증

이 스킬은 **`assets/data/festivals.js`의 `window.KID_FESTIVALS` 배열**에 등록된 행사의 **날짜(`startDate`/`endDate`/`dates`/`recur`)**가 실제와 맞는지 다시 확인한다. 실제 작업은 **`festival-date-checker` 에이전트**에 위임한다.

## 왜 필요한가 (실제로 있었던 사고 2건, 2026-09-10)

1. **잠원나루축제** — `festivals.js`엔 전국문화축제표준데이터(data.go.kr) 기준 9월 19일로 등록돼 있었다. 그런데 표준데이터는 분기 스냅숏이라 작년(제11회, 2025년 9월 20일) 패턴이 그대로 남아있었던 것이고, 실제 2026년(제12회) 날짜는 서초구가 그해 9월 10일에 낸 보도자료 기준 **9월 12일**이었다. 표준데이터는 "공식"이지만 **최신이라는 보장이 없다.**
2. **고촌도서관 영어 베이킹** — 데이터엔 이미 `needsRecheck: true`가 붙어 있었다(구청 인스타그램 그래픽 캡션이 "매주 월요일"인데 명시된 날짜(9/8·9/15)는 화요일이라 모순). 언론 보도로 확인한 결과 **9월이 아니라 10월(10/12, 10/19, 목)** 행사였다 — 월 자체가 틀려 있었다.

**공통 교훈**: 표준데이터·지자체 SNS 그래픽 한 곳만 믿지 말고, 최근 언론 보도(특히 행사가 임박한 시점에 나온 지자체 보도자료 기사)로 교차 확인한다. 회차(제N회)와 기사 작성일을 반드시 대조해 **작년 기사를 올해 것으로 착각하지 않는다.**

## 절차

1. **범위 확정**: 사용자가 특정 행사명·지역·기간을 지정했으면 그것만. 아니면 아래 우선순위로 스스로 좁힌다:
   - ① `detail.needsRecheck: true`인 항목 전부 (가장 의심스러움 — 최우선)
   - ② 사용자가 지정한 기간(예: "이번 달", "9월") 안의 행사 전체
   - ③ (전체 재검증을 요청받았을 때만) 배열 전체 — 건수가 많으니 지역별로 나눠 에이전트를 병렬 실행해도 된다(단 최종 Edit는 메인에서 취합, 아래 "주의" 참고).

2. **기계적 사전 점검 (요일-날짜 정합성)**: 에이전트 실행 전에 아래 스크립트로 `startDate`/`endDate`의 `(요일)` 표기가 실제 달력과 맞는지부터 빠르게 검사한다. 여기서 걸리는 항목은 100% 오류이므로 최우선으로 재검증 대상에 넣는다.

   ```bash
   cd C:/blog_writing/kid-festival
   py -c "
   import re, datetime
   with open('assets/data/festivals.js', encoding='utf-8') as f:
       text = f.read()
   wd = ['월','화','수','목','금','토','일']
   pattern = re.compile(r\"(startDate|endDate): '(\d{4})\.(\d{2})\.(\d{2}) \((.)\)'\")
   for m in pattern.finditer(text):
       kind, y, mo, d, w = m.groups()
       y, mo, d = int(y), int(mo), int(d)
       try:
           actual = wd[datetime.date(y, mo, d).weekday()]
       except ValueError:
           print('INVALID DATE', kind, y, mo, d, w); continue
       if actual != w:
           print('MISMATCH', kind, f'{y}.{mo:02d}.{d:02d}', '표기=', w, '실제=', actual)
   "
   ```

3. **에이전트 실행**: `festival-date-checker` 에이전트를 Agent 도구로 실행한다. 프롬프트에 명시할 것:
   - 데이터 파일은 `assets/data/festivals.js`의 `window.KID_FESTIVALS` 배열임을 분명히 한다.
   - 1번에서 확정한 재검증 대상 목록(행사명 또는 범위)과, 2번 기계 점검에서 나온 불일치 목록을 그대로 전달한다.
   - "표준데이터·SNS 그래픽 한 곳만 믿지 말 것", "기사 작성일과 회차(제N회)를 반드시 대조해 작년 기사와 혼동하지 말 것"을 강조한다.

4. **검증**: 데이터 파일이 정상 파싱되는지 확인.
   ```bash
   node -e "global.window={}; require('C:/blog_writing/kid-festival/assets/data/festivals.js'); console.log(window.KID_FESTIVALS.length)"
   ```
   건수는 그대로여야 정상(날짜 수정은 건수를 바꾸지 않는다).

5. **보고**: 다음을 표로 정리해 사용자에게 보고한다.
   - 🔧 **날짜가 틀려서 수정한 행사** (행사명 · 기존 날짜 → 올바른 날짜 · 근거 출처 URL · 근거 유형(표준데이터가 작년 정보였음 / 그래픽 캡션 모순 등))
   - ✅ **재검증했으나 기존 날짜가 맞았던 행사**
   - ⚠️ **아직도 불확실한 행사** (출처를 못 찾음, 공식 발표 전 등) — `needsRecheck: true`와 `recheckNote`를 남겨둔다.
   - 📊 요약 통계 (검토 건수 / 수정 / 확인됨 / 불확실)

## 주의

- **행사 삭제나 대폭 변경(장소·요금 등 날짜 외 항목)은 사용자 확인 후** 진행한다 — 이 스킬은 날짜만 다룬다. 다른 정보까지 갱신하려면 `update-festivals` 스킬을 쓴다.
- 데이터 형식·코드 스타일은 기존 그대로 유지.
- 병렬 실행 시 여러 에이전트가 같은 파일을 동시에 Edit하면 충돌하니, 병렬은 "검색·확인"까지만 시키고 최종 Edit는 메인에서 취합해 한 번에 반영한다.
- 상세 검증 방법(출처 신뢰도 판정, 검색 요령 등)은 `festival-date-checker` 에이전트 정의에 정리돼 있다.
