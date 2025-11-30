// ==UserScript==
// @name        tving Auto Login & Fullscreen
// @namespace   Violentmonkey Scripts
// @match       https://www.tving.com/live/C01582*
// @include     /^https?:\/\/[^/]*tving[^/]*\/.*$/
// @grant       none
// @version     1.4
// @author      -
// @description SPA 대응: 자동 로그인 + 전체화면
// ==/UserScript==

(function() {
    'use strict';

    const userId = 'enbita';
    const userPassword = 'qpwpeprp1!';

    function setReactInput(input, value) {
        const nativeSetter = Object.getOwnPropertyDescriptor(input.__proto__, 'value').set;
        nativeSetter.call(input, value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function fillFormAndLogin() {
        const idInput = document.querySelector('input[name="id"]');
        const pwInput = document.querySelector('input[name="password"]');
        const autoLoginBtn = document.getElementById('autoLoginCheckbox');

        if (idInput && pwInput && autoLoginBtn) {
            setReactInput(idInput, userId);
            setReactInput(pwInput, userPassword);

            if (autoLoginBtn.getAttribute('aria-checked') === 'false') {
                autoLoginBtn.click();
            }

            const loginBtn = Array.from(document.querySelectorAll('button[type="submit"]'))
                .find(btn => btn.innerText.includes('로그인하기'));
            if (loginBtn) loginBtn.click();
            console.log('자동 로그인 시도 완료');
        }
    }

    function clickFullscreenButton() {
        const fullscreenBtn = document.querySelector('button.con__fullscreen[aria-label="전체화면"]');
        if (fullscreenBtn) {
            fullscreenBtn.click();
            console.log('전체화면 버튼 클릭 완료');
        }
    }

    // 로그인 폼 로딩 감지
    const loginObserver = new MutationObserver((mutations, obs) => {
        const idInput = document.querySelector('input[name="id"]');
        const pwInput = document.querySelector('input[name="password"]');
        const autoLoginBtn = document.getElementById('autoLoginCheckbox');

        if (idInput && pwInput && autoLoginBtn) {
            fillFormAndLogin();
            obs.disconnect();
        }
    });
    loginObserver.observe(document.body, { childList: true, subtree: true });

    // 전체화면 버튼 감지
    const fullscreenObserver = new MutationObserver((mutations, obs) => {
        const fullscreenBtn = document.querySelector('button.con__fullscreen[aria-label="전체화면"]');
        if (fullscreenBtn) {
            clickFullscreenButton();
            obs.disconnect();
        }
    });
    fullscreenObserver.observe(document.body, { childList: true, subtree: true });

})();


// 전체화면 버튼 자동 클릭
const fullscreenInterval = setInterval(() => {
    const btn = document.querySelector('button.con__fullscreen[aria-label="전체화면"]');
    if (btn) {
        btn.click();
        console.log('전체화면 버튼 클릭 완료');
        clearInterval(fullscreenInterval);
    }
}, 500);


// 소리 켜기 버튼 자동 클릭
const soundButtonInterval = setInterval(() => {
    // 버튼 내부 span 텍스트로 식별
    const soundBtn = Array.from(document.querySelectorAll('button'))
        .find(btn => btn.innerText.includes('클릭하여 소리켜기'));

    if (soundBtn) {
        soundBtn.click();
        console.log('소리 켜기 버튼 클릭 완료');
        clearInterval(soundButtonInterval);
    }
}, 500);

// 광고 건너뛰기 버튼 자동 클릭
const adSkipInterval = setInterval(() => {
    const adBtn = Array.from(document.querySelectorAll('button.ad-skip-btn'))
        .find(btn => btn.innerText.includes('광고 건너뛰기'));

    if (adBtn) {
        adBtn.click();
        console.log('광고 건너뛰기 버튼 클릭 완료');
    }
}, 1000);
