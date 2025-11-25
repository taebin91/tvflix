// ==UserScript==
// @name        tvFlixOtt
// @namespace   https://xlqldnlzl.site
// @version     20251121
// @description tvFlixOtt - 메인 페이지 UI 정리 및 포커스 개선
// @author      Unknown

// @include     /^https?:\/\/[^/]*tvwiki[^/]*\/.*$/
// @icon        https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    // =======================================================
    // [새로운 로직] 0. 페이지 경로 확인 및 헤더 삭제
    // 메인 페이지('/')가 아닌 하위 페이지일 경우 #header_wrap을 삭제합니다.
    // =======================================================
    const pathname = window.location.pathname;
    const isSubPage = pathname !== '/' && pathname !== ''; // 메인 페이지가 아닌 경우 (예: /view/1234)

    if (isSubPage) {
        const headerWrap = document.getElementById('header_wrap');
        if (headerWrap) {
            headerWrap.remove();
            console.log('Conditional: Removed #header_wrap because this is a subpage.');
        }
    } else {
        // isSubPage가 false일 때 실행되는 부분
        const headerWrap = document.getElementById('header_wrap');
        if (headerWrap) {
            // #header_wrap의 높이를 100px로 설정
            headerWrap.style.height = '100px';
        }
    }
    // =======================================================



    // =======================================================
    // 1. D-Pad 포커스 테두리 (Outline) 스타일 개선 및 UI 조정 CSS
    // =======================================================
    const style = document.createElement('style');
    style.innerHTML = `
        /* 모든 포커스 가능한 요소의 테두리 스타일을 재정의 */
        :focus {
            position: relative !important;
            z-index: 9999 !important;

            outline: 8px solid #FFD700 !important;
            outline-offset: 0px !important;

            box-shadow:
                0 0 0 8px #FFD700 inset,
                0 0 15px rgba(255, 215, 0, 1) !important;

            transition: outline-color 0.2s, box-shadow 0.2s;
        }

        /* Video.js 컨트롤 포커스 적용 */
        .vjs-control-bar button:focus,
        .vjs-menu-button:focus,
        .vjs-control-bar :focus {
             outline: 8px solid #FFD700 !important;
             outline-offset: 0px !important;
             position: relative !important;
             z-index: 9999 !important;
        }

        /* iFrame 포커스 스타일 제거 및 시각적으로 숨기기 */
        iframe:focus {
            outline: none !important;
            box-shadow: none !important;
            position: static !important;
            z-index: auto !important;
        }
        /* [NEW FEATURE] 모든 iframe을 시각적으로 숨기기 */
        iframe {
            width: 0 !important;
            height: 0 !important;
        }

        /* [NEW FIX: 부모 li 확장] #tnb 내부의 li에 걸린 고정 크기 및 float를 해제하여 버튼이 확장할 공간을 확보 */
        #header_wrap #header #tnb ul li {
            float: none !important;
            display: inline-block !important;
            width: auto !important;
            height: auto !important;
            min-width: unset !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        /* [NEW FEATURE] .bo_v_mov 크기를 버튼에 맞게 강제 축소 및 중앙 정렬 */
        .bo_v_mov {
            width: 100% !important;
            height: 80px !important; /* 버튼이 들어갈 높이로 강제 축소 */
            display: flex !important;
            justify-content: center !important; /* 중앙 정렬 */
            align-items: center !important; /* 중앙 정렬 */
            background-color: #1a1a1a !important; /* 배경색을 어둡게 설정 */
            border-radius: 8px !important;
            margin: 10px 0 !important;
            padding: 0 !important;
        }


        /* [MAX SPECIFICITY FIX] ID 선택자를 모두 포함하여 명시도를 최상으로 높임 */
        #header_wrap #header #tnb ul li a.btn_search {
            /* Flexbox로 가로 정렬 강제 */
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important; /* 줄바꿈 절대 금지 */
            align-items: center !important; /* 수직 중앙 정렬 */

            /* 너비/높이 고정값 무효화 및 내용물에 맞게 확장 */
            width: auto !important;
            height: auto !important;
            min-width: 0 !important; /* 최소 너비 제한 해제 */

            justify-content: flex-start !important;
            padding: 8px 15px !important;
            line-height: normal !important; /* 폰트 관련 문제 해결 */
            box-sizing: content-box !important; /* 패딩이 너비에 영향을 주지 않도록 함 */
        }

        /* 텍스트와 아이콘도 명시도를 높여서 가로 배치에 협조하도록 강제 */
        #header_wrap #header #tnb ul li a.btn_search span.search-label,
        #header_wrap #header #tnb ul li a.btn_search i {
            display: inline-block !important; /* Flex 아이템으로 잘 동작하도록 설정 */
            margin: 0 !important; /* 외부 마진 초기화 */
            padding: 0 !important; /* 외부 패딩 초기화 */
            white-space: nowrap !important;
            flex-shrink: 0 !important; /* 공간이 부족해도 축소되지 않도록 함 */
            line-height: 1 !important;
        }

        /* 텍스트와 아이콘 사이의 간격 재설정 */
        #header_wrap #header #tnb ul li a.btn_search span.search-label {
            margin-right: 8px !important;
            font-weight: bold;
            color: inherit;
            /* CSS도 충분히 높여서 혹시 모를 경우 대비 (JS에서 최종 오버라이드 됨) */
            font-size: 1.7em !important;
        }
    `;
    document.head.appendChild(style);
    console.log('Focus style, btn_search layout, iframe hiding, and .bo_v_mov resizing applied.');


    // =======================================================
    // 2. 메인 페이지 (tvwiki) UI 정리 및 포커스 조정 로직
    // =======================================================

    // ---------------------------------------------------
    // [추가된 기능] '.bo_v_tit' 요소에서 '다시보기' 텍스트 제거
    // ---------------------------------------------------
    document.querySelectorAll('.bo_v_tit').forEach(element => {
        // 정규 표현식을 사용하여 모든 '다시보기' 문자열을 빈 문자열로 대체하고 앞뒤 공백 제거
        if (element.textContent.includes('다시보기')) {
            element.textContent = element.textContent.replace(/다시보기/g, '').trim();
            console.log('Removed "다시보기" text from .bo_v_tit.');
        }
    });
    // ---------------------------------------------------

    // ---------------------------------------------------
    // [새로운 기능] '.bo_v_mov'에 '동영상 재생하기' 버튼 추가 및 스타일 수정
    // ---------------------------------------------------
    document.querySelectorAll('div.bo_v_mov').forEach(container => {
        // "동영상 재생하기" 버튼 생성
        const playButton = document.createElement('button');
        playButton.textContent = '▶️ 재생';
        playButton.className = 'tvflix-play-button'; // 식별자 클래스 추가

        // 버튼 스타일 강제 적용 (Netflix 스타일) - 폰트 크기 증가 및 가로 길이 축소 반영
        playButton.style.cssText = `
            background-color: #e50914 !important;
            color: white !important;
            padding: 10px 15px !important; /* 패딩 조정 */
            border: none !important;
            border-radius: 4px !important;
            font-size: 24px !important; /* 폰트 크기 증가 */
            cursor: pointer !important;
            font-weight: bold !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3) !important;
            transition: background-color 0.2s !important;
            width: 180px !important; /* 가로 길이 축소 및 강제 설정 */
            height: 60px !important;
        `;

        // 포커스/호버 효과 추가
        playButton.onmouseover = playButton.onfocus = function() {
            this.style.backgroundColor = '#f40612'; // 더 밝은 빨강
        };
        playButton.onmouseout = playButton.onblur = function() {
            this.style.backgroundColor = '#e50914'; // 원래 빨강
        };

        // ************************************************
        // [수정된 기능] 클릭 시 Kotlin 네이티브 함수 호출
        // ************************************************
        playButton.onclick = function(e) {
            e.preventDefault();
            console.log('동영상 재생하기 버튼 클릭됨.');

            // NativeApp 객체가 WebView에 바인딩되어 있는지 확인하고 함수를 호출합니다.
            // 이 호출은 Kotlin의 handlePlayButtonClick() 메서드를 실행합니다.
            if (typeof NativeApp !== 'undefined' && NativeApp.handlePlayButtonClick) {
                NativeApp.handlePlayButtonClick();
                console.log('Called NativeApp.handlePlayButtonClick() on native side.');
            } else {
                console.warn('NativeApp interface (handlePlayButtonClick) not found.');
            }
        };
        // ************************************************

        // 컨테이너에 버튼 추가
        container.appendChild(playButton);
        console.log('Added "동영상 재생하기" button to .bo_v_mov.');
    });
    // ---------------------------------------------------


    // .slide_wrap 내부의 '.title'을 제외한 모든 요소의 포커스 비활성화
    document.querySelectorAll('.slide_wrap *').forEach(element => {
        if (element.classList && !element.classList.contains('title') && !element.classList.contains('more')) {
            element.setAttribute('tabindex', '-1');
        }
    });
    console.log('Focus adjustment: Set tabindex=-1 for non-title elements within .slide_wrap.');

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

    // ---------------------------------------------------
    // [추가된 기능] 검색 버튼 텍스트 추가 로직 및 인라인 스타일 강제 오버라이드
    // ---------------------------------------------------
    const searchButton = document.querySelector('a.btn_search');
    if (searchButton) {
        // 1. 인라인 스타일을 JS로 직접 덮어씌워서 CSS 충돌을 완전히 회피 (레이아웃 고정)
        searchButton.style.setProperty('align-items', 'center', 'important'); // <-- 복구된 핵심 레이아웃
        searchButton.style.setProperty('width', 'auto', 'important');
        searchButton.style.setProperty('display', 'flex', 'important'); // flex 강제 적용 (CSS에 이미 있지만 안전을 위해)


        // 2. 텍스트를 담을 span 요소를 생성
        const searchLabel = document.createElement('span');
        searchLabel.textContent = ' 검색 ';
        searchLabel.classList.add('search-label');

        // 3. 폰트 크기를 인라인 스타일로 강제 적용 (가장 높은 우선순위)
        searchLabel.style.setProperty('font-size', '1.7em', 'important'); // <<-- 최종 폰트 크기 강제 적용

        // 버튼 아이콘 앞에 텍스트 추가
        searchButton.prepend(searchLabel);
        console.log('Added "검색하기" text to the search button with inline style overwrite.');
    }
    // ---------------------------------------------------

    // 기존의 기타 포커스 비활성화 로직 (안전을 위해 유지)
    document.querySelectorAll('a.img, img, img.lazy, iframe').forEach(element => {
        element.setAttribute('tabindex', '-1');
    });


    // 제거할 UI 요소
    const elementsToRemove = [
        '.notice', '.logo', '.gnb_mobile', '.top_btn', '.profile_info_ct',
        '.ep_search', '.good', '.emer-content', '#bo_v_atc', '.cast',
        '.view-comment-area', '.over', '#bo_v_act', '#bo_vc', '#float',
        'div.notice', 'ul.banner2', 'li.full.pc-only', 'li.full.mobile-only',
        'nav.gnb.sf-js-enabled.sf-arrows', 'a.btn_login', '#bnb', '#footer', '.search_wrap ul', '.layer-footer'
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


// ---------------------------------------------------

})();
