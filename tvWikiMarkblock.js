// tvWikiMarkblock.js
// 이 스크립트는 'iframeUrl'로 격리된 페이지(비디오 플레이어)에 주입됩니다.
// 주요 목적: 플레이어 UI를 정리하고, 전체 화면 기능을 안정화합니다.

(function() {
    console.log("tvWikiMarkblock.js: 플레이어 페이지 스크립트 실행됨.");

    // ==============================================================
    // 1. 전체 화면 권한 강제 부여 (DOMException, SOP violation 해결)
    // ==============================================================

    // **중요:** HTML, BODY 태그에 전체 화면 권한을 부여합니다.
    // 이는 이 스크립트가 로드되는 현재 문서(플레이어 페이지)에 전체 화면 권한을 강제로 부여하여,
    // 내부 비디오 플레이어가 requestFullscreen()을 호출할 수 있도록 합니다.
    const rootElements = [document.documentElement, document.body];
    
    rootElements.forEach(el => {
        if (el) {
            // 'allowfullscreen'은 오래된 방식이지만, 호환성을 위해 추가
            el.setAttribute('allowfullscreen', 'true');
            console.log(`Added allowfullscreen="true" to ${el.tagName}.`);
            
            // 'allow' 속성은 최신 표준이며, fullscreen 권한을 명시적으로 요구합니다.
            // 이미 'allow' 속성이 있다면, 'fullscreen'을 추가합니다.
            let currentAllow = el.getAttribute('allow') || '';
            if (!currentAllow.includes('fullscreen')) {
                let newAllow = currentAllow.split(';').filter(a => a.trim() && !a.trim().startsWith('fullscreen')).join('; ');
                newAllow = newAllow.trim();
                newAllow += (newAllow ? '; ' : '') + 'fullscreen';
                el.setAttribute('allow', newAllow);
                console.log(`Updated allow attribute on ${el.tagName} to include fullscreen: ${newAllow}`);
            } else {
                console.log(`${el.tagName} already allows fullscreen.`);
            }
        }
    });

    // ==============================================================
    // 2. 비디오 플레이어 주변 요소 정리 (여백 및 불필요한 스크롤 방지)
    // ==============================================================

    // 페이지의 모든 스크롤바를 제거하고 여백을 없앱니다. (MainActivity.kt에서도 처리하지만, JS에서 한 번 더 보장)
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Video.js 등의 플레이어가 생성하는 컨테이너를 화면에 꽉 차게 조정합니다.
    // 'video' 태그나 'vjs-tech' 클래스를 가진 요소를 찾습니다.
    const videoElements = document.querySelectorAll('video, .vjs-tech');
    
    videoElements.forEach(video => {
        // 비디오 요소의 부모 컨테이너를 화면에 꽉 채우도록 설정
        let parent = video.parentElement;
        while (parent && parent.tagName !== 'BODY') {
            parent.style.width = '100%';
            parent.style.height = '100%';
            parent.style.position = 'relative'; // 또는 'absolute'
            parent = parent.parentElement;
        }
    });

    console.log("tvWikiMarkblock.js: 스크립트 작업 완료.");

})();
