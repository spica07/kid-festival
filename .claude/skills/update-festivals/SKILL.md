---
name: update-festivals
description: 꼬마 축제 페이지의 행사 데이터(assets/data/festivals.js)를 최신으로 업데이트한다. 공공데이터를 그 시점 최신본으로 새로 받고, 기존 행사 일정·장소를 웹에서 다시 확인해 갱신하며(1개월 이내 임박 행사는 언론 교차검증 필수), 현재 월 포함 4개월간 서울·경기·인천의 신규 어린이 행사를 검색해 추가한다. 사전 예약이 필요한 프로그램은 꼬마 예약 달력(kid-reservation)에도 함께 등록한다. "축제 페이지 업데이트해줘", "축제 일정 갱신", "이번 분기 새 행사 추가" 같은 요청에 사용.
---

# 꼬마 축제 페이지 업데이트

**`assets/data/festivals.js`의 `window.KID_FESTIVALS` 배열**을 최신으로 유지한다. 메인이 스크립트로 조사 목록을 만들고, 웹 검증과 편집은 **`festival-updater` 에이전트**에 위임한다. 스키마·검색 전략·교차검증 방법은 에이전트 정의에 있으니 여기서 반복하지 않는다.

## 절차

1. **기간 확정**: 오늘 기준 **현재 월 + 다음 3개월(총 4개월)**. 사용자가 월/분기를 지정했으면 그것을 따른다.

2. **조사 목록 만들기 (메인에서 직접 실행)** — 둘 다 공공데이터와 데이터 파일을 그 자리에서 새로 읽는다. 캐시 재사용 없음.
   ```bash
   cd C:/blog_writing/kid-festival
   node .claude/skills/update-festivals/scripts/fetch-candidates.js --start YYYYMMDD --end YYYYMMDD > <스크래치>/candidates.txt
   node .claude/skills/update-festivals/scripts/audit-dates.js > <스크래치>/imminent.txt
   ```
   - `fetch-candidates.js`: 표준데이터(무키)·TourAPI·서울 열린데이터에서 기간 내 행사를 받아 **festivals.js 미등록 후보**만 출력한다. 인증키는 `.env`에 이미 있다 — **사용자에게 키를 요청하지 않는다.**
   - `audit-dates.js`: **요일 불일치**와 **30일 이내 임박 행사**(★=needsRecheck) 목록.

3. **에이전트 실행**: `festival-updater`를 Agent 도구로 실행하고 프롬프트에 다음을 넣는다.
   - 데이터 파일 경로(kid-festival.js 아님), 대상 기간, 지역(서울·경기·인천), 연령(5~7세)
   - 2번의 두 파일 경로 — 에이전트는 이 목록에서 시작한다(목록을 다시 수집하지 않게)
   - 네 가지 임무: (a) 임박 행사 교차검증, (b) 대상 기간 내 기존 행사 갱신, (c) 후보 검증 후 신규 추가, (d) 추가·갱신한 행사마다 사전 예약이 필요한 프로그램이 있는지 확인(에이전트 정의의 "사전 예약 확인" 절)
   - 이번 실행의 참고 사항(최근 커밋에서 이미 확인한 행사, 행정구역 변경 등)

   **규모 조절**: 임박 행사가 수십 건을 넘거나 후보가 많으면 한 에이전트에 몰지 않는다. 임박 행사 교차검증은 `check-festival-dates` 스킬로 따로 돌리고, 신규 후보는 지역별로 나눈다. 병렬로 나눌 때는 **검색·확인까지만** 시키고 Edit는 메인에서 취합한다(동시 Edit 충돌과 사용량 한도 방지).

4. **(선택) 브라우저 보완**: API에 없는 행사를 kfes·경기관광포털 목록에서 찾고 싶으면 **메인 세션**이 Claude in Chrome으로 한다. `festival-updater`에는 브라우저 도구가 없다.

5. **꼬마 예약 달력(kid-reservation)에 같이 넣기 (메인에서 직접, 2026-10-07 사용자 지시)**
   에이전트 보고의 "사전 예약 필요" 표에서 **신청 기간이 아직 안 끝난 것**을 `C:/blog_writing/kid-reservation/assets/data/programs.js`에 추가한다. 이미 같은 행사·프로그램이 있으면 고치기만 한다(`id`로 Grep).
   - 위치: `// ── 축제·행사 사전 신청 (한 번만 열리는 곳) ──` 절. 없으면 "사설(민간) 인기 예약" 절 바로 앞에 만든다.
   - 형식: 일회성이라 `open: { rule: 'fixed', note: '<축제명> <행사일> 프로그램, 신청 기간 <시작>~<마감>' }`, `overrides: [{ date: '<신청 시작일>', time: '<HH:MM>', note: '<축제명>' }]`. 시작 시각을 모르면 `rule: 'always'` + `note`로 두고 지어내지 않는다.
   - `id`는 `fest-<영문슬러그>-<연도>`(예: `fest-seonyudo-birdwalk-2026`). `category`는 테스트가 허용하는 값만 쓴다: 박물관·과학관 / 방송·직업체험 / 금융·경제교육 / 자연·생태 / 공연·문화 / 놀이·키즈카페 / 안전체험.
   - `age`에는 공고의 나이 조건을 그대로 쓰고, 미취학이 못 가면 "미취학은 참여 못 해요"를 붙인다. `tip`에는 행사 날짜, 회차, 인원, 선정 안내 방법을 쓴다. `bookingUrl`은 신청서 직접 링크, `source`는 확인한 공고 URL, `verifiedAt`은 오늘 날짜.
   - 신청 기간이 이미 끝난 것은 넣지 않는다. 지난 일회성 항목 정리(삭제)는 보고 후 사용자 확인을 받고 한다.
   - 검증과 배포는 kid-reservation 저장소 안에서 한다: `node --test tests/*.test.js` 통과 → `sw.js`의 `CACHE` 숫자 올리기 → kid-reservation 저장소에서 따로 커밋.

6. **검증**
   ```bash
   node -e "global.window={}; require('C:/blog_writing/kid-festival/assets/data/festivals.js'); console.log(window.KID_FESTIVALS.length)"
   node .claude/skills/update-festivals/scripts/audit-dates.js | head -5   # 요일 불일치 0건 확인
   ```
   렌더링 파일을 건드렸다면 `node --check assets/js/pages/kid-festival.js`와 `sw.js`의 `CACHE` 버전 올리기.

7. **보고** (표):
   - ✅ 일정·**장소**가 갱신된 기존 행사 (전 → 후 · 근거)
   - 🔧 임박 행사 교차검증에서 표준데이터와 다르게 확정된 항목 (표준값 → 실제값 · 회차 · URL)
   - 🆕 추가된 신규 행사 (제목 · 지역 · 기간 · 요금 · 출처 URL)
   - 📅 사전 예약이 필요한 행사와 꼬마 예약 달력 반영 여부 (행사 · 프로그램 · 신청 시작 일시 · 추가/수정/제외 사유)
   - ⚠️ 확인 필요/불확실 (일정 미발표, 출처 불명확)

## 주의

- 행사 **삭제·대폭 변경은 사용자 확인 후**. 형식·스타일 유지, 대량 재정렬 금지.
- 에이전트가 사용량 한도 등으로 중간에 멈추면 `git diff`로 반쯤 들어간 수정이 없는지 먼저 확인한다.
