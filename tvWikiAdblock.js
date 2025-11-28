        /* 🚨 [최종 수정] 커스텀 알림 모달 스타일: Flexbox 대신 Absolute Positioning + Transform 사용 */
        .custom-alert-backdrop {
            position: fixed !important; /* 뷰포트에 고정 */
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-color: rgba(0, 0, 0, 0.7) !important;
            z-index: 10000 !important;
            /* Flexbox 중앙 정렬 제거: Modal 자체에서 중앙 정렬을 처리 */
            display: block !important; 
        }
        .custom-alert-modal {
            /* 🚨 이 모달 자체를 중앙에 위치시킵니다. */
            position: absolute !important; 
            top: 50% !important; 
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            
            background: #2c2c2c; /* 다크 모드 배경 */
            color: #f0f0f0; /* 밝은 텍스트 */
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            max-width: 400px;
            width: 90%;
            text-align: center;
            border: 2px solid #FFD700; /* 포커스 색상 */
        }
        .custom-alert-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 15px;
            color: #FFD700;
        }
        .custom-alert-message {
            margin-bottom: 20px;
            font-size: 1rem;
            word-break: break-word;
        }
        .custom-alert-actions button {
            background-color: #555;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 0 5px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s, box-shadow 0.2s;
        }
        .custom-alert-actions button:focus,
        .custom-alert-actions button:hover {
            background-color: #FFD700;
            color: #111;
            outline: none;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
        }

    `;
    document.head.appendChild(style);
    console.log('Focus style improved: Aggressive 8px outline and inset shadow applied.');
