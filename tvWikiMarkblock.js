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

// DPAD Center (66) 키를 플레이어가 아닌 다른 요소에서 누르면 작동을 막는 플래그입니다.
let isPlayerFocusedFlag = false; 

/**
 * 현재 포커스가 플레이어 iframe에 있는지 확인합니다.
 * @returns {boolean}
 */
function isPlayerFocused() {
    const activeElement = document.activeElement;
    const playerIframe = document.getElementById(IFRAME_ID);
    
    // 이 환경에서는 iframe 자체가 포커스를 받거나, iframe이 화면의 주요 콘텐츠일 때 true로 간주합니다.
    return (activeElement && activeElement.id === IFRAME_ID) || isPlayerFocusedFlag;
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
        // console.error("Player iframe not found with ID:", IFRAME_ID);
        return false;
    }

    let handled = false;

    switch (keyCode) {
        case 66: // DPAD Center (Enter)
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

                // iframe 요소 자체에 이벤트를 전달하여 iframe 내부의 DOM 트리에 전파를 기대합니다.
                // NOTE: 크로스-도메인 제약으로 인해 contentDocument에 직접 접근할 수 없으므로,
                // 이 방법이 최선의 우회책입니다.
                playerIframe.dispatchEvent(fKeydownEvent);
                
                // console.log("DPAD Center (66) converted to F key (70) event for fullscreen toggle.");
                handled = true; 
            }
            break;

        case 37: // DPAD Left (되감기)
        case 39: // DPAD Right (빨리 감기)
        case 38: // DPAD Up (볼륨 높이기)
        case 40: // DPAD Down (볼륨 낮추기)
            if (isPlayerFocused()) {
                // 이 키들은 videojs.hotkeys 플러그인이 자체적으로 처리할 수 있도록 
                // 이벤트를 iframe에 직접 전달하여 기본 동작을 활용합니다.
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
            
        // case 13: // Keyboard Enter (DPAD Center와 겹칠 수 있으므로 일단 무시하거나 필요한 동작으로 매핑)
        //     // ... (필요 시 로직 추가)
        //     break;

        default:
            // 그 외 키는 기본 동작을 허용하거나, 필요에 따라 추가 매핑합니다.
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
        // iframe 클릭 시 포커스 플래그를 true로 설정하여 키 이벤트 처리를 활성화
        playerIframe.addEventListener('click', () => {
            isPlayerFocusedFlag = true;
            // console.log('Player Focused: true');
        });
        
        // 상위 document에서 포커스가 벗어나면 플래그를 false로 설정 (선택 사항)
        // document.addEventListener('click', (e) => {
        //     if (e.target.id !== IFRAME_ID) {
        //         isPlayerFocusedFlag = false;
        //         // console.log('Player Focused: false');
        //     }
        // });
        
        // 페이지 로드 시 iframe이 준비되면 포커스 플래그를 true로 초기 설정 (TV 환경 가정)
        // 실제 환경에 따라 이 초기 설정은 달라질 수 있습니다.
        isPlayerFocusedFlag = true;
    }
}

// 전역 키다운 이벤트 리스너 등록
window.addEventListener('keydown', handleKeydown, true);
window.addEventListener('load', setupIframeFocus);

// console.log('tvWikiMarkblock.js loaded and keydown handler attached.');
