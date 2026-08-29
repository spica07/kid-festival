// 공용 SVG 아이콘 시스템. 이모지/유니코드 화살표를 대체하는 UI 크롬 아이콘 전용
// (마스코트·낱말 그림 이모지는 콘텐츠이므로 그대로 둔다).
// 24x24 뷰박스, stroke=currentColor, 굵기 2로 통일. 정적 HTML은 <i data-icon="name"></i>를
// DOMContentLoaded 시 치환하고, JS로 만드는 문자열은 KFIcon(name)을 직접 호출한다.
(function () {
  const ICONS = {
    chevronLeft: '<path d="M15 5l-7 7 7 7"/>',
    chevronRight: '<path d="M9 5l7 7-7 7"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    checkCircle: '<circle cx="12" cy="12" r="8.5"/><path d="M8.3 12.3l2.6 2.6 4.8-5.4"/>',
    speaker: '<path d="M4 9.5v5h3.2L12 18V6L7.2 9.5H4z"/><path d="M16 9.2a4 4 0 0 1 0 5.6"/><path d="M18.6 6.8a7.6 7.6 0 0 1 0 10.4"/>',
    pencil: '<path d="M4 16.5V20h3.5L18.8 8.7a1.8 1.8 0 0 0 0-2.5l-1-1a1.8 1.8 0 0 0-2.5 0L4 16.5z"/><path d="M13.5 6.5l3 3"/>',
    eraser: '<path d="M18.5 12.5L11 20H6l-3-3a1.5 1.5 0 0 1 0-2.1l8.5-8.5a2 2 0 0 1 2.8 0l4.2 4.2a2 2 0 0 1 0 2.9z"/><path d="M9 20h9.5"/>',
    refresh: '<path d="M4.5 12a7.5 7.5 0 0 1 12.6-5.5L19.5 8"/><path d="M19.5 4v4.3H15.2"/><path d="M19.5 12a7.5 7.5 0 0 1-12.6 5.5L4.5 16"/><path d="M4.5 20v-4.3H8.8"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="14.5" rx="2.4"/><path d="M4 10h16"/><path d="M8 3.3V7"/><path d="M16 3.3V7"/>',
    star: '<path d="M12 3.6l2.6 5.4 5.9.8-4.3 4.2 1 5.9L12 17l-5.2 2.9 1-5.9-4.3-4.2 5.9-.8z"/>',
    bulb: '<path d="M9 18.5h6"/><path d="M9.5 21h5"/><path d="M12 3a6 6 0 0 0-3.2 11.1c.6.4 1 1.1 1 1.9v.3h4.4v-.3c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3z"/>',
    play: '<path d="M7 5.3v13.4a1 1 0 0 0 1.5.87l11-6.7a1 1 0 0 0 0-1.74l-11-6.7A1 1 0 0 0 7 5.3z"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 5.7A10.8 10.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a15.6 15.6 0 0 1-3.2 4"/><path d="M6.5 7.8C4 9.6 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.3 0 2.5-.3 3.6-.8"/><path d="M9.9 10a3 3 0 0 0 4.2 4.2"/>',
    flag: '<path d="M6 21V4"/><path d="M6 4.5h11l-2.6 4 2.6 4H6"/>'
  };

  function KFIcon(name, cls) {
    const body = ICONS[name];
    if (!body) return "";
    return '<svg class="icon' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }

  function hydrate(root) {
    (root || document).querySelectorAll("[data-icon]").forEach((node) => {
      const name = node.getAttribute("data-icon");
      if (node.getAttribute("data-icon-done") === name) return;
      node.innerHTML = KFIcon(name);
      node.setAttribute("data-icon-done", name);
    });
  }

  window.KFIcon = KFIcon;
  window.KFIconHydrate = hydrate;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => hydrate());
  } else {
    hydrate();
  }
})();
