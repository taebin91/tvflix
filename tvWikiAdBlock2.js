// ==UserScript==
// @name         tvFlixOtt_NoFlicker
// @namespace    https://xlqldnlzl.site
// @version      20251115
// @description  tvFlixOtt 광고 제거, UI 정리, 깜빡임 최소화
// @grant        none
// ==/UserScript==


(function () {

    'use strict';

    /******************************************
     * 1. DOM 준비 시 실행
     ******************************************/
    function init() {

        // 전체 화면
        try { document.documentElement.requestFullscreen(); } catch(e){}

        // ------------------------------
        // 상단 공지/메인 문구/팝업 제거
        // ------------------------------
        const removeSelectors = [
            '.notice',
            '.emer-content',
            '.cast',
            '.view-comment-area',
            '.over',
            '#bo_v_atc',
            '#bo_v_act',
            '#bo_vc',
            '#float',
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

        removeSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.remove());
        });

        // ------------------------------
        // 레이아웃/스타일 조정
        // ------------------------------
        const styleEdits = [
            ['#header', 'height', '80px'],
            ['.top-menus', 'height', '150px'],
            ['.coordinates', 'height', '50px'],
            ['.title', 'height', '50px'],
            ['.main-ranking', 'height', '474px'],
            ['.playstart', 'padding', '0'],
            ['.frame-video', 'marginTop', '0'],
            ['.player-header', 'padding', '10px 0'],
            ['.video-remote', 'display', 'block'],
            ['.video-remote', 'bottom', '60px'],
            ['.video-remote', 'width', '150px']
        ];

        styleEdits.forEach(([sel, prop, val]) => {
            document.querySelectorAll(sel).forEach(el => el.style[prop] = val);
        });

        // ------------------------------
        // 배너 이미지 제거
        // ------------------------------
        function hideBanners() {
            document.querySelectorAll('img').forEach(img => {
                if (img.src.includes('banner')) img.style.display = 'none';
            });
        }
        hideBanners();

        // 동적 배너 감시
        new MutationObserver(hideBanners).observe(document.body, { childList: true, subtree: true });

        // ------------------------------
        // 파비콘/아이콘 변경
        // ------------------------------
        const faviconURL   = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
        const appleIconURL = faviconURL;

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

        // ------------------------------
        // 로고/타이틀 변경
        // ------------------------------
        document.title = "Netflix";

        const logo = document.querySelector("a.logo img");
        if (logo) {
            logo.src = "https://i.imgur.com/rBAwaXX.png";
            logo.style.width = "110px";
            logo.style.height = "auto";
        }

        // ------------------------------
        // 자동 다음화 버튼 클릭
        // ------------------------------
        const nextBtn = document.querySelector('a.btn.btn_normal');
        if (nextBtn) nextBtn.click();

    } // init end


    /******************************************
     * 2. DOMContentLoaded 시 실행
     ******************************************/
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

})();
