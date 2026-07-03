  const courses = [
    { file: "english-30days.html", emoji: "🦁", name: "사자 레오", theme: "동물·색·숫자 기초", key: "english30_done", age: 6, c1: "#fbbf24", c2: "#f97316", soft: "#fde68a" },
    { file: "english-bunny.html",  emoji: "🐰", name: "토끼 바니", theme: "생활 속 영어 (하루 일과)", key: "english_bunny_done", age: 6, c1: "#f472b6", c2: "#ec4899", soft: "#fbcfe8" },
    { file: "english-puppy.html",  emoji: "🐶", name: "강아지 퍼피", theme: "바깥세상 (날씨·교통)", key: "english_puppy_done", age: 6, c1: "#38bdf8", c2: "#2563eb", soft: "#bae6fd" },
    { file: "english-coco.html",   emoji: "🐻", name: "곰돌이 코코", theme: "맛있는 영어 (음식)", key: "english_coco_done", age: 6, c1: "#fb923c", c2: "#c2410c", soft: "#fed7aa" },
    { file: "english-ping.html",   emoji: "🐧", name: "펭귄 핑", theme: "신나는 놀이 (운동·몸)", key: "english_ping_done", age: 6, c1: "#22d3ee", c2: "#0891b2", soft: "#cffafe" },
    { file: "english-owly.html",   emoji: "🦉", name: "부엉이 올리", theme: "똑똑한 영어 (모양·반대말)", key: "english_owly_done", age: 6, c1: "#a78bfa", c2: "#7c3aed", soft: "#ddd6fe" },
    { file: "english-phonics-7.html", emoji: "🔤", name: "예비초등 파닉스", theme: "짧은 소리·이중자음·단어 읽기", key: "english_phonics7_done", age: 7, c1: "#818cf8", c2: "#4f46e5", soft: "#c7d2fe" },
    { file: "english-school-7.html", emoji: "🎒", name: "학교생활 영어", theme: "교실 표현·도움 요청·수업 말하기", key: "english_school7_done", age: 7, c1: "#22c55e", c2: "#15803d", soft: "#bbf7d0" },
    { file: "english-sentences-7.html", emoji: "💬", name: "문장 말하기", theme: "I am·I like·질문과 대답", key: "english_sentences7_done", age: 7, c1: "#06b6d4", c2: "#0e7490", soft: "#cffafe" },
    { file: "english-reading-7.html", emoji: "📖", name: "리딩 첫걸음", theme: "짧은 문장 읽기와 뜻 이해", key: "english_reading7_done", age: 7, c1: "#f59e0b", c2: "#b45309", soft: "#fde68a" },
    { file: "english-vocab-7.html", emoji: "🧠", name: "초등 준비 어휘", theme: "학교·감정·자연·위치 필수 낱말", key: "english_vocab7_done", age: 7, c1: "#fb7185", c2: "#be123c", soft: "#fecdd3" },
  ];
  window.EXTRA_HUB_CARDS = [
    {
      file: "english-abc.html",
      emoji: "✏️",
      name: "알파벳 쓰기",
      theme: "A-Z 대문자·소문자 따라쓰기",
      done: (function(){ try { const pair = JSON.parse(localStorage.getItem("abc_done")) || []; const upper = JSON.parse(localStorage.getItem("abc_upper_done")) || []; const lower = JSON.parse(localStorage.getItem("abc_lower_done")) || []; const pairedDone = Array.isArray(pair) ? pair.length * 2 : 0; const splitDone = (Array.isArray(upper) ? upper.length : 0) + (Array.isArray(lower) ? lower.length : 0); return Math.min(52, Math.max(pairedDone, splitDone)); } catch(e) { return 0; } })(),
      total: 52,
      unit: "개",
      age: 6,
      c1: "#38bdf8",
      c2: "#6366f1",
      soft: "#c7d2fe",
      startLabel: "쓰기 연습 →",
    },
  ];
