const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = (u) => /^https?:\/\//i.test(String(u ?? '')) ? String(u) : '#';
const safeColor = (c) => /^#[0-9A-Fa-f]{3,8}$/.test(String(c ?? '')) ? String(c) : '#CCCCCC';
// 길찾기 검색어: mapName이 있으면 최우선, 박물관·도서관·테마파크는 행사명, 나머지는 위치정보로 검색한다.
// (mapName: 제목/위치 문구로는 네이버 지도 검색이 안 되는 행사에 넣는 검색 전용 장소명)
// 위치정보에 가운데 점(·)이 있으면 엉뚱한 경로로 빠질 수 있어 빈값으로 치환한다.
const NAME_SEARCH_CATEGORIES = ['museum', 'library', 'themepark'];
const mapQuery = (f) => {
  if (f.mapName) return String(f.mapName).trim();
  const cats = f.category || [];
  if (cats.some(c => NAME_SEARCH_CATEGORIES.includes(c))) {
    return String(f.title ?? '').trim();
  }
  return String(f.location ?? '').replace(/[·ㆍ・･]/g, '').trim();
};
const mapUrl = (f) => 'https://map.naver.com/p/search/' + encodeURIComponent(mapQuery(f));

const festivals = Array.isArray(window.KID_FESTIVALS) ? window.KID_FESTIVALS : [];

// ----- 실내/실외 분류 -----
// 카테고리 기본값: 박물관·도서관 = 실내, 그 외(자연·테마파크·축제·마라톤) = 실외
// 기본값과 다른 경우만 제목으로 예외 지정
const VENUE_OVERRIDE = {
  '종로구 야외도서관 [종로 열린 책마루]': '실외',
  '어린이 과학 강연극 [과학을 부탁해]': '실내',
  '2026 국립극장 쏙쏙들이페스티벌': '실내',
  '명품 어린이 연극 [강아지똥]': '실내',
  '왕가의 산책 (인천공항)': '실내',
  '광명동굴빛축제': '실내외',
  '페인터즈': '실내',
  "안성 남사당바우덕이 풍물단 상설공연 '곰뱅이텄다'": '실내외',
  '서울야외도서관': '실외',
  '2026 책읽는 한강공원 (가을)': '실외',
  '중랑 북페스티벌': '실외',
  '메이커 페어 서울': '실내',
  '서울시립과학관 별빛축제': '실내외',
  '2026 정동야행': '실내외',
  '서울한옥위크 2026': '실내외',
  '2026 경기도자비엔날레 키즈비엔날레 EARTH PLAYLAB': '실내',
  '제3회 파주 페어 북앤컬처': '실내외',
  '제10회 의정부 영유아 체험전': '실내외',
  '와일드스미스 그림책 원화展': '실내',
  '2026 서울진로직업박람회': '실내',
  '2026 케이펫페어 서울': '실내',
  '2026 케이펫페어 마곡': '실내',
  '2026 마곡 MCT 페스티벌': '실내외',
  '2026 어린이 가족 페스티벌': '실내',
  '제57회 서울국제유아교육전&키즈페어': '실내',
  '2026 펫쇼코리아(하)': '실내',
  '킨텍스 코베 베이비페어&유아교육전': '실내',
  '서울형 키즈카페': '실내',
  '서울형 키즈카페 (어린이대공원점)': '실내',
  '서울형 키즈카페 (자벌레점)': '실내',
  '롯데월드 어드벤처': '실내외',
  '두리랜드': '실내외',
  '웅진플레이도시 워터파크': '실내',
  '아쿠아플라넷 일산': '실내',
  '키자니아 서울 (직업체험)': '실내',
  '서울식물원': '실내외',
  '수락휴': '실내외',
  '부천국제판타스틱영화제 (BIFAN)': '실내',
  '로보컵 2026 인천': '실내',
  '파파존스와 함께하는 피자교실': '실내',
  '광명동굴': '실내',
  '인스파이어 스플래시 베이': '실내',
  '한여름의 과학관': '실내',
  '2026 아시테지 국제여름축제': '실내',
  '해피 마포 와글와글': '실내',
  '제4회 서울퓨처랩 축제 (미래기술 놀이터)': '실내외',
  '지구를 위한 선농마켓': '실내외',
  '한강플플 북중미 월드컵 팝업': '실내',
  '평화문화진지 호국보훈문화제 [RE:MEMORY]': '실내외',
  '2026 어린이안전박람회': '실내',
  '시나브로 가슴에 [도깨비 운동회]': '실내',
  '최태지의 발레 보물상자': '실내',
  '2026 서초뮤직앤아트페스티벌': '실내외',
  '들썩들썩 연희놀이터': '실내',
  '캐릭터 라이선싱 페어 2026': '실내',
  '제29회 부천국제만화축제': '실내외',
  '2026 경기도자비엔날레': '실내외',
  '2026 성남아트센터 키즈 페스티벌': '실내',
  '어린이 마당놀이극 [거기 누구요]': '실내',
  '2026 꿈꾸는극장 가족뮤지컬': '실내',
  '모두를 위한 뮤지컬 [이상하고 아름다운 하얀숲]': '실내',
  '뮤지컬 [드라랄라 치과]': '실내',
  '2026 강서문화야행': '실내외',
  '어린이 공연 넌버벌 [네네네]': '실내',
  '서울생활사박물관 문화가 흐르는 박물관': '실내외',
  '2026 서울 어린이 꿈 축제': '실내',
  '2026 DDP 가을축제': '실내외',
  '2026 송도 트라이보울 재즈 페스티벌': '실내외',
  '2026 성북 책모꼬지 북페스티벌': '실외',
  '2026 새활용 페스티벌': '실내외',
};
function venueOf(f) {
  if (VENUE_OVERRIDE[f.title]) return VENUE_OVERRIDE[f.title];
  const c = f.category || [];
  if (c.includes('library') || c.includes('museum')) return '실내';
  return '실외';
}
const VENUE_META = {
  '실내':  { cls: 'indoor',  label: '실내' },
  '실외':  { cls: 'outdoor', label: '실외' },
  '실내외': { cls: 'both',    label: '실내외' },
};
function venueBadge(f) {
  const m = VENUE_META[venueOf(f)] || VENUE_META['실외'];
  return `<span class="venue-badge ${m.cls}">${m.label}</span>`;
}

let currentRegion = 'all';
let currentCategory = 'all';
let currentPrice = 'all';
let currentVenue = 'all';
let currentYear = 2026;
let currentMonth = 8; // 1~12
let hidePast = true;  // 기본: 지난 날짜/종료된 행사 숨김
let hideAlways = false; // 기본: 상시성 행사도 모두 표시
let favoriteOnly = false; // 기본: 모든 카드 표시
let currentQuick = 'all'; // 'all' | 'today'(오늘 여는 곳) | 'weekend'(이번 주말)

// 오늘 자정 기준 (시간 비교 영향 제거)
const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

const YEAR_OPTIONS = [2025, 2026, 2027, 2028];
const FAVORITES_STORAGE_KEY = 'kidFestivalFavorites';

function favoriteKey(f) {
  return [f.title, f.startDate, f.location].map(v => String(v ?? '').trim()).join('||');
}

function loadFavoriteKeys() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter(v => typeof v === 'string') : []);
  } catch {
    return new Set();
  }
}

let favoriteKeys = loadFavoriteKeys();

function saveFavoriteKeys() {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favoriteKeys]));
  } catch {
    // 저장소가 막힌 환경에서도 화면 조작은 현재 세션에서 동작하게 둔다.
  }
}

function isFavorite(f) {
  return favoriteKeys.has(favoriteKey(f));
}

function setFavorite(f, on) {
  const key = favoriteKey(f);
  if (on) favoriteKeys.add(key);
  else favoriteKeys.delete(key);
  saveFavoriteKeys();
}

function favoriteButton(f, idx, extraClass = '') {
  const active = isFavorite(f);
  const action = active ? '찜 해제' : '찜하기';
  return `<button class="favorite-btn ${extraClass} ${active ? 'is-favorite' : ''}" type="button" data-favorite-index="${idx}" aria-pressed="${active}" aria-label="${esc(f.title)} ${action}" title="${action}">
    <span class="favorite-icon" aria-hidden="true">${active ? '♥' : '♡'}</span>
    <span class="favorite-text">${active ? '찜했어요' : '찜하기'}</span>
  </button>`;
}

function updateFavoriteButtonNode(btn, f) {
  const active = isFavorite(f);
  const action = active ? '찜 해제' : '찜하기';
  btn.classList.toggle('is-favorite', active);
  btn.setAttribute('aria-pressed', String(active));
  btn.setAttribute('aria-label', `${f.title} ${action}`);
  btn.title = action;
  const icon = btn.querySelector('.favorite-icon');
  const text = btn.querySelector('.favorite-text');
  if (icon) icon.textContent = active ? '♥' : '♡';
  if (text) text.textContent = active ? '찜했어요' : '찜하기';
}

function bindFavoriteButtons(root = document) {
  root.querySelectorAll('.favorite-btn[data-favorite-index]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const idx = Number.parseInt(btn.dataset.favoriteIndex, 10);
      const f = festivals[idx];
      if (!f) return;
      setFavorite(f, !isFavorite(f));
      document.querySelectorAll(`.favorite-btn[data-favorite-index="${idx}"]`).forEach(node => {
        updateFavoriteButtonNode(node, f);
      });
      if (favoriteOnly) updateView();
    });
  });
}

// 카드 본체를 클릭하면 상세 페이지로 이동(찜·홈페이지·길찾기 클릭은 제외)
function bindCardDetail(root = document) {
  root.querySelectorAll('.festival-card[data-idx]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      const idx = card.dataset.idx;
      if (idx == null || idx === '') return;
      location.href = 'festival-detail.html?id=' + encodeURIComponent(idx);
    });
  });
}

// ----- 날짜 파싱 & 분류 -----
function parseYMD(str) {
  const m = String(str ?? '').match(/(\d{4})\.(\d{1,2})\.(\d{1,2})/);
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
}
function daysInMonthOf(y, m) { return new Date(y, m, 0).getDate(); }
function isTemporarilyClosed(f) {
  return Boolean(f && (f.temporarilyClosed || (f.detail && f.detail.temporarilyClosed)));
}

// 각 행사에 시작/종료일과 종류(always/range/single/open)를 미리 계산
festivals.forEach(f => {
  const s = parseYMD(f.startDate);
  f._s = s;
  if (isTemporarilyClosed(f)) { f._kind = 'closed'; f._e = null; f._span = 0; return; }
  if (/연중/.test(f.startDate) || !s) { f._kind = 'always'; f._e = null; return; }
  const e = parseYMD(f.endDate);
  if (e) {
    f._kind = 'range'; f._e = e;
    f._span = (e - s) / 86400000 + 1; // 진행 일수
    // 한 달(30일) 이상 이어지는 장기 행사는 상시로 보고 달력 날짜 표시에서 제외
    f._longRun = f._span >= 30;
  }
  else if (/(당일|출발|집결|행사)/.test(f.endDate)) { f._kind = 'single'; f._e = s; f._span = 1; }
  else { f._kind = 'open'; f._e = null; } // 시즌별 등: 시작일부터 상시
});

// 선택한 달에 해당하는 행사인가? (카드 노출용)
function occursInMonth(f, y, m) {
  if (f._kind === 'closed') return false;
  if (f._kind === 'always' || !f._s) return true;
  if (f._kind === 'open') {
    const ys = f._s.getFullYear(), ms = f._s.getMonth() + 1;
    return (y > ys) || (y === ys && m >= ms);
  }
  const last = daysInMonthOf(y, m);
  const ms = new Date(y, m - 1, 1), me = new Date(y, m - 1, last);
  return f._s <= me && f._e >= ms;
}

// 이미 종료된 행사인가? (상시/시즌 상시는 지나지 않은 것으로 본다)
function isPastFestival(f) {
  if (f.ended) return true;            // 데이터에 종료로 표시된 회차 (다음 회차 발표 시 플래그 제거)
  if (f._kind === 'closed') return true;
  if (f._kind === 'always' || f._kind === 'open' || !f._e) return false;
  return f._e < TODAY;
}
// 해당 날짜가 오늘보다 이전인가?
function isPastDay(y, m, d) {
  return new Date(y, m - 1, d) < TODAY;
}
// 상시성 행사인가? (연중 상시 · 시즌 상시 · 30일 이상 장기 = 달력에 안 찍히는 행사)
function isAlwaysLike(f) {
  if (f._kind === 'closed') return false;
  return f._kind === 'always' || f._kind === 'open' || f._longRun;
}

// ----- B2: '오늘' / '이번 주말' 빠른 필터 -----
function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }

// 빠른 필터가 가리키는 실제 날짜 목록 (오늘 / 다가오는 토·일)
function quickDates(kind) {
  const base = startOfDay(TODAY);
  if (kind === 'today') return [base];
  const dow = base.getDay(); // 0 일 ~ 6 토
  if (dow === 6) { const sun = new Date(base); sun.setDate(base.getDate() + 1); return [base, sun]; }
  if (dow === 0) { return [base]; }
  const sat = new Date(base); sat.setDate(base.getDate() + (6 - dow));
  const sun = new Date(sat); sun.setDate(sat.getDate() + 1);
  return [sat, sun];
}

// 특정 날짜에 그 행사가 열리는가?
function occursOnExactDate(f, date) {
  if (f._kind === 'closed') return false;
  const d = startOfDay(date);
  if (f._kind === 'always') return true;                       // 연중 상시
  if (f._longRun) return f._s && d >= startOfDay(f._s) && (!f._e || d <= startOfDay(f._e));
  if (f._kind === 'open') return f._s ? d >= startOfDay(f._s) : false; // 시즌 시작일부터
  if (!f._s || !f._e) return false;
  if (d < startOfDay(f._s) || d > startOfDay(f._e)) return false;
  if (f.recur && !f.recur.includes(d.getDay())) return false;  // 주말만 운영 등
  return true;
}

// 달력에 찍을 날짜(일) 목록
function occurDays(f, y, m) {
  if (f._kind === 'closed' || f._kind === 'always' || f._kind === 'open' || f._longRun || f.hideCalendar || !f._s) return [];
  const last = daysInMonthOf(y, m);
  const mStart = new Date(y, m - 1, 1), mEnd = new Date(y, m - 1, last);
  const lo = f._s > mStart ? f._s : mStart;
  const hi = f._e < mEnd ? f._e : mEnd;
  if (lo > hi) return [];
  const out = [];
  for (let d = lo.getDate(); d <= hi.getDate(); d++) {
    if (f.recur && !f.recur.includes(new Date(y, m - 1, d).getDay())) continue;
    out.push(d);
  }
  return out;
}

// ----- 카드 날짜 한 줄 -----
// 데이터의 endDate 칸은 종료일일 때도 있고 안내문일 때도 있다.
// ('당일 행사' 73건 · '월요일 휴관' 33건 · '연중 개방' 21건 · '기상·수량 확인' 13건 …)
// 시작·종료가 모두 날짜인 행사만 한 줄 범위로 합치고, 안내문은 아래 줄에 그대로 남긴다.
// 예전에는 어느 쪽이든 '시작'·'종료' 두 줄을 차지해 카드 절반이 날짜 상자였다.
const DATE_KIND_LABEL = { range: '기간', single: '날짜', always: '운영', open: '운영' };
function dateParts(f) {
  if (f._kind === 'range' && f._s && f._e) {
    // 같은 해면 종료 쪽 연도는 되풀이라 뗀다: 2026.05.01 (금) ~ 06.21 (일)
    const end = f._s.getFullYear() === f._e.getFullYear()
      ? String(f.endDate).replace(/^\d{4}\./, '')
      : String(f.endDate);
    return { label: '기간', main: `${f.startDate} ~ ${end}`, note: '' };
  }
  return {
    label: DATE_KIND_LABEL[f._kind] || '운영',
    main: String(f.startDate ?? ''),
    note: String(f.endDate ?? ''),
  };
}

function dateBoxHtml(f) {
  const d = dateParts(f);
  return `<div class="date-box">
          <div class="date-row"><span class="date-label">${esc(d.label)}</span><span>📅 ${esc(d.main)}</span></div>
          ${d.note ? `<div class="date-note">${esc(d.note)}</div>` : ''}
          ${f.extraInfo ? `<div class="date-extra">⏰ ${esc(f.extraInfo)}</div>` : ''}
        </div>`;
}

// ----- 카드 정렬: 지역 → 카테고리(축제 먼저) → 가격(무료 먼저) → 가나다 -----
const REGION_ORDER = ['seoul', 'gyeonggi', 'incheon'];
const CATEGORY_ORDER = ['festival', 'museum', 'themepark', 'nature', 'library', 'marathon', 'galaxy'];
const rankIn = (order, v) => { const i = order.indexOf(v); return i < 0 ? order.length : i; };
function regionRank(f) { return rankIn(REGION_ORDER, f.region); }
function categoryRank(f) {
  return (f.category || []).reduce((best, c) => Math.min(best, rankIn(CATEGORY_ORDER, c)), CATEGORY_ORDER.length);
}
function priceRank(f) { return f.price === '무료' ? 0 : 1; }
function compareFestivals(a, b) {
  return regionRank(a) - regionRank(b)
    || categoryRank(a) - categoryRank(b)
    || priceRank(a) - priceRank(b)
    || String(a.title).localeCompare(String(b.title), 'ko');
}

function ensureFestivalCarousel() {
  const grid = document.getElementById('festivalGrid');
  if (!grid) return null;
  if (grid.parentElement && grid.parentElement.classList.contains('festival-carousel')) {
    return grid.parentElement;
  }
  const wrap = document.createElement('div');
  wrap.className = 'festival-carousel';
  grid.parentNode.insertBefore(wrap, grid);
  wrap.appendChild(grid);
  wrap.insertAdjacentHTML('beforeend', `
    <button class="festival-arrow festival-prev is-hidden" type="button" aria-label="이전 행사">‹</button>
    <button class="festival-arrow festival-next" type="button" aria-label="다음 행사">›</button>
    <div class="festival-dots" id="festivalDots" aria-label="행사 카드 위치"></div>
  `);
  return wrap;
}

function setupFestivalCarousel() {
  const wrap = ensureFestivalCarousel();
  if (!wrap) return;
  const grid = document.getElementById('festivalGrid');
  const cards = Array.from(grid.querySelectorAll('.festival-card'));
  const prev = wrap.querySelector('.festival-prev');
  const next = wrap.querySelector('.festival-next');
  const dots = wrap.querySelector('#festivalDots');
  const lastIdx = cards.length - 1;
  let ticking = false;

  dots.innerHTML = cards.map((card, i) =>
    `<button class="festival-dot${i === 0 ? ' active' : ''}" data-idx="${i}" type="button" aria-label="${i + 1}번째 행사"></button>`
  ).join('');

  function currentIndex() {
    if (!cards.length) return 0;
    let best = 0;
    let bestDistance = Infinity;
    cards.forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft - grid.scrollLeft - 16);
      if (distance < bestDistance) {
        best = i;
        bestDistance = distance;
      }
    });
    return best;
  }

  function syncControls(idx) {
    const hidden = lastIdx <= 0;
    prev.classList.toggle('is-hidden', hidden || idx <= 0);
    next.classList.toggle('is-hidden', hidden || idx >= lastIdx);
    dots.querySelectorAll('.festival-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  function goTo(idx) {
    idx = Math.max(0, Math.min(lastIdx, idx));
    const card = cards[idx];
    if (!card) {
      syncControls(0);
      return;
    }
    grid.scrollTo({ left: Math.max(0, card.offsetLeft - 16), behavior: 'smooth' });
    syncControls(idx);
  }

  prev.onclick = () => goTo(currentIndex() - 1);
  next.onclick = () => goTo(currentIndex() + 1);
  dots.querySelectorAll('.festival-dot').forEach(dot => {
    dot.addEventListener('click', () => goTo(Number.parseInt(dot.dataset.idx, 10)));
  });
  grid.onscroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      syncControls(currentIndex());
      ticking = false;
    });
  };

  goTo(0);
}

// ----- 적용된 필터 요약 -----
// 필터 패널을 접으면 무엇이 걸려 있는지 화면에서 사라졌다. 걸린 조건만 칩으로 남기고,
// 칩을 누르면 그 조건 하나만 풀린다. 오른쪽 끝에는 지금 몇 곳이 걸러졌는지 적는다.
const REGION_LABELS = { seoul: '서울', gyeonggi: '경기', incheon: '인천' };
const CATEGORY_LABELS = {
  festival: '축제', museum: '박물관', themepark: '테마파크',
  nature: '자연', library: '도서관', marathon: '마라톤', galaxy: '은하수',
};
const PRICE_LABELS = { free: '무료', paid: '유료' };
const QUICK_LABELS = { today: '오늘', weekend: '이번 주말' };

function activeFilterChips() {
  const chips = [];
  if (currentQuick !== 'all') chips.push({ key: 'quick', label: QUICK_LABELS[currentQuick] || currentQuick });
  if (currentRegion !== 'all') chips.push({ key: 'region', label: REGION_LABELS[currentRegion] || currentRegion });
  if (currentCategory !== 'all') chips.push({ key: 'category', label: CATEGORY_LABELS[currentCategory] || currentCategory });
  if (currentPrice !== 'all') chips.push({ key: 'price', label: PRICE_LABELS[currentPrice] || currentPrice });
  if (currentVenue !== 'all') chips.push({ key: 'venue', label: currentVenue });
  if (favoriteOnly) chips.push({ key: 'favorite', label: '찜한 카드' });
  if (hideAlways) chips.push({ key: 'hideAlways', label: '상시 행사 숨김' });
  // 지난 날짜 숨김은 기본값이라 켜져 있을 때는 알릴 것이 없다. 끈 경우만 알린다.
  if (!hidePast) chips.push({ key: 'hidePast', label: '지난 날짜 포함' });
  return chips;
}

function syncChipGroup(selector, dataKey, value) {
  document.querySelectorAll(selector).forEach(b => b.classList.toggle('active', b.dataset[dataKey] === value));
}

function clearFilter(key) {
  switch (key) {
    case 'quick':
      currentQuick = 'all';
      syncQuickButtons();
      break;
    case 'region':
      currentRegion = 'all';
      syncChipGroup('.region-btn', 'region', 'all');
      break;
    case 'category':
      currentCategory = 'all';
      syncChipGroup('.filter-btn', 'filter', 'all');
      break;
    case 'price':
      currentPrice = 'all';
      syncChipGroup('.price-btn', 'price', 'all');
      break;
    case 'venue':
      currentVenue = 'all';
      syncChipGroup('.venue-btn', 'venue', 'all');
      break;
    case 'favorite':
      favoriteOnly = false;
      syncFavoriteOnlyButton();
      break;
    case 'hideAlways':
      hideAlways = false;
      document.getElementById('hideAlwaysBtn').classList.remove('active');
      break;
    case 'hidePast':
      hidePast = true;
      document.getElementById('hidePastBtn').classList.add('active');
      break;
    default:
      return;
  }
  updateView();
}

function renderFilterSummary() {
  const box = document.getElementById('filterSummary');
  if (!box) return;
  const chips = activeFilterChips();
  // 걸린 조건이 없으면 줄 자체를 비워 자리를 차지하지 않게 한다
  box.classList.toggle('is-empty', chips.length === 0);
  box.innerHTML = chips.map(c =>
    `<button class="summary-chip" type="button" data-clear="${esc(c.key)}" aria-label="${esc(c.label)} 조건 해제">${esc(c.label)}<span class="chip-x" aria-hidden="true">✕</span></button>`
  ).join('');
  box.querySelectorAll('.summary-chip').forEach(btn => {
    btn.addEventListener('click', () => clearFilter(btn.dataset.clear));
  });
}

function renderFestivals() {
  const grid = document.getElementById('festivalGrid');
  let filtered = festivals;
  if (currentRegion !== 'all') filtered = filtered.filter(f => f.region === currentRegion);
  if (currentCategory !== 'all') filtered = filtered.filter(f => f.category.includes(currentCategory));
  if (currentPrice === 'free') filtered = filtered.filter(f => f.price === '무료');
  if (currentPrice === 'paid') filtered = filtered.filter(f => f.price !== '무료');
  if (currentVenue !== 'all') filtered = filtered.filter(f => { const v = venueOf(f); return v === currentVenue || v === '실내외'; });
  if (currentQuick === 'all') {
    filtered = filtered.filter(f => occursInMonth(f, currentYear, currentMonth));
    if (hidePast) filtered = filtered.filter(f => !isPastFestival(f));
  } else {
    const qdays = quickDates(currentQuick);
    filtered = filtered.filter(f => !isAlwaysLike(f) && qdays.some(d => occursOnExactDate(f, d)));
  }
  if (hideAlways) filtered = filtered.filter(f => !isAlwaysLike(f));
  if (favoriteOnly) filtered = filtered.filter(f => isFavorite(f));
  filtered = filtered.slice().sort(compareFestivals);
  renderFilterSummary();

  if (filtered.length === 0) {
    let title = '조건에 맞는 행사가 없어요!';
    let desc = '다른 필터를 선택해보세요 💝';
    if (favoriteOnly) {
      title = '찜한 행사가 없어요!';
      desc = '카드의 하트 버튼으로 가고 싶은 행사를 찜해보세요 💛';
    } else if (currentQuick === 'today') {
      title = '오늘 갈 만한 곳이 없어요!';
      desc = '이번 주말 버튼이나 다른 필터를 눌러보세요 💝';
    } else if (currentQuick === 'weekend') {
      title = '이번 주말 행사가 없어요!';
      desc = '상시 운영 장소나 다른 달을 확인해보세요 💝';
    }
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:#888;"><div style="font-size:4rem; margin-bottom:15px;">🔍</div><p style="font-size:1.2rem;">${title}</p><p style="margin-top:8px;">${desc}</p></div>`;
    setupFestivalCarousel();
    return;
  }

  grid.innerHTML = filtered.map(f => {
    const festivalIndex = festivals.indexOf(f);
    return `
    <div class="festival-card" data-idx="${festivalIndex}" style="--card-color-1:${safeColor(f.colors[0])};--card-color-2:${safeColor(f.colors[1])};--card-tag-bg:${safeColor(f.tagBg)};--card-tag-color:${safeColor(f.tagColor)};">
      ${favoriteButton(f, festivalIndex, 'card-favorite')}
      <div class="card-badges">${venueBadge(f)}<div class="price-badge ${f.price === '무료' ? '' : 'paid'}">${esc(f.price)}</div></div>
      <div class="card-emoji">${esc(f.emoji)}</div>
      <div class="card-content">
        <div style="display:flex; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
          <span class="card-tag">${esc(f.tag)}</span>
          <span class="region-badge ${esc(f.region)}">${esc(f.regionName)}</span>
        </div>
        <h3 class="card-title">${esc(f.title)}</h3>
        ${dateBoxHtml(f)}
        <div class="card-info">📍 ${esc(f.location)}</div>
        <div class="card-tip">${esc(f.tip)}</div>
        <div class="card-links">
          ${f.web ? `<a href="${esc(safeUrl(f.web))}" target="_blank" rel="noopener" class="link-btn web">홈페이지</a>` : ''}
          ${f.location ? `<a href="${esc(mapUrl(f))}" target="_blank" rel="noopener" class="link-btn map">길찾기</a>` : ''}
        </div>
      </div>
    </div>
  `;
  }).join('');
  bindFavoriteButtons(grid);
  bindCardDetail(grid);
  setupFestivalCarousel();
}

document.querySelectorAll('.region-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentRegion = btn.dataset.region;
    renderFestivals();
  });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.filter;
    renderFestivals();
  });
});

document.querySelectorAll('.price-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.price-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPrice = btn.dataset.price;
    renderFestivals();
  });
});

document.querySelectorAll('.venue-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.venue-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentVenue = btn.dataset.venue;
    renderFestivals();
  });
});

const filterToggleBtn = document.getElementById('filterToggleBtn');
const stickyFilters = document.querySelector('.sticky-filters');
filterToggleBtn.addEventListener('click', () => {
  const collapsed = !stickyFilters.classList.contains('filters-collapsed');
  stickyFilters.classList.toggle('filters-collapsed', collapsed);
  filterToggleBtn.textContent = collapsed ? '필터 ▾' : '필터 ▴';
  filterToggleBtn.classList.toggle('is-open', !collapsed);
  const label = collapsed ? '필터 열기' : '필터 닫기';
  filterToggleBtn.title = label;
  filterToggleBtn.setAttribute('aria-label', label);
  filterToggleBtn.setAttribute('aria-expanded', String(!collapsed));
});

document.getElementById('viewToggleBtn').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  const grid = document.getElementById('festivalGrid');
  const carousel = grid.closest('.festival-carousel');
  const calendarOnly = !btn.classList.contains('active');
  btn.classList.toggle('active', calendarOnly);
  (carousel || grid).style.display = calendarOnly ? 'none' : '';
  btn.textContent = calendarOnly ? '카드보기' : '달력보기';
  const label = calendarOnly ? '카드 보기로 전환' : '달력 보기로 전환';
  btn.title = label;
  btn.setAttribute('aria-label', label);
  if (calendarOnly) {
    document.querySelector('.calendar-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

const hidePastBtn = document.getElementById('hidePastBtn');
hidePastBtn.classList.toggle('active', hidePast);
hidePastBtn.addEventListener('click', () => {
  hidePast = !hidePast;
  hidePastBtn.classList.toggle('active', hidePast);
  updateView();
});

const hideAlwaysBtn = document.getElementById('hideAlwaysBtn');
hideAlwaysBtn.classList.toggle('active', hideAlways);
hideAlwaysBtn.addEventListener('click', () => {
  hideAlways = !hideAlways;
  hideAlwaysBtn.classList.toggle('active', hideAlways);
  updateView();
});

const favoriteOnlyBtn = document.getElementById('favoriteOnlyBtn');
function syncFavoriteOnlyButton() {
  favoriteOnlyBtn.classList.toggle('active', favoriteOnly);
  favoriteOnlyBtn.textContent = '찜한카드';
  const label = favoriteOnly ? '전체 카드 보기' : '찜한 카드만 보기';
  favoriteOnlyBtn.title = label;
  favoriteOnlyBtn.setAttribute('aria-label', label);
}
syncFavoriteOnlyButton();
favoriteOnlyBtn.addEventListener('click', () => {
  favoriteOnly = !favoriteOnly;
  syncFavoriteOnlyButton();
  updateView();
});

// B2: '오늘' / '이번 주말' 빠른 필터
const quickWhenBtns = document.querySelectorAll('.quick-when-btn');
function syncQuickButtons() {
  quickWhenBtns.forEach(b => b.classList.toggle('active', b.dataset.quick === currentQuick));
}
quickWhenBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentQuick = (currentQuick === btn.dataset.quick) ? 'all' : btn.dataset.quick;
    if (currentQuick !== 'all') {
      // 오늘이 속한 달로 맞춰 달력·라벨과 일관성 유지
      currentYear = TODAY.getFullYear();
      currentMonth = TODAY.getMonth() + 1;
      clampYM();
      syncSelectors();
    }
    syncQuickButtons();
    updateView();
  });
});

function getWeekendClass(dayOfWeek) {
  if (dayOfWeek === 0) return 'sunday';
  if (dayOfWeek === 6) return 'saturday';
  return '';
}

function tagStyle(f) {
  return `background:${safeColor(f.tagBg)};color:${safeColor(f.tagColor)};border-left-color:${safeColor(f.colors[0])};`;
}

function buildEventsByDay(year, month) {
  const map = {};
  festivals.forEach(f => {
    if (favoriteOnly && !isFavorite(f)) return;
    occurDays(f, year, month).forEach(d => {
      if (hidePast && isPastDay(year, month, d)) return;
      if (!map[d]) map[d] = [];
      map[d].push({ festivalIndex: festivals.indexOf(f), title: f.title, region: f.region });
    });
  });
  // 진행 기간이 짧은 행사를 위로 (당일 → 단기 → 장기 순)
  Object.values(map).forEach(arr => arr.sort((a, b) =>
    (festivals[a.festivalIndex]._span || 0) - (festivals[b.festivalIndex]._span || 0)
  ));
  return map;
}

function buildEventTags(day, events, displayCount) {
  let html = '';
  events.slice(0, displayCount).forEach(e => {
    const f = festivals[e.festivalIndex];
    html += `<div class="event-tag" style="${tagStyle(f)}" data-festival-index="${e.festivalIndex}" title="${esc(e.title)}">${esc(e.title)}</div>`;
  });
  if (events.length > displayCount) {
    html += `<div class="event-tag more" data-show-more="${day}">+${events.length - displayCount}개 더보기</div>`;
  }
  return html;
}

function renderCalendarGrid(eventsByDay, firstDay, daysInMonth) {
  let html = '';
  for (let i = 0; i < firstDay; i++) html += '<div class="day empty"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = (firstDay + d - 1) % 7;
    const dayClass = getWeekendClass(dayOfWeek);
    const events = eventsByDay[d] || [];
    const noEventsClass = events.length === 0 ? 'no-events' : '';
    const pastClass = (hidePast && isPastDay(currentYear, currentMonth, d)) ? 'past' : '';
    const eventTags = buildEventTags(d, events, 3);
    html += `<div class="day ${dayClass} ${noEventsClass} ${pastClass}"><span class="day-number">${d}</span>${eventTags}</div>`;
  }
  document.getElementById('calendar').insertAdjacentHTML('beforeend', html);
}

function renderCalendarList(eventsByDay, firstDay, daysInMonth) {
  const dayNames = ['일','월','화','수','목','금','토'];
  const calendarList = document.getElementById('calendarList');
  let listHtml = '';
  for (let d = 1; d <= daysInMonth; d++) {
    const events = eventsByDay[d] || [];
    if (events.length === 0) continue;
    const dayOfWeek = (firstDay + d - 1) % 7;
    const dateClass = getWeekendClass(dayOfWeek);
    listHtml += `<div class="calendar-list-item">`;
    listHtml += `<div class="calendar-list-date ${dateClass}">${currentMonth}월 ${d}일<span class="dow">${dayNames[dayOfWeek]}요일</span></div>`;
    listHtml += `<div class="calendar-list-events">`;
    events.forEach(e => {
      const f = festivals[e.festivalIndex];
      listHtml += `<div class="calendar-list-event" style="${tagStyle(f)}" data-festival-index="${e.festivalIndex}">${esc(f.emoji)} ${esc(f.title)}</div>`;
    });
    listHtml += `</div></div>`;
  }
  if (listHtml === '') {
    listHtml = `<p style="text-align:center; color:#888; padding:20px;">${favoriteOnly ? '이 달에 찜한 날짜 행사가 없어요.' : '이 달에 등록된 기간 행사가 없어요.'}</p>`;
  }
  calendarList.innerHTML = listHtml;
}

function bindCalendarEvents(eventsByDay) {
  document.querySelectorAll('.event-tag[data-festival-index]').forEach(tag => {
    tag.addEventListener('click', (e) => {
      const idx = Number.parseInt(e.currentTarget.dataset.festivalIndex);
      showModal(festivals[idx]);
    });
  });
  document.querySelectorAll('.event-tag[data-show-more]').forEach(tag => {
    tag.addEventListener('click', (e) => {
      const day = Number.parseInt(e.currentTarget.dataset.showMore);
      showDayEvents(day, eventsByDay[day]);
    });
  });
  document.querySelectorAll('.calendar-list-event[data-festival-index]').forEach(item => {
    item.addEventListener('click', (e) => {
      const idx = Number.parseInt(e.currentTarget.dataset.festivalIndex);
      showModal(festivals[idx]);
    });
  });
}

function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  const daysInMonth = daysInMonthOf(currentYear, currentMonth);
  const eventsByDay = buildEventsByDay(currentYear, currentMonth);
  // 이전에 그려둔 날짜 칸 제거 (요일 헤더는 유지)
  document.querySelectorAll('#calendar .day').forEach(n => n.remove());
  renderCalendarGrid(eventsByDay, firstDay, daysInMonth);
  renderCalendarList(eventsByDay, firstDay, daysInMonth);
  bindCalendarEvents(eventsByDay);
}

function showModal(f) {
  const modal = document.getElementById('modalContent');
  const festivalIndex = festivals.indexOf(f);
  modal.innerHTML = `
    <button class="modal-close" id="modalClose">✕</button>
    <div class="card-badges">${favoriteButton(f, festivalIndex, 'modal-favorite')}${venueBadge(f)}<div class="price-badge ${f.price === '무료' ? '' : 'paid'}">${esc(f.price)}</div></div>
    <div class="card-emoji" style="background: linear-gradient(135deg, ${safeColor(f.colors[0])}, ${safeColor(f.colors[1])}); border-radius: 25px 25px 0 0;">${esc(f.emoji)}</div>
    <div class="modal-body">
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:6px; margin: 15px 0 10px;">
        <span class="card-tag" style="background:${safeColor(f.tagBg)}; color:${safeColor(f.tagColor)};">${esc(f.tag)}</span>
        <span class="region-badge ${esc(f.region)}">${esc(f.regionName)}</span>
      </div>
      <h3 class="card-title" style="font-size: 1.6rem; margin-bottom: 15px;">${esc(f.title)}</h3>
      ${dateBoxHtml(f)}
      <div class="card-info" style="margin-top: 12px;">📍 ${esc(f.location)}</div>
      <div class="card-tip" style="margin-top: 10px;">${esc(f.tip)}</div>
      <div class="card-links" style="margin-top: 18px;">
        ${f.web ? `<a href="${esc(safeUrl(f.web))}" target="_blank" rel="noopener" class="link-btn web">홈페이지</a>` : ''}
        ${f.location ? `<a href="${esc(mapUrl(f))}" target="_blank" rel="noopener" class="link-btn map">길찾기</a>` : ''}
      </div>
    </div>
  `;
  openModalOverlay();
  bindFavoriteButtons(modal);
  bindModalClose();
}

function showDayEvents(day, events) {
  const modal = document.getElementById('modalContent');
  modal.innerHTML = `
    <button class="modal-close" id="modalClose">✕</button>
    <div style="padding: 35px 30px 30px;">
      <h3 style="font-size:1.6rem; color:#6B5B95; text-align:center; margin-bottom:8px;">🗓️ ${currentMonth}월 ${day}일</h3>
      <p style="text-align:center; color:#888; margin-bottom:20px;">이날 열리는 행사 ${events.length}개</p>
      <div style="display:flex; flex-direction:column; gap:10px;">
        ${events.map(e => {
          const f = festivals[e.festivalIndex];
          return `<div class="event-list-item" data-festival-index="${e.festivalIndex}" style="background:linear-gradient(135deg, ${safeColor(f.colors[0])}, ${safeColor(f.colors[1])}); padding:15px; border-radius:15px; cursor:pointer; transition:all 0.3s; display:flex; align-items:center; gap:12px;">
            <div style="font-size:2.2rem;">${esc(f.emoji)}</div>
            <div style="flex:1;">
              <div style="font-size:1.05rem; color:#4A4A6A; font-weight:bold;">${esc(f.title)}</div>
              <div style="font-size:0.85rem; color:#6B5B95; margin-top:3px;">📍 ${esc(f.location)}</div>
            </div>
            <div style="font-size:1.2rem;">→</div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
  modal.querySelectorAll('.event-list-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = Number.parseInt(item.dataset.festivalIndex);
      showModal(festivals[idx]);
    });
  });
  openModalOverlay();
  bindModalClose();
}

function bindModalClose() {
  const closeBtn = document.getElementById('modalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
}

// 좁은 화면에서는 바텀시트로 열린다. 시트 뒤 페이지가 같이 굴러가면
// 시트를 닫았을 때 보던 자리를 잃으므로, 열려 있는 동안은 배경을 묶어 둔다.
function openModalOverlay() {
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function updateLabels() {
  const badge = document.getElementById('headerBadge');
  const title = document.getElementById('calendarTitle');
  if (badge) badge.textContent = `${currentYear}년 ${currentMonth}월 · 서울 · 경기 · 인천`;
  if (title) title.textContent = `${currentYear}년 ${currentMonth}월 한눈에 보기`;
  const foot = document.getElementById('footerGreeting');
  if (foot) foot.textContent = `🎈 즐거운 ${currentMonth}월 보내세요! 🎈`;
  document.title = `🎪 우리 동네 꼬마 축제 - ${currentYear}년 ${currentMonth}월`;
}

// 공원별 소개 페이지 (서울시 한강사업본부)
const HANGANG_PARK_URLS = {
  '강서한강공원': 'https://hangang.seoul.go.kr/www/contents/675.do?mid=482',
  '난지한강공원': 'https://hangang.seoul.go.kr/www/contents/672.do?mid=478',
  '망원한강공원': 'https://hangang.seoul.go.kr/www/contents/666.do?mid=468',
  '양화한강공원': 'https://hangang.seoul.go.kr/www/contents/678.do?mid=486',
  '여의도한강공원': 'https://hangang.seoul.go.kr/www/contents/669.do?mid=473',
  '이촌한강공원': 'https://hangang.seoul.go.kr/www/contents/660.do?mid=458',
  '반포한강공원': 'https://hangang.seoul.go.kr/www/contents/663.do?mid=463',
  '잠원한강공원': 'https://hangang.seoul.go.kr/www/contents/657.do?mid=454',
  '뚝섬한강공원': 'https://hangang.seoul.go.kr/www/contents/654.do?mid=449',
  '잠실한강공원': 'https://hangang.seoul.go.kr/www/contents/651.do?mid=444',
  '광나루한강공원': 'https://hangang.seoul.go.kr/www/contents/645.do?mid=429',
};

const hangangParks = [
  { name: '강서한강공원', events: [
    { t: '한강페스티벌_가을 · I Can Do 페스티벌', months: [10], kid: true },
  ]},
  { name: '난지한강공원', events: [
    { t: '한강페스티벌_여름 · 한강뮤직퐁당', months: [8], kid: true },
  ]},
  { name: '망원한강공원', events: [
    { t: '서울함 공원 · 전통놀이한마당·서울함페스티벌·워터피크닉·크리스마스 특별전시', months: [2,5,8,12], kid: true },
    { t: '한강페스티벌_여름 · 한강무박2일', months: [8] },
  ]},
  { name: '양화한강공원', events: [
    { t: '한강페스티벌_여름 · 한강썸머뮤직피크닉', months: [8] },
  ]},
  { name: '여의도한강공원', events: [
    { t: '책읽는 한강공원', months: [4,5,9,10], kid: true },
    { t: '물빛무대 · 스테이지 오브 리플스', months: [4,5,6,7,8,9,10] },
    { t: '한강야경투어', months: [5,6,8,9,10] },
    { t: '한강웰니스위크', months: [5,6], kid: true },
    { t: '한강다리밑영화제', months: [8], kid: true },
    { t: '한강종이비행기축제', months: [10], kid: true },
    { t: '한강페스티벌_겨울 · 겨울 낭만쉼터·한강바람축제', months: [12] },
  ]},
  { name: '이촌한강공원', events: [
    { t: '한강페스티벌_봄 · 한강별빛소극장·유아차퍼레이드', months: [5], kid: true },
  ]},
  { name: '반포한강공원', events: [
    { t: '차없는 잠수교 뚜벅뚜벅축제', months: [5,6,9,10], kid: true },
    { t: '한강서래섬피크닉콘서트', months: [5,10] },
    { t: '한강야경투어', months: [5,6,8,9,10] },
  ]},
  { name: '잠원한강공원', events: [
    { t: '한강대학가요제', months: [5] },
    { t: '신사나들목가족데이축제', months: [9,10], kid: true },
    { t: '한강페스티벌_가을 · I Can Do 페스티벌', months: [10], kid: true },
  ]},
  { name: '뚝섬한강공원', events: [
    { t: '한강플플 · 설날놀이터·어드벤처·북중미월드컵·크리스마스 팝업', months: [2,5,7,12], kid: true },
    { t: '한강다리밑영화제', months: [8], kid: true },
    { t: '로맨틱한강크리스마스마켓', months: [12] },
  ]},
  { name: '잠실한강공원', events: [
    { t: '한강페스티벌_여름 · 나만의 한강호 경주대회', months: [8], kid: true },
    { t: '한강웰니스 프로그램', months: [9] },
    { t: '사각사각 가을축제', months: [10], kid: true },
  ]},
  { name: '광나루한강공원', events: [
    { t: '한강웰니스 프로그램', months: [5] },
    { t: '한강다리밑영화제', months: [8], kid: true },
    { t: '한강페스티벌_여름 · 한강서커스퐁당', months: [8], kid: true },
    { t: '광나루패밀리페스티벌', months: [9,10], kid: true },
  ]},
];

function renderHangangParks() {
  const wrap = document.getElementById('hangangParks');
  if (!wrap) return;
  wrap.innerHTML = hangangParks.map(p => `
    <div class="park-card">
      <div class="park-name">📍 ${esc(p.name)}</div>
      <div class="park-events">
        ${p.events.map(ev => {
          const on = ev.months.includes(currentMonth);
          return `<div class="park-event ${ev.kid ? 'kid' : ''} ${on ? 'current' : ''}">
            <div class="pe-title">${esc(ev.t)}${ev.kid ? '<span class="kid-badge">👶 가족</span>' : ''}</div>
            <div class="pe-months">${ev.months.map(m => `<span class="pe-month ${m === currentMonth ? 'on' : ''}">${m}월</span>`).join('')}</div>
          </div>`;
        }).join('')}
      </div>
      <a class="park-link" href="${esc(safeUrl(HANGANG_PARK_URLS[p.name] || 'https://hangang.seoul.go.kr/'))}" target="_blank" rel="noopener">${esc(p.name)} 소개 →</a>
    </div>
  `).join('');
}

function updateView() {
  updateLabels();
  renderFestivals();
  renderCalendar();
  renderHangangParks();
}

function clampYM() {
  const min = YEAR_OPTIONS[0], max = YEAR_OPTIONS[YEAR_OPTIONS.length - 1];
  if (currentYear < min) { currentYear = min; currentMonth = 1; }
  if (currentYear > max) { currentYear = max; currentMonth = 12; }
}

function syncSelectors() {
  document.getElementById('yearSelect').value = String(currentYear);
  document.getElementById('monthSelect').value = String(currentMonth);
}

function setupMonthSelectors() {
  const yearSel = document.getElementById('yearSelect');
  const monthSel = document.getElementById('monthSelect');
  yearSel.innerHTML = YEAR_OPTIONS.map(y => `<option value="${y}">${y}년</option>`).join('');
  monthSel.innerHTML = Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${i + 1}월</option>`).join('');
  syncSelectors();

  // 달/년을 직접 고르면 빠른 필터(오늘·이번주말)는 해제
  const clearQuick = () => { if (currentQuick !== 'all') { currentQuick = 'all'; syncQuickButtons(); } };
  yearSel.addEventListener('change', () => { clearQuick(); currentYear = Number(yearSel.value); updateView(); });
  monthSel.addEventListener('change', () => { clearQuick(); currentMonth = Number(monthSel.value); updateView(); });
  document.getElementById('prevMonth').addEventListener('click', () => {
    clearQuick();
    currentMonth--; if (currentMonth < 1) { currentMonth = 12; currentYear--; }
    clampYM(); syncSelectors(); updateView();
  });
  document.getElementById('nextMonth').addEventListener('click', () => {
    clearQuick();
    currentMonth++; if (currentMonth > 12) { currentMonth = 1; currentYear++; }
    clampYM(); syncSelectors(); updateView();
  });
}

setupMonthSelectors();
updateView();
