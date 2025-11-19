/**
 * tvWikiMarkblock.js
 * * 목적: Android TV WebView 환경에서 키보드 이벤트(특히 DPAD)를 가로채어
 * 특정 iframe (Video.js 플레이어)에 맞게 동작을 재매핑합니다.
 * - DPAD Center (66)를 Video.js Hotkeys 플러그인의 전체 화면 키 (F/70)로 매핑합니다.
 * - DPAD 좌우 (37, 39)를 Video.js의 건너뛰기/되감기 기능으로 매핑합니다.
 * * 참고: 이 스크립트는 Android TV 앱의 WebView에 주입되어야 합니다.
 */

// ---------------------------------------------------
// [1] 환경 설정
// ---------------------------------------------------

// 플레이어를 포함하는 iframe의 ID입니다. 실제 환경에 맞게 수정해야 합니다.
const IFRAME_ID = 'view_iframe';

// 플레이어 포커스 상태를 나타내는 플래그입니다. DPAD Center 오작동 방지용.
let isPlayerFocusedFlag = false; 

/**
 * 현재 플레이어 iframe에 포커스가 있는지 확인합니다.
 * 실제 TV 환경에서는 iframe이 주요 요소이므로, 단순 플래그로 처리하는 것이 간편합니다.
 * @returns {boolean}
 */
function isPlayerFocused() {
    return isPlayerFocusedFlag;
}

// ---------------------------------------------------
// [2] 이벤트 핸들러 및 키 매핑 로직
// ---------------------------------------------------

/**
 * 키 다운 이벤트를 처리하고 Video.js 플레이어의 동작을 제어합니다.
 * @param {KeyboardEvent} event 
 */
function handleKeydown(event) {
    const keyCode = event.keyCode;
    
    // 입력 필드나 텍스트 영역에서는 키 이벤트를 가로채지 않습니다.
    const tagName = (event.target || event.srcElement).tagName;
    if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
        return false;
    }
    
    const playerIframe = document.getElementById(IFRAME_ID);
    if (!playerIframe) {
        console.error("Player iframe not found with ID:", IFRAME_ID);
        return false;
    }

    let handled = false;

    switch (keyCode) {
        case 66: // DPAD Center (Android KeyCode)
            if (isPlayerFocused()) {
                event.preventDefault();
                event.stopPropagation();
                
                // Hotkeys 플러그인의 전체 화면 키인 'F' 키(70) 이벤트를 생성합니다.
                // 이 이벤트를 iframe으로 보내서 Hotkeys 플러그인이 잡도록 합니다.
                var fKeydownEvent = new KeyboardEvent('keydown', {
                    keyCode: 70, // F key code
                    which: 70,
                    bubbles: true,
                    cancelable: true
                });

                // iframe 요소 자체에 이벤트를 전달
                playerIframe.dispatchEvent(fKeydownEvent);
                
                console.log("DPAD Center (66) converted to F key (70) event for fullscreen toggle.");
                handled = true; 
            }
            break;

        case 37: // DPAD Left (되감기)
        case 39: // DPAD Right (빨리 감기)
        case 38: // DPAD Up (볼륨 높이기)
        case 40: // DPAD Down (볼륨 낮추기)
            if (isPlayerFocused()) {
                // 이 키들은 Video.js Hotkeys 플러그인이 자체 처리하도록 이벤트를 iframe에 직접 전달
                event.preventDefault(); // 웹뷰 기본 스크롤/포커스 이동 방지
                event.stopPropagation();

                // 기존 이벤트를 복사하여 iframe으로 전달
                const clonedEvent = new KeyboardEvent(event.type, {
                    keyCode: keyCode,
                    which: keyCode,
                    bubbles: true,
                    cancelable: true
                });
                playerIframe.dispatchEvent(clonedEvent);
                
                handled = true;
            }
            break;

        default:
            break;
    }

    return handled;
}

// ---------------------------------------------------
// [3] 초기화 및 이벤트 리스너 등록
// ---------------------------------------------------

/**
 * iframe이 로드되었을 때 포커스를 처리하는 함수
 */
function setupIframeFocus() {
    const playerIframe = document.getElementById(IFRAME_ID);
    if (playerIframe) {
        // iframe 클릭(터치나 DPAD 포커스 전환 시) 시 포커스 플래그를 true로 설정
        playerIframe.addEventListener('click', () => {
            isPlayerFocusedFlag = true;
            console.log('Player Focused: true');
        });
        
        // TV 환경을 위해 페이지 로드 시 기본적으로 포커스를 플레이어에 둡니다.
        isPlayerFocusedFlag = true;
    }
}

// 전역 키다운 이벤트 리스너 등록
window.addEventListener('keydown', handleKeydown, true);
window.addEventListener('load', setupIframeFocus);

console.log('tvWikiMarkblock.js loaded and keydown handler attached.');
