  /* 좌표 0~100. 각 숫자 = 획(점 배열) 모음. 한 자리는 가운데, 10은 1(왼쪽)+0(오른쪽). */
  const DIGIT = {
    "0": [ [[50,20],[34,30],[28,50],[34,70],[50,80],[66,70],[72,50],[66,30],[50,20]] ],
    "1": [ [[40,30],[52,18],[52,82]] ],
    "2": [ [[33,30],[44,19],[58,21],[63,34],[54,47],[30,82],[70,82]] ],
    "3": [ [[34,26],[47,18],[60,25],[58,38],[46,49],[60,53],[66,68],[52,82],[37,80],[30,71]] ],
    "4": [ [[55,20],[26,60],[74,60]], [[55,20],[55,82]] ],
    "5": [ [[62,18],[36,18],[34,47]], [[34,47],[50,43],[66,53],[64,70],[50,82],[34,80],[27,71]] ],
    "6": [ [[63,24],[48,18],[36,28],[29,50],[31,70],[44,82],[58,80],[67,68],[63,55],[49,49],[37,54],[31,64]] ],
    "7": [ [[30,18],[72,18],[44,82]] ],
    "8": [ [[50,18],[38,24],[37,38],[50,47],[64,56],[66,70],[50,82],[34,70],[36,56],[50,47],[63,38],[62,24],[50,18]] ],
    "9": [ [[52,20],[39,26],[34,40],[42,51],[55,51],[63,40],[60,27],[52,20]], [[62,40],[58,82]] ]
  };
  function shiftScaleX(strokes, k, dx){ return strokes.map(st => st.map(p => [p[0]*k + dx, p[1]])); }

  const DIGITS = [
    { ch: "1", read: "하나 · 일", say: "일" },
    { ch: "2", read: "둘 · 이", say: "이" },
    { ch: "3", read: "셋 · 삼", say: "삼" },
    { ch: "4", read: "넷 · 사", say: "사" },
    { ch: "5", read: "다섯 · 오", say: "오" },
    { ch: "6", read: "여섯 · 육", say: "육" },
    { ch: "7", read: "일곱 · 칠", say: "칠" },
    { ch: "8", read: "여덟 · 팔", say: "팔" },
    { ch: "9", read: "아홉 · 구", say: "구" },
    { ch: "10", read: "열 · 십", say: "십" }
  ];
  DIGITS.forEach((d, i) => {
    d.count = "🍎".repeat(i + 1);
    if (d.ch === "10") d.strokes = shiftScaleX(DIGIT["1"], 0.42, 8.7).concat(shiftScaleX(DIGIT["0"], 0.42, 47));
    else d.strokes = DIGIT[d.ch];
  });

  let idx = 0;
  const KEY = "math_numbers_done";
  function loadSet(){ try { return new Set(JSON.parse(localStorage.getItem(KEY)) || []); } catch(e){ return new Set(); } }
  function saveSet(s){ try { localStorage.setItem(KEY, JSON.stringify([...s])); } catch(e){} }
  let learned = loadSet();
  function cur(){ return DIGITS[idx]; }

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
    cbg.strokeStyle = "#eefdf5"; cbg.lineWidth = 1.5; cbg.setLineDash([6,6]);
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
    strokes.forEach(st => {
      const sp = smooth(st);
      if (sp.length > 2){
        const a=sp[sp.length-2], b=sp[sp.length-1];
        const ang=Math.atan2(b[1]-a[1],b[0]-a[0]); const s=W*0.04;
        cbg.fillStyle="#6ee7b7"; cbg.beginPath();
        cbg.moveTo(b[0],b[1]);
        cbg.lineTo(b[0]-s*Math.cos(ang-0.5), b[1]-s*Math.sin(ang-0.5));
        cbg.lineTo(b[0]-s*Math.cos(ang+0.5), b[1]-s*Math.sin(ang+0.5));
        cbg.closePath(); cbg.fill();
      }
    });
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
      cbg.strokeStyle="#a7f3d0"; cbg.lineWidth=1.5;
      cbg.beginPath(); cbg.moveTo(bx,by); cbg.lineTo(start[0],start[1]); cbg.stroke();
      cbg.fillStyle="#059669"; cbg.beginPath(); cbg.arc(start[0],start[1],W*0.013,0,7); cbg.fill();
      cbg.beginPath(); cbg.arc(bx,by,rad,0,7); cbg.fillStyle="#059669"; cbg.fill();
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
    DIGITS.forEach((d,i) => {
      const b=document.createElement("button");
      b.className="lchip";
      if (learned.has(d.ch)) b.classList.add("done");
      if (i===idx){ b.classList.add("active"); activeBtn=b; }
      b.textContent=d.ch;
      b.addEventListener("click", () => { idx=i; refresh(); });
      strip.appendChild(b);
    });
    if (activeBtn && strip.scrollWidth > strip.clientWidth+4) activeBtn.scrollIntoView({ block:"nearest", inline:"center" });
  }
  function renderProgress(){
    document.getElementById("pdone").textContent = learned.size;
    document.getElementById("pfill").style.width = (learned.size/DIGITS.length*100) + "%";
  }
  function renderReading(){
    const d=cur();
    document.getElementById("bigCh").textContent = d.ch;
    document.getElementById("decomp").textContent = d.read;
    document.getElementById("hintword").textContent = d.count;
    document.getElementById("prevBtn").disabled = (idx===0);
    document.getElementById("nextBtn").disabled = (idx===DIGITS.length-1);
    const pl = document.getElementById("pickLabel"); if (pl) pl.textContent = d.ch;
  }
  function refresh(){ demoRunning=false; const pp=document.getElementById("pickPanel"); if (pp) pp.hidden=true; renderStrip(); renderProgress(); renderReading(); drawGuide(); clearInk(); }

  document.getElementById("demoBtn").addEventListener("click", playDemo);
  document.getElementById("clearBtn").addEventListener("click", clearInk);
  document.getElementById("sayBtn").addEventListener("click", () => speak(cur().say));
  document.getElementById("learnBtn").addEventListener("click", () => {
    learned.add(cur().ch); saveSet(learned); renderStrip(); renderProgress();
    if (idx<DIGITS.length-1){ idx++; refresh(); }
  });
  document.getElementById("prevBtn").addEventListener("click", () => { if (idx>0){ idx--; refresh(); } });
  document.getElementById("nextBtn").addEventListener("click", () => { if (idx<DIGITS.length-1){ idx++; refresh(); } });
  document.getElementById("pickBtn").addEventListener("click", () => {
    const p = document.getElementById("pickPanel"); p.hidden = !p.hidden;
    if (!p.hidden) { const a = p.querySelector(".lchip.active"); if (a) a.scrollIntoView({ block: "nearest", inline: "center" }); }
  });
  let rT;
  window.addEventListener("resize", () => { clearTimeout(rT); rT=setTimeout(fit,150); });

  // 시작 — 아직 안 쓴 첫 숫자부터
  for (let i=0;i<DIGITS.length;i++){ if (!learned.has(DIGITS[i].ch)){ idx=i; break; } }
  renderStrip(); renderProgress(); renderReading(); fit();
