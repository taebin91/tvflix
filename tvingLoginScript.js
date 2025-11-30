// ==UserScript==
// @name        tving Full Auto Login & Fullscreen
// @namespace   Violentmonkey Scripts
// @match       https://www.tving.com/live/C01582*
// @include     /^https?:\/\/[^/]*tving[^/]*\/.*$/
// @grant       none
// @version     1.3
// @author      -
// @description SPA 구조 대응: 자동 로그인 + 전체화면
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
        }
    }

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

})();

