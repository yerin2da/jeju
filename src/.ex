/*
/src
 ├── assets/        # 이미지, 폰트, 아이콘, CSS, 글로벌 스타일 등
 │   ├── images/
 │   ├── fonts/
 │   ├── styles/
 │   └── icons/
 │
├── components/    # 공통 UI 컴포넌트 (버튼, 카드, 모달 등)
│   ├── Button.jsx
 │   ├── Modal.jsx
 │   ├── Card.jsx
 │   └── index.js   # 모든 컴포넌트 export
│
├── layouts/       # 페이지 공통 레이아웃 (Header, Footer, Sidebar 등)
│   ├── Header.jsx
 │   ├── Footer.jsx
 │   ├── MainBar.jsx
 │   ├── Sidebar.jsx
 │   └── index.js
 │
├── pages/         # 라우팅되는 개별 페이지
 │   ├── Main.jsx
 │   ├── WalletLayout.jsx
 │   ├── CoinList2.jsx
 │   ├── MyPage.jsx
 │   ├── NotFound.jsx
 │   └── index.js
 │
├── routes/        # 라우터 설정
 │   ├── AppRouter.jsx
 │   └── PrivateRoute.jsx
 │
├── hooks/         # 커스텀 훅
 │   ├── AuthWatcher.js
 │   ├── useFetch.js
 │   ├── useDebounce.js
 │   └── index.js
 │
├── context/       # Context API 관련 파일 (글로벌 상태)
│   ├── AuthContext.js
 │   ├── ThemeContext.js
 │   └── index.js
 │
├── services/      # API 요청, 데이터 처리 관련
 │   ├── api.js
 │   ├── authService.js
 │   ├── walletService.js
 │   ├── coinService.js
 │   └── index.js
 │
├── utils/         # 유틸리티 함수 모음
 │   ├── helpers.js
 │   ├── constants.js
 │   ├── formatDate.js
 │   └── index.js
 │
├── App.js         # 메인 App 컴포넌트
 ├── index.js       # 진입점
 ├── reportWebVitals.js
 ├── setupTests.js
 └── .env           # 환경 변수
*/
