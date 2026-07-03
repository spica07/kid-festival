  // ---------- 오늘의 한마디 ----------
  const quotes = [
    '오늘의 나는, 어제의 나보다 분명 더 단단해졌어요.',
    '잘하고 있어요. 그게 잘 보이지 않는 날에도요.',
    '아이를 사랑하는 만큼, 자신에게도 다정하게 대해주세요.',
    '완벽한 엄마는 없어요. 충분한 엄마만 있을 뿐이에요.',
    '쉬어가도 괜찮아요. 멈춰 있는 게 아니에요.',
    '오늘 잘한 일 한 가지를 떠올려보세요. 분명 있어요.',
    '당신이 있어서, 아이에게 세상이 따뜻해졌어요.',
    '지친 데에는 이유가 있어요. 자신을 너무 다그치지 마세요.',
    '아이의 작은 웃음 하나가, 오늘 하루의 답입니다.',
    '엄마이기 전에, 당신이라는 사람이 먼저 있어요.',
    '오늘 못 한 것보다, 오늘 해낸 것을 먼저 세어봐요.',
    '괜찮지 않아도 괜찮아요. 그 마음을 먼저 안아주세요.',
    '지금 이 순간, 숨 한 번 깊게 쉬는 것만으로도 충분해요.',
    '엄마의 행복이, 아이가 자라는 가장 좋은 환경이에요.',
    '도움을 청하는 건 약한 게 아니라, 자신을 잘 알고 있다는 뜻이에요.'
  ];

  const quoteText = document.getElementById('quoteText');
  const newQuoteBtn = document.getElementById('newQuoteBtn');
  let lastQuoteIdx = 0;

  function pickQuote() {
    let idx;
    do { idx = Math.floor(Math.random() * quotes.length); }
    while (idx === lastQuoteIdx && quotes.length > 1);
    lastQuoteIdx = idx;
    quoteText.classList.add('fade');
    setTimeout(() => {
      quoteText.textContent = quotes[idx];
      quoteText.classList.remove('fade');
    }, 320);
  }

  newQuoteBtn.addEventListener('click', pickQuote);

  // ---------- 호흡 명상 ----------
  const breathCircle = document.getElementById('breathCircle');
  const breathLabel = document.getElementById('breathLabel');
  const breathBtn = document.getElementById('breathBtn');
  const breathCycleEl = document.getElementById('breathCycle');
  const breathPhases = ['들이쉬어요', '잠시 멈춰요', '내쉬어요'];
  let breathActive = false;
  let breathInterval = null;
  let breathPhase = 0;
  let breathCycleCount = 0;

  function startBreath() {
    breathActive = true;
    breathPhase = 0;
    breathCycleCount = 0;
    breathCircle.classList.add('active');
    breathLabel.textContent = breathPhases[0];
    breathCycleEl.textContent = '1회차';
    breathBtn.textContent = '멈추기';
    breathBtn.classList.add('stop');

    breathInterval = setInterval(() => {
      breathPhase = (breathPhase + 1) % 3;
      breathLabel.textContent = breathPhases[breathPhase];
      if (breathPhase === 0) {
        breathCycleCount++;
        breathCycleEl.textContent = `${breathCycleCount + 1}회차`;
      }
    }, 4000);
  }

  function stopBreath() {
    breathActive = false;
    clearInterval(breathInterval);
    breathCircle.classList.remove('active');
    breathLabel.textContent = breathCycleCount > 0 ? `${breathCycleCount}회 완료` : '시작해볼까요?';
    breathCycleEl.textContent = '';
    breathBtn.textContent = '다시 시작';
    breathBtn.classList.remove('stop');
  }

  breathBtn.addEventListener('click', () => {
    if (breathActive) stopBreath(); else startBreath();
  });

  // ---------- 작은 휴식 ----------
  const restItems = [
    { icon: '🫖', text: '따뜻한 차 한 잔 우리기', c1: '#FFF4E8', c2: '#FFE8D8' },
    { icon: '🎵', text: '좋아하는 노래 한 곡', c1: '#FFE8F0', c2: '#FFD8E8' },
    { icon: '☀️', text: '창문 열고 햇볕 쬐기', c1: '#FFF9E5', c2: '#FFF4D1' },
    { icon: '🚶‍♀️', text: '핸드폰 끄고 10분 산책', c1: '#E8F8E8', c2: '#D4F0D4' },
    { icon: '🕯️', text: '향초·디퓨저 켜기', c1: '#F4E8FF', c2: '#E8D8FF' },
    { icon: '✍️', text: '한 줄 손글씨 일기', c1: '#FFE5F1', c2: '#FFD0E5' },
    { icon: '💬', text: '친구에게 안부 한 줄', c1: '#E0F0FF', c2: '#C9E5FF' },
    { icon: '🍰', text: '좋아하는 간식 천천히', c1: '#FFF0E8', c2: '#FFE0D0' },
    { icon: '🛁', text: '따뜻한 물로 손·발 씻기', c1: '#E0F4FF', c2: '#C8EBFF' },
    { icon: '🖼️', text: '좋아하는 사진 한 장', c1: '#F0E5FF', c2: '#E0D0FF' },
    { icon: '🧴', text: '핸드크림 바르며 손 마사지', c1: '#FFE8F4', c2: '#FFD0EC' },
    { icon: '🪟', text: '창밖 풍경 1분 바라보기', c1: '#E5F4FF', c2: '#D0E8FF' }
  ];

  const restGrid = document.getElementById('restGrid');
  restGrid.innerHTML = restItems.map(r => `
    <div class="rest-card" style="--c1:${r.c1};--c2:${r.c2};">
      <span class="rest-icon">${r.icon}</span>
      ${r.text}
    </div>
  `).join('');

  const restPickBtn = document.getElementById('restPickBtn');
  const restPickResult = document.getElementById('restPickResult');
  let lastRestIdx = -1;

  restPickBtn.addEventListener('click', () => {
    let idx;
    do { idx = Math.floor(Math.random() * restItems.length); }
    while (idx === lastRestIdx && restItems.length > 1);
    lastRestIdx = idx;
    const pick = restItems[idx];
    restPickResult.innerHTML = `오늘은 <strong>${pick.icon} ${pick.text}</strong> 어떠세요?`;
    restPickResult.classList.remove('show');
    void restPickResult.offsetWidth;
    restPickResult.classList.add('show');
  });

  // ---------- 마음 점검 ----------
  const checkItems = [
    '오늘 6시간 이상 잤다',
    '따뜻한 음식을 한 끼 이상 챙겨 먹었다',
    '5분 이상 나만의 시간을 가졌다',
    '햇볕을 잠깐이라도 쬐었다',
    '누군가와 진심 어린 한마디를 나눴다',
    '좋아하는 무언가를 잠시라도 했다',
    '스스로에게 "잘했어"라고 말해줬다'
  ];

  const checkList = document.getElementById('checklist');
  const checkResultMsg = document.getElementById('checkResultMsg');
  const checkResultTitle = document.querySelector('.check-result-title');

  checkList.innerHTML = checkItems.map((t, i) => `
    <li>
      <label class="check-item">
        <input type="checkbox" data-i="${i}">
        <span>${t}</span>
      </label>
    </li>
  `).join('');

  function updateCheckResult() {
    const checked = checkList.querySelectorAll('input:checked').length;
    let title, msg;
    if (checked === 0) {
      title = '아직 시작 전이에요';
      msg = '오늘 하나라도 해볼 수 있을까요? 작은 것부터 천천히.';
    } else if (checked <= 2) {
      title = '괜찮아요, 시작이에요';
      msg = '조금 더 자신을 챙겨주세요. 위 카드에서 5분짜리 하나만 골라봐요.';
    } else if (checked <= 4) {
      title = '꽤 잘하고 계세요';
      msg = '오늘의 나에게 한 가지만 더 선물해볼까요?';
    } else if (checked <= 6) {
      title = '정말 잘 보내셨어요';
      msg = '오늘 하루, 스스로를 정성껏 돌보셨네요.';
    } else {
      title = '오늘의 베스트 엄마 🌿';
      msg = '자신을 이렇게 잘 돌보는 엄마가 진짜 좋은 엄마예요.';
    }
    checkResultTitle.textContent = title;
    checkResultMsg.textContent = msg;
  }

  checkList.addEventListener('change', updateCheckResult);

  // ---------- 마음 메모 (localStorage) ----------
  const memoArea = document.getElementById('memoArea');
  const memoStatus = document.getElementById('memoStatus');
  const memoClearBtn = document.getElementById('memoClearBtn');
  const MEMO_KEY = 'mom-healing-memo';

  try {
    const saved = localStorage.getItem(MEMO_KEY);
    if (saved) memoArea.value = saved;
  } catch (e) { /* localStorage unavailable */ }

  let memoTimer = null;
  memoArea.addEventListener('input', () => {
    memoStatus.textContent = '저장 중…';
    clearTimeout(memoTimer);
    memoTimer = setTimeout(() => {
      try {
        localStorage.setItem(MEMO_KEY, memoArea.value);
        memoStatus.textContent = '저장됐어요';
        setTimeout(() => { memoStatus.textContent = '자동 저장돼요'; }, 1500);
      } catch (e) {
        memoStatus.textContent = '저장이 안 돼요 (브라우저 설정 확인)';
      }
    }, 600);
  });

  memoClearBtn.addEventListener('click', () => {
    memoArea.value = '';
    try { localStorage.removeItem(MEMO_KEY); } catch (e) {}
    memoStatus.textContent = '지웠어요';
    setTimeout(() => { memoStatus.textContent = '자동 저장돼요'; }, 1500);
  });

  // 첫 진입 시 랜덤 한마디
  pickQuote();
