/* 행사 상세 페이지 — 카드 클릭 시 진입(?id=인덱스), 위치·운영시간·입장료·주차·예약·방문후기 표시 */
(function () {
  'use strict';

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const safeUrl = (u) => /^https?:\/\//i.test(String(u ?? '')) ? String(u) : '';
  const safeColor = (c) => /^#[0-9A-Fa-f]{3,8}$/.test(String(c ?? '')) ? String(c) : '#C9A0FF';
  const hasText = (v) => String(v ?? '').trim().length > 0;
  // 색의 상대 밝기(0~255) — #RGB/#RRGGBB 모두 처리. 히어로 배경이 밝으면 어두운 글자를 쓴다.
  const relLuminance = (hex) => {
    let h = String(hex).replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (h.length < 6) return 255;
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  // 두 그라데이션 색의 평균 밝기가 어느 정도 이상이면(=밝은 파스텔·중간 파스텔) true → 진한 글자색 사용.
  // 임계값 135: 진한 남색·보라 등 확실히 어두운 배경만 흰 글자를 유지하고, 연파스텔·중간톤은 진한 글자로 또렷하게.
  const isLightHero = (a, b) => (relLuminance(a) + relLuminance(b)) / 2 >= 135;
  const RESERVATION_STATUS = {
    required: { label: '예약 필요', button: '예약 페이지 열기' },
    partial: { label: '일부 예약·신청', button: '예약·신청 확인' },
    'not-required': { label: '예약 불필요', button: '' },
    check: { label: '공식 확인 필요', button: '' }
  };

  function reservationStatusInfo(f, d) {
    const dataStatus = Object.prototype.hasOwnProperty.call(RESERVATION_STATUS, d.reservationStatus)
      ? d.reservationStatus
      : d.reservationRequired === true
        ? 'required'
        : d.reservationRequired === false
          ? 'not-required'
          : 'check';
    const key = f.temporarilyClosed || d.temporarilyClosed ? 'check' : dataStatus;
    const meta = RESERVATION_STATUS[key] || RESERVATION_STATUS.check;
    return {
      key,
      label: hasText(d.reservationStatusLabel) && key === dataStatus ? d.reservationStatusLabel : meta.label,
      button: meta.button
    };
  }

  function shouldShowReservationButton(status, d) {
    return Boolean(status.button && safeUrl(d.reservationUrl));
  }

  // 길찾기 검색어: mapName 최우선, 박물관·도서관·테마파크는 행사명, 그 외는 위치(가운데 점 제거) — 목록 페이지와 동일 규칙
  const NAME_SEARCH_CATEGORIES = ['museum', 'library', 'themepark'];
  const mapQuery = (f) => {
    if (f.mapName) return String(f.mapName).trim();
    const cats = f.category || [];
    if (cats.some(c => NAME_SEARCH_CATEGORIES.includes(c))) return String(f.title ?? '').trim();
    return String(f.location ?? '').replace(/[·ㆍ・･]/g, '').trim();
  };
  const mapUrl = (f) => 'https://map.naver.com/p/search/' + encodeURIComponent(mapQuery(f));

  const festivals = Array.isArray(window.KID_FESTIVALS) ? window.KID_FESTIVALS : [];
  const root = document.getElementById('detailRoot');

  const params = new URLSearchParams(location.search);
  const id = Number.parseInt(params.get('id'), 10);
  const f = Number.isInteger(id) ? festivals[id] : null;

  if (!f) {
    root.innerHTML = `<div class="detail-empty">
      <div class="detail-empty-emoji">🔍</div>
      <p>행사 정보를 찾을 수 없어요.</p>
      <a class="detail-link-btn primary" href="kid-festival.html">행사 목록으로 돌아가기</a>
    </div>`;
    return;
  }

  document.title = `${f.title} - 우리 동네 꼬마 놀이터`;
  const d = f.detail || {};

  function section(icon, title, bodyHtml, extraClass = '') {
    return `<section class="detail-section${extraClass ? ' ' + extraClass : ''}">
      <h2 class="detail-section-title">${icon} ${esc(title)}</h2>
      <div class="detail-section-body">${bodyHtml}</div>
    </section>`;
  }

  // ----- 히어로 -----
  const heroC1 = safeColor(f.colors && f.colors[0]);
  const heroC2 = safeColor(f.colors && f.colors[1]);
  const heroTextClass = isLightHero(heroC1, heroC2) ? ' hero-text-dark' : '';
  const hero = `<div class="detail-hero${heroTextClass}" style="background:linear-gradient(135deg, ${heroC1}, ${heroC2});">
    <div class="detail-hero-emoji">${esc(f.emoji)}</div>
    <div class="detail-hero-badges">
      <span class="region-badge ${esc(f.region)}">${esc(f.regionName)}</span>
      <span class="price-badge ${f.price === '무료' ? '' : 'paid'}">${esc(f.price)}</span>
    </div>
    <h1 class="detail-hero-title">${esc(f.title)}</h1>
    <p class="detail-hero-tip">${esc(f.tip)}</p>
  </div>`;

  const isTemporarilyClosed = Boolean(f.temporarilyClosed || d.temporarilyClosed);
  const statusNotice = isTemporarilyClosed
    ? `<div class="detail-alert">
        <strong>현재 운영 중단</strong>
        <span>${esc(f.statusNote || d.closed || f.endDate || '공식 안내에서 재개관 일정을 확인해 주세요.')}</span>
      </div>`
    : '';

  // ----- 위치 -----
  const locBody = `<p class="detail-address">${esc(d.address || f.location)}</p>
    <div class="detail-actions">
      <a class="detail-link-btn map" href="${esc(mapUrl(f))}" target="_blank" rel="noopener">🗺️ 길찾기</a>
      ${safeUrl(f.web) ? `<a class="detail-link-btn web" href="${esc(safeUrl(f.web))}" target="_blank" rel="noopener">🌐 홈페이지</a>` : ''}
    </div>`;

  // ----- 운영 시간 -----
  let hoursBody;
  if (Array.isArray(d.hours) && d.hours.length) {
    hoursBody = `<ul class="detail-hours">${d.hours.map(h => `<li>${esc(h)}</li>`).join('')}</ul>`
      + (d.hoursNote ? `<div class="detail-subnote">${esc(d.hoursNote)}</div>` : '');
  } else if (hasText(d.hoursNote)) {
    hoursBody = `<p>${esc(d.hoursNote)}</p>`;
  } else {
    const period = [f.startDate, f.endDate].filter(hasText).join(' ~ ');
    hoursBody = `<p>세부 운영시간은 공식 안내 확인이 필요해요.</p>`
      + (period ? `<div class="detail-subnote">행사 기간: ${esc(period)}</div>` : '');
  }

  // ----- 입장료 -----
  const feeBody = `<p>${esc(d.fee || (hasText(f.price) ? `${f.price} · 세부 요금은 공식 안내 확인 필요` : '입장료는 공식 안내 확인 필요'))}</p>`;

  // ----- 주차 -----
  const parkingBody = `<p>${d.parking ? esc(d.parking)
    : '주차 가능 여부와 요금은 방문 전 공식 안내에서 확인해 주세요.'}</p>`;

  // ----- 예약 방법 -----
  const reservationStatus = reservationStatusInfo(f, d);
  const reservationStatusBody = `<div class="reservation-status">
      <span class="reservation-status-label">예약 여부</span>
      <span class="reservation-status-badge ${esc(reservationStatus.key)}">${esc(reservationStatus.label)}</span>
    </div>`;
  const resvBody = reservationStatusBody + `<p>${d.reservation ? esc(d.reservation)
    : '예약 필요 여부는 공식 안내 확인이 필요해요. 단체·프로그램 이용은 사전 신청이 필요할 수 있습니다.'}</p>`
    + (shouldShowReservationButton(reservationStatus, d)
      ? `<div class="detail-actions"><a class="detail-link-btn primary" href="${esc(safeUrl(d.reservationUrl))}" target="_blank" rel="noopener">${esc(reservationStatus.button)}</a></div>`
      : '');

  // ----- 이용 정보(대상·휴관) -----
  const metaRows = [];
  if (d.age) metaRows.push(`<div class="detail-meta-row"><span>👶 대상</span><span>${esc(d.age)}</span></div>`);
  // 휴관 행은 실제 휴관 정보가 있을 때만 표시(endDate가 '당일 행사'·날짜 등인 경우 제외)
  const closedVal = d.closed || (/(휴관|휴무|휴원|휴장)/.test(f.endDate || '') ? f.endDate : '');
  if (closedVal) metaRows.push(`<div class="detail-meta-row"><span>🚫 휴관</span><span>${esc(closedVal)}</span></div>`);
  const metaSection = metaRows.length ? section('ℹ️', '이용 정보', metaRows.join('')) : '';

  // ----- 확인 상태 -----
  const sourceUrl = safeUrl(d.sourceUrl || d.reservationUrl || f.web);
  const verifyRows = [];
  if (d.verifiedAt) verifyRows.push(`<div class="detail-meta-row"><span>확인일</span><span>${esc(d.verifiedAt)}</span></div>`);
  verifyRows.push(`<div class="detail-meta-row"><span>상태</span><span>${d.needsRecheck ? '변동 가능성이 있어 방문 전 공식 확인 필요' : '기본 정보 확인 완료'}</span></div>`);
  if (sourceUrl) {
    verifyRows.push(`<div class="detail-meta-row"><span>출처</span><span><a href="${esc(sourceUrl)}" target="_blank" rel="noopener">공식 안내 열기</a></span></div>`);
  }
  const verifySection = section('🔎', '확인 상태', verifyRows.join(''), d.needsRecheck ? 'needs-check' : '');

  // ----- 내 방문 후기(나만 보는 기록 · 이 기기 localStorage 저장) -----
  const reviewsSection = `<section class="detail-section">
    <h2 class="detail-section-title">💬 내 방문 후기</h2>
    <div class="detail-section-body">
      <div id="myReview"></div>
    </div>
  </section>`;

  root.innerHTML = hero
    + statusNotice
    + section('📍', '위치', locBody)
    + section('🕘', '운영 시간', hoursBody)
    + section('🎟️', '입장료', feeBody)
    + section('🅿️', '주차', parkingBody)
    + section('📝', '예약 방법', resvBody)
    + metaSection
    + verifySection
    + reviewsSection;

  // ----- 내 후기 저장/표시 (나만 보는 단일 기록 · 이 기기 localStorage) -----
  const REVIEW_KEY = 'kidFestivalMyReview:' + (f.title || ('idx' + id));
  let editing = false;

  function loadReview() {
    try {
      const o = JSON.parse(localStorage.getItem(REVIEW_KEY) || 'null');
      return o && typeof o === 'object' ? o : null;
    } catch (e) { return null; }
  }
  function saveReview(o) { try { localStorage.setItem(REVIEW_KEY, JSON.stringify(o)); } catch (e) {} }
  function clearReview() { try { localStorage.removeItem(REVIEW_KEY); } catch (e) {} }
  function stars(n) {
    n = Math.max(1, Math.min(5, Number.parseInt(n, 10) || 5));
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }

  function renderMyReview() {
    const wrap = document.getElementById('myReview');
    const r = loadReview();

    // 저장된 내 후기 보기
    if (r && !editing) {
      wrap.innerHTML = `<div class="review-item my">
        <div class="review-head">
          <span class="review-mine-badge">내 후기</span>
          <span class="review-stars">${stars(r.rating)}</span>
          <button class="review-edit" type="button">수정</button>
          <button class="review-del" type="button">삭제</button>
        </div>
        <div class="review-text">${esc(r.text)}</div>
        <p class="review-note">이 후기는 나만 볼 수 있어요 · 이 기기에만 저장됩니다.</p>
      </div>`;
      wrap.querySelector('.review-edit').addEventListener('click', () => { editing = true; renderMyReview(); });
      wrap.querySelector('.review-del').addEventListener('click', () => { clearReview(); editing = false; renderMyReview(); });
      return;
    }

    // 새로 쓰기 / 수정하기 폼
    const cur = r || { rating: 5, text: '' };
    wrap.innerHTML = `<div class="review-form">
      <div class="review-form-row">
        <select id="reviewRating" class="review-input review-rating-select" aria-label="별점 선택">
          ${[5, 4, 3, 2, 1].map(n => `<option value="${n}" ${cur.rating === n ? 'selected' : ''}>${stars(n)}</option>`).join('')}
        </select>
      </div>
      <textarea id="reviewText" class="review-input review-textarea" maxlength="300" placeholder="이번 방문은 어땠나요? 나중에 다시 보기 위한 나만의 기록이에요 😊">${esc(cur.text)}</textarea>
      <div class="detail-actions">
        <button id="reviewSubmit" class="detail-link-btn primary" type="button">${r ? '내 후기 수정' : '내 후기 저장'}</button>
        ${r ? `<button id="reviewCancel" class="detail-link-btn ghost" type="button">취소</button>` : ''}
      </div>
      <p class="review-note">후기는 서버로 전송되지 않고 나만 볼 수 있게 이 기기에만 저장돼요.</p>
    </div>`;

    document.getElementById('reviewSubmit').addEventListener('click', () => {
      const textEl = document.getElementById('reviewText');
      const text = textEl.value.trim();
      if (!text) { textEl.focus(); return; }
      const rating = Number.parseInt(document.getElementById('reviewRating').value, 10) || 5;
      saveReview({ rating, text: text.slice(0, 300), ts: Date.now() });
      editing = false;
      renderMyReview();
    });
    const cancelBtn = document.getElementById('reviewCancel');
    if (cancelBtn) cancelBtn.addEventListener('click', () => { editing = false; renderMyReview(); });
  }

  renderMyReview();
})();
