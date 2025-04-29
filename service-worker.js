// 설치 이벤트 (캐시 초기화 등)
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/style.css', // 웹앱 스타일
                '/script.js', // 웹앱 스크립트
                '/icon-192.png', // 아이콘 등
            ]);
        })
    );
});

// 활성화 이벤트 (서비스 워커가 새로운 버전으로 활성화될 때)
self.addEventListener('activate', function(event) {
    // 이전 캐시 삭제 등 작업
    console.log('Service Worker activated');
});

// fetch 이벤트 (오프라인에서 캐시된 파일 사용)
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // 캐시된 데이터가 있으면 캐시에서 응답, 없으면 네트워크 요청
            return response || fetch(event.request);
        })
    );
});
