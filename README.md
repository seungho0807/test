# 메가MGC커피(MEGA MGC COFFEE) 반응형 웹사이트

제공해주신 메가MGC커피 홈페이지 디자인 레퍼런스를 기반으로 **HTML5, Tailwind CSS, Vanilla JavaScript**만을 활용하여 제작된 인터랙티브 브랜드 웹사이트입니다. (React, Vue 등 프레임워크 미사용)

---

## 🛠️ 개발 환경 및 기술 스택

| 구분 | 기술 / 라이브러리 | 설명 |
| :--- | :--- | :--- |
| **마크업 & 스타일** | HTML5, Tailwind CSS | 시맨틱 웹 태그, 반응형 유틸리티 클래스 |
| **언어** | Vanilla JavaScript (ES6+) | 프레임워크 없는 순수 자바스크립트 |
| **폰트** | Montserrat, Poppins, Pretendard | 영문 및 한글 공식 웹폰트 적용 |
| **아이콘** | Lucide Icons | 직관적인 고품질 벡터 아이콘 |
| **스크롤 엔진** | Lenis.js | 모던하고 부드러운 스크롤링(Smooth Scroll) |
| **애니메이션** | GSAP 3 + ScrollTrigger | 스크롤 시점별 인터랙션 및 리빌 효과 |
| **캐러셀 / 슬라이더** | Swiper.js 11 | 메인 히어로 배너 및 메뉴 슬라이드 |
| **배포 호환성** | GitHub Pages 최적화 | 순수 정적 에셋 및 상대 경로(`images/...`, `css/...`, `js/...`) |

---

## 📁 프로젝트 폴더 구조

```text
mega-coffee/
├── index.html              # 시맨틱 구조의 메인 홈페이지
├── css/
│   └── style.css           # 폰트, 애니메이션, Swiper & Lenis 커스텀 스타일
├── js/
│   └── main.js             # Lenis, GSAP, Swiper, 모달, 필터링 등 스크립트 일체
├── images/                 # 레퍼런스 시안에서 추출 및 최적화된 이미지 에셋
│   ├── hero-banner.png     # 가을 신메뉴 메인 히어로 비주얼
│   ├── menu-americano.png  # 아메리카노 메뉴 이미지
│   ├── menu-latte.png      # 카페라떼 메뉴 이미지
│   ├── menu-strawberry.png # 딸기라떼 메뉴 이미지
│   ├── menu-misutgaru.png  # 미숫가루 메뉴 이미지
│   ├── order-banner.png    # 메가오더 스마트폰 & 매장 비주얼
│   ├── event-banner1.png   # '지구인들아 힘내!' 이벤트 배너
│   ├── event-banner2.png   # '우리들의 여름 정거장' 이벤트 배너
│   ├── event-banner3.png   # '메가오더 첫 주문 할인' 이벤트 배너
│   └── event-banner4.png   # '텀블러 에코 캠페인' 이벤트 배너
└── README.md               # 프로젝트 안내 및 배포 매뉴얼
```

---

## 🌟 주요 섹션 및 인터랙션 구현 특징

### 1. Header (GNB)
- 메가커피 시그니처 옐로우(`#FFCE00`) 배경에 볼드한 타이포그래피 로고(`MEGA MGC COFFEE`) 배치
- `MENU`, `STORE`, `EVENT`, `BRAND`, `ORDER` 주요 내비게이션 메뉴
- 스크롤 시 상단 고정(Sticky Header) 및 부드러운 음영(`box-shadow`) 전환
- 모바일 전용 햄버거 버튼 및 부드러운 슬라이드-인 사이드 드로어(Drawer) 내비게이션 제공 (배경 딤처리, ESC 닫기 지원)

### 2. Main Hero Banner (Swiper.js)
- 레퍼런스 시안의 "달콤한 가을을 담은 신메뉴 출시" 가을 테마 대형 배너 슬라이드
- `NEW!` 반짝이는 인터랙티브 배지 및 타이포그래피
- 자동 재생(Autoplay), 페이드(Fade) 전환, 인디케이터(Pagination Bullets), 좌우 탐색 버튼 탑재
- "자세히 보기" 클릭 시 가을 신메뉴 3종 라인업을 한눈에 확인할 수 있는 팝업 모달 연동

### 3. MEGA MENU (Swiper.js)
- 레퍼런스 시안 대표 음료(아메리카노 2,000원, 카페라떼 3,500원, 딸기라떼 4,300원, 미숫가루 3,000원 등) 카드 배치
- 좌/우 탐색 화살표 버튼(`<`, `>`)과 연동된 Swiper 캐러셀
- 모바일(1.4개), 태블릿(2~3개), 데스크톱(4개) 반응형 화면 분할
- 마우스 호버 시 이미지 확대(`scale-108`) 및 부드러운 그림자 효과
- 카테고리 필터 탭(전체, 커피, 라떼&곡물, 프라페&스무디, 에이드&티)을 통한 실시간 슬라이드 필터링
- 메뉴 카드 클릭 시 칼로리, 당류, 단백질, 카페인 정보를 확인할 수 있는 영양성분 모달 제공

### 4. MEGA ORDER
- 부드러운 크림 톤(`#FAF6EE`) 배경에 스마트폰 주문 및 매장 비주얼 조화
- "매장 선택" 버튼 클릭 시 주변 매장 검색 및 선택 모달 연동
- "메뉴 주문" 버튼 클릭 시 앱 다운로드 및 웹 오더 모달 연동

### 5. MEGA EVENT
- 레퍼런스 시안의 "지구인들아 힘내!", "우리들의 여름 정거장" 프로모션 카드 2열 배치
- 하단 "이벤트 더보기" 버튼 클릭 시 숨겨진 추가 이벤트(첫 주문 쿠폰, 텀블러 에코 할인 등)가 부드럽게 펼쳐지는 토글 아코디언 구현

### 6. Footer & Floating Top Button
- 모던한 차콜 다크(`#181818`) 배경에 로고, 메뉴 바로가기, 고객센터(1588-8298), 사업자 정보 및 이용약관 배치
- 300px 이상 스크롤 시 화면 우측 하단에 나타나는 부드러운 Top 이동 플로팅 버튼 (Lenis 스무스 스크롤 연동)

---

## 🚀 로컬 환경 실행 방법

별도의 빌드 도구나 웹 서버 설치 없이 브라우저에서 바로 열 수 있습니다.

1. 파일 탐색기에서 `index.html` 파일을 더블 클릭하여 Chrome, Edge 등의 브라우저로 엽니다.
2. 또는 로컬 개발 서버(VS Code의 Live Server 익스텐션 또는 `npx serve`)를 통해 실행할 수도 있습니다.
   ```bash
   # npx serve를 사용할 경우
   cd mega-coffee
   npx serve .
   ```

---

## 🌐 GitHub Pages 배포 가이드

본 프로젝트는 외부 종속성 없이 정적 에셋과 CDN으로 구성되어 있어 GitHub Pages에 즉시 무료 배포가 가능합니다.

1. **GitHub 저장소(Repository) 생성**
   - GitHub 사이트에서 `mega-coffee` (또는 원하는 이름)의 새 저장소를 생성합니다. (Public 권한 권장)

2. **로컬 파일 커밋 및 푸시**
   ```bash
   cd "C:\Users\ITI\.gemini\antigravity\scratch\mega-coffee"
   git init
   git add .
   git commit -m "feat: 메가MGC커피 인터랙티브 반응형 웹사이트 완성"
   git branch -M main
   git remote add origin https://github.com/<사용자ID>/<저장소이름>.git
   git push -u origin main
   ```

3. **GitHub Pages 활성화**
   - GitHub 저장소 웹페이지 상단의 **Settings** 메뉴로 이동합니다.
   - 왼쪽 사이드바에서 **Pages**를 클릭합니다.
   - **Build and deployment > Source**에서 **Deploy from a branch**를 선택합니다.
   - **Branch** 설정에서 `main` 브랜치 및 `/(root)` 폴더를 선택하고 **Save**를 클릭합니다.
   - 1~2분 후 `https://<사용자ID>.github.io/<저장소이름>/` 주소로 전 세계 어디서든 접근 가능한 라이브 웹사이트가 배포됩니다.
