#!/usr/bin/env node
/*
 * festivals.js 날짜 점검 스크립트 (update-festivals / check-festival-dates 공용).
 *
 * 1) 요일 불일치: startDate/endDate의 '(요일)' 표기가 실제 달력과 다른 항목.
 *    여기 걸리는 항목은 100% 어딘가 틀렸다(날짜 오타·요일 오타·원출처 모순).
 * 2) 임박 행사: 오늘부터 N일(기본 30) 안에 열리는(또는 진행 중인) 기간·당일 행사.
 *    표준데이터만으로 확정하지 말고 언론·공식 공지로 교차검증할 대상이다.
 *    원문에 needsRecheck:true를 직접 적은 항목에는 표시(★)를 달아 먼저 보게 한다
 *    (후처리 코드가 자동으로 채운 needsRecheck는 세지 않는다).
 *
 * 사용법:
 *   node .claude/skills/update-festivals/scripts/audit-dates.js
 *   node .claude/skills/update-festivals/scripts/audit-dates.js --days 14
 *   node .claude/skills/update-festivals/scripts/audit-dates.js --json   (에이전트에 넘길 목록)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..', '..', '..'); // kid-festival/
const FESTIVALS_PATH = path.join(ROOT, 'assets', 'data', 'festivals.js');
const WD = ['일', '월', '화', '수', '목', '금', '토'];

const args = process.argv.slice(2);
const days = args.includes('--days') ? +args[args.indexOf('--days') + 1] : 30;
const asJson = args.includes('--json');

const sandbox = { window: {} };
vm.createContext(sandbox);
const SRC = fs.readFileSync(FESTIVALS_PATH, 'utf8');
vm.runInContext(SRC, sandbox);
const F = sandbox.window.KID_FESTIVALS;

// festivals.js 끝의 후처리 코드는 hours·fee·parking 등이 비면 needsRecheck를 자동으로 true로 채운다
// (데이터 절반 이상). 날짜 의심 신호는 사람이 원문에 직접 적은 "needsRecheck":true 뿐이라 그것만 센다.
const explicitRecheck = new Set(
  SRC.split(/\r?\n/)
    .filter((l) => /"needsRecheck"\s*:\s*true|needsRecheck\s*:\s*true/.test(l))
    .map((l) => (l.match(/title\s*:\s*'([^']+)'/) || [])[1])
    .filter(Boolean)
);

function parse(s) {
  const m = String(s || '').match(/(\d{4})\.(\d{2})\.(\d{2})(?:\s*\((.)\))?/);
  if (!m) return null;
  return { date: new Date(+m[1], +m[2] - 1, +m[3]), wd: m[4], ok: +m[3] === new Date(+m[1], +m[2] - 1, +m[3]).getDate() };
}
const fmt = (d) => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

const mismatches = [];
for (const f of F) {
  for (const key of ['startDate', 'endDate']) {
    const p = parse(f[key]);
    if (!p) continue;
    if (!p.ok) mismatches.push({ title: f.title, key, value: f[key], actual: '없는 날짜' });
    else if (p.wd && WD[p.date.getDay()] !== p.wd) mismatches.push({ title: f.title, key, value: f[key], actual: WD[p.date.getDay()] });
  }
}

const today = new Date();
today.setHours(0, 0, 0, 0);
const limit = new Date(today);
limit.setDate(limit.getDate() + days);

const imminent = [];
for (const f of F) {
  const s = parse(f.startDate);
  if (!s) continue; // 연중 상시 등
  const single = /당일|출발|집결|행사/.test(f.endDate || '');
  const e = single ? s : parse(f.endDate) || s;
  const span = (e.date - s.date) / 86400000;
  if (span >= 30) continue; // 장기 행사는 달력에서도 상시 취급
  if (s.date <= limit && e.date >= today) {
    imminent.push({
      title: f.title,
      region: f.regionName,
      start: f.startDate,
      end: f.endDate,
      location: f.location,
      needsRecheck: explicitRecheck.has(f.title),
      verifiedAt: (f.detail && f.detail.verifiedAt) || '',
    });
  }
}
imminent.sort((a, b) => parse(a.start).date - parse(b.start).date);

if (asJson) {
  console.log(JSON.stringify({ today: fmt(today), days, mismatches, imminent }, null, 1));
} else {
  console.log(`기준일 ${fmt(today)}, 전체 ${F.length}건\n`);
  console.log(`[요일 불일치] ${mismatches.length}건`);
  for (const m of mismatches) console.log(`  ${m.title} | ${m.key}=${m.value} | 실제 ${m.actual}`);
  console.log(`\n[임박 행사 ${days}일 이내] ${imminent.length}건 (★=needsRecheck)`);
  for (const i of imminent) {
    console.log(`  ${i.needsRecheck ? '★' : ' '} ${i.start} ~ ${i.end} | ${i.region} | ${i.title} | ${i.location || ''} | 확인일 ${i.verifiedAt || '-'}`);
  }
}
