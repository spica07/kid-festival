// 학습 코스 페이지 공용 모듈: 캐러셀 CSS 주입, TTS(자연스러운 음성 선택), 보상(스트릭/스티커) 패널, 카드 캐러셀.
// english-course.js / korean-course.js / math-course.js 등에서 사용하며, HTML에서 이 파일을 코스 스크립트보다 먼저 로드한다.
(function () {
  function ensureCarouselCss() {
    if (document.querySelector("link[data-course-carousel]")) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../../assets/css/english-carousel.css";
    link.setAttribute("data-course-carousel", "");
    document.head.appendChild(link);
  }

  // 음성 목록을 미리 로드(브라우저는 비동기로 채우므로 한 번 트리거해 둔다)
  if ("speechSynthesis" in window) {
    try { window.speechSynthesis.getVoices(); window.speechSynthesis.addEventListener("voiceschanged", function () {}); } catch (e) {}
  }

  // 해당 언어에서 가장 자연스러운 음성을 고른다(기기 내장 구형 음성은 기계적이라 Natural/Online/Google 우선).
  // 그림동화(story-reader)에서 검증된 원래 로직 그대로 — 호출 시마다 최신 목록을 조회한다.
  function pickVoiceFor(lang) {
    try {
      const base = lang.slice(0, 2).toLowerCase();
      const vs = window.speechSynthesis.getVoices() || [];
      const cand = vs.filter(function (v) { return (v.lang || "").toLowerCase().indexOf(base) === 0; });
      if (!cand.length) return null;
      function score(v) {
        const n = (v.name || "").toLowerCase();
        if (n.indexOf("natural") >= 0 || n.indexOf("google") >= 0) return 4;
        if (n.indexOf("online") >= 0 || n.indexOf("neural") >= 0) return 3;
        if (n.indexOf("heami") >= 0 || n.indexOf("zira") >= 0 || n.indexOf("david") >= 0) return 1; // 구형 SAPI
        return 2;
      }
      return cand.slice().sort(function (a, b) { return score(b) - score(a); })[0] || null;
    } catch (e) { return null; }
  }

  // 그림동화 낭독과 동일한 기준: 영어 0.9 / 한국어 0.95, pitch 1.05
  function defaultRate(lang) {
    return String(lang).slice(0, 2).toLowerCase() === "en" ? 0.9 : 0.95;
  }

  function speak(text, opts) {
    try {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const lang = (opts && opts.lang) || "ko-KR";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      const voice = pickVoiceFor(lang);
      if (voice) utterance.voice = voice;
      utterance.rate = (opts && opts.rate) || defaultRate(lang);
      utterance.pitch = (opts && opts.pitch) || 1.05;
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }

  function createSpeaker(opts) {
    return function (text) { speak(text, opts); };
  }

  // 완료한 Day 집합을 localStorage에 저장/복원
  function createProgress(storageKey) {
    return {
      load: function () {
        try {
          return new Set(JSON.parse(localStorage.getItem(storageKey)) || []);
        } catch (e) {
          return new Set();
        }
      },
      save: function (doneSet) {
        try {
          localStorage.setItem(storageKey, JSON.stringify([...doneSet]));
        } catch (e) {}
      }
    };
  }

  function createRewards(storageKey) {
    const STREAK_GOAL = 5;
    const STREAK_KEY = storageKey + "_streak";
    const STICKER_KEY = storageKey + "_stickers";
    const STICKER_LABELS = ["별", "왕관", "리본", "메달", "깃발", "하트"];

    function todayKey(date) {
      const d = date || new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return y + "-" + m + "-" + day;
    }

    function dateFromKey(key) {
      const parts = String(key || "").split("-").map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) return null;
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function loadStreakDates() {
      try {
        const arr = JSON.parse(localStorage.getItem(STREAK_KEY)) || [];
        return Array.from(new Set(arr.filter((v) => /^\d{4}-\d{2}-\d{2}$/.test(v)))).sort();
      } catch (e) {
        return [];
      }
    }

    function saveStreakDates() {
      try {
        localStorage.setItem(STREAK_KEY, JSON.stringify(streakDates));
      } catch (e) {}
    }

    let streakDates = loadStreakDates();

    function loadStickers() {
      try {
        const arr = JSON.parse(localStorage.getItem(STICKER_KEY)) || [];
        return Array.from(new Set(arr.map(Number).filter((v) => Number.isInteger(v) && v > 0))).sort((a, b) => a - b);
      } catch (e) {
        return [];
      }
    }

    function saveStickers() {
      try {
        localStorage.setItem(STICKER_KEY, JSON.stringify(stickers));
      } catch (e) {}
    }

    let stickers = loadStickers();

    function stickerLabel(day) {
      return STICKER_LABELS[(day - 1) % STICKER_LABELS.length];
    }

    function ensureStreakStyles() {
      if (document.querySelector("style[data-course-streak]")) return;
      const style = document.createElement("style");
      style.setAttribute("data-course-streak", "");
      style.textContent =
        ".streak-panel{background:white;border:1px solid #eef2ff;border-radius:16px;padding:12px 16px;margin:-8px 0 18px;box-shadow:0 6px 22px rgba(0,0,0,0.04);}" +
        ".streak-row{display:flex;justify-content:space-between;gap:10px;align-items:center;font-size:14px;font-weight:700;color:#4b5563;}" +
        ".streak-row b{color:#7c3aed;font-size:18px;}" +
        ".streak-bar{height:8px;background:#f3f4f6;border-radius:999px;overflow:hidden;margin-top:9px;}" +
        ".streak-fill{height:100%;background:linear-gradient(90deg,#8b5cf6,#34d399);border-radius:999px;transition:width .3s ease;}" +
        ".sticker-row{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-top:10px;font-size:13px;color:#4b5563;}" +
        ".sticker-row b{color:#db2777;font-size:17px;}" +
        ".sticker-list{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end;}" +
        ".sticker-chip{display:inline-flex;align-items:center;min-height:24px;padding:4px 8px;border-radius:999px;background:#fff7ed;border:1px solid #fed7aa;color:#9a3412;font-size:12px;}" +
        ".reward-pop{position:fixed;left:50%;top:18px;z-index:9999;transform:translateX(-50%);background:white;border:2px solid #fbbf24;border-radius:18px;padding:12px 18px;box-shadow:0 12px 32px rgba(0,0,0,.18);font-size:16px;font-weight:800;color:#92400e;animation:rewardIn .9s ease forwards;}" +
        "@keyframes rewardIn{0%{opacity:0;transform:translate(-50%,-18px) scale(.92);}25%{opacity:1;transform:translate(-50%,0) scale(1.04);}100%{opacity:0;transform:translate(-50%,-8px) scale(1);}}";
      document.head.appendChild(style);
    }

    function currentStreakCount() {
      const set = new Set(streakDates);
      const today = new Date();
      let anchor = set.has(todayKey(today)) ? today : new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
      let count = 0;
      while (set.has(todayKey(anchor))) {
        count += 1;
        anchor.setDate(anchor.getDate() - 1);
      }
      return count;
    }

    function weeklyCount() {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
      const end = new Date(start);
      end.setDate(start.getDate() + 7);
      return streakDates.filter((key) => {
        const d = dateFromKey(key);
        return d && d >= start && d < end;
      }).length;
    }

    function recordStudyDate() {
      const key = todayKey();
      if (!streakDates.includes(key)) {
        streakDates.push(key);
        streakDates.sort();
        saveStreakDates();
      }
    }

    function showReward(day) {
      const pop = document.createElement("div");
      pop.className = "reward-pop";
      pop.textContent = "스티커 획득: " + stickerLabel(day) + " Day " + day;
      document.body.appendChild(pop);
      setTimeout(() => pop.remove(), 950);
    }

    function awardSticker(day) {
      if (stickers.includes(day)) return;
      stickers.push(day);
      stickers.sort((a, b) => a - b);
      saveStickers();
      showReward(day);
    }

    function resetAll() {
      streakDates = [];
      saveStreakDates();
      stickers = [];
      saveStickers();
    }

    function updateStreakPanel() {
      ensureStreakStyles();
      const wrap = document.querySelector(".progress-wrap");
      if (!wrap) return;
      let panel = document.getElementById("streakPanel");
      if (!panel) {
        panel = document.createElement("div");
        panel.id = "streakPanel";
        panel.className = "streak-panel";
        wrap.insertAdjacentElement("afterend", panel);
      }
      const streak = currentStreakCount();
      const week = weeklyCount();
      const pct = Math.min(100, Math.round((week / STREAK_GOAL) * 100));
      const recent = stickers.slice(-6).map((day) => {
        return '<span class="sticker-chip">' + stickerLabel(day) + " " + day + "</span>";
      }).join("");
      panel.innerHTML =
        '<div class="streak-row"><span><b>' + streak + "</b>일 연속 학습</span>" +
        '<span>이번 주 <b>' + week + "</b>/" + STREAK_GOAL + "일</span></div>" +
        '<div class="streak-bar"><div class="streak-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="sticker-row"><span>모은 스티커 <b>' + stickers.length + '</b>개</span>' +
        '<div class="sticker-list">' + (recent || '<span class="sticker-chip">완료하면 쌓여요</span>') + "</div></div>";
    }

    return {
      recordStudyDate: recordStudyDate,
      awardSticker: awardSticker,
      resetAll: resetAll,
      updateStreakPanel: updateStreakPanel
    };
  }

  function setupCarousel(root) {
    const track = root.querySelector("#wcTrack");
    if (!track) return;
    const slides = Array.prototype.slice.call(track.children);
    const dots = Array.prototype.slice.call(root.querySelectorAll("#wcDots .wc-dot"));
    const prevArrow = root.querySelector(".wc-prev");
    const nextArrow = root.querySelector(".wc-next");
    const lastIdx = slides.length - 1;

    function currentIndex() {
      if (!track.clientWidth) return 0;
      return Math.round(track.scrollLeft / track.clientWidth);
    }

    function syncControls(idx) {
      dots.forEach((dot, i) => dot.classList.toggle("active", i === idx));
      if (prevArrow) prevArrow.classList.toggle("is-hidden", idx <= 0);
      if (nextArrow) nextArrow.classList.toggle("is-hidden", idx >= lastIdx);
    }

    function goTo(idx) {
      idx = Math.max(0, Math.min(lastIdx, idx));
      track.scrollTo({ left: idx * track.clientWidth, behavior: "smooth" });
      syncControls(idx);
    }

    if (prevArrow) prevArrow.addEventListener("click", () => goTo(currentIndex() - 1));
    if (nextArrow) nextArrow.addEventListener("click", () => goTo(currentIndex() + 1));
    dots.forEach((dot) => {
      dot.addEventListener("click", () => goTo(parseInt(dot.getAttribute("data-idx"), 10)));
    });

    let ticking = false;
    track.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        syncControls(currentIndex());
        ticking = false;
      });
    });

    syncControls(0);
  }

  window.CourseCommon = {
    ensureCarouselCss: ensureCarouselCss,
    pickVoiceFor: pickVoiceFor,
    speak: speak,
    createSpeaker: createSpeaker,
    createProgress: createProgress,
    createRewards: createRewards,
    setupCarousel: setupCarousel
  };
})();
