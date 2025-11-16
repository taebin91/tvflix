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



document.addEventListener('DOMContentLoaded', function() {
  document.documentElement.requestFullscreen();
});

// 상단 공지 삭제
document.querySelectorAll('.notice').forEach(element => {
    element.remove();
});

// 메인 문구 삭제
document.querySelectorAll('.emer-content').forEach(element => {
    element.remove();
});

// 상단 메뉴 높이 수정
document.getElementById('header').style.height = '80px';

document.querySelectorAll('.top-menus').forEach(element => {
    element.style.height = '150px';
});

// 컨테이너 제목 높이 수정
document.querySelectorAll('.coordinates').forEach(element => {
    element.style.height = '50px';
});
// 컨테이너 제목 높이 수정
document.querySelectorAll('.title').forEach(element => {
    element.style.height = '50px';
});

// 영상별 높이
document.querySelectorAll('.main-ranking').forEach(element => {
    element.style.height = '474px';
});

// 재생 플레이어 여백 제거거
document.querySelectorAll('.playstart').forEach(element => {
    element.style.padding = '0';
});

// 재생 플레이어 상단 여백 없애기
document.querySelectorAll('.frame-video').forEach(element => {
    element.style.marginTop = '0';
});

// 재생 플레이어 제목 여백 수정
document.querySelectorAll('.player-header').forEach(element => {
    element.style.padding = '10px 0';
});

// 재생 플레이어 줄거리 삭제
document.querySelectorAll('#bo_v_atc').forEach(element => {
    element.remove();
});

// 재생 플레이어 배우 삭제
document.querySelectorAll('.cast').forEach(element => {
    element.remove();
});

// 재생 플레이어 댓글 삭제
document.querySelectorAll('.view-comment-area').forEach(element => {
    element.remove();
});

// 재생 전 공지사항 팝업 삭제
document.querySelectorAll('.over').forEach(element => {
    element.remove();
});




// 아래 다음화 항상 보이게
document.querySelectorAll('.video-remote').forEach(element => {
    element.style.display = 'block';

    element.style.bottom = '60px';
    element.style.width = '150px';
});

// 배너 이미지 삭제
(function() {
    'use strict';
	
	//아이콘 변경 함수
    const faviconURL = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
    const appleIconURL = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";

    function replaceIcons() {
        // 기존 favicon 관련 태그 제거
        document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(el => el.remove());

        // favicon (SVG)
        const icon = document.createElement('link');
        icon.rel = "icon";
        icon.type = "image/svg+xml";
        icon.href = faviconURL;
        document.head.appendChild(icon);

        // apple-touch-icon
        const apple = document.createElement('link');
        apple.rel = "apple-touch-icon";
        apple.href = appleIconURL;
        document.head.appendChild(apple);
    }

    // 배너 이미지를 숨기는 함수
    function hideBannerImages() {
        document.querySelectorAll('img').forEach(img => {
            if (img.src.includes('banner')) {
                img.style.display = 'none';
            }
        });
    }

    // 페이지 로드 후 1회 실행
    hideBannerImages();

    // 동적으로 로드되는 배너(예: Ajax, SPA)를 감지해서 계속 적용
    const observer = new MutationObserver(hideBannerImages);
    observer.observe(document.body, { childList: true, subtree: true });
	
	
// 타이틀 변경
document.title = "Netflix";

// 로고 변경
const logoLink = document.querySelector("a.logo");
if (logoLink) {
	const img = logoLink.querySelector("img");
	if (img) {
		img.src = "https://i.imgur.com/rBAwaXX.png"; // 이미지를 바로 변경
		img.style.width = "110px";
		img.style.height = "auto";
	}
}

// 자동 플레이어 넘기기
const button = document.querySelector('a.btn.btn_normal');
if (button) {
	button.click();
}

// 추가: 컨텐츠 내부 동작 제거 (좋아요 공유 스크랩 등)
const bo_v_act = document.getElementById('bo_v_act');
if (bo_v_act) {
	bo_v_act.remove();
}

//댓글 제거
const bo_vc = document.getElementById('bo_vc');
if (bo_vc) {
	bo_vc.remove();
}

//하단 플로트바 제거
const bottom_float = document.getElementById('float');
if (bottom_float) {
	bottom_float.remove();
}

// 광고 및 UI 제거 (배너, 메뉴 등)
document.querySelectorAll('div.notice, ul.banner2, li.full.pc-only, li.full.mobile-only, nav.gnb.sf-js-enabled.sf-arrows, a.btn_login, #bnb, #footer, .search_wrap ul')
	.forEach(element => element.remove());
	
replaceIcons();

	
if (typeof Unity !== "undefined" && Unity.call) {
	Unity.call("SCRIPT_READY");
}

})();

