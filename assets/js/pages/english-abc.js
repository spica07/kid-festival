  /* 좌표계: 0~100 박스. 대문자 위 18 ~ 아래(baseline) 82, 소문자 x-높이 48 ~ baseline 82,
     ascender 14, descender 96. 각 글자 = 획 배열, 각 획 = [x,y] 점 배열 (획순). */
  const U = {
    A: [[[50,18],[27,82]],[[50,18],[73,82]],[[34,57],[66,57]]],
    B: [[[31,18],[31,82]],[[31,18],[57,20],[66,30],[58,46],[31,48]],[[31,48],[60,50],[71,65],[60,82],[31,82]]],
    C: [[[70,32],[58,20],[42,20],[31,33],[27,50],[31,67],[42,80],[58,80],[70,68]]],
    D: [[[31,18],[31,82]],[[31,18],[54,20],[70,38],[70,62],[54,80],[31,82]]],
    E: [[[32,18],[32,82]],[[32,18],[70,18]],[[32,50],[60,50]],[[32,82],[70,82]]],
    F: [[[32,18],[32,82]],[[32,18],[70,18]],[[32,50],[60,50]]],
    G: [[[71,33],[59,20],[43,19],[31,31],[27,50],[31,70],[44,81],[60,81],[71,69],[71,53]],[[71,53],[55,53]]],
    H: [[[31,18],[31,82]],[[70,18],[70,82]],[[31,50],[70,50]]],
    I: [[[36,18],[64,18]],[[50,18],[50,82]],[[36,82],[64,82]]],
    J: [[[46,18],[72,18]],[[60,18],[60,68],[53,80],[41,80],[32,70],[31,61]]],
    K: [[[31,18],[31,82]],[[70,18],[31,51]],[[44,43],[72,82]]],
    L: [[[32,18],[32,82],[70,82]]],
    M: [[[28,18],[28,82]],[[28,18],[50,60],[72,18],[72,82]]],
    N: [[[30,18],[30,82]],[[30,18],[70,82]],[[70,82],[70,18]]],
    O: [[[50,18],[33,28],[27,50],[33,72],[50,82],[67,72],[73,50],[67,28],[50,18]]],
    P: [[[32,18],[32,82]],[[32,18],[59,20],[68,33],[59,46],[32,48]]],
    Q: [[[50,18],[33,28],[27,50],[33,72],[50,82],[67,72],[73,50],[67,28],[50,18]],[[56,64],[75,86]]],
    R: [[[32,18],[32,82]],[[32,18],[59,20],[68,33],[59,46],[32,48]],[[47,48],[72,82]]],
    S: [[[70,30],[57,20],[42,20],[32,30],[35,44],[50,50],[64,57],[68,70],[57,80],[42,80],[30,70]]],
    T: [[[50,18],[50,82]],[[28,18],[72,18]]],
    U: [[[30,18],[30,62],[38,79],[50,82],[62,79],[70,62],[70,18]]],
    V: [[[28,18],[50,82],[72,18]]],
    W: [[[26,18],[38,82],[50,42],[62,82],[74,18]]],
    X: [[[30,18],[70,82]],[[70,18],[30,82]]],
    Y: [[[30,18],[50,52]],[[70,18],[50,52]],[[50,52],[50,82]]],
    Z: [[[30,18],[70,18],[30,82],[70,82]]]
  };
  const L = {
    a: [[[64,52],[52,48],[40,52],[34,64],[40,77],[54,80],[64,72]],[[64,49],[64,82]]],
    b: [[[34,14],[34,82]],[[34,54],[50,49],[63,56],[64,69],[52,81],[38,79],[34,70]]],
    c: [[[66,55],[54,48],[42,50],[34,62],[40,76],[54,80],[66,73]]],
    d: [[[66,54],[52,48],[40,52],[34,64],[40,77],[54,80],[66,72]],[[66,14],[66,82]]],
    e: [[[34,66],[66,66],[64,55],[50,48],[38,52],[33,64],[40,77],[54,80],[66,72]]],
    f: [[[64,22],[54,14],[44,18],[42,30],[42,82]],[[30,49],[56,49]]],
    g: [[[64,52],[52,48],[40,52],[34,63],[40,74],[54,76],[64,68]],[[64,49],[64,84],[56,94],[43,95],[34,88]]],
    h: [[[34,14],[34,82]],[[34,55],[48,48],[62,52],[64,64],[64,82]]],
    i: [[[50,30]],[[50,48],[50,82]]],
    j: [[[58,30]],[[58,48],[58,86],[52,94],[42,95],[34,88]]],
    k: [[[34,14],[34,82]],[[60,50],[36,67]],[[44,60],[64,82]]],
    l: [[[50,14],[50,78],[56,82]]],
    m: [[[30,48],[30,82]],[[30,55],[42,48],[50,55],[50,82]],[[50,55],[62,48],[70,55],[70,82]]],
    n: [[[34,48],[34,82]],[[34,55],[48,48],[62,52],[64,64],[64,82]]],
    o: [[[50,48],[37,53],[32,64],[37,76],[50,80],[63,76],[68,64],[63,53],[50,48]]],
    p: [[[34,48],[34,96]],[[34,54],[50,48],[63,55],[64,68],[52,79],[38,77],[34,70]]],
    q: [[[64,54],[50,48],[38,52],[33,64],[40,76],[54,78],[64,70]],[[64,48],[64,96]]],
    r: [[[36,48],[36,82]],[[36,57],[48,49],[62,50]]],
    s: [[[64,53],[52,48],[42,50],[40,58],[50,63],[60,67],[58,76],[48,79],[36,74]]],
    t: [[[48,28],[48,76],[58,80]],[[34,49],[62,49]]],
    u: [[[34,48],[34,72],[44,80],[56,79],[64,72]],[[64,48],[64,82]]],
    v: [[[34,48],[50,82],[66,48]]],
    w: [[[30,48],[40,82],[50,58],[60,82],[70,48]]],
    x: [[[36,48],[64,82]],[[64,48],[36,82]]],
    y: [[[34,48],[50,78]],[[66,48],[50,78],[42,94],[32,95]]],
    z: [[[36,48],[64,48],[36,82],[64,82]]]
  };
  const WORDS = {
    A:["apple","🍎"], B:["ball","⚽"], C:["cat","🐱"], D:["dog","🐶"], E:["egg","🥚"],
    F:["fish","🐟"], G:["grape","🍇"], H:["hat","🧢"], I:["ice","🧊"], J:["juice","🧃"],
    K:["kite","🪁"], L:["lion","🦁"], M:["moon","🌙"], N:["nest","🪺"], O:["orange","🍊"],
    P:["pig","🐷"], Q:["queen","👑"], R:["rabbit","🐰"], S:["sun","☀️"], T:["tiger","🐯"],
    U:["umbrella","☂️"], V:["van","🚐"], W:["watermelon","🍉"], X:["box","📦"], Y:["yo-yo","🪀"], Z:["zebra","🦓"]
  };
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  let current = "A";
  const KEY = "abc_done";
  const UPPER_KEY = "abc_upper_done";
  const LOWER_KEY = "abc_lower_done";
  function loadSet(k){
    try {
      return new Set(JSON.parse(localStorage.getItem(k)) || []);
    } catch (error) {
      console.warn("Saved ABC progress could not be loaded.", error);
      return new Set();
    }
  }
  function saveSet(k,s){
    try {
      localStorage.setItem(k, JSON.stringify([...s]));
    } catch (error) {
      console.warn("Saved ABC progress could not be stored.", error);
    }
  }
  function normalizeLetters(set) {
    return new Set([...set].map(v => String(v).charAt(0).toUpperCase()).filter(v => LETTERS.includes(v)));
  }
  function loadProgress() {
    const paired = normalizeLetters(loadSet(KEY));
    const upper = normalizeLetters(loadSet(UPPER_KEY));
    const lower = normalizeLetters(loadSet(LOWER_KEY));
    return new Set([...paired, ...upper, ...lower]);
  }
  function saveProgress() {
    saveSet(KEY, learned);
    saveSet(UPPER_KEY, learned);
    saveSet(LOWER_KEY, [...learned].map(v => v.toLowerCase()));
  }
  let learned = loadProgress();
  function getCss(v){ return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }

  const speak = CourseCommon.createSpeaker({ lang: "en-US" });
  function sayLetter(){ const w = WORDS[current]; speak(current + ". " + w[0] + "."); }

  /* ===== 글씨판 한 칸 (대문자/소문자 각각) ===== */
  function makePad(stageEl, getStrokes){
    const bg = stageEl.querySelector("canvas.bg");
    const fg = stageEl.querySelector("canvas.fg");
    const cbg = bg.getContext("2d"), cfg = fg.getContext("2d");
    let W = 280, M = 34;
    let demoRunning = false, drawing = false, last = null;

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
        const ax = pts[i][0]-pts[i-1][0], ay = pts[i][1]-pts[i-1][1];
        const bx = pts[i+1][0]-pts[i][0], by = pts[i+1][1]-pts[i][1];
        const cos = (ax*bx + ay*by) / ((Math.hypot(ax,ay)||1) * (Math.hypot(bx,by)||1));
        corner[i] = cos < 0.3;
      }
      const out = [pts[0]];
      for (let i=1;i<n-1;i++){
        const prev = pts[i-1], cur = pts[i], nxt = pts[i+1];
        if (corner[i]){ out.push(cur); continue; }
        const inLen = Math.hypot(cur[0]-prev[0], cur[1]-prev[1]) || 1;
        const outLen = Math.hypot(nxt[0]-cur[0], nxt[1]-cur[1]) || 1;
        const rr = Math.min(inLen, outLen) / 2;
        const A = [cur[0] - (cur[0]-prev[0])/inLen*rr, cur[1] - (cur[1]-prev[1])/inLen*rr];
        const B = [cur[0] + (nxt[0]-cur[0])/outLen*rr, cur[1] + (nxt[1]-cur[1])/outLen*rr];
        out.push(A);
        for (let s=1;s<=8;s++) out.push(quad(A, cur, B, s/8));
      }
      out.push(pts[n-1]);
      return densify(out);
    }

    function fit(){
      const cw = stageEl.clientWidth || 240;
      W = cw; M = cw * 0.12;
      const dpr = globalThis.devicePixelRatio || 1;
      [bg, fg].forEach(c => { c.width = cw*dpr; c.height = cw*dpr; c.getContext("2d").setTransform(dpr,0,0,dpr,0,0); });
      drawGuide(); clearInk();
    }
    function clearInk(){ cfg.clearRect(0,0,W,W); }

    function drawGuide(){
      cbg.clearRect(0,0,W,W);
      cbg.strokeStyle = "#eef2ff"; cbg.lineWidth = 1.5;
      [18,50,82].forEach(y => { const py = M + y/100*(W-2*M); cbg.beginPath(); cbg.moveTo(M*0.4, py); cbg.lineTo(W-M*0.4, py); cbg.stroke(); });

      const strokes = getStrokes();
      cbg.strokeStyle = getCss('--guide'); cbg.lineWidth = W*0.075; cbg.lineCap="round"; cbg.lineJoin="round";
      strokes.forEach(st => {
        const sp = smooth(st);
        if (sp.length === 1){ cbg.beginPath(); cbg.arc(sp[0][0], sp[0][1], W*0.035, 0, 7); cbg.fillStyle=getCss('--guide'); cbg.fill(); return; }
        cbg.beginPath(); cbg.moveTo(sp[0][0], sp[0][1]); sp.forEach(p => cbg.lineTo(p[0], p[1])); cbg.stroke();
      });
      strokes.forEach(st => {
        const sp = smooth(st);
        if (sp.length > 2){
          const a = sp[sp.length-2], b = sp[sp.length-1];
          const ang = Math.atan2(b[1]-a[1], b[0]-a[0]); const s = W*0.045;
          cbg.fillStyle = "#a5b4fc"; cbg.beginPath();
          cbg.moveTo(b[0], b[1]);
          cbg.lineTo(b[0]-s*Math.cos(ang-0.5), b[1]-s*Math.sin(ang-0.5));
          cbg.lineTo(b[0]-s*Math.cos(ang+0.5), b[1]-s*Math.sin(ang+0.5));
          cbg.closePath(); cbg.fill();
        }
      });
      const placed = []; const rad = W*0.05;
      cbg.font = "800 " + (W*0.064) + "px -apple-system, sans-serif";
      cbg.textAlign = "center"; cbg.textBaseline = "middle";
      strokes.forEach((st, i) => {
        const sp = smooth(st); const start = sp[0];
        let dir = [0,-1];
        if (sp.length > 1){ const k = Math.min(4, sp.length-1); let dx = sp[k][0]-start[0], dy = sp[k][1]-start[1]; const len = Math.hypot(dx,dy)||1; dir = [dx/len, dy/len]; }
        let bx = start[0]-dir[0]*W*0.092, by = start[1]-dir[1]*W*0.092, tries = 0;
        while (placed.some(p => Math.hypot(p[0]-bx,p[1]-by) < rad*1.95) && tries < 14){ bx -= dir[0]*rad*0.8; by -= dir[1]*rad*0.8; tries++; }
        bx = Math.max(rad, Math.min(W-rad, bx)); by = Math.max(rad, Math.min(W-rad, by));
        placed.push([bx,by]);
        cbg.strokeStyle = "#c7d2fe"; cbg.lineWidth = 1.5;
        cbg.beginPath(); cbg.moveTo(bx,by); cbg.lineTo(start[0],start[1]); cbg.stroke();
        cbg.fillStyle = "#6366f1"; cbg.beginPath(); cbg.arc(start[0],start[1],W*0.014,0,7); cbg.fill();
        cbg.beginPath(); cbg.arc(bx,by,rad,0,7); cbg.fillStyle = "#6366f1"; cbg.fill();
        cbg.fillStyle = "#fff"; cbg.fillText(String(i+1), bx, by+1);
      });
    }

    function playDemo(onDone){
      if (demoRunning) return;
      clearInk(); demoRunning = true;
      const strokes = getStrokes().map(smooth);
      cfg.strokeStyle = getCss('--demo'); cfg.lineWidth = W*0.065; cfg.lineCap="round"; cfg.lineJoin="round"; cfg.fillStyle = getCss('--demo');
      let si = 0, idx = 1;
      function step(){
        if (si >= strokes.length){ demoRunning = false; if (typeof onDone === "function") onDone(); return; }
        const pts = strokes[si];
        if (pts.length === 1){ cfg.beginPath(); cfg.arc(pts[0][0],pts[0][1],W*0.032,0,7); cfg.fill(); si++; setTimeout(step,280); return; }
        if (idx < pts.length){
          cfg.beginPath(); cfg.moveTo(pts[idx-1][0],pts[idx-1][1]); cfg.lineTo(pts[idx][0],pts[idx][1]); cfg.stroke();
          idx += 2; requestAnimationFrame(step);
        } else { si++; idx = 1; setTimeout(step,220); }
      }
      step();
    }

    function pos(e){ const r = fg.getBoundingClientRect(); return [ (e.clientX-r.left)*(W/r.width), (e.clientY-r.top)*(W/r.height) ]; }
    fg.addEventListener("pointerdown", e => {
      if (demoRunning) {
        return;
      }
      drawing = true;
      if (typeof fg.setPointerCapture === "function") {
        fg.setPointerCapture(e.pointerId);
      }
      last = pos(e);
      cfg.strokeStyle = getCss('--ink');
      cfg.lineWidth = W*0.055;
      cfg.lineCap = "round";
      cfg.lineJoin = "round";
      cfg.beginPath();
      cfg.arc(last[0],last[1],W*0.028,0,7);
      cfg.fillStyle = getCss('--ink');
      cfg.fill();
    });
    fg.addEventListener("pointermove", e => { if(!drawing) return; const p=pos(e); cfg.beginPath(); cfg.moveTo(last[0],last[1]); cfg.lineTo(p[0],p[1]); cfg.stroke(); last=p; });
    globalThis.addEventListener("pointerup", () => { drawing=false; });

    return {
      fit,
      redraw(){ demoRunning = false; drawGuide(); clearInk(); },
      clearInk,
      playDemo
    };
  }

  const padU = makePad(document.getElementById("stageU"), () => U[current]);
  const padL = makePad(document.getElementById("stageL"), () => L[current.toLowerCase()]);

  /* ===== UI 갱신 ===== */
  function renderStrip(){
    const strip = document.getElementById("strip");
    strip.innerHTML = "";
    let activeBtn = null;
    LETTERS.forEach(L0 => {
      const b = document.createElement("button");
      b.className = "lchip";
      if (learned.has(L0)) b.classList.add("done");
      if (L0 === current){ b.classList.add("active"); activeBtn = b; }
      b.textContent = L0;
      b.addEventListener("click", () => { current = L0; refresh(); });
      strip.appendChild(b);
    });
    if (activeBtn && strip.scrollWidth > strip.clientWidth + 4){ activeBtn.scrollIntoView({ block:"nearest", inline:"center" }); }
  }
  function renderProgress(){
    document.getElementById("pdone").textContent = learned.size;
    document.getElementById("pfill").style.transform = "scaleX(" + (learned.size/26) + ")";
  }
  function renderReading(){
    const w = WORDS[current];
    document.getElementById("bigLetter").textContent = current + " " + current.toLowerCase();
    document.getElementById("kwLetter").textContent = current;
    document.getElementById("kwWord").textContent = w[0];
    document.getElementById("kwEmoji").textContent = w[1];
    document.getElementById("prevBtn").disabled = (current === "A");
    document.getElementById("nextBtn").disabled = (current === "Z");
    const pl = document.getElementById("pickLabel"); if (pl) pl.textContent = current;
  }
  function refresh(){
    const pp = document.getElementById("pickPanel"); if (pp) pp.hidden = true;
    renderStrip(); renderProgress(); renderReading();
    padU.redraw(); padL.redraw();
  }

  /* ===== 이벤트 ===== */
  document.getElementById("demoBtn").addEventListener("click", () => {
    // 대문자 시범을 끝까지 보여준 뒤, 잠깐 쉬고 소문자 시범 시작 (동시에 써지지 않도록)
    padL.clearInk();
    padU.playDemo(() => setTimeout(() => padL.playDemo(), 400));
  });
  document.getElementById("clearBtn").addEventListener("click", () => { padU.clearInk(); padL.clearInk(); });
  document.getElementById("sayBtn").addEventListener("click", sayLetter);
  document.getElementById("learnBtn").addEventListener("click", () => {
    learned.add(current); saveProgress();
    renderStrip(); renderProgress();
    const i = LETTERS.indexOf(current);
    if (i < 25){ current = LETTERS[i+1]; refresh(); }
    else { refresh(); }
  });
  document.getElementById("prevBtn").addEventListener("click", () => {
    const i = LETTERS.indexOf(current);
    if (i > 0) {
      current = LETTERS[i-1];
      refresh();
    }
  });
  document.getElementById("nextBtn").addEventListener("click", () => {
    const i = LETTERS.indexOf(current);
    if (i < 25) {
      current = LETTERS[i+1];
      refresh();
    }
  });
  document.getElementById("pickBtn").addEventListener("click", () => {
    const p = document.getElementById("pickPanel"); p.hidden = !p.hidden;
    if (!p.hidden) {
      const a = p.querySelector(".lchip.active");
      if (a) {
        a.scrollIntoView({ block:"nearest", inline:"center" });
      }
    }
  });

  let rT;
  globalThis.addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(() => { padU.fit(); padL.fit(); }, 150); });

  // 시작 — 아직 안 쓴 첫 글자부터
  function firstUnlearned(){
    for (const L0 of LETTERS) {
      if (!learned.has(L0)) {
        return L0;
      }
    }
    return "A";
  }
  current = firstUnlearned();
  renderStrip(); renderProgress(); renderReading();
  padU.fit(); padL.fit();
