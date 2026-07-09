/* 칠교놀이(탱그램) — 표준 7조각. 끌어서 옮기고(드래그), 톡 누르면 45° 회전,
   평행사변형은 두 번 톡 하면 뒤집힌다.
   조각 기하·모양 배치는 Wiebke/TangramGenerator의 검증된 좌표계(ℤ[√2], 전체 정사각형 변 24,
   orientation 0~7 = 45°)를 그대로 사용한다. 따라서 모든 모양은 7조각으로 정확히 맞춰진다.
   "정답 보기"를 누르면 조각이 정답 위치로 이동한다. */
(function () {
  'use strict';

  const SVGNS = 'http://www.w3.org/2000/svg';
  const svg = document.getElementById('tangramSvg');
  const targetLayer = document.getElementById('targetLayer');
  const pieceLayer = document.getElementById('pieceLayer');
  const shapeGroup = document.getElementById('shapeGroup');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const hintBtn = document.getElementById('hintBtn');
  const solveBtn = document.getElementById('solveBtn');
  const doneBtn = document.getElementById('doneBtn');
  const winBox = document.getElementById('tangramWin');
  const winNext = document.getElementById('winNext');

  const S2 = Math.SQRT2;
  const SCALE = 8.6;            // 단위 → 픽셀
  // 레이아웃에 따라 바뀌는 값(좁은 화면=위아래, 넓은 화면=좌우)
  let W = 640, H = 700, CX = 320, CY = 188, START = [];

  // orientation 0에서 anchor→다른 꼭짓점 방향벡터(단위). (directions.js와 동일)
  const BASE_DIRS = {
    0: [[12 * S2, 0], [0, 12 * S2]],            // 큰 삼각형(직각변 12√2, 빗변 24)
    1: [[12, 0], [0, 12]],                      // 중간 삼각형(직각변 12)
    2: [[6 * S2, 0], [0, 6 * S2]],              // 작은 삼각형(직각변 6√2)
    3: [[6 * S2, 0], [6 * S2, 6 * S2], [0, 6 * S2]], // 정사각형(변 6√2)
    4: [[12, 0], [18, 6], [6, 6]],              // 평행사변형
    5: [[12, 0], [18, -6], [6, -6]]             // 평행사변형(뒤집힘)
  };

  function rot(v, o) {
    const a = o * 45 * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    return [v[0] * c - v[1] * s, v[0] * s + v[1] * c];
  }
  // 조각 꼭짓점(단위). anchor + 회전된 방향벡터들. y는 화면(아래로 +)에 맞춰 뒤집는다.
  function rawVerts(type, ax, ay, o) {
    const pts = [[ax, ay]];
    BASE_DIRS[type].forEach(function (d) {
      const r = rot(d, o);
      pts.push([ax + r[0], ay + r[1]]);
    });
    return pts; // 원본 좌표계(화면 y-down)를 그대로 사용
  }
  function aq(i, s2) { return i + s2 * S2; }

  // ----- 검증된 모양 정답(피스별 anchor·orientation) -----
  // 각 항목: [pieceId, tanType, ax(int), ax√2, ay(int), ay√2, orientation]
  const SHAPES = [
    { name: '정사각형', pieces: [
      ['large1', 0, 12, 0, 12, 0, 1], ['large2', 0, 12, 0, 12, 0, 7],
      ['medium', 1, 0, 0, 0, 0, 0], ['small1', 2, 6, 0, 18, 0, 3],
      ['small2', 2, 12, 0, 12, 0, 5], ['square', 3, 0, 0, 12, 0, 7],
      ['para', 5, 24, 0, 0, 0, 4]
    ]},
    { name: '고양이', pieces: [
      ['large1', 0, 18, 12, 30, -6, 3], ['large2', 0, 18, 12, 30, 6, 4],
      ['medium', 1, 6, 6, 18, 0, 7], ['small1', 2, 6, 0, 6, 0, 3],
      ['small2', 2, 6, 0, 6, 0, 7], ['square', 3, 6, 0, 6, 0, 1],
      ['para', 4, 6, 0, 18, 0, 7]
    ]},
    { name: '백조', pieces: [
      ['large1', 0, -6, 12, 30, 6, 6], ['large2', 0, 6, 12, 42, -6, 5],
      ['medium', 1, -6, 6, 30, 0, 7], ['small1', 2, 0, 6, 0, 6, 4],
      ['small2', 2, 0, 6, 24, 0, 3], ['square', 3, 0, 6, 12, 0, 1],
      ['para', 5, 0, 6, 0, 0, 2]
    ]},
    { name: '산', pieces: [
      ['large1', 0, 0, 12, 12, 6, 4], ['large2', 0, 0, 24, 12, 6, 6],
      ['medium', 1, 0, 18, 12, 0, 7], ['small1', 2, 0, 12, 12, 6, 6],
      ['small2', 2, 0, 18, 12, 6, 6], ['square', 3, 0, 18, 0, 0, 1],
      ['para', 4, 0, 12, 12, -6, 1]
    ]},
    { name: '새', pieces: [
      ['large1', 0, 24, 0, 0, 0, 1], ['large2', 0, 36, 0, 12, 0, 5],
      ['medium', 1, 12, 18, 12, 6, 3], ['small1', 2, 6, 0, 6, 0, 1],
      ['small2', 2, 12, 6, 12, 0, 2], ['square', 3, 12, 6, 12, 0, 0],
      ['para', 4, 12, 12, 12, 0, 0]
    ]},
    { name: '화살표', pieces: [
      ['large1', 0, 0, 12, 0, 0, 0], ['large2', 0, 0, 12, 0, 24, 6],
      ['medium', 1, 0, 0, 0, 12, 7], ['small1', 2, 0, 12, 0, 18, 2],
      ['small2', 2, 0, 12, 0, 12, 4], ['square', 3, 0, 6, 0, 12, 0],
      ['para', 5, 0, 12, 0, 0, 3]
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
    ]},
    // O. Merkel Tangram의 MIT 공개 해법을 현재 정수+√2 좌표계로 정규화한 추가 도안.
    { name: '삼각형', pieces: [
      ['large1', 0, 0, 0, 0, 12, 6], ['large2', 0, 0, 0, 0, 12, 0],
      ['medium', 1, 0, 12, 0, 12, 5], ['small1', 2, 0, 12, 0, 0, 2],
      ['small2', 2, 0, 18, 0, 0, 0], ['square', 3, 0, 18, 0, 6, 4],
      ['para', 5, 0, 0, 0, 0, 1]
    ]},
    { name: '북극곰', pieces: [
      ['large1', 0, 12, 0, 0, 0, 0], ['large2', 0, 0, 0, 12, 0, 7],
      ['medium', 1, 12, 12, 12, 0, 4], ['small1', 2, 12, 18, -9, 12, 6],
      ['small2', 2, -27, 24, -15, 30, 6], ['square', 3, 12, 12, 0, 6, 6],
      ['para', 5, 12, 6, 12, 0, 1]
    ]},
    { name: '상어', pieces: [
      ['large1', 0, 12, 0, 6, 6, 1], ['large2', 0, 12, 12, 6, 6, 2],
      ['medium', 1, 12, 24, 12, 0, 6], ['small1', 2, -9, 30, 6, 6, 4],
      ['small2', 2, 18, 0, 24, 6, 5], ['square', 3, 12, 12, 6, 6, 0],
      ['para', 5, 12, 24, 27, -15, 3]
    ]},
    { name: '풍차', pieces: [
      ['large1', 0, 12, 6, 18, 12, 4], ['large2', 0, 12, -6, 18, 0, 0],
      ['medium', 1, 12, 0, 18, 0, 6], ['small1', 2, 0, 0, 6, 0, 7],
      ['small2', 2, 6, 0, 12, 0, 1], ['square', 3, 18, 0, 0, 0, 1],
      ['para', 5, 6, 0, 0, 0, 2]
    ]},
    { name: '하트', pieces: [
      ['large1', 0, 0, 0, 12, 0, 7], ['large2', 0, 24, 0, 0, 0, 1],
      ['medium', 1, 12, 0, 12, 0, 0], ['small1', 2, 24, 0, 24, 0, 5],
      ['small2', 2, 18, 0, 6, 0, 3], ['square', 3, 18, 0, 18, 0, 1],
      ['para', 5, 36, 0, 12, 0, 4]
    ]},
    { name: '나비', pieces: [
      ['large1', 0, 0, 24, 0, 12, 4], ['large2', 0, 0, 0, 0, 12, 6],
      ['medium', 1, 0, 6, 0, 18, 5], ['small1', 2, 0, 18, 0, 18, 2],
      ['small2', 2, 0, 18, 0, 12, 0], ['square', 3, 0, 12, 0, 12, 0],
      ['para', 5, 0, 12, 0, 12, 3]
    ]},
    { name: '돌고래', pieces: [
      ['large1', 0, 6, 12, 6, 12, 6], ['large2', 0, 6, 12, 6, 0, 2],
      ['medium', 1, 15, 15, 6, 12, 0], ['small1', 2, 12, 0, 12, 0, 1],
      ['small2', 2, 6, 0, 18, 0, 3], ['square', 3, 6, 0, 6, 0, 1],
      ['para', 5, 15, -3, 6, 0, 0]
    ]},
    { name: '열쇠', pieces: [
      ['large1', 0, 18, 6, 12, 0, 7], ['large2', 0, 42, 6, 12, 0, 3],
      ['medium', 1, 0, 6, 6, 0, 0], ['small1', 2, 0, 0, 6, 6, 0],
      ['small2', 2, 0, 6, 18, 0, 7], ['square', 3, 0, 0, 6, 6, 6],
      ['para', 5, 6, 6, 12, 0, 0]
    ]},
    { name: '컵', pieces: [
      ['large1', 0, 0, 6, 18, 0, 6], ['large2', 0, 0, 18, 18, -12, 2],
      ['medium', 1, 0, 6, 18, 6, 5], ['small1', 2, 0, 12, 18, 6, 4],
      ['small2', 2, 0, 18, 18, 0, 0], ['square', 3, 0, 12, 18, 6, 6],
      ['para', 5, -6, 6, 0, 0, 2]
    ]}
  ];
  let shapeIdx = 0;

  // 모양의 모든 조각 꼭짓점(px) + 중심 정렬 오프셋
  function shapeSolutionPx(shape) {
    const raw = {};
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    shape.pieces.forEach(function (p) {
      const v = rawVerts(p[1], aq(p[2], p[3]), aq(p[4], p[5]), p[6]);
      raw[p[0]] = v;
      v.forEach(function (q) {
        if (q[0] < minX) minX = q[0]; if (q[0] > maxX) maxX = q[0];
        if (q[1] < minY) minY = q[1]; if (q[1] > maxY) maxY = q[1];
      });
    });
    const ox = CX - (minX + maxX) / 2 * SCALE;
    const oy = CY - (minY + maxY) / 2 * SCALE;
    const out = {};
    Object.keys(raw).forEach(function (id) {
      out[id] = raw[id].map(function (q) { return [q[0] * SCALE + ox, q[1] * SCALE + oy]; });
    });
    return out;
  }

  // ----- 조각 기본 모양(흩어 놓기·드래그용, 같은 SCALE) -----
  const PIECE_TYPE = { large1: 0, large2: 0, medium: 1, small1: 2, small2: 2, square: 3, para: 4 };
  const COLORS = { large1: '#FF8E6E', large2: '#5FB0F2', medium: '#9B7ED8', small1: '#FFC94D', small2: '#56C596', square: '#FF8FB3', para: '#FFB066' };
  const ORDER = ['large1', 'large2', 'medium', 'small1', 'small2', 'square', 'para'];

  function basePx(type, o) {
    return rawVerts(type, 0, 0, o).map(function (q) { return [q[0] * SCALE, q[1] * SCALE]; });
  }

  let pieces = [];
  function makePieces() {
    pieceLayer.innerHTML = '';
    pieces = ORDER.map(function (id) {
      const poly = document.createElementNS(SVGNS, 'polygon');
      poly.setAttribute('class', 'tangram-piece');
      poly.setAttribute('fill', COLORS[id]);
      pieceLayer.appendChild(poly);
      const piece = { id: id, type: PIECE_TYPE[id], el: poly, cur: basePx(PIECE_TYPE[id], 0), locked: false };
      poly.addEventListener('pointerdown', function (e) { onDown(e, piece); });
      return piece;
    });
  }
  function pieceById(id) { for (let i = 0; i < pieces.length; i++) if (pieces[i].id === id) return pieces[i]; return null; }

  function draw(p) {
    p.el.setAttribute('points', p.cur.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '));
  }
  function drawAll() { pieces.forEach(draw); }

  function centroid(pts) { let sx = 0, sy = 0; pts.forEach(function (q) { sx += q[0]; sy += q[1]; }); return [sx / pts.length, sy / pts.length]; }
  function translate(p, dx, dy) { p.cur = p.cur.map(function (q) { return [q[0] + dx, q[1] + dy]; }); }
  function rotateCur(p, deg) {
    const c = centroid(p.cur), a = deg * Math.PI / 180, cs = Math.cos(a), sn = Math.sin(a);
    p.cur = p.cur.map(function (q) { const dx = q[0] - c[0], dy = q[1] - c[1]; return [c[0] + dx * cs - dy * sn, c[1] + dx * sn + dy * cs]; });
  }
  function flipCur(p) { const c = centroid(p.cur); p.cur = p.cur.map(function (q) { return [2 * c[0] - q[0], q[1]]; }); }

  function toSvg(e) {
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const m = svg.getScreenCTM(); if (!m) return { x: 0, y: 0 };
    const p = pt.matrixTransform(m.inverse()); return { x: p.x, y: p.y };
  }

  let active = null, lastX = 0, lastY = 0, downX = 0, downY = 0, moved = false, pendingTap = null, pendingTimer = null;
  function onDown(e, p) {
    if (p.locked) return; // 고정된 조각은 움직이지 않는다
    e.preventDefault(); active = p; pieceLayer.appendChild(p.el);
    const s = toSvg(e); lastX = s.x; lastY = s.y; downX = s.x; downY = s.y; moved = false;
    try { p.el.setPointerCapture(e.pointerId); } catch (err) {}
  }
  function onMove(e) {
    if (!active) return;
    const s = toSvg(e), dx = s.x - lastX, dy = s.y - lastY;
    // 누른 지점부터의 누적 이동량으로 드래그/탭을 구분한다
    // (천천히 끌면 한 번의 이동량은 작아도 누적은 커진다 — 탭 오인 방지)
    if (Math.abs(s.x - downX) > 6 || Math.abs(s.y - downY) > 6) moved = true;
    translate(active, dx, dy); lastX = s.x; lastY = s.y; draw(active);
  }
  function onUp(e) {
    if (!active) return; const p = active; active = null;
    try { p.el.releasePointerCapture(e.pointerId); } catch (err) {}
    if (moved) { trySnap(p); return; }
    if (p.id !== 'para') { rotateCur(p, 45); draw(p); trySnap(p); return; }
    if (pendingTap === p) { clearTimeout(pendingTimer); pendingTap = null; flipCur(p); draw(p); trySnap(p); }
    else { pendingTap = p; pendingTimer = setTimeout(function () { rotateCur(p, 45); draw(p); pendingTap = null; trySnap(p); }, 280); }
  }
  svg.addEventListener('pointermove', onMove);
  svg.addEventListener('pointerup', onUp);
  svg.addEventListener('pointercancel', onUp);

  // ----- 판 스와이프로 모양 넘기기 (모바일 캐러셀) -----
  // 조각이 아닌 빈 곳을 좌우로 쓸어 넘기면 이전/다음 모양으로 이동한다.
  let swipeX = null, swipeY = null;
  svg.addEventListener('pointerdown', function (e) {
    if (active) return; // 조각을 잡은 경우는 드래그
    const s = toSvg(e); swipeX = s.x; swipeY = s.y;
  });
  svg.addEventListener('pointerup', function (e) {
    if (swipeX === null) return;
    const s = toSvg(e), dx = s.x - swipeX, dy = s.y - swipeY;
    swipeX = swipeY = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2) {
      setShape(shapeIdx + (dx < 0 ? 1 : -1));
      winBox.hidden = true;
    }
  });
  svg.addEventListener('pointercancel', function () { swipeX = swipeY = null; });

  // ----- 모양 그리기 -----
  let solutionCache = null;
  function renderTarget() {
    solutionCache = shapeSolutionPx(SHAPES[shapeIdx]);
    targetLayer.classList.remove('show-lines'); // 새 모양은 선 없는 실루엣부터
    if (hintBtn) hintBtn.textContent = '힌트';
    targetLayer.innerHTML = '';
    ORDER.forEach(function (id) {
      const poly = document.createElementNS(SVGNS, 'polygon');
      poly.setAttribute('class', 'tangram-target');
      poly.setAttribute('points', solutionCache[id].map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '));
      targetLayer.appendChild(poly);
    });
  }
  function showSolution() {
    if (!solutionCache) return;
    const used = {};
    ORDER.forEach(function (id) {
      const p = pieceById(id);
      if (p.locked) { used[claimOf(p)] = true; return; } // 이미 고정된 조각은 그대로
      const cands = SLOT_GROUPS[id];
      let slotId = id;
      for (let i = 0; i < cands.length; i++) {
        if (!claimedSlots[cands[i]] && !used[cands[i]]) { slotId = cands[i]; break; }
      }
      used[slotId] = true;
      p.cur = solutionCache[slotId].map(function (q) { return [q[0], q[1]]; });
      pieceLayer.appendChild(p.el); draw(p);
    });
  }

  // ----- 얼추 맞으면 착! 스냅 고정 -----
  // 같은 모양 조각(큰 삼각형 2개, 작은 삼각형 2개)은 자리를 서로 바꿔 놓아도 인정한다.
  const SLOT_GROUPS = {
    large1: ['large1', 'large2'], large2: ['large1', 'large2'],
    small1: ['small1', 'small2'], small2: ['small1', 'small2'],
    medium: ['medium'], square: ['square'], para: ['para']
  };
  const SNAP_DIST = 30;  // 정답 자리에서 이만큼(px) 안이면 "얼추 맞음"
  let claimedSlots = {}; // slotId → 고정한 pieceId

  function claimOf(p) {
    for (const slotId in claimedSlots) if (claimedSlots[slotId] === p.id) return slotId;
    return p.id;
  }

  function trySnap(p) {
    if (!solutionCache || p.locked) return;
    const c = centroid(p.cur);
    const cands = SLOT_GROUPS[p.id];
    for (let i = 0; i < cands.length; i++) {
      const slotId = cands[i];
      if (claimedSlots[slotId]) continue;
      const slot = solutionCache[slotId];
      const sc = centroid(slot);
      const dx = sc[0] - c[0], dy = sc[1] - c[1];
      if (dx * dx + dy * dy > SNAP_DIST * SNAP_DIST) continue;
      // 평행이동을 맞춘 뒤 꼭짓점이 전부 일치해야(회전·뒤집힘까지 맞아야) 스냅
      let match = true;
      for (let v = 0; v < p.cur.length && match; v++) {
        const x = p.cur[v][0] + dx, y = p.cur[v][1] + dy;
        let hit = false;
        for (let w = 0; w < slot.length; w++) {
          if (Math.abs(x - slot[w][0]) < 1 && Math.abs(y - slot[w][1]) < 1) { hit = true; break; }
        }
        match = hit;
      }
      if (!match) continue;
      p.cur = slot.map(function (q) { return [q[0], q[1]]; });
      p.locked = true;
      claimedSlots[slotId] = p.id;
      p.el.classList.add('locked');
      draw(p);
      checkAllSnapped();
      return;
    }
  }

  function unlockAll() {
    claimedSlots = {};
    pieces.forEach(function (p) { p.locked = false; p.el.classList.remove('locked'); });
  }

  function checkAllSnapped() {
    for (let i = 0; i < pieces.length; i++) if (!pieces[i].locked) return;
    winBox.hidden = false; // 일곱 조각이 모두 제자리 — 자동 축하
  }

  // 조각이 놀이판(0..W, 0..H) 밖으로 나가지 않게 안으로 민다
  function clampToBoard(p) {
    const M = 8;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    p.cur.forEach(function (q) { minX = Math.min(minX, q[0]); maxX = Math.max(maxX, q[0]); minY = Math.min(minY, q[1]); maxY = Math.max(maxY, q[1]); });
    let dx = 0, dy = 0;
    if (minX < M) dx = M - minX; else if (maxX > W - M) dx = (W - M) - maxX;
    if (minY < M) dy = M - minY; else if (maxY > H - M) dy = (H - M) - maxY;
    if (dx || dy) translate(p, dx, dy);
  }

  // 두 가지 레이아웃: 좁은 화면(세로=문제칸 위/조각칸 아래), 넓은 화면(가로=문제칸 왼쪽/조각칸 오른쪽)
  // start 순서: large1, large2, medium, small1, small2, square, para
  const LAYOUTS = {
    portrait: {
      w: 640, h: 700, cx: 320, cy: 188,
      zones: [
        { x: 8, y: 8, w: 624, h: 362, label: '🧩 여기에 모양을 만들어요', lx: 22, ly: 32, tray: false },
        { x: 8, y: 382, w: 624, h: 310, label: '🔻 조각 칸', lx: 22, ly: 406, tray: true }
      ],
      start: [[110, 462, 0], [300, 462, 0], [485, 458, 0], [90, 600, 0], [225, 600, 0], [355, 600, 0], [505, 600, 0]]
    },
    landscape: {
      w: 940, h: 470, cx: 288, cy: 235,
      zones: [
        { x: 8, y: 8, w: 560, h: 454, label: '🧩 여기에 모양을 만들어요', lx: 22, ly: 32, tray: false },
        { x: 584, y: 8, w: 348, h: 454, label: '🔻 조각 칸', lx: 598, ly: 32, tray: true }
      ],
      start: [[660, 100, 0], [845, 100, 0], [660, 250, 0], [625, 380, 0], [760, 385, 0], [875, 380, 0], [820, 250, 0]]
    }
  };

  function drawZones(zones) {
    zoneLayer.innerHTML = '';
    zones.forEach(function (z) {
      const r = document.createElementNS(SVGNS, 'rect');
      r.setAttribute('class', 'zone-box' + (z.tray ? ' tray' : ''));
      r.setAttribute('x', z.x); r.setAttribute('y', z.y);
      r.setAttribute('width', z.w); r.setAttribute('height', z.h); r.setAttribute('rx', 18);
      zoneLayer.appendChild(r);
      const t = document.createElementNS(SVGNS, 'text');
      t.setAttribute('class', 'zone-label'); t.setAttribute('x', z.lx); t.setAttribute('y', z.ly);
      t.textContent = z.label;
      zoneLayer.appendChild(t);
    });
  }

  function applyLayout() {
    const wide = window.matchMedia && window.matchMedia('(min-width: 760px)').matches;
    const L = wide ? LAYOUTS.landscape : LAYOUTS.portrait;
    W = L.w; H = L.h; CX = L.cx; CY = L.cy; START = L.start;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    drawZones(L.zones);
    renderTarget();
    scatter();
  }

  function scatter() {
    unlockAll();
    pieces.forEach(function (p, i) {
      const s = START[i] || [80 + i * 40, 600, 0];
      const base = basePx(p.type, s[2]);
      const c = centroid(base);
      p.cur = base.map(function (q) { return [q[0] - c[0] + s[0], q[1] - c[1] + s[1]]; });
      clampToBoard(p);
    });
    drawAll();
  }

  function syncShapeButtons() {
    shapeBtns.forEach(function (btn, bi) { btn.classList.toggle('active', bi === shapeIdx); });
    moreBtn.classList.toggle('active', shapeIdx >= MAX_SHAPE_BTNS); // 숨은 도안 선택 중이면 ⋯ 강조
  }
  function setShape(i) {
    shapeIdx = (i + SHAPES.length) % SHAPES.length;
    renderTarget();
    scatter();
    syncShapeButtons();
  }

  // 모양 버튼: 앞 5개만 바로 보이고, 나머지는 ⋯(더보기) 아래 메뉴에 넣는다
  const MAX_SHAPE_BTNS = 5;
  const shapeBtns = [];
  const moreWrap = document.createElement('div');
  moreWrap.className = 'more-wrap';
  const moreBtn = document.createElement('button');
  moreBtn.className = 'level-btn more-btn'; moreBtn.type = 'button'; moreBtn.textContent = '⋯';
  moreBtn.setAttribute('aria-label', '모양 더 보기');
  moreBtn.setAttribute('aria-haspopup', 'true');
  moreBtn.setAttribute('aria-expanded', 'false');
  const moreMenu = document.createElement('div');
  moreMenu.className = 'more-menu'; moreMenu.hidden = true;
  moreWrap.appendChild(moreBtn); moreWrap.appendChild(moreMenu);

  function closeMore() {
    moreMenu.hidden = true;
    moreBtn.setAttribute('aria-expanded', 'false');
  }
  function toggleMore() {
    if (!moreMenu.hidden) { closeMore(); return; }
    moreMenu.hidden = false;
    moreBtn.setAttribute('aria-expanded', 'true');
    // 화면 오른쪽을 벗어나면 메뉴를 버튼 오른쪽 끝에 맞춰 연다
    moreMenu.style.left = '0'; moreMenu.style.right = 'auto';
    const r = moreMenu.getBoundingClientRect();
    if (r.right > window.innerWidth - 8) { moreMenu.style.left = 'auto'; moreMenu.style.right = '0'; }
  }

  SHAPES.forEach(function (s, i) {
    const btn = document.createElement('button');
    btn.className = 'level-btn'; btn.type = 'button'; btn.textContent = s.name;
    btn.addEventListener('click', function () { setShape(i); winBox.hidden = true; closeMore(); });
    shapeBtns.push(btn);
    if (i < MAX_SHAPE_BTNS) shapeGroup.appendChild(btn);
    else moreMenu.appendChild(btn);
  });
  shapeGroup.appendChild(moreWrap);
  moreBtn.addEventListener('click', toggleMore);
  document.addEventListener('pointerdown', function (e) {
    if (!moreMenu.hidden && !moreWrap.contains(e.target)) closeMore();
  });
  const shapePrev = document.getElementById('shapePrev');
  const shapeNext = document.getElementById('shapeNext');
  if (shapePrev) shapePrev.addEventListener('click', function () { setShape(shapeIdx - 1); winBox.hidden = true; });
  if (shapeNext) shapeNext.addEventListener('click', function () { setShape(shapeIdx + 1); winBox.hidden = true; });
  shuffleBtn.addEventListener('click', function () { scatter(); winBox.hidden = true; });
  if (hintBtn) hintBtn.addEventListener('click', function () {
    const on = targetLayer.classList.toggle('show-lines');
    hintBtn.textContent = on ? '힌트 끄기' : '힌트';
  });
  if (solveBtn) solveBtn.addEventListener('click', showSolution);
  doneBtn.addEventListener('click', function () { winBox.hidden = false; });
  winNext.addEventListener('click', function () { setShape(shapeIdx + 1); winBox.hidden = true; });

  // 화면 폭이 바뀌면 레이아웃(세로↔가로) 다시 적용
  let resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyLayout, 200);
  });

  makePieces();
  applyLayout();      // 화면 폭에 맞는 레이아웃 + renderTarget + scatter
  syncShapeButtons();
})();
