#!/usr/bin/env node
/*
 * update-festivals 스킬 1차 조사(발견·열거) 스크립트.
 *
 * 한국관광공사 TourAPI `searchFestival2`(서울·경기·인천)와
 * 서울 열린데이터광장 `culturalEventInfo`를 호출해, 지정 기간과 겹치는
 * 행사 중 festivals.js에 아직 없는 후보만 걸러 표준출력에 나열한다.
 *
 * 이 스크립트는 "후보 열거"만 한다 — 각 후보의 정확한 일정·요금·연령은
 * 반드시 공식 페이지(WebFetch)로 재검증한 뒤 festivals.js에 추가할 것.
 * (전국문화축제표준데이터는 인증키 없이 받는 절차가 따로 있어 이 스크립트에
 * 포함하지 않았다 — SKILL.md의 curl 예시 참고.)
 *
 * 사용법:
 *   node .claude/skills/update-festivals/scripts/fetch-candidates.js
 *   node .claude/skills/update-festivals/scripts/fetch-candidates.js --start 20260901 --end 20261130
 *   (기본 기간: 오늘이 속한 달 1일 ~ 3개월 뒤 말일 = "현재 월 + 다음 3개월")
 *
 * 필요한 키 (프로젝트 루트 kid-festival/.env, 이미 들어있음 — 새로 발급받지 말 것):
 *   SEOUL_API_KEY           서울 열린데이터광장 인증키 (culturalEventInfo)
 *   DATA_GO_KR_SERVICE_KEY  공공데이터포털 서비스키 (TourAPI 겸용)
 *
 * ⚠️ 실제 작업 중 겪은 함정: 에이전트가 ".env를 확인하라"는 지시 없이
 * "인증키 필요 시 사용자에게 요청"만 받으면, 이미 있는 키를 안 찾아보고
 * "키 없음"으로 건너뛰어 버린다. 이 스크립트를 쓰면 그럴 일이 없다.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..', '..', '..'); // kid-festival/
const ENV_PATH = path.join(ROOT, '.env');
const FESTIVALS_PATH = path.join(ROOT, 'assets', 'data', 'festivals.js');

function loadEnv() {
  const env = {};
  if (fs.existsSync(ENV_PATH)) {
    for (const line of fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m) env[m[1]] = m[2].trim();
    }
  }
  return env;
}

function ymdCompact(d) {
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}
function toDate(compact) {
  return new Date(`${compact.slice(0, 4)}-${compact.slice(4, 6)}-${compact.slice(6, 8)}`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--start') opts.start = args[++i];
    if (args[i] === '--end') opts.end = args[++i];
  }
  const today = new Date();
  if (!opts.start) opts.start = ymdCompact(new Date(today.getFullYear(), today.getMonth(), 1));
  if (!opts.end) opts.end = ymdCompact(new Date(today.getFullYear(), today.getMonth() + 4, 0));
  return opts;
}

function loadExistingTitles() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(FESTIVALS_PATH, 'utf8'), sandbox);
  return sandbox.window.KID_FESTIVALS.map((f) => f.title);
}

function normTitle(t) {
  return t
    .replace(/^\[[^\]]*\]\s*/, '')
    .replace(/^\d{4}\s*/, '')
    .replace(/제\d+회\s*/, '')
    .replace(/[\s·\-()'"'’“”「」《》〈〉!]/g, '')
    .toLowerCase();
}

async function fetchTourApi(serviceKey, regionCode, regionName, startCompact, endCompact) {
  const url =
    `http://apis.data.go.kr/B551011/KorService2/searchFestival2` +
    `?serviceKey=${serviceKey}&numOfRows=300&pageNo=1&MobileOS=ETC&MobileApp=kidfest` +
    `&_type=json&eventStartDate=${startCompact}&lDongRegnCd=${regionCode}`;
  const json = await (await fetch(url)).json();
  const items = json.response?.body?.items?.item || [];
  const s = toDate(startCompact);
  const e = toDate(endCompact);
  return items
    .filter((it) => it.eventstartdate && it.eventenddate)
    .filter((it) => toDate(it.eventstartdate) <= e && toDate(it.eventenddate) >= s)
    .map((it) => ({
      source: `TourAPI(${regionName})`,
      title: it.title,
      start: it.eventstartdate,
      end: it.eventenddate,
      addr: it.addr1,
      link: `https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=${it.contentid}`,
    }));
}

async function fetchSeoulCultural(key, startCompact, endCompact) {
  const kidWords = ['어린이', '유아', '아동', '미취학', '가족'];
  const s = toDate(startCompact);
  const e = toDate(endCompact);
  const first = await (await fetch(`http://openapi.seoul.go.kr:8088/${key}/json/culturalEventInfo/1/1/`)).json();
  const total = first.culturalEventInfo?.list_total_count || 0;
  const pageSize = 1000;
  const results = [];
  for (let start = 1; start <= total; start += pageSize) {
    const end = Math.min(start + pageSize - 1, total);
    const json = await (await fetch(`http://openapi.seoul.go.kr:8088/${key}/json/culturalEventInfo/${start}/${end}/`)).json();
    const rows = json.culturalEventInfo?.row || [];
    for (const r of rows) {
      if (!r.STRTDATE || !r.END_DATE) continue;
      const rs = new Date(r.STRTDATE);
      const re = new Date(r.END_DATE);
      if (isNaN(rs) || isNaN(re) || rs > e || re < s) continue;
      const target = r.USE_TRGT || '';
      if (!kidWords.some((w) => target.includes(w))) continue;
      results.push({
        source: '서울문화포털',
        title: r.TITLE,
        start: r.DATE ? r.DATE.split('~')[0] : '',
        end: r.DATE ? r.DATE.split('~')[1] : '',
        addr: r.GUNAME,
        link: r.ORG_LINK || r.HMPG_ADDR || '',
        fee: r.IS_FREE,
        target,
      });
    }
  }
  return results;
}

async function main() {
  const env = loadEnv();
  const opts = parseArgs();
  console.error(`대상 기간: ${opts.start} ~ ${opts.end}`);
  if (!env.DATA_GO_KR_SERVICE_KEY) console.error('⚠️ DATA_GO_KR_SERVICE_KEY 없음 — TourAPI 건너뜀 (.env 확인)');
  if (!env.SEOUL_API_KEY) console.error('⚠️ SEOUL_API_KEY 없음 — 서울문화포털 건너뜀 (.env 확인)');

  const existing = loadExistingTitles().map(normTitle);
  const isNew = (title) => {
    const n = normTitle(title);
    return !existing.some((e) => e.includes(n) || n.includes(e));
  };

  let all = [];
  if (env.DATA_GO_KR_SERVICE_KEY) {
    for (const [code, name] of [['11', '서울'], ['41', '경기'], ['28', '인천']]) {
      all = all.concat(await fetchTourApi(env.DATA_GO_KR_SERVICE_KEY, code, name, opts.start, opts.end));
    }
  }
  if (env.SEOUL_API_KEY) {
    all = all.concat(await fetchSeoulCultural(env.SEOUL_API_KEY, opts.start, opts.end));
  }

  const fresh = all.filter((c) => isNew(c.title));
  console.error(`전체 후보 ${all.length}건 중 festivals.js 미등록 ${fresh.length}건\n`);

  for (const c of fresh) {
    const extra = [c.target ? `대상:${c.target}` : null, c.fee || null].filter(Boolean).join(' | ');
    console.log(`[${c.source}] ${c.title} | ${c.start}~${c.end} | ${c.addr}${extra ? ' | ' + extra : ''} | ${c.link}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
