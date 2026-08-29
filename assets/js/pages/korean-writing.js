  /* 좌표 0~100. 세로 모음은 자음 오른쪽, 가로 모음은 자음 아래에 배치합니다. */
  const CONS = {
    "ㄱ": [ [[16,24],[50,24],[42,74]] ],
    "ㄴ": [ [[22,18],[22,72],[54,72]] ],
    "ㄷ": [ [[18,22],[52,22]], [[20,22],[20,72],[54,72]] ],
    "ㄹ": [ [[16,18],[50,18],[50,43]], [[16,43],[50,43]], [[16,43],[16,68],[52,68]] ],
    "ㅁ": [ [[20,20],[20,70]], [[20,20],[52,20],[52,70]], [[20,70],[52,70]] ],
    "ㅂ": [ [[20,18],[20,72]], [[50,18],[50,72]], [[20,46],[50,46]], [[20,72],[50,72]] ],
    "ㅅ": [ [[35,18],[18,72]], [[35,24],[54,72]] ],
    "ㅇ": [ [[36,20],[22,30],[18,46],[22,62],[36,72],[50,62],[54,46],[50,30],[36,20]] ],
    "ㅈ": [ [[16,22],[52,22]], [[34,22],[18,72]], [[34,22],[54,72]] ],
    "ㅊ": [ [[28,12],[42,12]], [[16,28],[52,28]], [[34,28],[18,74]], [[34,28],[54,74]] ],
    "ㅋ": [ [[16,22],[50,22],[42,72]], [[20,46],[48,46]] ],
    "ㅌ": [ [[18,20],[52,20]], [[18,45],[52,45]], [[20,20],[20,70],[54,70]] ],
    "ㅍ": [ [[16,24],[54,24]], [[24,24],[24,68]], [[46,24],[46,68]], [[16,68],[54,68]] ],
    "ㅎ": [ [[28,12],[42,12]], [[18,30],[52,30]], [[36,40],[24,46],[22,54],[26,64],[36,68],[46,64],[50,54],[48,46],[36,40]] ]
  };
  const VOWELS = {
    "ㅏ": { type: "vertical", strokes: [ [[72,14],[72,86]], [[72,50],[88,50]] ] },
    "ㅑ": { type: "vertical", strokes: [ [[72,14],[72,86]], [[72,38],[88,38]], [[72,60],[88,60]] ] },
    "ㅓ": { type: "vertical", strokes: [ [[56,50],[72,50]], [[72,14],[72,86]] ] },
    "ㅕ": { type: "vertical", strokes: [ [[56,38],[72,38]], [[56,60],[72,60]], [[72,14],[72,86]] ] },
    "ㅗ": { type: "horizontal", strokes: [ [[50,60],[50,80]], [[16,80],[84,80]] ] },
    "ㅛ": { type: "horizontal", strokes: [ [[40,62],[40,80]], [[60,62],[60,80]], [[16,80],[84,80]] ] },
    "ㅜ": { type: "horizontal", strokes: [ [[16,62],[84,62]], [[50,62],[50,90]] ] },
    "ㅠ": { type: "horizontal", strokes: [ [[16,62],[84,62]], [[40,62],[40,88]], [[60,62],[60,88]] ] },
    "ㅡ": { type: "horizontal", strokes: [ [[16,72],[84,72]] ] },
    "ㅣ": { type: "vertical", strokes: [ [[72,14],[72,86]] ] }
  };
  const INITIALS = [
    ["ㄱ", 0], ["ㄴ", 2], ["ㄷ", 3], ["ㄹ", 5], ["ㅁ", 6], ["ㅂ", 7], ["ㅅ", 9],
    ["ㅇ", 11], ["ㅈ", 12], ["ㅊ", 14], ["ㅋ", 15], ["ㅌ", 16], ["ㅍ", 17], ["ㅎ", 18]
  ];
  const VOWEL_ORDER = [
    ["ㅏ", 0, "아", "a"], ["ㅑ", 2, "야", "ya"], ["ㅓ", 4, "어", "eo"], ["ㅕ", 6, "여", "yeo"], ["ㅗ", 8, "오", "o"],
    ["ㅛ", 12, "요", "yo"], ["ㅜ", 13, "우", "u"], ["ㅠ", 17, "유", "yu"], ["ㅡ", 18, "으", "eu"], ["ㅣ", 20, "이", "i"]
  ];
  const HINTS = {
    가: "가방의 '가'", 나: "나비의 '나'", 다: "다리의 '다'", 라: "라면의 '라'", 마: "마차의 '마'", 바: "바나나의 '바'", 사: "사과의 '사'", 아: "아기의 '아'", 자: "자동차의 '자'", 차: "차표의 '차'", 카: "카드의 '카'", 타: "타조의 '타'", 파: "파도의 '파'", 하: "하마의 '하'",
    갸: "갸웃의 '갸'", 냐: "고양이 소리 '냐'", 댜: "댜를 또박또박", 랴: "랴를 또박또박", 먀: "먀를 또박또박", 뱌: "뱌를 또박또박", 샤: "샤워의 '샤'", 야: "야구의 '야'", 쟈: "쟈를 또박또박", 챠: "챠를 또박또박", 캬: "캬를 또박또박", 탸: "탸를 또박또박", 퍄: "퍄를 또박또박", 햐: "향기의 '햐'",
    거: "거북이의 '거'", 너: "너구리의 '너'", 더: "더하기의 '더'", 러: "러시아의 '러'", 머: "머리의 '머'", 버: "버스의 '버'", 서: "서랍의 '서'", 어: "어린이의 '어'", 저: "저고리의 '저'", 처: "처마의 '처'", 커: "커피의 '커'", 터: "터널의 '터'", 퍼: "퍼즐의 '퍼'", 허: "허리의 '허'",
    겨: "겨울의 '겨'", 녀: "소녀의 '녀'", 뎌: "뎌를 또박또박", 려: "여러분의 '려'", 며: "며느리의 '며'", 벼: "벼의 '벼'", 셔: "셔츠의 '셔'", 여: "여우의 '여'", 져: "젖소의 '져'", 쳐: "부채쳐요의 '쳐'", 켜: "켜다의 '켜'", 텨: "텨를 또박또박", 펴: "펴다의 '펴'", 혀: "혀의 '혀'",
    고: "고래의 '고'", 노: "노래의 '노'", 도: "도토리의 '도'", 로: "로봇의 '로'", 모: "모자의 '모'", 보: "보트의 '보'", 소: "소나무의 '소'", 오: "오리의 '오'", 조: "조개의 '조'", 초: "초록의 '초'", 코: "코끼리의 '코'", 토: "토끼의 '토'", 포: "포도의 '포'", 호: "호랑이의 '호'",
    교: "교실의 '교'", 뇨: "뇨를 또박또박", 됴: "됴를 또박또박", 료: "요리의 '료'", 묘: "묘목의 '묘'", 뵤: "뵤를 또박또박", 쇼: "쇼핑의 '쇼'", 요: "요리의 '요'", 죠: "죠를 또박또박", 쵸: "쵸를 또박또박", 쿄: "쿄를 또박또박", 툐: "툐를 또박또박", 표: "표지판의 '표'", 효: "효도의 '효'",
    구: "구름의 '구'", 누: "누나의 '누'", 두: "두부의 '두'", 루: "루돌프의 '루'", 무: "무지개의 '무'", 부: "부엉이의 '부'", 수: "수박의 '수'", 우: "우산의 '우'", 주: "주머니의 '주'", 추: "추석의 '추'", 쿠: "쿠키의 '쿠'", 투: "투구의 '투'", 푸: "푸딩의 '푸'", 후: "후추의 '후'",
    규: "규칙의 '규'", 뉴: "뉴스의 '뉴'", 듀: "듀엣의 '듀'", 류: "류를 또박또박", 뮤: "뮤지컬의 '뮤'", 뷰: "뷰의 '뷰'", 슈: "슈퍼의 '슈'", 유: "유리의 '유'", 쥬: "쥬스를 떠올려요", 츄: "츄를 또박또박", 큐: "큐브의 '큐'", 튜: "튜브의 '튜'", 퓨: "퓨를 또박또박", 휴: "휴지의 '휴'",
    그: "그림의 '그'", 느: "느낌의 '느'", 드: "드럼의 '드'", 르: "르를 또박또박", 므: "므를 또박또박", 브: "브로콜리의 '브'", 스: "스키의 '스'", 으: "으쓱의 '으'", 즈: "즈를 또박또박", 츠: "츠를 또박또박", 크: "크레용의 '크'", 트: "트럭의 '트'", 프: "프라이팬의 '프'", 흐: "흐름의 '흐'",
    기: "기차의 '기'", 니: "니트를 떠올려요", 디: "디딤돌의 '디'", 리: "리본의 '리'", 미: "미소의 '미'", 비: "비행기의 '비'", 시: "시계의 '시'", 이: "이빨의 '이'", 지: "지도의 '지'", 치: "치마의 '치'", 키: "키위의 '키'", 티: "티셔츠의 '티'", 피: "피아노의 '피'", 히: "히히 웃는 '히'"
  };
  function transformStroke(stroke, type) {
    if (type !== "horizontal") return stroke;
    // 가로모음(ㅗㅛㅜㅠㅡ): 자음을 글자 상단 절반에 중앙 정렬해 배치 (모음과 위아래로 분리)
    return stroke.map(([x, y]) => [24 + (x - 16) / 38 * 52, 10 + (y - 12) / 62 * 44]);
  }
  // 모음이 아래에 오는 가로모음 글자에서 ㄱ·ㅋ은 세로획을 직각(수직)으로 내린다
  const CONS_WIDE = {
    "ㄱ": [ [[16,24],[50,24],[50,74]] ],
    "ㅋ": [ [[16,22],[50,22],[50,72]], [[20,46],[48,46]] ]
  };
  function compose(initialIndex, vowelIndex) {
    return String.fromCharCode(0xac00 + initialIndex * 21 * 28 + vowelIndex * 28);
  }
  const ALL_SYLL = VOWEL_ORDER.flatMap(([vowel, vowelCode, vowelName, groupKey]) =>
    INITIALS.map(([cons, initialCode]) => {
      const ch = compose(initialCode, vowelCode);
      const vowelDef = VOWELS[vowel];
      const consStrokes = (vowelDef.type === "horizontal" && CONS_WIDE[cons]) ? CONS_WIDE[cons] : CONS[cons];
      return {
        ch,
        cons,
        vowel,
        word: HINTS[ch] || ch + "를 또박또박",
        strokes: consStrokes.map(st => transformStroke(st, vowelDef.type)).concat(vowelDef.strokes),
        decomp: cons + " + " + vowel,
        group: vowelName,
        groupKey,
      };
    })
  );
  const GROUPS = VOWEL_ORDER.map(([, , vowelName, key]) => {
    const letters = ALL_SYLL.filter(s => s.groupKey === key);
    return { key, vowelName, letters, title: letters[0].ch + "-" + letters[letters.length - 1].ch };
  });

  // 자음·모음 낱자 쓰기 그룹 — 음절용 획 좌표를 캔버스 중앙에 확대 배치해 재사용
  function centerStrokes(strokes) {
    let minX = 100, minY = 100, maxX = 0, maxY = 0;
    strokes.forEach(st => st.forEach(([x, y]) => {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }));
    const w = Math.max(maxX - minX, 1), h = Math.max(maxY - minY, 1);
    const scale = Math.min(64 / w, 64 / h, 1.6);
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    return strokes.map(st => st.map(([x, y]) => [50 + (x - cx) * scale, 50 + (y - cy) * scale]));
  }
  const CONS_INFO = {
    "ㄱ": ["기역", "가방의 첫소리"], "ㄴ": ["니은", "나비의 첫소리"], "ㄷ": ["디귿", "다람쥐의 첫소리"], "ㄹ": ["리을", "라면의 첫소리"],
    "ㅁ": ["미음", "모자의 첫소리"], "ㅂ": ["비읍", "바나나의 첫소리"], "ㅅ": ["시옷", "사과의 첫소리"], "ㅇ": ["이응", "오리의 첫소리"],
    "ㅈ": ["지읒", "자동차의 첫소리"], "ㅊ": ["치읓", "치즈의 첫소리"], "ㅋ": ["키읔", "코끼리의 첫소리"], "ㅌ": ["티읕", "토끼의 첫소리"],
    "ㅍ": ["피읖", "포도의 첫소리"], "ㅎ": ["히읗", "하마의 첫소리"]
  };
  const VOWEL_INFO = {
    "ㅏ": ["아", "아기의 '아'"], "ㅑ": ["야", "야구의 '야'"], "ㅓ": ["어", "어린이의 '어'"], "ㅕ": ["여", "여우의 '여'"], "ㅗ": ["오", "오리의 '오'"],
    "ㅛ": ["요", "요리의 '요'"], "ㅜ": ["우", "우산의 '우'"], "ㅠ": ["유", "유리의 '유'"], "ㅡ": ["으", "으쓱의 '으'"], "ㅣ": ["이", "이불의 '이'"]
  };
  // 가로 모음은 음절용 좌표(하단 납작 배치) 대신 낱자 비율로 다시 정의
  const VOWEL_STANDALONE = {
    "ㅗ": [ [[50,30],[50,62]], [[16,62],[84,62]] ],
    "ㅛ": [ [[38,30],[38,62]], [[62,30],[62,62]], [[16,62],[84,62]] ],
    "ㅜ": [ [[16,38],[84,38]], [[50,38],[50,70]] ],
    "ㅠ": [ [[16,38],[84,38]], [[38,38],[38,70]], [[62,38],[62,70]] ]
  };
  GROUPS.push({
    key: "cons",
    title: "ㄱ-ㅎ 자음",
    letters: INITIALS.map(([cons]) => ({
      ch: cons,
      say: CONS_INFO[cons][0],
      word: CONS_INFO[cons][1],
      strokes: centerStrokes(CONS[cons]),
      decomp: "이름: " + CONS_INFO[cons][0]
    }))
  });
  GROUPS.push({
    key: "vowel",
    title: "ㅏ-ㅣ 모음",
    letters: VOWEL_ORDER.map(([vowel]) => ({
      ch: vowel,
      say: VOWEL_INFO[vowel][0],
      word: VOWEL_INFO[vowel][1],
      strokes: centerStrokes(VOWEL_STANDALONE[vowel] || VOWELS[vowel].strokes),
      decomp: "소리: " + VOWEL_INFO[vowel][0]
    }))
  });
  function selectedGroupKey() {
    try {
      return new URLSearchParams(window.location.search).get("group") || "a";
    } catch (e) {
      return "a";
    }
  }
  const ACTIVE_GROUP = GROUPS.find(group => group.key === selectedGroupKey()) || GROUPS[0];
  const SYLL = ACTIVE_GROUP.letters;

  let idx = 0;
  const KEY = "korean_writing_" + ACTIVE_GROUP.key + "_done";
  function loadSet(){ try { return new Set(JSON.parse(localStorage.getItem(KEY)) || []); } catch(e){ return new Set(); } }
  function saveSet(s){ try { localStorage.setItem(KEY, JSON.stringify([...s])); } catch(e){} }
  let learned = loadSet();
  function cur(){ return SYLL[idx]; }

  const stage = document.getElementById("stage");
  const bg = document.getElementById("bg"), fg = document.getElementById("fg");
  const cbg = bg.getContext("2d"), cfg = fg.getContext("2d");
  let W = 360, M = 30;

  function fit(){
    const card = stage.parentElement;
    const cs = getComputedStyle(card);
    const availW = card.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    let size = Math.min(availW, 380, Math.max(180, window.innerHeight * 0.46));
    stage.style.width = size + "px"; stage.style.height = size + "px";
    W = size; M = size * 0.12;
    const dpr = window.devicePixelRatio || 1;
    [bg, fg].forEach(c => { c.width = size*dpr; c.height = size*dpr; c.getContext("2d").setTransform(dpr,0,0,dpr,0,0); });
    drawGuide(); clearInk();
  }
  function mapPt(p){ return [ M + p[0]/100*(W-2*M), M + p[1]/100*(W-2*M) ]; }
  function mid(a,b){ return [(a[0]+b[0])/2,(a[1]+b[1])/2]; }
  function lerp(a,b,t){ return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t]; }
  function quad(p0,p1,p2,t){ const m=1-t; return [m*m*p0[0]+2*m*t*p1[0]+t*t*p2[0], m*m*p0[1]+2*m*t*p1[1]+t*t*p2[1]]; }
  function densify(pts){
    if (pts.length < 2) return pts;
    const maxLen = Math.max(2, W*0.018);
    const res = [pts[0]];
    for (let i=1;i<pts.length;i++){
      const a = pts[i-1], b = pts[i];
      const d = Math.hypot(b[0]-a[0], b[1]-a[1]);
      const steps = Math.max(1, Math.ceil(d/maxLen));
      for (let s=1;s<=steps;s++) res.push(lerp(a,b,s/steps));
    }
    return res;
  }
  function smooth(raw){
    const pts = raw.map(mapPt);
    const n = pts.length;
    if (n === 1) return [pts[0]];
    if (n === 2) return densify([pts[0], pts[1]]);
    const corner = new Array(n).fill(false);
    for (let i=1;i<n-1;i++){
      const ax=pts[i][0]-pts[i-1][0], ay=pts[i][1]-pts[i-1][1];
      const bx=pts[i+1][0]-pts[i][0], by=pts[i+1][1]-pts[i][1];
      const cos=(ax*bx+ay*by)/((Math.hypot(ax,ay)||1)*(Math.hypot(bx,by)||1));
      corner[i] = cos < 0.3;
    }
    const out = [pts[0]];
    for (let i=1;i<n-1;i++){
      const prev=pts[i-1], c=pts[i], nx=pts[i+1];
      if (corner[i]){ out.push(c); continue; }
      const inLen=Math.hypot(c[0]-prev[0],c[1]-prev[1])||1;
      const outLen=Math.hypot(nx[0]-c[0],nx[1]-c[1])||1;
      const rr=Math.min(inLen,outLen)*0.5;
      const A=[c[0]-(c[0]-prev[0])/inLen*rr, c[1]-(c[1]-prev[1])/inLen*rr];
      const B=[c[0]+(nx[0]-c[0])/outLen*rr, c[1]+(nx[1]-c[1])/outLen*rr];
      out.push(A);
      for (let s=1;s<=8;s++) out.push(quad(A,c,B,s/8));
    }
    out.push(pts[n-1]);
    return densify(out);
  }
  function getCss(v){ return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
  function clearInk(){ cfg.clearRect(0,0,W,W); }

  function drawGuide(){
    cbg.clearRect(0,0,W,W);
    // 보조 십자선
    cbg.strokeStyle = "#eef2ff"; cbg.lineWidth = 1.5; cbg.setLineDash([6,6]);
    cbg.beginPath(); cbg.moveTo(W/2,8); cbg.lineTo(W/2,W-8); cbg.stroke();
    cbg.beginPath(); cbg.moveTo(8,W/2); cbg.lineTo(W-8,W/2); cbg.stroke();
    cbg.setLineDash([]);

    const strokes = cur().strokes;
    cbg.strokeStyle = getCss('--guide'); cbg.lineWidth = W*0.065; cbg.lineCap="round"; cbg.lineJoin="round";
    strokes.forEach(st => {
      const sp = smooth(st);
      if (sp.length === 1){ cbg.beginPath(); cbg.arc(sp[0][0],sp[0][1],W*0.03,0,7); cbg.fillStyle=getCss('--guide'); cbg.fill(); return; }
      cbg.beginPath(); cbg.moveTo(sp[0][0],sp[0][1]); sp.forEach(p => cbg.lineTo(p[0],p[1])); cbg.stroke();
    });
    // 끝점 화살표
    strokes.forEach(st => {
      const sp = smooth(st);
      if (sp.length > 2){
        const a=sp[sp.length-2], b=sp[sp.length-1];
        const ang=Math.atan2(b[1]-a[1],b[0]-a[0]); const s=W*0.04;
        cbg.fillStyle="#a5b4fc"; cbg.beginPath();
        cbg.moveTo(b[0],b[1]);
        cbg.lineTo(b[0]-s*Math.cos(ang-0.5), b[1]-s*Math.sin(ang-0.5));
        cbg.lineTo(b[0]-s*Math.cos(ang+0.5), b[1]-s*Math.sin(ang+0.5));
        cbg.closePath(); cbg.fill();
      }
    });
    // 시작점 번호 (겹치지 않게 비켜서)
    const placed = []; const rad = W*0.044;
    cbg.font = "800 " + (W*0.056) + "px -apple-system, sans-serif";
    cbg.textAlign="center"; cbg.textBaseline="middle";
    strokes.forEach((st, i) => {
      const sp = smooth(st); const start = sp[0];
      let dir=[0,-1];
      if (sp.length>1){ const k=Math.min(4,sp.length-1); let dx=sp[k][0]-start[0], dy=sp[k][1]-start[1]; const len=Math.hypot(dx,dy)||1; dir=[dx/len,dy/len]; }
      let bx=start[0]-dir[0]*W*0.085, by=start[1]-dir[1]*W*0.085, tries=0;
      while (placed.some(p => Math.hypot(p[0]-bx,p[1]-by) < rad*1.95) && tries<14){ bx-=dir[0]*rad*0.8; by-=dir[1]*rad*0.8; tries++; }
      bx=Math.max(rad,Math.min(W-rad,bx)); by=Math.max(rad,Math.min(W-rad,by));
      placed.push([bx,by]);
      cbg.strokeStyle="#c7d2fe"; cbg.lineWidth=1.5;
      cbg.beginPath(); cbg.moveTo(bx,by); cbg.lineTo(start[0],start[1]); cbg.stroke();
      cbg.fillStyle="#7c3aed"; cbg.beginPath(); cbg.arc(start[0],start[1],W*0.013,0,7); cbg.fill();
      cbg.beginPath(); cbg.arc(bx,by,rad,0,7); cbg.fillStyle="#7c3aed"; cbg.fill();
      cbg.fillStyle="#fff"; cbg.fillText(String(i+1), bx, by+1);
    });
  }

  let demoRunning = false;
  function playDemo(){
    if (demoRunning) return;
    clearInk(); demoRunning = true;
    const strokes = cur().strokes.map(smooth);
    cfg.strokeStyle = getCss('--demo'); cfg.lineWidth = W*0.055; cfg.lineCap="round"; cfg.lineJoin="round"; cfg.fillStyle = getCss('--demo');
    let si=0, k=1;
    function step(){
      if (si>=strokes.length){ demoRunning=false; return; }
      const pts=strokes[si];
      if (pts.length===1){ cfg.beginPath(); cfg.arc(pts[0][0],pts[0][1],W*0.028,0,7); cfg.fill(); si++; setTimeout(step,300); return; }
      if (k<pts.length){
        cfg.beginPath(); cfg.moveTo(pts[k-1][0],pts[k-1][1]); cfg.lineTo(pts[k][0],pts[k][1]); cfg.stroke();
        k+=2; requestAnimationFrame(step);
      } else { si++; k=1; setTimeout(step,260); }
    }
    step();
  }

  let drawing=false, last=null;
  function pos(e){ const r=fg.getBoundingClientRect(); return [ (e.clientX-r.left)*(W/r.width), (e.clientY-r.top)*(W/r.height) ]; }
  fg.addEventListener("pointerdown", e => { if (demoRunning) return; drawing=true; try{ fg.setPointerCapture(e.pointerId);}catch(_){} last=pos(e); cfg.strokeStyle=getCss('--ink'); cfg.lineWidth=W*0.05; cfg.lineCap="round"; cfg.lineJoin="round"; cfg.beginPath(); cfg.arc(last[0],last[1],W*0.025,0,7); cfg.fillStyle=getCss('--ink'); cfg.fill(); });
  fg.addEventListener("pointermove", e => { if(!drawing) return; const p=pos(e); cfg.beginPath(); cfg.moveTo(last[0],last[1]); cfg.lineTo(p[0],p[1]); cfg.stroke(); last=p; });
  window.addEventListener("pointerup", () => { drawing=false; });

  const speak = CourseCommon.createSpeaker({ lang: "ko-KR" });

  function renderStrip(){
    const strip = document.getElementById("strip"); strip.innerHTML="";
    let activeBtn=null;
    SYLL.forEach((s,i) => {
      const b=document.createElement("button");
      b.className="lchip";
      if (learned.has(s.ch)) b.classList.add("done");
      if (i===idx){ b.classList.add("active"); activeBtn=b; }
      b.textContent=s.ch;
      b.addEventListener("click", () => { idx=i; refresh(); });
      strip.appendChild(b);
    });
    if (activeBtn && strip.scrollWidth > strip.clientWidth+4) activeBtn.scrollIntoView({ block:"nearest", inline:"center" });
  }
  function renderProgress(){
    document.getElementById("pdone").textContent = learned.size;
    const totalNode = document.getElementById("ptotal");
    if (totalNode) totalNode.textContent = SYLL.length;
    document.getElementById("pfill").style.transform = "scaleX(" + (learned.size/SYLL.length) + ")";
  }
  function renderReading(){
    const s=cur();
    document.getElementById("bigCh").textContent = s.ch;
    document.getElementById("decomp").textContent = s.decomp;
    document.getElementById("hintword").textContent = s.word;
    document.getElementById("prevBtn").disabled = (idx===0);
    document.getElementById("nextBtn").disabled = (idx===SYLL.length-1);
    const pl = document.getElementById("pickLabel"); if (pl) pl.textContent = s.ch;
  }
  function renderPageMeta() {
    const title = ACTIVE_GROUP.title + " 글씨 쓰기";
    document.title = "한글 " + title + " (획순)";
    const pageTitle = document.querySelector(".page-title");
    if (pageTitle) pageTitle.textContent = "✍️ " + title;
  }
  function refresh(){ demoRunning=false; const pp=document.getElementById("pickPanel"); if (pp) pp.hidden=true; renderStrip(); renderProgress(); renderReading(); drawGuide(); clearInk(); }

  document.getElementById("demoBtn").addEventListener("click", playDemo);
  document.getElementById("clearBtn").addEventListener("click", clearInk);
  document.getElementById("sayBtn").addEventListener("click", () => speak(cur().say || cur().ch));
  document.getElementById("learnBtn").addEventListener("click", () => {
    learned.add(cur().ch); saveSet(learned); renderStrip(); renderProgress();
    if (idx<SYLL.length-1){ idx++; refresh(); }
  });
  document.getElementById("prevBtn").addEventListener("click", () => { if (idx>0){ idx--; refresh(); } });
  document.getElementById("nextBtn").addEventListener("click", () => { if (idx<SYLL.length-1){ idx++; refresh(); } });
  document.getElementById("pickBtn").addEventListener("click", () => {
    const p = document.getElementById("pickPanel"); p.hidden = !p.hidden;
    if (!p.hidden) { const a = p.querySelector(".lchip.active"); if (a) a.scrollIntoView({ block: "nearest", inline: "center" }); }
  });
  let rT;
  window.addEventListener("resize", () => { clearTimeout(rT); rT=setTimeout(fit,150); });

  // 시작 — 아직 안 쓴 첫 글자부터
  for (let i=0;i<SYLL.length;i++){ if (!learned.has(SYLL[i].ch)){ idx=i; break; } }
  renderPageMeta();
  renderStrip(); renderProgress(); renderReading(); fit();
