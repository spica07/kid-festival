/*
 * 우리 동네 꼬마 놀이터 - 서비스 워커
 *
 * 전략: stale-while-revalidate
 *   - 캐시에 있으면 즉시 보여주고(빠름), 백그라운드에서 네트워크로 갱신
 *   - 캐시에 없으면 네트워크로 받아 캐시에 저장
 *   - 오프라인이면 캐시로 응답, 페이지 이동이면 index.html로 폴백
 *
 * 콘텐츠를 크게 바꾸면 CACHE 버전 숫자를 올려서 옛 캐시를 비운다.
 */
const CACHE = 'kkoma-cache-v42';

// 첫 진입에 필요한 핵심 자원(앱 셸) — 오프라인 첫 실행 보장
const CORE_ASSETS = [
  'index.html',
  'manifest.json',
  'assets/css/index.css',
  'assets/js/pages/index.js',
  'assets/icons/favicon-64.png',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/icon-maskable-512.png',
  'pages/family/kid-festival.html',
  'assets/css/kid-festival.css',
  'assets/data/festivals.js',
  'assets/js/pages/kid-festival.js',
  'pages/family/festival-detail.html',
  'assets/css/festival-detail.css',
  'assets/js/pages/festival-detail.js',
  'pages/family/dashboard.html',
  'assets/css/dashboard.css',
  'assets/data/site-catalog.js',
  'assets/js/pages/dashboard.js',
  'pages/family/board-game-hub.html',
  'pages/family/memory-game.html',
  'assets/css/board-game.css',
  'assets/js/course-common.js',
  'assets/js/pages/memory-game.js',
  'pages/family/tangram.html',
  'assets/js/pages/tangram.js',
  'pages/family/dice-adventure.html',
  'assets/js/pages/dice-adventure.js',
  'pages/family/four-in-a-row.html',
  'assets/js/pages/four-in-a-row.js',
  'pages/about.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // 같은 출처만 캐싱 (구글 폰트 등 외부 자원은 네트워크에 맡김)
  if (url.origin !== self.location.origin) return;

  event.respondWith(staleWhileRevalidate(event));
});

async function staleWhileRevalidate(event) {
  const req = event.request;
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);

  const fetchPromise = fetch(req)
    .then((res) => {
      if (res && res.status === 200 && res.type === 'basic') {
        cache.put(req, res.clone());
      }
      return res;
    })
    .catch(() => null);

  if (cached) {
    // 캐시를 즉시 반환하고, 갱신은 백그라운드에서 끝까지 진행
    event.waitUntil(fetchPromise);
    return cached;
  }

  const res = await fetchPromise;
  if (res) return res;

  // 오프라인이고 캐시에도 없을 때: 페이지 이동이면 메인으로 폴백
  if (req.mode === 'navigate') {
    const fallback = await cache.match('index.html');
    if (fallback) return fallback;
  }
  return new Response('오프라인 상태예요. 인터넷에 연결한 뒤 다시 시도해 주세요.', {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
