// story-reader.js 의 ENGLISH_STORIES[<slug>-story.html] 를 JSON으로 출력
// usage: node extract_en.js <slug>
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(REPO, 'assets/js/pages/story-reader.js'), 'utf8');

// 문자열("...")을 인식하며 중괄호 매칭으로 ENGLISH_STORIES 객체 본문만 잘라낸다
const i = src.indexOf('ENGLISH_STORIES');
const b = src.indexOf('{', i);
let depth = 0, end = -1, inStr = false, esc = false;
for (let j = b; j < src.length; j++) {
  const c = src[j];
  if (inStr) {
    if (esc) esc = false;
    else if (c === '\\') esc = true;
    else if (c === '"') inStr = false;
    continue;
  }
  if (c === '"') inStr = true;
  else if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { end = j; break; } }
}
const objText = src.slice(b, end + 1);
// eval 대신 Function 생성자 사용 — 이 스코프의 지역 변수에 접근하지 못하고 전역 스코프에서만 실행된다.
const obj = Function('"use strict"; return (' + objText + ');')();

const slug = process.argv[2];
const key = slug + '-story.html';
if (!obj[key]) { process.stderr.write('NO_EN_ENTRY\n'); process.exit(3); }
process.stdout.write(JSON.stringify(obj[key]));
