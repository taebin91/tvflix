// ==UserScript==
// @name         tvFlixOtt_Enhanced_NoFlicker
// @namespace    https://xlqldnlzl.site
// @version      20251115
// @description  Advanced Adblock + UI Cleaner + No-Flicker Loader for tvwiki
// @grant        none
// ==/UserScript==


/* ------------------------------------------------------------------------
   1) 페이지가 그려지기 전에 전체 화면을 완전히 가린다 (첫 페인트 차단)
------------------------------------------------------------------------ */

(function blockFirstPaint() {
    const blocker = document.createElement("div");
    blocker.id = "tvflix_blocker";
    blocker.style.position = "fixed";
    blocker.style.top = "0";
    blocker.style.left = "0";
    blocker.style.width = "100vw";
    blocker.style.height = "100vh";
    blocker.style.background = "#000";          // 완전 검정 화면
    blocker.style.zIndex = "999999999";         // 페이지 위에 완전히 덮어버림
    blocker.style.opacity = "1";
    blocker.style.transition = "opacity 0.25s ease";
    document.documentElement.appendChild(blocker);
})();


/* ------------------------------------------------------------------------
   2) DOM 완성 후 모든 변경 적용 → 끝난 뒤 blocker 제거
------------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------
       전체 화면 전환
    ------------------------------ */
    try { document.documentElement.requestFullscreen(); } catch(e){}


    /* ------------------------------
       광고/공지/배너/불필요 요소 제거
    ------------------------------ */
    const removeList = [
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

    removeList.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove());
    });


    /* ------------------------------
       레이아웃 스타일 수정
    ------------------------------ */
    const styleEdits = [
        ['#header',                      'height', '80px'],
        ['.top-menus',                   'height', '150px'],
        ['.coordinates',                 'height', '50px'],
        ['.title',                       'height', '50px'],
        ['.main-ranking',                'height', '474px'],
        ['.playstart',                   'padding', '0'],
        ['.frame-video',                 'marginTop', '0'],
        ['.player-header',               'padding', '10px 0'],
        ['.video-remote',                'display', 'block'],
        ['.video-remote',                'bottom', '60px'],
        ['.video-remote',                'width', '150px']
    ];

    styleEdits.forEach(([sel, prop, val]) => {
        document.querySelectorAll(sel).forEach(el => el.style[prop] = val);
    });


    /* ------------------------------
       배너 이미지 자동 제거 + 동적 감시
    ------------------------------ */
    function hideBanners() {
        document.querySelectorAll("img").forEach(img => {
            if (img.src.includes("banner")) img.style.display = "none";
        });
    }

    hideBanners();

    new MutationObserver(hideBanners)
        .observe(document.body, { childList: true, subtree: true });


    /* ------------------------------
       파비콘/아이콘 변경
    ------------------------------ */
    const faviconURL    = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
    const appleIconURL  = faviconURL;

    function replaceIcons() {
        document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(el => el.remove());

        const icon = document.createElement("link");
        icon.rel  = "icon";
        icon.type = "image/svg+xml";
        icon.href = faviconURL;
        document.head.appendChild(icon);

        const apple = document.createElement("link");
        apple.rel  = "apple-touch-icon";
        apple.href = appleIconURL;
        document.head.appendChild(apple);
    }

    replaceIcons();


    /* ------------------------------
       로고/타이틀 변경
    ------------------------------ */
    document.title = "Netflix";

    const logo = document.querySelector("a.logo img");
    if (logo) {
        logo.src = "https://i.imgur.com/rBAwaXX.png";
        logo.style.width = "110px";
    }


    /* ------------------------------
       자동 다음화 재생 버튼
    ------------------------------ */
    const nextBtn = document.querySelector('a.btn.btn_normal');
    if (nextBtn) nextBtn.click();


    /* ------------------------------
       모든 작업 끝 → blocker 제거
    ------------------------------ */
    setTimeout(() => {
        const blocker = document.getElementById("tvflix_blocker");
        if (blocker) blocker.style.opacity = "0";

        setTimeout(() => blocker?.remove(), 300);
    }, 50);

});
