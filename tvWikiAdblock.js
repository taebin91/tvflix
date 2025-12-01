let focusOverlay = null;

// 반짝임 효과 스타일 추가
const blinkStyle = document.createElement('style');
blinkStyle.textContent = `
@keyframes focusBlink {
    0% { background-color: rgba(255, 215, 0, 1); }
    100% { background-color: rgba(255, 215, 0, 0.6); }
}
`;
document.head.appendChild(blinkStyle);

document.addEventListener('focusin', (e) => {
    const el = e.target;
    const rect = el.getBoundingClientRect();

    // 원본을 투명하게 만들기
    el.style.opacity = '0';

    // 포커스 오버레이 생성
    focusOverlay = document.createElement('div');
    focusOverlay.textContent = el.textContent;

    focusOverlay.style.position = 'absolute';
    focusOverlay.style.top = `${rect.top + window.scrollY}px`;
    focusOverlay.style.left = `${rect.left + window.scrollX}px`;
    focusOverlay.style.width = `${rect.width}px`;
    focusOverlay.style.height = `${rect.height + 20}px`;

    focusOverlay.style.color = '#000';
    focusOverlay.style.fontWeight = 'bold';
    focusOverlay.style.fontSize = window.getComputedStyle(el).fontSize;
    focusOverlay.style.fontFamily = window.getComputedStyle(el).fontFamily;

    focusOverlay.style.background = 'rgba(255, 215, 0, 1)';
    focusOverlay.style.display = 'flex';
    focusOverlay.style.alignItems = 'center';
    focusOverlay.style.justifyContent = 'center';

    focusOverlay.style.padding = '4px 10px';
    focusOverlay.style.zIndex = '999999';
    focusOverlay.style.pointerEvents = 'none';

    // ✨ 반짝임 애니메이션 적용
    focusOverlay.style.animation = 'focusBlink 0.8s infinite alternate';

    document.body.appendChild(focusOverlay);
});

document.addEventListener('focusout', (e) => {
    const el = e.target;

    el.style.opacity = '';

    if (focusOverlay) {
        focusOverlay.remove();
        focusOverlay = null;
    }
});
