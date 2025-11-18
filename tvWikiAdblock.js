// ==UserScript==
// @name         tvFlixOtt
// @namespace    https://xlqldnlzl.site
// @version      20251115
// @description  tvFlixOtt
// @author       Unknown

// @include      /^https?:\/\/[^/]*tvwiki[^/]*\/.*$/
// @icon         https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('TV User Script (tvWikiAdblock.js) loaded and running.');

    // =======================================================
    // 1. D-Pad 포커스 테두리 (Outline) 스타일 개선 로직
    // - TV 환경에서 포커스 이동 시 테두리가 잘 보이도록 색상과 굵기 조정
    // =======================================================
    const style = document.createElement('style');
    style.innerHTML = `
        /* 모든 포커스 가능한 요소의 테두리 스타일을 재정의 */
        :focus {
            outline: 5px solid #FFD700 !important; /* 밝은 노란색 (Gold) 굵기 5px */
            outline-offset: 4px !important; /* 요소의 경계선과 아웃라인 사이의 간격 */
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.7) !important; /* 테두리 주변에 부드러운 빛 효과 추가 */
            transition: outline-color 0.2s, outline-offset 0.2s, box-shadow 0.2s; /* 부드러운 전환 효과 */
        }

        /* Video.js와 같이 특정 클래스를 사용하는 플레이어의 컨트롤에도 강제로 적용 */
        .vjs-control-bar button:focus,
        .vjs-menu-button:focus,
        .vjs-control-bar :focus {
             outline: 5px solid #FFD700 !important;
             outline-offset: 4px !important;
        }

        /* 포커스가 갇히는 것을 방지하기 위해 iframe 자체에는 포커스 스타일을 적용하지 않음 */
        iframe:focus {
            outline: none !important;
            box-shadow: none !important;
        }
    `;
    document.head.appendChild(style);
    console.log('Focus style improved: Bright yellow outline injected.');


    // =======================================================
    // 2. UI 정리 및 스타일 조정 로직 (사용자 제공)
    // =======================================================

    // 자동 풀스크린 요청 (TV 환경에서 필요할 수 있음)
    document.addEventListener('DOMContentLoaded', function() {
        // 실제 실행 환경(Android WebView)에서는 이 DOMContentLoaded가 pageFinished 이후에 발생하지 않을 수 있습니다.
        // 하지만 혹시 모를 상황에 대비하여 유지합니다.
        // document.documentElement.requestFullscreen(); // WebView 내에서는 OS 수준에서 자동 처리되므로 제거 또는 주석 처리 권장
    });
    
    // 홈화면의 첫 번째 '.slide_wrap' 제거
    const firstSlideWrap = document.querySelector('.slide_wrap');
    if (firstSlideWrap) {
        firstSlideWrap.remove();
        console.log('Removed the first .slide_wrap element.');
    }
    
    // 클래스가 'title'인 모든 <a> 태그의 포커스 비활성화 (tabindex="-1")
    document.querySelectorAll('a.title').forEach(element => {
        element.setAttribute('tabindex', '-1');
    });
    console.log('Disabled focus for all <a> tags with class "title".');

    // 제거할 UI 요소
    const elementsToRemove = [
        '.notice',          // 상단 공지
        '.logo',            // 홈으로 로고배너
        '.gnb_mobile',      // 상단 카테고리 메뉴
        '.top_btn',         // 위로가기 버튼
        '.profile_info_ct', // 에피소드 등록일
        '.ep_search',       // 에피소드 검색
        '.good',            // 홈화면 좋아요 수
        '.emer-content',    // 메인 문구
        '#bo_v_atc',        // 재생 플레이어 줄거리
        '.cast',            // 재생 플레이어 배우
        '.view-comment-area', // 재생 플레이어 댓글
        '.over',            // 재생 전 공지사항 팝업
        '#bo_v_act',        // 컨텐츠 내부 동작 (좋아요 공유 스크랩 등)
        '#bo_vc',           // 댓글
        '#float',           // 하단 플로트바
        'div.notice',
        'ul.banner2',
        'li.full.pc-only',
        'li.full.mobile-only',
        'nav.gnb.sf-js-enabled.sf-arrows',
        'a.btn_login',
        '#bnb',
        '#footer',
        '.search_wrap ul'
    ];

    elementsToRemove.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.remove();
        });
    });

    // 스타일 조정
    const styleAdjustments = [
        { selector: '.coordinates', height: '50px' },
        { selector: '.title', height: '50px' },
        { selector: '.main-ranking', height: '474px' }, // 영상별 높이
        { selector: '.playstart', padding: '0' },        // 재생 플레이어 여백 제거
        { selector: '.frame-video', marginTop: '0' },    // 재생 플레이어 상단 여백 없애기
        { selector: '.player-header', padding: '10px 0' }, // 재생 플레이어 제목 여백 수정
        { selector: '.video-remote', display: 'block', bottom: '60px', width: '150px' } // 아래 다음화 항상 보이게
    ];

    styleAdjustments.forEach(item => {
        document.querySelectorAll(item.selector).forEach(element => {
            if (item.height) element.style.height = item.height;
            if (item.padding) element.style.padding = item.padding;
            if (item.marginTop) element.style.marginTop = item.marginTop;
            if (item.display) element.style.display = item.display;
            if (item.bottom) element.style.bottom = item.bottom;
            if (item.width) element.style.width = item.width;
        });
    });

    // 배너 이미지 숨기기 로직
    function hideBannerImages() {
        document.querySelectorAll('img').forEach(img => {
            if (img.src.includes('banner')) {
                img.style.display = 'none';
            }
        });
    }

    // 타이틀 및 로고 변경
    document.title = "Netflix";

    const logoLink = document.querySelector("a.logo");
    if (logoLink) {
        const img = logoLink.querySelector("img");
        if (img) {
            img.src = "https://i.imgur.com/rBAwaXX.png"; // 이미지를 바로 변경
            img.style.width = "110px";
            img.style.height = "auto";
        }
    }

    // 아이콘 변경 함수 호출
    const faviconURL = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
    const appleIconURL = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";

    function replaceIcons() {
        document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(el => el.remove());

        const icon = document.createElement('link');
        icon.rel = "icon";
        icon.type = "image/svg+xml";
        icon.href = faviconURL;
        document.head.appendChild(icon);

        const apple = document.createElement('link');
        apple.rel = "apple-touch-icon";
        apple.href = appleIconURL;
        document.head.appendChild(apple);
    }
    replaceIcons();

    // 자동 플레이어 넘기기 시도 (버튼 클릭)
    const button = document.querySelector('a.btn.btn_normal');
    if (button) {
    	button.click();
    }

    // 페이지 로드 후 및 동적 변경 감지
    hideBannerImages();
    const observer = new MutationObserver(hideBannerImages);
    observer.observe(document.body, { childList: true, subtree: true });


    // =======================================================
    // 3. iframe 내부 요소 포커스 차단 로직 (기존 로직 유지)
    // =======================================================
    const iframe = document.getElementById('view_iframe');

    // iframe에 접근 가능해야 하며, contentWindow를 통해 내부 DOM에 접근 시도
    if (iframe && iframe.contentWindow) {
        try {
            const iframeDoc = iframe.contentWindow.document;

            // 모든 포커스 가능한 요소들 (a, button, input 등)을 선택합니다.
            const focusableElements = iframeDoc.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');

            // 모든 하위 요소의 포커스를 막습니다.
            focusableElements.forEach(el => {
                el.setAttribute('tabindex', '-1');
            });

            console.log('Success: iframe internal focus has been disabled.');

        } catch (e) {
            // Same-Origin Policy (SOP) 위반 시 접근 실패
            console.warn('Warning: Cannot access iframe content (Same-Origin Policy likely). Internal focus block skipped.', e);
        }
    }

})();
