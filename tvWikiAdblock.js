let focusOverlay = null;

document.addEventListener('focusin', (e) => {
    const target = e.target.closest && e.target.closest('.title, .title2');
    if (!target) return;

    const rect = target.getBoundingClientRect();

    // 원본 투명화
    target.style.opacity = '0';

    // 포커스 오버레이 생성
    focusOverlay = document.createElement('div');
    focusOverlay.textContent = target.textContent;

    // 기본 배치
    focusOverlay.style.position = 'absolute';
    focusOverlay.style.top = `${rect.top + window.scrollY}px`;
    focusOverlay.style.left = `${rect.left + window.scrollX}px`;
    focusOverlay.style.width = `${rect.width}px`;
    focusOverlay.style.height = `${rect.height + 30}px`;

    // 텍스트/배경
    focusOverlay.style.color = '#FFF';
    focusOverlay.style.fontWeight = 'bold';
    focusOverlay.style.background = '#552E00';
    focusOverlay.style.display = 'flex';
    focusOverlay.style.alignItems = 'center';
    focusOverlay.style.justifyContent = 'center';
    focusOverlay.style.zIndex = '999999';
    focusOverlay.style.pointerEvents = 'none';

    // 글꼴 스타일 (원본 복사)
    const cs = window.getComputedStyle(target);
    focusOverlay.style.fontSize = cs.fontSize;
    focusOverlay.style.fontFamily = cs.fontFamily;
    focusOverlay.style.padding = '4px 10px';

    // ⭐ 여기에 “기존 포커스 빛나는 효과” 추가 ⭐
    focusOverlay.style.outline = '4px solid #552E00';
    focusOverlay.style.outlineOffset = '0';
    focusOverlay.style.boxShadow = `
        0 0 0 400px #552E00 inset,
        0 0 400px rgba(255, 215, 0, 1)
    `;
    focusOverlay.style.transition = 'outline-color 0.2s, box-shadow 0.2s';

    document.body.appendChild(focusOverlay);
});

document.addEventListener('focusout', (e) => {
    const el = e.target;

    // 원본 복원
    el.style.opacity = '';

    // 오버레이 제거
    if (focusOverlay) {
        focusOverlay.remove();
        focusOverlay = null;
    }
});
