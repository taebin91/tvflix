// tvWikiMarkblock.js
// 이 스크립트는 'iframeUrl'로 격리된 페이지(비디오 플레이어)에 주입됩니다.
// 주요 목적: 플레이어 UI를 정리하고, 전체 화면 기능을 안정화합니다.

(function() {
    console.log("tvWikiMarkblock.js: 플레이어 페이지 스크립트 실행됨.");

    // ==============================================================
    // 1. 전체 화면 권한 강제 부여 (DOMException, SOP violation 해결)
    // ==============================================================
    
    // **함수 정의:** Video.js의 전체 화면 버튼을 찾아 클릭합니다.
    window.togglePlayerFullscreen = function() {
        // Video.js의 전체 화면 컨트롤 버튼 선택자
        const fullscreenButton = document.querySelector('.vjs-fullscreen-control.vjs-button');
        
        if (fullscreenButton) {
            fullscreenButton.click();
            console.log("togglePlayerFullscreen: Video.js 전체 화면 버튼 클릭 성공.");
            return true;
        }

        // 비디오 태그 자체에 requestFullscreen을 시도 (Video.js가 없는 경우 대비)
        const videoElement = document.querySelector('video');
        if (videoElement) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                console.log("togglePlayerFullscreen: document.exitFullscreen() 호출.");
                return true;
            } else {
                // 비디오 요소가 requestFullscreen()을 지원하는지 확인
                if (typeof videoElement.requestFullscreen === 'function') {
                    videoElement.requestFullscreen().catch(err => {
                        console.error("togglePlayerFullscreen: 비디오 요소 requestFullscreen 실패:", err);
                    });
                    console.log("togglePlayerFullscreen: 비디오 요소 requestFullscreen() 호출.");
                    return true;
                }
            }
        }
        
        console.warn("togglePlayerFullscreen: 전체 화면 토글 요소를 찾지 못했습니다.");
        return false;
    };


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
