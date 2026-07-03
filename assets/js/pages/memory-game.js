/* 메모리 카드 짝 맞추기 — 같은 카드 두 장을 찾는 기억력 게임.
   한글/영어 모드를 고를 수 있고, 카드를 뒤집으면 단어를 음성으로 읽어준다(Web Speech API).
   기록은 이 기기 localStorage에만 저장된다. */
(function () {
  'use strict';

  // 이모지 + 한글/영어 단어
  const ITEMS = [
    { emoji: '🍎', ko: '사과', en: 'apple' },
    { emoji: '🍌', ko: '바나나', en: 'banana' },
    { emoji: '🍓', ko: '딸기', en: 'strawberry' },
    { emoji: '🍉', ko: '수박', en: 'watermelon' },
    { emoji: '🐶', ko: '강아지', en: 'dog' },
    { emoji: '🐱', ko: '고양이', en: 'cat' },
    { emoji: '🐰', ko: '토끼', en: 'rabbit' },
    { emoji: '🦊', ko: '여우', en: 'fox' },
    { emoji: '🐻', ko: '곰', en: 'bear' },
    { emoji: '🐼', ko: '판다', en: 'panda' },
    { emoji: '🐯', ko: '호랑이', en: 'tiger' },
    { emoji: '🦁', ko: '사자', en: 'lion' },
    { emoji: '🐸', ko: '개구리', en: 'frog' },
    { emoji: '🐧', ko: '펭귄', en: 'penguin' },
    { emoji: '🐤', ko: '병아리', en: 'chick' },
    { emoji: '🦄', ko: '유니콘', en: 'unicorn' },
    { emoji: '🐙', ko: '문어', en: 'octopus' },
    { emoji: '🦋', ko: '나비', en: 'butterfly' },
    { emoji: '🐝', ko: '벌', en: 'bee' },
    { emoji: '🐢', ko: '거북이', en: 'turtle' },
    { emoji: '⭐', ko: '별', en: 'star' },
    { emoji: '🌈', ko: '무지개', en: 'rainbow' },
    { emoji: '🚗', ko: '자동차', en: 'car' },
    { emoji: '🚀', ko: '로켓', en: 'rocket' }
  ];

  const board = document.getElementById('memoryBoard');
  const statMatched = document.getElementById('statMatched');
  const statMoves = document.getElementById('statMoves');
  const statTime = document.getElementById('statTime');
  const statBest = document.getElementById('statBest');
  const winBox = document.getElementById('memoryWin');
  const winText = document.getElementById('winText');
  const playAgain = document.getElementById('playAgain');
  const levelBtns = document.querySelectorAll('.level-group:not(#modeGroup) .level-btn');
  const modeBtns = document.querySelectorAll('#modeGroup .level-btn');

  let pairs = 8;
  let mode = 'ko'; // 'ko' | 'en'
  let deck = [];
  let first = null, second = null;
  let lock = false;
  let moves = 0, matched = 0;
  let timer = null, seconds = 0, started = false;

  function wordOf(item) { return mode === 'en' ? item.en : item.ko; }
  function langCode() { return mode === 'en' ? 'en-US' : 'ko-KR'; }

  // 카드를 뒤집을 때 단어를 음성으로 읽어준다 (음성 선택·속도는 그림동화와 동일한 course-common.js 기준)
  function speak(text) {
    CourseCommon.speak(text, { lang: langCode() });
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function bestKey() { return 'kkoma:memoryBest:' + mode + ':' + pairs; }
  function loadBest() {
    try { const v = parseInt(localStorage.getItem(bestKey()), 10); return Number.isFinite(v) ? v : null; }
    catch (e) { return null; }
  }
  function saveBest(s) {
    try { const cur = loadBest(); if (cur === null || s < cur) localStorage.setItem(bestKey(), String(s)); }
    catch (e) {}
  }
  function fmt(s) { return s + '초'; }
  function renderBest() { const b = loadBest(); statBest.textContent = b === null ? '-' : fmt(b); }

  function startTimer() {
    if (started) return;
    started = true;
    timer = setInterval(function () { seconds++; statTime.textContent = fmt(seconds); }, 1000);
  }
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }

  function buildDeck() {
    const chosen = shuffle(ITEMS.slice()).slice(0, pairs);
    deck = shuffle(chosen.concat(chosen).map(function (item, i) {
      return { uid: i, key: item.emoji, item: item };
    }));
  }

  // 20장(10쌍)은 5열, 그 외(12·16장)는 4열
  function boardCols() { return pairs >= 10 ? 5 : 4; }

  function render() {
    board.className = 'memory-board cols-' + boardCols();
    board.innerHTML = '';
    deck.forEach(function (card) {
      const word = wordOf(card.item);
      const btn = document.createElement('button');
      btn.className = 'memory-card';
      btn.type = 'button';
      btn.setAttribute('aria-label', '뒤집힌 카드');
      btn.dataset.uid = String(card.uid);
      btn.innerHTML = '<span class="card-face card-back" aria-hidden="true">❓</span>' +
        '<span class="card-face card-front">' +
          '<span class="ci-emoji">' + card.item.emoji + '</span>' +
          '<span class="ci-word">' + word + '</span>' +
        '</span>';
      btn.addEventListener('click', function () { onFlip(btn, card); });
      board.appendChild(btn);
    });
  }

  function onFlip(btn, card) {
    if (lock) return;
    if (btn.classList.contains('flipped') || btn.classList.contains('matched')) return;
    startTimer();
    btn.classList.add('flipped');
    const word = wordOf(card.item);
    btn.setAttribute('aria-label', word + ' 카드');
    speak(word);

    if (!first) { first = { btn: btn, card: card }; return; }

    second = { btn: btn, card: card };
    moves++;
    statMoves.textContent = String(moves);

    if (first.card.key === second.card.key) {
      const a = first, b = second;
      a.btn.classList.add('matched'); b.btn.classList.add('matched');
      a.btn.disabled = true; b.btn.disabled = true;
      matched++;
      statMatched.textContent = matched + ' / ' + pairs;
      first = second = null;
      if (matched === pairs) finish();
    } else {
      lock = true;
      const a = first, b = second;
      setTimeout(function () {
        a.btn.classList.remove('flipped'); b.btn.classList.remove('flipped');
        a.btn.setAttribute('aria-label', '뒤집힌 카드');
        b.btn.setAttribute('aria-label', '뒤집힌 카드');
        first = second = null; lock = false;
      }, 900);
    }
  }

  function finish() {
    stopTimer();
    saveBest(seconds);
    renderBest();
    winText.textContent = seconds + '초 · 시도 ' + moves + '번 만에 모든 짝을 찾았어요!';
    winBox.hidden = false;
  }

  function reset() {
    stopTimer();
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
    first = second = null; lock = false;
    moves = 0; matched = 0; seconds = 0; started = false;
    statMoves.textContent = '0';
    statTime.textContent = fmt(0);
    statMatched.textContent = '0 / ' + pairs;
    winBox.hidden = true;
    buildDeck();
    render();
    renderBest();
  }

  levelBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      levelBtns.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      pairs = parseInt(b.dataset.pairs, 10) || 8;
      reset();
    });
  });

  modeBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      modeBtns.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      mode = b.dataset.mode === 'en' ? 'en' : 'ko';
      reset();
    });
  });

  playAgain.addEventListener('click', reset);

  reset();
})();
