---
name: check-festival-dates
description: 꼬마 축제 데이터(assets/data/festivals.js)의 행사 날짜가 실제와 맞는지 재검증한다. 전국문화축제표준데이터(data.go.kr)나 지자체 SNS 그래픽 같은 1차 출처가 작년 회차 정보를 그대로 남겨두거나 요일 표기가 실제와 어긋난 경우가 실제로 있었다. 최근 언론 보도·공식 공지로 교차 확인해 틀린 날짜를 찾아 고친다. "축제 날짜 확인해줘", "표준데이터 다시 확인", "행사 일정 재검증", "needsRecheck 항목 확인" 같은 요청에 사용.
---

# 꼬마 축제 날짜 재검증

**`assets/data/festivals.js`의 `window.KID_FESTIVALS` 배열**에서 날짜(`startDate`/`endDate`/`dates`/`recur`)가 실제와 맞는지 다시 확인한다. 웹 검증과 수정은 **`festival-date-checker` 에이전트**에 위임한다. 왜 필요한지(실제 사고 사례), 출처 판정, 확정 기준은 에이전트 정의에 있다.

## 절차

1. **대상 목록 만들기 (메인에서 직접 실행)**
   ```bash
   cd C:/blog_writing/kid-festival
   node .claude/skills/update-festivals/scripts/audit-dates.js              # 요일 불일치 + 30일 이내 임박 행사
   node .claude/skills/update-festivals/scripts/audit-dates.js --days 14    # 범위 조절
   ```
   우선순위:
   - ① **요일 불일치** 항목 — 100% 오류, 무조건 포함
   - ② 사용자가 지정한 행사·지역·기간
   - ③ 지정이 없으면 **임박 행사 중 ★(needsRecheck)**, 그다음 나머지 임박 행사

   `needsRecheck`는 데이터의 절반 넘게 붙어 있어 그것만으로 범위를 잡으면 사실상 전체가 된다. 임박 여부와 겹쳐서 좁힌다.

2. **에이전트 실행**: `festival-date-checker`에 1번 목록(행사명과 현재 날짜)을 그대로 넘긴다. 한 번에 **30건 안팎**으로 끊는다. 그 이상이면 배치를 나눠 순서대로 돌리거나, 병렬일 때는 **검색·확인까지만(check-only)** 시키고 Edit는 메인에서 취합한다(동시 Edit 충돌과 사용량 한도 방지).

3. **검증**
   ```bash
   node -e "global.window={}; require('C:/blog_writing/kid-festival/assets/data/festivals.js'); console.log(window.KID_FESTIVALS.length)"
   node .claude/skills/update-festivals/scripts/audit-dates.js | head -5
   ```
   건수는 그대로, 요일 불일치는 0건이어야 정상.

4. **보고** (표):
   - 🔧 날짜를 고친 행사 (기존 → 올바른 날짜 · 근거 URL · 근거 유형)
   - ✅ 재검증 결과 기존 날짜가 맞았던 행사
   - ⚠️ 여전히 불확실한 행사 (`needsRecheck`·`recheckNote` 유지)
   - 📊 검토 / 수정 / 확인 / 불확실 건수

## 주의

- 이 스킬은 **날짜만** 다룬다. 장소·요금 변경은 보고만 하고 `update-festivals`로 넘긴다. 삭제는 사용자 확인 후.
