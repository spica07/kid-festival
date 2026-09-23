#!/usr/bin/env node
/*
 * update-festivals 스킬 1차 조사(발견·열거) 스크립트.
 *
 * 공공데이터 3종을 매번 새로 받아, 지정 기간과 겹치는 서울·경기·인천 행사 중
 * festivals.js에 아직 없는 후보만 걸러 표준출력에 나열한다.
 *   - 전국문화축제표준데이터 (data.go.kr 15013104, 인증키 없이 전량)
 *   - 한국관광공사 TourAPI `searchFestival2` (서울 11·경기 41·인천 28)
 *   - 서울 열린데이터광장 `culturalEventInfo` (이용대상에 어린이·가족 포함분만)
 *
 * 이 스크립트는 "후보 열거"만 한다 — 각 후보의 정확한 일정·요금·연령은
 * 반드시 공식 페이지(WebFetch)로 재검증한 뒤 festivals.js에 추가할 것.
 * 표준데이터는 분기 스냅숏이라 작년 회차 날짜가 남아 있을 수 있다. 출력의
 * `기준일`(REFERENCE_DATE)이 오래됐으면 특히 의심한다.
 *
 * 사용법:
 *   node .claude/skills/update-festivals/scripts/fetch-candidates.js
 *   node .claude/skills/update-festivals/scripts/fetch-candidates.js --start 20260901 --end 20261231
 *   (기본 기간: 오늘이 속한 달 1일 ~ 3개월 뒤 말일 = "현재 월 + 다음 3개월")
 *
 * 필요한 키 (프로젝트 루트 kid-festival/.env, 이미 들어있음 — 새로 발급받지 말 것):
 *   SEOUL_API_KEY           서울 열린데이터광장 인증키 (culturalEventInfo)
 *   DATA_GO_KR_SERVICE_KEY  공공데이터포털 서비스키 (TourAPI)
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
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';
const REGIONS = ['서울', '경기', '인천'];

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

// toISOString()은 UTC라 한국 시간에서 하루 밀린다 — 로컬 날짜로 조립한다.
function ymdCompact(d) {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}
function toDate(s) {
  const m = String(s).match(/(\d{4})\D?(\d{2})\D?(\d{2})/);
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
}
function overlaps(start, end, s, e) {
  const a = toDate(start);
  const b = toDate(end) || a;
  return a && b && a <= e && b >= s;
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
    .replace(/^\d{4}\s*(년\s*)?/, '')
    .replace(/제\d+회\s*/, '')
    .replace(/[\s·\-()'"'’“”「」《》〈〉!]/g, '')
    .toLowerCase();
}

// 인증키 없이 브라우저 CSV 다운로드가 쓰는 JSON 2종을 그대로 부른다.
// 함정: colNmList는 tableVO.colNmList(16개)만 넘길 것 — 최상위 columList(18개)를
// 넘기면 HTTP 200 + 빈 본문이 온다. totalCount는 응답 최상위에 있고, page는 1부터.
async function fetchStandardData(s, e) {
  const ref = 'https://www.data.go.kr/data/15013104/standard.do';
  const r0 = await fetch(ref, { headers: { 'User-Agent': UA } });
  const cookie = r0.headers.getSetCookie().map((c) => c.split(';')[0]).join('; ');
  const h = { 'User-Agent': UA, Cookie: cookie, 'X-Requested-With': 'XMLHttpRequest', Referer: ref };
  const meta = await (await fetch('https://www.data.go.kr/download/columList.json?pk=15013104&ext=csv', { headers: h })).json();
  const q = new URLSearchParams({
    publicDataPk: '15013104',
    svcTableNm: meta.tableVO.svcTableNm,
    totalCount: String(meta.totalCount),
    perPage: '10000',
    page: '1',
  });
  for (const c of meta.tableVO.colNmList) q.append('colNmList', c);
  const rows = await (await fetch(`https://www.data.go.kr/download/standard.json?${q}`, { headers: h })).json();
  console.error(`표준데이터 ${rows.length}행 수신 (전체 ${meta.totalCount})`);
  return rows
    .filter((r) => REGIONS.some((g) => (r.INSTT_NM || r.RDNMADR || r.LNMADR || '').startsWith(g)))
    .filter((r) => overlaps(r.FSTVL_START_DATE, r.FSTVL_END_DATE, s, e))
    .map((r) => ({
      source: '표준데이터',
      title: r.FSTVL_NM,
      start: r.FSTVL_START_DATE,
      end: r.FSTVL_END_DATE,
      addr: `${r.INSTT_NM || ''} ${r.OPAR || ''}`.trim(),
      link: r.HOMEPAGE_URL || '',
      extra: `기준일:${r.REFERENCE_DATE || '?'}`,
    }));
}

async function fetchTourApi(serviceKey, regionCode, regionName, s, e, startCompact) {
  const key = serviceKey.includes('%') ? serviceKey : encodeURIComponent(serviceKey);
  const items = [];
  for (let page = 1; ; page++) {
    const url =
      `http://apis.data.go.kr/B551011/KorService2/searchFestival2` +
      `?serviceKey=${key}&numOfRows=300&pageNo=${page}&MobileOS=ETC&MobileApp=kidfest` +
      `&_type=json&eventStartDate=${startCompact}&lDongRegnCd=${regionCode}`;
    const body = (await (await fetch(url)).json()).response?.body;
    const got = body?.items?.item || [];
    items.push(...got);
    if (!got.length || items.length >= (body.totalCount || 0)) break;
  }
  return items
    .filter((it) => overlaps(it.eventstartdate, it.eventenddate, s, e))
    .map((it) => ({
      source: `TourAPI(${regionName})`,
      title: it.title,
      start: it.eventstartdate,
      end: it.eventenddate,
      addr: it.addr1,
      link: `https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=${it.contentid}`,
    }));
}

async function fetchSeoulCultural(key, s, e) {
  const kidWords = ['어린이', '유아', '아동', '미취학', '가족'];
  const first = await (await fetch(`http://openapi.seoul.go.kr:8088/${key}/json/culturalEventInfo/1/1/`)).json();
  const total = first.culturalEventInfo?.list_total_count || 0;
  const pageSize = 1000;
  const results = [];
  for (let start = 1; start <= total; start += pageSize) {
    const end = Math.min(start + pageSize - 1, total);
    const json = await (await fetch(`http://openapi.seoul.go.kr:8088/${key}/json/culturalEventInfo/${start}/${end}/`)).json();
    for (const r of json.culturalEventInfo?.row || []) {
      if (!overlaps(r.STRTDATE, r.END_DATE, s, e)) continue;
      const target = r.USE_TRGT || '';
      if (!kidWords.some((w) => target.includes(w))) continue;
      results.push({
        source: '서울문화포털',
        title: r.TITLE,
        start: r.DATE ? r.DATE.split('~')[0] : '',
        end: r.DATE ? r.DATE.split('~')[1] : '',
        addr: r.GUNAME,
        link: r.ORG_LINK || r.HMPG_ADDR || '',
        extra: [`대상:${target}`, r.IS_FREE].filter(Boolean).join(' | '),
      });
    }
  }
  return results;
}

async function main() {
  const env = loadEnv();
  const opts = parseArgs();
  const s = toDate(opts.start);
  const e = toDate(opts.end);
  console.error(`대상 기간: ${opts.start} ~ ${opts.end}`);
  if (!env.DATA_GO_KR_SERVICE_KEY) console.error('⚠️ DATA_GO_KR_SERVICE_KEY 없음 — TourAPI 건너뜀 (.env 확인)');
  if (!env.SEOUL_API_KEY) console.error('⚠️ SEOUL_API_KEY 없음 — 서울문화포털 건너뜀 (.env 확인)');

  const existing = loadExistingTitles().map(normTitle);
  const isNew = (title) => {
    const n = normTitle(title);
    return !existing.some((x) => x.includes(n) || n.includes(x));
  };

  // 소스 하나가 실패해도 나머지는 계속 받는다.
  const jobs = [['표준데이터', () => fetchStandardData(s, e)]];
  if (env.DATA_GO_KR_SERVICE_KEY) {
    for (const [code, name] of [['11', '서울'], ['41', '경기'], ['28', '인천']]) {
      jobs.push([`TourAPI(${name})`, () => fetchTourApi(env.DATA_GO_KR_SERVICE_KEY, code, name, s, e, opts.start)]);
    }
  }
  if (env.SEOUL_API_KEY) jobs.push(['서울문화포털', () => fetchSeoulCultural(env.SEOUL_API_KEY, s, e)]);

  let all = [];
  for (const [name, job] of jobs) {
    try {
      const got = await job();
      console.error(`${name}: 기간 내 ${got.length}건`);
      all = all.concat(got);
    } catch (err) {
      console.error(`⚠️ ${name} 실패: ${err.message}`);
    }
  }

  const fresh = all.filter((c) => isNew(c.title));
  console.error(`전체 후보 ${all.length}건 중 festivals.js 미등록 ${fresh.length}건\n`);

  for (const c of fresh) {
    console.log(`[${c.source}] ${c.title} | ${c.start}~${c.end} | ${c.addr}${c.extra ? ' | ' + c.extra : ''} | ${c.link}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
