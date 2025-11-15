// ==UserScript==
// @name         tvFlixOtt
// @namespace    https://xlqldnlzl.site
// @version      20251115
// @description  tvFlixOtt
// @author       Unknown
// @include      /^https?:\/\/[^/]*tvwiki[^/]*\/.*$/
// @icon         https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg
// @grant        none
// ==/UserScript==

/* -------------------------------------------------------
   0. 페이지 렌더링 이전에 즉시 검은 장막 생성 (플래시 방지)
------------------------------------------------------- */
(function() {
    const blocker = document.createElement("div");
    blocker.id = "__unity_blocker__";
    blocker.style.position = "fixed";
    blocker.style.left = "0";
    blocker.style.top = "0";
    blocker.style.width = "100vw";
    blocker.style.height = "100vh";
    blocker.style.background = "black";
    blocker.style.zIndex = "99999999";
    blocker.style.pointerEvents = "none";
    blocker.style.opacity = "1";
    document.documentElement.appendChild(blocker);
})();

/* -------------------------------------------------------
   1. DOM 완전히 준비된 후 모든 UI 조작 시작
------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {

    /* 전체화면 실행 */
    try { document.documentElement.requestFullscreen(); } catch(e){}

    /* 안전 query 함수 */
    const $all = (sel) => document.querySelectorAll(sel);
    const $ = (sel) => document.querySelector(sel);

    /* UI 제거 */
    $all('.notice, .emer-content, #bo_v_atc, .cast, .view-comment-area, .over').forEach(el => el.remove());

    /* 상단 메뉴 */
    const header = $('#header');
    if (header) header.style.height = '80px';
    $all('.top-menus').forEach(el => el.style.height = '150px');

    /* 제목 높이 */
    $all('.coordinates, .title').forEach(el => el.style.height = '50px');

    /* 메인 랭킹 */
    $all('.main-ranking').forEach(el => el.style.height = '474px');

    /* 플레이어 관련 */
    $all('.playstart').forEach(el => el.style.padding = '0');
    $all('.frame-video').forEach(el => el.style.marginTop = '0');
    $all('.player-header').forEach(el => el.style.padding = '10px 0');

    /* 다음화 버튼 */
    $all('.video-remote').forEach(el => {
        el.style.display = 'block';
        el.style.bottom = '60px';
        el.style.width = '150px';
    });

    /* 배너 이미지 제거 */
    function hideBannerImages() {
        document.querySelectorAll('img').forEach(img => {
            if (img.src.includes('banner')) img.style.display = 'none';
        });
    }
    hideBannerImages();
    new MutationObserver(hideBannerImages).observe(document.body, { childList: true, subtree: true });

    /* 아이콘 교체 */
    (function replaceIcons() {
        const faviconURL = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
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
    })();

    /* 타이틀 변경 */
    document.title = "Netflix";

    /* 로고 변경 */
    const logoLink = $("a.logo");
    if (logoLink) {
        const img = logoLink.querySelector("img");
        if (img) {
            img.src = "https://i.imgur.com/rBAwaXX.png";
            img.style.width = "110px";
            img.style.height = "auto";
        }
    }

    /* 자동 다음화 */
    const autoBtn = $('a.btn.btn_normal');
    if (autoBtn) autoBtn.click();

    /* 동작 제거 */
    const bo_v_act = $('#bo_v_act');
    if (bo_v_act) bo_v_act.remove();

    const bo_vc = $('#bo_vc');
    if (bo_vc) bo_vc.remove();

    const bottom_float = $('#float');
    if (bottom_float) bottom_float.remove();

    /* 광고/불필요 UI 제거 */
    $all('div.notice, ul.banner2, li.full.pc-only, li.full.mobile-only, nav.gnb.sf-js-enabled.sf-arrows, a.btn_login, #bnb, #footer, .search_wrap ul')
        .forEach(el => el.remove());

    /* -------------------------------------------------------
       2. 모든 DOM 조작 완료 → 검은 장막 제거 + Unity 콜백
    ------------------------------------------------------- */
    const blocker = document.getElementById("__unity_blocker__");
    if (blocker) blocker.style.display = "none";

    if (typeof Unity !== "undefined" && Unity.call) {
        Unity.call("SCRIPT_READY");
    }
});
