  const buttons = document.querySelectorAll('.tab-btn');
  const frames = {
    festival: document.getElementById('frame-festival'),
    guide: document.getElementById('frame-guide'),
    dashboard: document.getElementById('frame-dashboard'),
    english: document.getElementById('frame-english'),
    math: document.getElementById('frame-math'),
    korean: document.getElementById('frame-korean'),
    roadmap: document.getElementById('frame-roadmap'),
    healing: document.getElementById('frame-healing'),
    contest: document.getElementById('frame-contest'),
    story: document.getElementById('frame-story'),
    boardgame: document.getElementById('frame-boardgame'),
    about: document.getElementById('frame-about')
  };
  const FRAME_DEFAULT_URLS = {};
  Object.entries(frames).forEach(([key, frame]) => {
    FRAME_DEFAULT_URLS[key] = frame.getAttribute('src') || '';
  });
  const FRAME_RESTORE_TARGETS = ['english', 'math', 'korean', 'story', 'boardgame', 'roadmap'];
  const FRAME_ALLOWED_PREFIXES = {
    english: ['pages/english/'],
    math: ['pages/math/'],
    korean: ['pages/korean/'],
    story: ['pages/family/'],
    boardgame: ['pages/family/'],
    roadmap: ['pages/roadmap/']
  };
  const FRAME_STORAGE_PREFIX = 'kkoma:frame:';

  const siteSearch = document.querySelector('.site-search');
  const EDUCATION_TARGETS = ['english', 'math', 'korean'];

  function appRelativeUrl(value) {
    try {
      const url = new URL(value, location.href);
      const base = new URL('.', location.href);
      if (url.origin !== base.origin || !url.href.startsWith(base.href)) return null;
      return url.href.slice(base.href.length);
    } catch (e) {
      return null;
    }
  }

  function frameStorageKey(target) {
    return FRAME_STORAGE_PREFIX + target;
  }

  function canRestoreFrame(target, relUrl) {
    const prefixes = FRAME_ALLOWED_PREFIXES[target] || [];
    return !!relUrl && prefixes.some(prefix => relUrl.startsWith(prefix));
  }

  function readStoredFrameUrl(target) {
    try {
      const saved = localStorage.getItem(frameStorageKey(target));
      return canRestoreFrame(target, saved) ? saved : '';
    } catch (e) {
      return '';
    }
  }

  function writeStoredFrameUrl(target, relUrl) {
    if (!canRestoreFrame(target, relUrl)) return;
    try { localStorage.setItem(frameStorageKey(target), relUrl); } catch (e) {}
  }

  function currentFrameUrl(target) {
    const frame = frames[target];
    if (!frame) return '';
    try {
      const rel = appRelativeUrl(frame.contentWindow.location.href);
      if (rel) return rel;
    } catch (e) {}
    return appRelativeUrl(frame.getAttribute('src') || frame.src) || '';
  }

  function isEducationDetailPage(target) {
    if (!EDUCATION_TARGETS.includes(target)) return false;
    const rel = currentFrameUrl(target);
    const path = rel.split(/[?#]/)[0];
    return path.startsWith('pages/' + target + '/') && !path.endsWith(target + '-hub.html');
  }

  function updateSearchVisibility(target) {
    if (!siteSearch) return;
    const activeTarget = (target && frames[target] && !frames[target].classList.contains('hidden'))
      ? target
      : Object.keys(frames).find((key) => !frames[key].classList.contains('hidden')) || '';
    const hideSearch = isEducationDetailPage(activeTarget);
    siteSearch.classList.toggle('is-hidden', hideSearch);
    siteSearch.setAttribute('aria-hidden', String(hideSearch));
    if (hideSearch) closeSearchResults();
  }

  function rememberFrameLocation(target) {
    if (!FRAME_RESTORE_TARGETS.includes(target)) return;
    const rel = currentFrameUrl(target);
    writeStoredFrameUrl(target, rel);
  }

  function restoreFrameLocation(target) {
    if (!FRAME_RESTORE_TARGETS.includes(target)) return;
    const saved = readStoredFrameUrl(target);
    if (!saved) return;
    const frame = frames[target];
    if (!frame || currentFrameUrl(target) === saved) return;
    frame.src = saved;
  }

  function showTab(target, opts) {
    opts = opts || {};
    if (!opts.preserveFrame) restoreFrameLocation(target);
    buttons.forEach(b => b.classList.toggle('active', b.dataset.target === target));
    Object.entries(frames).forEach(([key, frame]) => {
      frame.classList.toggle('hidden', key !== target);
    });
    // A1: 마지막으로 본 탭 기억 (이 기기에만 저장)
    try { localStorage.setItem('kkoma:lastTab', target); } catch (e) {}
    // A2: 주소 해시 동기화 (공유·북마크·뒤로가기 지원) — 해시에서 호출된 경우는 갱신하지 않아 루프 방지
    if (!opts.fromHash && !opts.preserveFrame && location.hash.replace('#', '') !== target) {
      location.hash = target;
    }
    updateSearchVisibility(target);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => showTab(btn.dataset.target));
  });

  // Allow child iframes (e.g. the about page) to switch the top tab
  window.showSiteTab = function (target) { if (frames[target]) showTab(target); };

  // Allow child iframes (e.g. the learning guide) to jump to a hub tab
  window.openEnglishHub = function () { openDefaultFrame('english'); };
  window.openMathHub = function () { openDefaultFrame('math'); };
  window.openKoreanHub = function () { openDefaultFrame('korean'); };

  function openFrameTarget(target, url) {
    if (!frames[target]) return;
    if (url) {
      frames[target].src = url;
      writeStoredFrameUrl(target, appRelativeUrl(url) || url);
    }
    showTab(target, { preserveFrame: Boolean(url) });
  }

  function openDefaultFrame(target) {
    if (!frames[target] || !FRAME_DEFAULT_URLS[target]) return;
    frames[target].src = FRAME_DEFAULT_URLS[target];
    writeStoredFrameUrl(target, FRAME_DEFAULT_URLS[target]);
    showTab(target, { preserveFrame: true });
  }

  window.openCatalogItem = function (item) {
    if (!item || !frames[item.target]) return;
    openFrameTarget(item.target, item.url);
  };

  const searchInput = document.getElementById('siteSearchInput');
  const searchClear = document.getElementById('siteSearchClear');
  const searchResults = document.getElementById('siteSearchResults');

  function normalize(text) {
    return String(text || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  // 검색 결과에서 이미 끝난(지난) 행사를 제외하기 위한 종료일 판정.
  // endDate가 'YYYY.MM.DD (요일)' 형태로 날짜가 명시된 경우에만 비교하고,
  // '연중 상시'·'물때표 확인'처럼 날짜가 아닌 상시·계절 행사는 지난 것으로 보지 않는다.
  function isFestivalPast(festival) {
    const m = String(festival && festival.endDate || '').match(/(\d{4})\.(\d{1,2})\.(\d{1,2})/);
    if (!m) return false;
    const end = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return end < today;
  }

  function buildSearchEntries() {
    const catalog = window.KKOMA_CATALOG || {};
    const entries = [];
    (catalog.pages || []).forEach((page) => {
      entries.push({
        type: '페이지',
        title: page.title,
        description: page.description,
        target: page.target,
        url: FRAME_DEFAULT_URLS[page.target] || '',
        haystack: [page.title, page.description, page.target].join(' ')
      });
    });
    (catalog.courses || []).forEach((course) => {
      entries.push({
        type: course.subjectName + ' 코스',
        title: course.title,
        description: course.theme,
        target: course.subject,
        url: course.url,
        haystack: [course.subjectName, course.title, course.theme].join(' ')
      });
    });
    (catalog.stories || []).forEach((story) => {
      entries.push({
        type: '그림동화',
        title: story.title,
        description: story.description,
        target: 'story',
        url: story.url,
        haystack: [story.title, story.description].join(' ')
      });
    });
    (window.KID_FESTIVALS || []).forEach((festival, index) => {
      if (isFestivalPast(festival)) return; // 지난 날짜 행사는 검색 결과에서 제외
      entries.push({
        type: (festival.regionName || '행사') + ' 행사',
        title: festival.title,
        description: [festival.tag, festival.location, festival.tip].filter(Boolean).join(' · '),
        target: 'festival',
        url: 'pages/family/festival-detail.html?id=' + encodeURIComponent(index),
        haystack: [festival.title, festival.tag, festival.location, festival.tip, festival.regionName].join(' ')
      });
    });
    return entries.map((entry) => Object.assign(entry, {
      haystack: normalize(entry.haystack),
      titleNorm: normalize(entry.title)
    }));
  }

  const searchEntries = buildSearchEntries();

  const SEARCH_RESULT_LIMIT = 10;
  // 한 유형(코스·행사·동화)이 결과를 독점하지 못하도록 1차 노출 상한을 둔다.
  // 상한을 넘은 항목은 빈 자리에 한해 점수순으로 채운다(단일 유형만 매칭되면 그대로 다 보임).
  const SEARCH_TYPE_SOFT_CAP = 4;

  // 매칭 품질 점수: 제목 완전일치 > 시작일치 > 제목포함 > 그 외 필드(위치·태그 등)만 일치
  function scoreSearchEntry(entry, q) {
    const t = entry.titleNorm || '';
    if (t === q) return 4;
    if (t.startsWith(q)) return 3;
    if (t.includes(q)) return 2;
    return 1;
  }

  function rankSearchMatches(q) {
    const scored = [];
    searchEntries.forEach((entry, i) => {
      if (entry.haystack.includes(q)) scored.push({ entry, i, score: scoreSearchEntry(entry, q) });
    });
    // 점수 내림차순, 동점은 원래 순서(안정 정렬 보장)
    scored.sort((a, b) => (b.score - a.score) || (a.i - b.i));

    const picked = [];
    const overflow = [];
    const perType = {};
    scored.forEach((item) => {
      const type = item.entry.type;
      const used = perType[type] || 0;
      if (used < SEARCH_TYPE_SOFT_CAP && picked.length < SEARCH_RESULT_LIMIT) {
        picked.push(item.entry);
        perType[type] = used + 1;
      } else {
        overflow.push(item.entry);
      }
    });
    for (let k = 0; k < overflow.length && picked.length < SEARCH_RESULT_LIMIT; k++) {
      picked.push(overflow[k]);
    }
    return picked;
  }

  function closeSearchResults() {
    if (!searchResults) return;
    searchResults.hidden = true;
    searchResults.innerHTML = '';
  }

  function openSearchEntry(entry) {
    if (!entry || !frames[entry.target]) return;
    openFrameTarget(entry.target, entry.url);
    closeSearchResults();
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    const q = normalize(query);
    searchResults.innerHTML = '';
    if (searchClear) searchClear.hidden = q.length === 0;
    if (q.length < 2) {
      closeSearchResults();
      return;
    }

    const matches = rankSearchMatches(q);

    if (!matches.length) {
      const empty = document.createElement('div');
      empty.className = 'site-search-result';
      empty.innerHTML = '<span class="result-title">검색 결과가 없습니다</span><span class="result-meta">다른 단어로 다시 검색해보세요.</span>';
      searchResults.appendChild(empty);
      searchResults.hidden = false;
      return;
    }

    matches.forEach((entry) => {
      const button = document.createElement('button');
      button.className = 'site-search-result';
      button.type = 'button';
      const title = document.createElement('span');
      title.className = 'result-title';
      title.textContent = entry.title;
      const meta = document.createElement('span');
      meta.className = 'result-meta';
      meta.textContent = entry.type + ' · ' + (entry.description || '');
      button.appendChild(title);
      button.appendChild(meta);
      button.addEventListener('click', () => openSearchEntry(entry));
      searchResults.appendChild(button);
    });
    searchResults.hidden = false;
  }

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        if (searchClear) searchClear.hidden = true;
        closeSearchResults();
      }
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.site-search')) closeSearchResults();
    });
  }

  if (searchClear && searchInput) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchClear.hidden = true;
      closeSearchResults();
      searchInput.focus();
    });
  }

  Object.entries(frames).forEach(([target, frame]) => {
    frame.addEventListener('load', () => {
      rememberFrameLocation(target);
      updateSearchVisibility(target);
    });
  });

  // A1·A2: 진입 시 초기 탭 결정 (주소 해시 > 저장된 마지막 탭 > 기본 '축제')
  const VALID_TABS = Object.keys(frames);
  function readInitialTab() {
    const fromHash = (location.hash || '').replace('#', '');
    if (VALID_TABS.includes(fromHash)) return fromHash;
    try {
      const saved = localStorage.getItem('kkoma:lastTab');
      if (VALID_TABS.includes(saved)) return saved;
    } catch (e) {}
    return 'festival';
  }
  // 뒤로/앞으로 가기, 주소창 해시 변경에 반응
  window.addEventListener('hashchange', function () {
    const h = (location.hash || '').replace('#', '');
    if (VALID_TABS.includes(h)) showTab(h, { fromHash: true });
  });
  showTab(readInitialTab(), { fromHash: true });

  // PWA: 서비스 워커 등록 (홈 화면 설치 · 오프라인 지원)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (err) {
        console.warn('서비스 워커 등록 실패:', err);
      });
    });
  }
