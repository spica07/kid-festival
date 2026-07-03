/* 무지개 숲 주사위 여행 — 주사위를 굴려 30번 골인 칸에 먼저 도착하는 유아용 말판 게임.
   무지개 칸은 위로 슝, 구름 미끄럼틀 칸은 주르륵 아래로, 별 칸은 한 번 더 굴린다.
   진행 안내는 음성으로 읽어준다(음성 선택·속도는 그림동화와 동일한 course-common.js 기준). */
(function () {
  'use strict';

  var COLS = 5, ROWS = 6, GOAL = 30;

  // 특별 칸: 무지개(위로), 구름 미끄럼틀(아래로), 별(한 번 더)
  var RAINBOWS = { 3: 11, 8: 16, 15: 23, 21: 29 };
  var SLIDES = { 13: 6, 26: 17 };
  var STARS = { 5: true, 18: true, 25: true };

  // 일반 칸 꾸밈 이모지 (✨는 무지개 도착 칸)
  var DECOR = {
    1: '🌱', 2: '🌼', 4: '🐌', 6: '🍄', 7: '🌷', 9: '🐛', 10: '🍀',
    11: '✨', 12: '🦋', 14: '🌻', 16: '✨', 17: '🌳', 19: '🐿️', 20: '🍎',
    22: '🐞', 23: '✨', 24: '🌺', 27: '🦜', 28: '🍇', 29: '✨'
  };

  var POOL = [
    { emoji: '🐰', name: '토끼', color: '#FFB5D8' },
    { emoji: '🐻', name: '곰돌이', color: '#FFC078' },
    { emoji: '🐸', name: '개구리', color: '#A8E6A8' },
    { emoji: '🐥', name: '병아리', color: '#FFE066' }
  ];

  // 주사위 눈 배치 (grid-area 이름)
  var PIPS = {
    1: ['e'],
    2: ['a', 'i'],
    3: ['a', 'e', 'i'],
    4: ['a', 'c', 'g', 'i'],
    5: ['a', 'c', 'e', 'g', 'i'],
    6: ['a', 'c', 'd', 'f', 'g', 'i']
  };

  var board = document.getElementById('djBoard');
  var startTok = document.getElementById('djStartTok');
  var dice = document.getElementById('djDice');
  var rollBtn = document.getElementById('djRoll');
  var statusEl = document.getElementById('djStatus');
  var playersEl = document.getElementById('djPlayers');
  var winBox = document.getElementById('djWin');
  var winTitle = document.getElementById('djWinTitle');
  var winText = document.getElementById('djWinText');
  var againBtn = document.getElementById('djAgain');
  var confettiEl = document.getElementById('djConfetti');
  var countBtns = document.querySelectorAll('#countGroup .level-btn');
  var soundBtn = document.getElementById('soundBtn');

  var playerCount = 2;
  var players = [];
  var cur = 0;
  var busy = false;
  var finished = false;
  var soundOn = true;
  var tileTok = {};   // 칸 번호 → 말을 담는 컨테이너
  var chips = [];     // 참가자 표시 칩

  function speak(text) {
    if (!soundOn) return;
    CourseCommon.speak(text, { lang: 'ko-KR' });
  }

  function announce(text, spoken) {
    statusEl.textContent = text;
    speak(spoken || text);
  }

  // n번 칸의 격자 위치 (1번이 왼쪽 아래, 지그재그로 올라감)
  function gridPos(n) {
    var r = Math.floor((n - 1) / COLS);      // 아래에서부터 몇 번째 줄
    var c = (n - 1) % COLS;
    if (r % 2 === 1) c = COLS - 1 - c;
    return { row: ROWS - r, col: c + 1 };
  }

  function buildBoard() {
    board.innerHTML = '';
    tileTok = {};
    for (var n = 1; n <= GOAL; n++) {
      var pos = gridPos(n);
      var tile = document.createElement('div');
      var cls = 'dj-tile';
      var decor = DECOR[n] || '';
      var jump = '';
      if (RAINBOWS[n]) { cls += ' rainbow'; decor = '🌈'; jump = '→' + RAINBOWS[n]; }
      else if (SLIDES[n]) { cls += ' slide'; decor = '☁️'; jump = '→' + SLIDES[n]; }
      else if (STARS[n]) { cls += ' star'; decor = '⭐'; jump = '한 번 더!'; }
      else if (n === GOAL) { cls += ' goal'; decor = '🏆'; jump = '골인!'; }
      tile.className = cls;
      tile.innerHTML = '<span class="dj-num">' + n + '</span>' +
        (decor ? '<span class="dj-decor" aria-hidden="true">' + decor + '</span>' : '') +
        (jump ? '<span class="dj-jump">' + jump + '</span>' : '') +
        '<span class="dj-tok"></span>';
      tile.style.gridRow = String(pos.row);
      tile.style.gridColumn = String(pos.col);
      board.appendChild(tile);
      tileTok[n] = tile.querySelector('.dj-tok');
    }
  }

  function setDice(v) {
    dice.innerHTML = PIPS[v].map(function (area) {
      return '<span class="dj-pip" style="grid-area:' + area + '"></span>';
    }).join('');
  }

  function makeToken(p) {
    var el = document.createElement('span');
    el.className = 'dj-token';
    el.style.background = p.color;
    el.textContent = p.emoji;
    el.setAttribute('title', p.name);
    return el;
  }

  function placeToken(p, animate, flyCls) {
    var target = p.pos === 0 ? startTok : tileTok[p.pos];
    target.appendChild(p.el);
    if (animate) {
      p.el.classList.remove('hop', 'fly');
      void p.el.offsetWidth; // 애니메이션 재시작
      p.el.classList.add(flyCls || 'hop');
    }
  }

  function renderChips() {
    playersEl.innerHTML = '';
    chips = [];
    players.forEach(function (p) {
      var chip = document.createElement('div');
      chip.className = 'dj-player';
      chip.style.setProperty('--pc', p.color);
      chip.innerHTML = '<span class="dj-player-emoji">' + p.emoji + '</span>' +
        '<span class="dj-player-name">' + p.name + '</span>' +
        '<span class="dj-player-pos"></span>';
      playersEl.appendChild(chip);
      chips.push(chip);
    });
    updateChips();
  }

  function updateChips() {
    players.forEach(function (p, i) {
      chips[i].classList.toggle('current', i === cur && !finished);
      chips[i].querySelector('.dj-player-pos').textContent =
        p.pos === 0 ? '출발' : (p.pos >= GOAL ? '골인!' : p.pos + '번');
    });
  }

  function setTurnUI() {
    var p = players[cur];
    updateChips();
    statusEl.textContent = p.emoji + ' ' + p.name + ' 차례예요! 주사위를 눌러요';
    rollBtn.textContent = '🎲 ' + p.name + ' 굴리기!';
  }

  function onRoll() {
    if (busy || finished) return;
    busy = true;
    rollBtn.disabled = true;
    dice.classList.add('rolling');
    var ticks = 0;
    var iv = setInterval(function () {
      setDice(1 + Math.floor(Math.random() * 6));
      ticks++;
      if (ticks >= 9) {
        clearInterval(iv);
        var v = 1 + Math.floor(Math.random() * 6);
        setDice(v);
        dice.classList.remove('rolling');
        var p = players[cur];
        announce(p.emoji + ' ' + v + '이(가) 나왔어요! ' + v + '칸 앞으로!', p.name + ', ' + v + '칸 앞으로!');
        setTimeout(function () { moveSteps(p, v); }, 450);
      }
    }, 80);
  }

  function moveSteps(p, steps) {
    if (steps <= 0 || p.pos >= GOAL) { landed(p); return; }
    p.pos++;
    placeToken(p, true);
    updateChips();
    setTimeout(function () { moveSteps(p, steps - 1); }, 320);
  }

  function landed(p) {
    if (p.pos >= GOAL) { win(p); return; }
    var to = RAINBOWS[p.pos];
    if (to) {
      announce('🌈 무지개를 타고 슝~ ' + to + '번으로 올라가요!', '무지개를 타고 슝! 위로 올라가요!');
      setTimeout(function () {
        p.pos = to;
        placeToken(p, true, 'fly');
        updateChips();
        finishTurn(false);
      }, 900);
      return;
    }
    to = SLIDES[p.pos];
    if (to) {
      announce('☁️ 앗, 구름 미끄럼틀! 주르륵~ ' + to + '번으로 내려가요', '앗, 구름 미끄럼틀! 주르륵 내려가요');
      setTimeout(function () {
        p.pos = to;
        placeToken(p, true, 'fly');
        updateChips();
        finishTurn(false);
      }, 900);
      return;
    }
    if (STARS[p.pos]) {
      announce('⭐ 별님의 선물! ' + p.name + ' 한 번 더 굴려요!', '별님의 선물! 한 번 더 굴려요!');
      finishTurn(true);
      return;
    }
    finishTurn(false);
  }

  function finishTurn(again) {
    setTimeout(function () {
      if (!again) cur = (cur + 1) % players.length;
      busy = false;
      rollBtn.disabled = false;
      setTurnUI();
    }, again ? 1000 : 700);
  }

  function confetti() {
    var emojis = ['🎉', '🌟', '🎈', '🌸', '⭐', '💛'];
    for (var i = 0; i < 36; i++) {
      var s = document.createElement('span');
      s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      s.style.left = (Math.random() * 100) + '%';
      s.style.animationDuration = (2.2 + Math.random() * 1.8) + 's';
      s.style.animationDelay = (Math.random() * 0.8) + 's';
      confettiEl.appendChild(s);
    }
    setTimeout(function () { confettiEl.innerHTML = ''; }, 4200);
  }

  function win(p) {
    finished = true;
    busy = false;
    rollBtn.disabled = true;
    p.pos = GOAL;
    placeToken(p, true, 'fly');
    updateChips();
    statusEl.textContent = '🏆 ' + p.emoji + ' ' + p.name + ' 골인!';
    winTitle.textContent = '🎉 ' + p.emoji + ' ' + p.name + ' 승리!';
    winText.textContent = p.name + '가 30번 골인 깃발에 가장 먼저 도착했어요! 모두 잘했어요!';
    winBox.hidden = false;
    confetti();
    speak(p.name + '가 일등이에요! 축하해요!');
  }

  function reset() {
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
    busy = false;
    finished = false;
    cur = 0;
    winBox.hidden = true;
    confettiEl.innerHTML = '';
    players = POOL.slice(0, playerCount).map(function (base) {
      var p = { emoji: base.emoji, name: base.name, color: base.color, pos: 0 };
      p.el = makeToken(p);
      return p;
    });
    startTok.innerHTML = '';
    buildBoard();
    players.forEach(function (p) { placeToken(p, false); });
    renderChips();
    setDice(6);
    rollBtn.disabled = false;
    setTurnUI();
  }

  countBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      countBtns.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      playerCount = parseInt(b.dataset.count, 10) || 2;
      reset();
    });
  });

  soundBtn.addEventListener('click', function () {
    soundOn = !soundOn;
    soundBtn.classList.toggle('active', soundOn);
    soundBtn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
    soundBtn.textContent = soundOn ? '🔊 소리' : '🔇 소리';
    if (!soundOn) {
      try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
    }
  });

  rollBtn.addEventListener('click', onRoll);
  dice.addEventListener('click', onRoll); // 주사위 자체를 눌러도 굴러가요
  againBtn.addEventListener('click', reset);

  reset();
})();
