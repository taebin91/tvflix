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
            display: none !important;
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
            font-size: 1.8em !important;
        }
    `;
    document.head.appendChild(style);
