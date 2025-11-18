// ==UserScript==

// @name         tvFlixOtt

// @namespace    https://xlqldnlzl.site

// @version      20251118

// @description  tvFlixOtt - 메인 페이지 UI 정리 및 포커스 개선

// @author       Unknown



// @include      /^https?:\/\/[^/]*tvwiki[^/]*\/.*$/

// @icon         https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg

// @grant        none

// ==/UserScript==



(function() {

    'use strict';

    console.log('TV User Script (tvWikiAdblock.js) loaded and running (Main Page Only).');



    // =======================================================

    // 1. D-Pad 포커스 테두리 (Outline) 스타일 개선 로직 (최대 가시성 확보)

    // =======================================================

    const style = document.createElement('style');

    style.innerHTML = `

        /* 모든 포커스 가능한 요소의 테두리 스타일을 재정의 */

        :focus {

            /* 레이어링: 포커스된 요소가 항상 다른 요소 위에 표시되도록 강제로 레이어 올림 */

            position: relative !important;

            z-index: 9999 !important;



            /* 외곽선: 테두리 굵기 증가 (8px) 및 테두리 바로 옆에 붙도록 offset 제거 (0px) */

            outline: 8px solid #FFD700 !important;

            outline-offset: 0px !important;



            /* 박스 그림자: 내부 그림자(inset)를 굵게 설정하여 요소가 잘려도 경계 안에 확실히 포커스 표시 */

            box-shadow:

                0 0 0 8px #FFD700 inset, /* 내부 침범 그림자로 clipping 방지 */

                0 0 15px rgba(255, 215, 0, 1) !important; /* 강한 외부 빛 효과 */



            transition: outline-color 0.2s, box-shadow 0.2s; /* 부드러운 전환 효과 */

        }



        /* Video.js와 같이 특정 클래스를 사용하는 플레이어의 컨트롤에도 강제로 적용 */

        .vjs-control-bar button:focus,

        .vjs-menu-button:focus,

        .vjs-control-bar :focus {

             outline: 8px solid #FFD700 !important;

             outline-offset: 0px !important;

             position: relative !important;

             z-index: 9999 !important;

        }



        /* iFrame 자체 포커스 스타일 제거 (포커스 갇힘 방지) */

        iframe:focus {

            outline: none !important;

            box-shadow: none !important;

            position: static !important;

            z-index: auto !important;

        }

    `;

    document.head.appendChild(style);

    console.log('Focus style improved: Aggressive 8px outline and inset shadow applied.');





    // =======================================================

    // 2. 메인 페이지 (tvwiki) UI 정리 및 스타일 조정 로직

    // =======================================================



    // 홈화면의 첫 번째 '.slide_wrap' 제거

    const firstSlideWrap = document.querySelector('.slide_wrap');

    if (firstSlideWrap) {

        firstSlideWrap.remove();

        console.log('Removed the first .slide_wrap element.');

    }



    // 남은 Slide Wrap 제목 변경 로직

    const slideWraps = document.querySelectorAll('.slide_wrap');

    const newTitles = ['드라마', '영화', '예능', '애니메이션'];



    slideWraps.forEach((wrap, index) => {

        if (index < newTitles.length) {

            const h2 = wrap.querySelector('h2');

            if (h2) {

                const moreLink = h2.querySelector('a.more');

                const newTitleText = newTitles[index];



                if (moreLink) {

                    h2.innerHTML = `${newTitleText}${moreLink.outerHTML}`;

                    console.log(`Updated slide wrap title #${index + 2} to: ${newTitleText}`);

                } else {

                    h2.textContent = newTitleText;

                    console.log(`Updated slide wrap title #${index + 2} (no link found) to: ${newTitleText}`);

                }

            }

        }

    });



    // 클래스가 'img'인 모든 <a> 태그의 포커스 비활성화 (tabindex="-1")

    document.querySelectorAll('a.img').forEach(element => {

        element.setAttribute('tabindex', '-1');

    });



    // 클래스가 'lazy'인 모든 <a> 태그의 포커스 비활성화 (tabindex="-1")

    document.querySelectorAll('img.lazy').forEach(element => {

        element.setAttribute('tabindex', '-1');

    });







    // 제거할 UI 요소

    const elementsToRemove = [

        '.notice', '.logo', '.gnb_mobile', '.top_btn', '.profile_info_ct',

        '.ep_search', '.good', '.emer-content', '#bo_v_atc', '.cast',

        '.view-comment-area', '.over', '#bo_v_act', '#bo_vc', '#float',

        'div.notice', 'ul.banner2', 'li.full.pc-only', 'li.full.mobile-only',

        'nav.gnb.sf-js-enabled.sf-arrows', 'a.btn_login', '#bnb', '#footer', '.search_wrap ul'

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

        { selector: '.main-ranking', height: '474px' },

        { selector: '.playstart', padding: '0' },

        { selector: '.frame-video', marginTop: '0' },

        { selector: '.player-header', padding: '10px 0' },

        { selector: '.video-remote', display: 'block', bottom: '60px', width: '150px' }

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

            img.src = "https://i.imgur.com/rBAwaXX.png";

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



})();

