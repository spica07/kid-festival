// 칠교 새 도안 검증: 조각 겹침(면적), 총면적 576, ASCII 실루엣 미리보기
const S2 = Math.SQRT2;

const BASE_DIRS = {
  0: [[12 * S2, 0], [0, 12 * S2]],
  1: [[12, 0], [0, 12]],
  2: [[6 * S2, 0], [0, 6 * S2]],
  3: [[6 * S2, 0], [6 * S2, 6 * S2], [0, 6 * S2]],
  4: [[12, 0], [18, 6], [6, 6]],
  5: [[12, 0], [18, -6], [6, -6]]
};

function rot(v, o) {
  const a = o * 45 * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c];
}
function rawVerts(type, ax, ay, o) {
  const pts = [[ax, ay]];
  BASE_DIRS[type].forEach(d => { const r = rot(d, o); pts.push([ax + r[0], ay + r[1]]); });
  return pts;
}
function aq(i, s2) { return i + s2 * S2; }

// ----- 기존 도안(검산용) + 새 도안 -----
const SHAPES = [
  { name: '정사각형(기존검산)', pieces: [
    ['large1', 0, 12, 0, 12, 0, 1], ['large2', 0, 12, 0, 12, 0, 7],
    ['medium', 1, 0, 0, 0, 0, 0], ['small1', 2, 6, 0, 18, 0, 3],
    ['small2', 2, 12, 0, 12, 0, 5], ['square', 3, 0, 0, 12, 0, 7],
    ['para', 5, 24, 0, 0, 0, 4]
  ]},
  { name: '집', pieces: [
    ['large1', 0, 0, 0, 0, 0, 0], ['large2', 0, 0, 12, 0, 12, 4],
    ['medium', 1, 0, 6, 0, -12, 1], ['small1', 2, 0, 0, 0, 0, 4],
    ['small2', 2, 0, 6, 0, 0, 6], ['square', 3, 0, 0, 0, -6, 0],
    ['para', 5, 0, 18, 0, 0, 5]
  ]},
  { name: '나무', pieces: [
    ['large1', 0, 0, 0, 0, 0, 0], ['large2', 0, 0, 12, 0, 12, 4],
    ['medium', 1, 0, 6, 0, -6, 1], ['small1', 2, 0, 0, 0, 0, 2],
    ['small2', 2, 0, 12, 0, 0, 0], ['square', 3, 0, 3, 0, 12, 0],
    ['para', 4, 0, 0, 0, 18, 0]
  ]},
  { name: '물고기', pieces: [
    ['large1', 0, 0, 0, 0, 0, 0], ['large2', 0, 0, 12, 0, 12, 4],
    ['medium', 1, 0, 18, 0, 6, 3], ['small1', 2, 0, 3, 0, 0, 6],
    ['small2', 2, 0, 3, 0, 12, 0], ['square', 3, 0, -6, 0, 3, 0],
    ['para', 4, 0, -6, 0, 3, 2]
  ]},
  { name: '돛단배', pieces: [
    ['large1', 0, 0, 0, 0, 0, 2], ['large2', 0, 0, 0, 0, 0, 0],
    ['medium', 1, 0, -12, 0, 0, 6], ['small1', 2, 18, -12, -6, 0, 1],
    ['small2', 2, 12, -12, -12, 0, 3], ['square', 3, 12, -12, 0, 0, 5],
    ['para', 5, 0, -12, -24, 0, 2]
  ]},
  { name: '로켓', pieces: [
    ['large1', 0, 0, 0, 0, 0, 0], ['large2', 0, 0, 12, 0, 12, 4],
    ['medium', 1, 0, 6, 0, -6, 1], ['small1', 2, 0, 0, 0, 12, 4],
    ['small2', 2, 0, 12, 0, 12, 6], ['square', 3, 0, 3, 0, 12, 0],
    ['para', 4, 0, 3, 0, 18, 0]
  ]},
  { name: '토끼', pieces: [
    ['large1', 0, 0, 0, 0, 0, 0], ['large2', 0, 0, 12, 0, 12, 4],
    ['medium', 1, 0, 12, 0, 0, 6], ['small1', 2, 6, 0, 6, 12, 5],
    ['small2', 2, 0, 12, 0, 6, 0], ['square', 3, 0, 6, 0, -6, 0],
    ['para', 4, 0, 6, 0, 0, 5]
  ]},
  { name: '달팽이', pieces: [
    ['large1', 0, 0, 0, 0, -12, 0], ['large2', 0, 0, 12, 0, 0, 4],
    ['medium', 1, 0, 6, 0, -18, 1], ['small1', 2, 12, 0, 6, 0, 5],
    ['small2', 2, -6, 0, 0, 0, 3], ['square', 3, -6, 0, 0, 0, 1],
    ['para', 4, -6, 0, 0, 0, 0]
  ]},
  { name: '왕관', pieces: [
    ['large1', 0, 12, 0, 0, 0, 1], ['large2', 0, 36, 0, 0, 0, 1],
    ['medium', 1, 0, 0, 12, 0, 0], ['small1', 2, 24, 0, 12, 0, 5],
    ['small2', 2, 12, 6, 12, 0, 2], ['square', 3, 12, 6, 12, 0, 0],
    ['para', 4, 12, 12, 12, 0, 0]
  ]},
  { name: '닭', pieces: [
    ['large1', 0, 0, 0, 12, 0, 5], ['large2', 0, 6, 6, 6, 6, 4],
    ['medium', 1, -12, 0, 12, 0, 6], ['small1', 2, 0, 0, -6, -6, 1],
    ['small2', 2, -6, 0, 18, 0, 5], ['square', 3, 0, -3, 0, -6, 0],
    ['para', 4, 0, 0, -6, -6, 0]
  ]},
  { name: '오리', pieces: [
    ['large1', 0, 0, 0, 0, 0, 0], ['large2', 0, 0, 12, 0, 12, 4],
    ['medium', 1, 0, 12, 0, 12, 6], ['small1', 2, 0, 0, 0, 0, 4],
    ['small2', 2, 0, 3, -6, -6, 1], ['square', 3, 0, 0, 0, -6, 0],
    ['para', 4, 0, 0, 0, 12, 0]
  ]},
  { name: '사람', pieces: [
    ['large1', 0, 0, 0, 0, 12, 6], ['large2', 0, 0, 0, 0, 12, 4],
    ['medium', 1, -15, 0, 3, 0, 0], ['small1', 2, 0, -9, 0, 12, 0],
    ['small2', 2, 0, 3, 0, 12, 0], ['square', 3, 0, 0, -12, 0, 1],
    ['para', 5, 0, 3, 0, 3, 1]
  ]},
  { name: '연필', pieces: [
    ['large1', 0, 0, 0, 0, 0, 0], ['large2', 0, 0, 12, 0, 12, 4],
    ['medium', 1, 0, 18, 0, 6, 3], ['small1', 2, 0, -6, 0, 6, 0],
    ['small2', 2, 0, 0, 0, 12, 4], ['square', 3, 0, -6, 0, 0, 0],
    ['para', 4, 0, -12, 0, 0, 1]
  ]},
  { name: '번개', pieces: [
    ['large1', 0, 0, 0, 0, 0, 0], ['large2', 0, 0, 0, 0, 12, 4],
    ['medium', 1, 0, -12, 0, 12, 0], ['small1', 2, 0, 6, 0, -6, 0],
    ['small2', 2, 0, 12, 0, 0, 4], ['square', 3, 0, 0, 0, -6, 0],
    ['para', 4, 0, -12, 0, 12, 2]
  ]},
  { name: '캥거루', pieces: [
    ['large1', 0, 24, 0, 0, 0, 3], ['large2', 0, 0, 0, 0, 0, 7],
    ['medium', 1, 0, 0, -12, 0, 0], ['small1', 2, 0, 0, 0, 0, 1],
    ['small2', 2, 6, 0, 6, 0, 1], ['square', 3, 12, 0, -12, 0, 7],
    ['para', 5, 24, 0, 0, 0, 3]
  ]},
  { name: '다람쥐', pieces: [
    ['large1', 0, 12, 0, 0, 0, 1], ['large2', 0, 12, 0, 24, 0, 5],
    ['medium', 1, 0, 0, 24, 0, 6], ['small1', 2, 0, 0, 0, 0, 3],
    ['small2', 2, 12, 0, 24, 0, 7], ['square', 3, 0, 0, 0, 0, 1],
    ['para', 5, 12, 0, 0, 0, 1]
  ]},
  { name: '주전자', pieces: [
    ['large1', 0, 0, 0, 0, 0, 0], ['large2', 0, 0, 12, 0, 12, 4],
    ['medium', 1, 0, -6, 0, 6, 7], ['small1', 2, 0, 0, 0, 0, 6],
    ['small2', 2, 0, 12, 0, 6, 0], ['square', 3, 0, 6, 0, -6, 0],
    ['para', 4, 0, 0, 0, 12, 0]
  ]},
  { name: '황소', pieces: [
    ['large1', 0, 0, 0, 0, 0, 6], ['large2', 0, 0, 0, 0, 0, 4],
    ['medium', 1, 0, -6, 0, 6, 5], ['small1', 2, 0, 12, 0, 0, 2],
    ['small2', 2, 0, 6, 0, 0, 2], ['square', 3, 0, 12, -12, 0, 1],
    ['para', 5, 0, -12, 0, 0, 7]
  ]},
  { name: '거북이', pieces: [
    ['large1', 0, 18, 0, 0, 0, 1], ['large2', 0, 18, 0, 24, 0, 5],
    ['medium', 1, 6, 0, 0, 0, 0], ['small1', 2, 12, 0, 18, 0, 3],
    ['small2', 2, 0, 0, 6, 0, 7], ['square', 3, 30, 0, 0, 0, 1],
    ['para', 4, 30, 0, 12, 0, 2]
  ]},
  { name: '고래', pieces: [
    ['large1', 0, 12, 0, 0, 0, 1], ['large2', 0, 36, 0, 12, 0, 5],
    ['medium', 1, 24, 0, 12, 0, 6], ['small1', 2, 18, 0, 6, 0, 5],
    ['small2', 2, 18, 0, 6, 0, 7], ['square', 3, 0, 0, 0, 0, 1],
    ['para', 5, 42, 0, 6, 0, 0]
  ]},
  { name: '강아지', pieces: [
    ['large1', 0, 12, 0, 0, 0, 1], ['large2', 0, 12, 0, 24, 0, 5],
    ['medium', 1, 0, 0, 24, 0, 6], ['small1', 2, 18, 0, -6, 0, 7],
    ['small2', 2, -6, 0, 18, 0, 7], ['square', 3, 18, 0, -6, 0, 1],
    ['para', 4, 24, 0, 12, 0, 2]
  ]},
  { name: '촛불', pieces: [
    ['large1', 0, 12, -6, 12, 0, 0], ['large2', 0, 12, 6, 12, 12, 4],
    ['medium', 1, 12, 0, 12, 18, 5], ['small1', 2, 12, -6, 12, 0, 2],
    ['small2', 2, 12, -6, 12, 6, 2], ['square', 3, 12, 0, 0, 0, 1],
    ['para', 4, 12, 6, 12, 12, 6]
  ]},
  { name: '비행기', pieces: [
    ['large1', 0, 12, 0, 0, 0, 1], ['large2', 0, 24, 0, 12, 0, 5],
    ['medium', 1, 36, 0, 12, 0, 4], ['small1', 2, 30, 0, -6, 0, 1],
    ['small2', 2, 18, 0, 18, 0, 5], ['square', 3, 0, 0, 0, 0, 1],
    ['para', 4, 6, 0, -6, 0, 0]
  ]},
  { name: '여우', pieces: [
    ['large1', 0, 12, 0, 12, 0, 1], ['large2', 0, 24, 0, 24, 0, 5],
    ['medium', 1, 0, 0, 24, 0, 0], ['small1', 2, 6, 0, 6, 0, 3],
    ['small2', 2, 6, 0, 6, 0, 7], ['square', 3, 6, 0, 6, 0, 1],
    ['para', 4, 12, 0, 24, 0, 0]
  ]},
  { name: '낙타', pieces: [
    ['large1', 0, 18, 0, 0, 0, 1], ['large2', 0, 18, 0, 24, 0, 5],
    ['medium', 1, 6, 0, 0, 0, 0], ['small1', 2, 12, 0, -6, 0, 1],
    ['small2', 2, 36, 0, 6, 0, 5], ['square', 3, 30, 0, 0, 0, 1],
    ['para', 4, 30, 0, 12, 0, 2]
  ]},
  { name: '말', pieces: [
    ['large1', 0, 12, 0, 0, 0, 1], ['large2', 0, 24, 0, 12, 0, 5],
    ['medium', 1, 0, 0, 12, 0, 0], ['small1', 2, 6, 0, -6, 0, 1],
    ['small2', 2, 18, 0, 18, 0, 5], ['square', 3, 30, 0, 6, 0, 1],
    ['para', 4, 24, 0, 0, 0, 4]
  ]}
];

// ----- 기하 도구 -----
function shoelace(p) {
  let s = 0;
  for (let i = 0; i < p.length; i++) {
    const a = p[i], b = p[(i + 1) % p.length];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return s / 2;
}
function ccw(p) { return shoelace(p) > 0 ? p : p.slice().reverse(); }

// 볼록 다각형 교차(Sutherland–Hodgman)
function clip(subject, clipPoly) {
  let out = subject.slice();
  const cp = ccw(clipPoly);
  for (let i = 0; i < cp.length && out.length; i++) {
    const A = cp[i], B = cp[(i + 1) % cp.length];
    const input = out; out = [];
    const side = q => (B[0] - A[0]) * (q[1] - A[1]) - (B[1] - A[1]) * (q[0] - A[0]);
    for (let j = 0; j < input.length; j++) {
      const P = input[j], Q = input[(j + 1) % input.length];
      const sp = side(P), sq = side(Q);
      if (sp >= -1e-9) out.push(P);
      if ((sp > 1e-9 && sq < -1e-9) || (sp < -1e-9 && sq > 1e-9)) {
        const t = sp / (sp - sq);
        out.push([P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]);
      }
    }
  }
  return out;
}
function inPoly(pt, poly) {
  const p = ccw(poly);
  for (let i = 0; i < p.length; i++) {
    const A = p[i], B = p[(i + 1) % p.length];
    if ((B[0] - A[0]) * (pt[1] - A[1]) - (B[1] - A[1]) * (pt[0] - A[0]) < 0) return false;
  }
  return true;
}

const CHARS = { large1: 'A', large2: 'B', medium: 'M', small1: 's', small2: 't', square: 'Q', para: 'P' };

let fail = 0;
for (const shape of SHAPES) {
  const polys = shape.pieces.map(p => ({
    id: p[0],
    pts: rawVerts(p[1], aq(p[2], p[3]), aq(p[4], p[5]), p[6])
  }));
  // 1) 면적 합
  const total = polys.reduce((s, p) => s + Math.abs(shoelace(p.pts)), 0);
  // 2) 쌍별 겹침
  const overlaps = [];
  for (let i = 0; i < polys.length; i++) for (let j = i + 1; j < polys.length; j++) {
    const inter = clip(ccw(polys[i].pts), polys[j].pts);
    const a = inter.length >= 3 ? Math.abs(shoelace(inter)) : 0;
    if (a > 1e-6) overlaps.push(`${polys[i].id}×${polys[j].id}=${a.toFixed(3)}`);
  }
  const okArea = Math.abs(total - 576) < 1e-6;
  const ok = okArea && overlaps.length === 0;
  if (!ok) fail++;
  console.log(`\n=== ${shape.name} — 면적 ${total.toFixed(4)}/576 ${okArea ? 'OK' : 'FAIL'}, 겹침 ${overlaps.length ? 'FAIL: ' + overlaps.join(', ') : '없음 OK'}`);

  // 3) ASCII 미리보기
  let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
  polys.forEach(p => p.pts.forEach(q => {
    minX = Math.min(minX, q[0]); maxX = Math.max(maxX, q[0]);
    minY = Math.min(minY, q[1]); maxY = Math.max(maxY, q[1]);
  }));
  const xs = 0.7, ys = 1.4;
  for (let y = minY + ys / 2; y < maxY; y += ys) {
    let row = '';
    for (let x = minX + xs / 2; x < maxX; x += xs) {
      let c = '.';
      for (const p of polys) if (inPoly([x, y], p.pts)) { c = c === '.' ? CHARS[p.id] : 'X'; }
      row += c;
    }
    console.log(row);
  }
}
console.log(fail ? `\n${fail}개 도안 FAIL` : '\n모든 도안 통과');
