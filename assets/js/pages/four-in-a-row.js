/* 사과·레몬 네 줄 서기 — 줄을 눌러 과일을 떨어뜨려 가로·세로·대각선 네 개를 먼저 만드는 사목 게임.
   둘이서(같은 기기) 또는 컴퓨터랑 놀 수 있다. 컴퓨터는 유아 상대에 맞춘 순한 실력:
   이길 수 있으면 이기고, 상대의 네 줄은 가끔 못 막는 척 넘어가 준다.
   안내는 음성으로 읽어준다(음성 선택·속도는 그림동화와 동일한 course-common.js 기준). */
(function () {
  'use strict';

  var COLS = 7, ROWS = 6;
  var TEAMS = [
    { key: 'apple', emoji: '🍎', name: '사과팀' },
    { key: 'lemon', emoji: '🍋', name: '레몬팀' }
  ];
  var CPU_BLOCK_CHANCE = 0.7;               // 컴퓨터가 상대의 네 줄을 막을 확률
  var CENTER_ORDER = [3, 2, 4, 1, 5, 0, 6]; // 가운데 줄을 좋아하는 순서

  var board = document.getElementById('frBoard');
  var statusEl = document.getElementById('frStatus');
  var winBox = document.getElementById('frWin');
  var winTitle = document.getElementById('frWinTitle');
  var winText = document.getElementById('frWinText');
  var againBtn = document.getElementById('frAgain');
  var newRoundBtn = document.getElementById('frNewRound');
  var confettiEl = document.getElementById('frConfetti');
  var appleWinsEl = document.getElementById('frAppleWins');
  var lemonWinsEl = document.getElementById('frLemonWins');
  var lemonNameEl = document.getElementById('frLemonName');
  var scoreApple = document.getElementById('frScoreApple');
  var scoreLemon = document.getElementById('frScoreLemon');
  var modeBtns = document.querySelectorAll('#frModeGroup .level-btn');
  var soundBtn = document.getElementById('frSoundBtn');

  var mode = 'pvp';        // 'pvp' | 'cpu' (컴퓨터는 레몬팀)
  var grid = [];           // grid[col][row] — row 0이 맨 아래, 값은 0(사과)/1(레몬)
  var cells = [];          // cells[col][rowFromTop] — 화면 칸
  var cols = [];           // 줄 버튼
  var turn = 0;
  var over = false;
  var busy = false;
  var wins = [0, 0];
  var soundOn = true;

  function speak(text) {
    if (!soundOn) return;
    CourseCommon.speak(text, { lang: 'ko-KR' });
  }

  function lemonLabel() { return mode === 'cpu' ? '🤖 컴퓨터' : '레몬팀'; }
  function teamLabel(t) { return t === 1 ? lemonLabel() : TEAMS[0].name; }

  function buildBoard() {
    board.innerHTML = '';
    grid = []; cells = []; cols = [];
    for (var c = 0; c < COLS; c++) {
      grid.push([]);
      cells.push([]);
      var colBtn = document.createElement('button');
      colBtn.type = 'button';
      colBtn.className = 'fr-col';
      colBtn.setAttribute('aria-label', (c + 1) + '번째 줄에 떨어뜨리기');
      colBtn.dataset.col = String(c);
      for (var r = 0; r < ROWS; r++) {
        var cell = document.createElement('span');
        cell.className = 'fr-cell';
        colBtn.appendChild(cell);
        cells[c].push(cell);
      }
      (function (cc) {
        colBtn.addEventListener('click', function () { onColumn(cc); });
      })(c);
      board.appendChild(colBtn);
      cols.push(colBtn);
    }
  }

  function setStatus() {
    if (over) return;
    var t = TEAMS[turn];
    if (mode === 'cpu' && turn === 1) {
      statusEl.textContent = '🤖 컴퓨터가 생각하고 있어요…';
    } else {
      statusEl.textContent = t.emoji + ' ' + teamLabel(turn) + ' 차례예요! 줄을 콕 눌러요';
    }
  }

  function updateScores() {
    appleWinsEl.textContent = String(wins[0]);
    lemonWinsEl.textContent = String(wins[1]);
    lemonNameEl.textContent = lemonLabel();
    scoreApple.classList.toggle('current', !over && turn === 0);
    scoreLemon.classList.toggle('current', !over && turn === 1);
  }

  function dropInto(c, team) {
    var r = grid[c].length;           // 아래에서부터 쌓인 높이
    grid[c].push(team);
    var cell = cells[c][ROWS - 1 - r]; // 화면상 위에서부터의 칸
    var piece = document.createElement('span');
    piece.className = 'fr-piece fr-' + TEAMS[team].key;
    piece.textContent = TEAMS[team].emoji;
    // 판 위에서 뚝 떨어지는 연출
    piece.style.transform = 'translateY(-' + ((ROWS - r) * 115) + '%)';
    cell.appendChild(piece);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { piece.style.transform = ''; });
    });
    return r;
  }

  // (c, r)에 team 돌을 놓았다고 치고 네 줄이 되면 그 칸들을 돌려준다
  function winningLine(g, c, r, team) {
    var dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];
    for (var d = 0; d < dirs.length; d++) {
      var line = [[c, r]];
      for (var s = -1; s <= 1; s += 2) {
        var x = c + dirs[d][0] * s, y = r + dirs[d][1] * s;
        while (x >= 0 && x < COLS && y >= 0 && g[x][y] === team) {
          line.push([x, y]);
          x += dirs[d][0] * s; y += dirs[d][1] * s;
        }
      }
      if (line.length >= 4) return line;
    }
    return null;
  }

  function isFull() {
    for (var c = 0; c < COLS; c++) if (grid[c].length < ROWS) return false;
    return true;
  }

  function confetti() {
    var emojis = ['🎉', '🌟', '🎈', '🍎', '🍋', '💛'];
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

  function finish(team, line) {
    over = true;
    busy = false;
    if (line) {
      line.forEach(function (p) {
        var piece = cells[p[0]][ROWS - 1 - p[1]].children[0];
        if (piece) piece.classList.add('win');
      });
      wins[team]++;
      var name = teamLabel(team);
      statusEl.textContent = '🏆 ' + TEAMS[team].emoji + ' ' + name + ' 승리!';
      winTitle.textContent = '🎉 ' + TEAMS[team].emoji + ' ' + name + ' 승리!';
      winText.textContent = '네 개를 나란히 만들었어요! 정말 잘했어요!';
      confetti();
      speak(name + '이 이겼어요! 축하해요!');
    } else {
      statusEl.textContent = '🤝 판이 가득 찼어요! 비겼어요';
      winTitle.textContent = '🤝 비겼어요!';
      winText.textContent = '둘 다 정말 잘했어요! 한 판 더 해볼까요?';
      speak('비겼어요! 한 판 더 해요!');
    }
    updateScores();
    winBox.hidden = false;
  }

  function play(c) {
    var team = turn;
    var r = dropInto(c, team);
    var line = winningLine(grid, c, r, team);
    if (line) { finish(team, line); return true; }
    if (isFull()) { finish(-1, null); return true; }
    turn = 1 - turn;
    setStatus();
    updateScores();
    return false;
  }

  function onColumn(c) {
    if (over || busy) return;
    if (mode === 'cpu' && turn === 1) return; // 컴퓨터 차례에는 못 눌러요
    if (grid[c].length >= ROWS) {             // 가득 찬 줄은 흔들어서 알려주기
      cols[c].classList.remove('full-shake');
      void cols[c].offsetWidth;
      cols[c].classList.add('full-shake');
      return;
    }
    var ended = play(c);
    if (!ended && mode === 'cpu' && turn === 1) {
      busy = true;
      setTimeout(cpuMove, 750);
    }
  }

  function validCols() {
    var v = [];
    for (var c = 0; c < COLS; c++) if (grid[c].length < ROWS) v.push(c);
    return v;
  }

  function findWinningCol(team) {
    var v = validCols();
    for (var i = 0; i < v.length; i++) {
      var c = v[i], r = grid[c].length;
      grid[c].push(team);
      var line = winningLine(grid, c, r, team);
      grid[c].pop();
      if (line) return c;
    }
    return -1;
  }

  function cpuMove() {
    if (over) { busy = false; return; }
    var c = findWinningCol(1); // 1) 이길 수 있으면 이긴다
    if (c < 0) {               // 2) 상대의 네 줄은 가끔만 막는다 (아이가 이길 기회!)
      var block = findWinningCol(0);
      if (block >= 0 && Math.random() < CPU_BLOCK_CHANCE) c = block;
    }
    if (c < 0) {               // 3) 가운데를 좋아하는 순서에서 무작위로 고른다
      var v = validCols();
      var liked = CENTER_ORDER.filter(function (x) { return v.indexOf(x) >= 0; });
      var pool = liked.slice(0, Math.min(4, liked.length));
      c = pool[Math.floor(Math.random() * pool.length)];
    }
    busy = false;
    play(c);
  }

  function newRound() {
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
    over = false;
    busy = false;
    turn = 0;
    winBox.hidden = true;
    confettiEl.innerHTML = '';
    buildBoard();
    setStatus();
    updateScores();
  }

  modeBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      modeBtns.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      mode = b.dataset.mode === 'cpu' ? 'cpu' : 'pvp';
      wins = [0, 0]; // 새 상대와는 점수도 새로
      newRound();
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

  againBtn.addEventListener('click', newRound);
  newRoundBtn.addEventListener('click', newRound);

  newRound();
})();
