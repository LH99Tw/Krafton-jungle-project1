# PRD: Lee Juhan Interactive Project Reel

## 0. 문서 목적

이 문서는 `taotajima.jp`의 인터랙티브 포트폴리오 구조를 참고해, 이주한의 GitHub 프로젝트와 GitBlog 기록을 하나의 작품 목록처럼 보여주는 웹사이트를 정의한다.

참조 사이트의 핵심 경험은 다음과 같다.

- 화면 전체를 사용하는 몰입형 첫 화면
- 고정된 최소 내비게이션
- 이름과 역할을 강한 타이포그래피로 보여주는 오프닝
- 작품 목록을 열고 닫는 메뉴 전환
- 작품 번호, 제목, 썸네일로 구성된 순차적인 작업 목록
- 이전 작업 / 다음 작업으로 이어지는 슬라이드 탐색
- 작품을 선택했을 때 영상 또는 상세 콘텐츠로 진입하는 구조
- 별도 About 화면

본 프로젝트는 이 구조와 인터랙션 리듬을 차용한다. 단, TAO TAJIMA의 이름, 이미지, 영상, 문구, 고유 그래픽, 소스 코드를 복제하지 않는다. 모든 프로젝트 콘텐츠와 시각 리소스는 이주한의 작업을 기반으로 새로 제작한다.

---

## 1. 제품 정의

### 1.1 한 줄 정의

`Lee Juhan Interactive Project Reel`은 이주한의 Backend, AI, Data, Finance 프로젝트와 기술 기록을 번호가 매겨진 작품 목록과 몰입형 전환으로 탐색하는 인터랙티브 포트폴리오다.

### 1.2 제품의 한 문장

> 기록하며 성장하고, AI와 백엔드 기술로 문제를 구조화하는 개발자 이주한의 프로젝트 릴.

### 1.3 제품 성격

이 사이트는 게임이나 대시보드가 아니다.

- 방문자는 3D 공간을 돌아다니지 않는다.
- 인형뽑기나 확률형 미니게임을 하지 않는다.
- 카드 모음보다 작품 목록과 장면 전환이 중심이다.
- 각 프로젝트는 단순한 저장소 링크가 아니라 하나의 `work`로 표현된다.
- 첫 화면은 설명문보다 이름, 역할, 시각적 분위기, 전환 경험을 우선한다.

### 1.4 참조 URL

- 구조 및 전환 참고: `https://taotajima.jp/`
- 프로젝트 근거: `https://github.com/LH99Tw`
- 글과 자기소개 근거: `https://lh99tw.github.io`

### 1.5 핵심 차별점

참조 사이트가 영상 작업의 릴을 보여준다면, 이 프로젝트는 개발 작업을 하나의 시각적 릴처럼 보여준다.

- 프로젝트마다 번호가 있다.
- 기술 스택이 작품의 장르와 역할처럼 붙는다.
- README, 블로그 글, 배포 화면이 작품의 근거가 된다.
- 작품을 넘기는 행위 자체가 이주한의 작업 흐름을 전달한다.

---

## 2. 목표와 비목표

### 2.1 목표

방문자는 첫 화면과 3~4개의 전환만으로 다음을 이해해야 한다.

1. 이주한은 Backend와 AI를 중심으로 작업한다.
2. 실제 프로젝트를 만들고, 실험하고, 기록한다.
3. 관심 도메인은 AI, Data, Finance, Web이다.
4. Python/FastAPI/TypeScript/React/데이터베이스/배포를 연결할 수 있다.
5. 기술 작업을 시각적으로 정리하고 전달할 수 있다.

### 2.2 성공 기준

- 첫 화면에서 이름과 역할을 즉시 인식할 수 있다.
- 메뉴를 열지 않아도 현재 화면의 프로젝트 맥락을 알 수 있다.
- 메뉴를 열면 전체 작업 목록을 10초 안에 훑을 수 있다.
- 작품 상세에서 문제, 구현, 결과, 근거 링크를 30초 안에 파악할 수 있다.
- 3D나 WebGL이 실패해도 동일한 프로젝트 정보에 접근할 수 있다.
- 모바일에서도 작품 목록과 About이 완결된 경험으로 동작한다.

### 2.3 비목표

- 3D 일본 시골 거리 구현
- 인형뽑기 게임 또는 게임 규칙
- 사용자 로그인, 랭킹, 포인트
- 실시간 GitHub API 대시보드
- 복잡한 관리자 CMS
- 다른 사이트의 소스 코드, 이미지, 영상, 문구 복제

---

## 3. 사용자

### 3.1 채용 담당자

가장 짧은 시간에 직무 방향, 대표 프로젝트, 실제 근거 링크를 확인한다.

필요한 답:

> Backend와 AI를 중심으로 실제 서비스를 만들고, 금융과 데이터 문제까지 확장하는 개발자다.

### 3.2 기술 면접관

작품을 열어 문제 정의, 설계 선택, 구현 범위, 한계와 배운 점을 확인한다.

필요한 답:

> 어떤 기술을 썼는지가 아니라 왜 그렇게 설계했고 무엇을 개선했는지 설명할 수 있다.

### 3.3 협업자

이주한이 Backend, AI/Data, 서비스 구현, 문서화, 배포 중 어디에서 기여할 수 있는지 확인한다.

### 3.4 일반 방문자

긴 자기소개서를 읽지 않고도 작품 목록을 넘기며 인상적인 프로젝트를 발견한다.

---

## 4. 경험 원칙

### 4.1 화면은 설명서가 아니라 릴이다

텍스트를 한 번에 모두 보여주지 않는다. 첫 화면에서는 이름과 역할만 강하게 보여주고, 프로젝트 정보는 메뉴와 작품 상세에서 단계적으로 공개한다.

### 4.2 한 화면에는 한 가지 시선만 둔다

첫 화면에는 자기소개, 작품 상세에는 선택한 작품, 목록 화면에는 작품 목록만 둔다. 카드 그리드와 다중 대시보드 위젯을 사용하지 않는다.

### 4.3 전환이 정보 구조다

페이지 이동을 단순한 새로고침으로 처리하지 않는다.

- 홈 → 작품: 캔버스와 텍스트가 함께 전환된다.
- 홈 → 목록: 밝기와 색이 바뀌고 목록이 순차적으로 노출된다.
- 작품 → 다음 작품: 현재 작품이 밀려나고 다음 작품이 이어진다.
- 메뉴 열기 → 닫기: 햄버거가 X로 변환된다.

### 4.4 기능보다 작품이 먼저 보여야 한다

기술 스택은 프로젝트를 설명하는 보조 정보다. 첫 화면에 기술 로고를 나열하지 않는다.

---

## 5. 정보 구조

```text
Root
├── Home / Project Reel
│   ├── Intro identity
│   ├── Current featured work
│   ├── Previous work
│   └── Next work
├── Works List
│   ├── Home
│   ├── Work 007 ... Work 001
│   └── Scrollable project index
├── Work Detail
│   ├── Visual / demo / screenshot
│   ├── Project title and metadata
│   ├── Problem and role
│   ├── Implementation notes
│   ├── Evidence links
│   └── Previous / next work
└── About
    ├── Name and role
    ├── Short profile
    ├── Skills and working method
    ├── GitHub / GitBlog / contact
    └── Back to works
```

### 5.1 고정 헤더

데스크톱 기준 화면 모서리에 고정한다.

- 좌상단: `LEE JUHAN`
- 좌상단 보조: `About` + 방향 화살표
- 우상단: `GitHub`, `GitBlog` 또는 외부 링크
- 좌측 중앙: 목록 메뉴 버튼
- 작품 화면에서만: 이전 / 다음 작품 내비게이션

모바일에서는 공간을 줄여 다음만 유지한다.

- 우상단: `About`
- 좌상단: 메뉴 버튼
- 작품 화면 하단: 이전 / 다음 화살표

### 5.2 작품 번호

최신 또는 대표 프로젝트를 `#007`부터 시작해 `#001`까지 표시한다. 번호는 우열 순위가 아니라 릴의 순서다.

초기 작품 순서:

| 번호 | 작품 | 분류 | 핵심 기술 |
|---|---|---|---|
| `#007` | Alpha Laboratory | AI / Finance | LangGraph, React, TypeScript, Flask, Pandas |
| `#006` | CoupleMap | Backend / Service | FastAPI, MongoDB, Redis, Docker, Kubernetes |
| `#005` | Snapocket | AI / Knowledge | OCR, VLM, Python, 개인 지식 관리 |
| `#004` | TradingAPP | Finance / Tool | Python, 트레이딩 로직, 데이터 처리 |
| `#003` | GitBlog | Writing / System | Jekyll, Markdown, GitHub Pages |
| `#002` | Medical Data Analysis | Data / Field | 전처리, 통계 분석, 지도 시각화 |
| `#001` | RS-232 / FileSystemWatcher | System / Field | 통신, 파일 감시, 시스템 이벤트 |

작품 번호는 콘텐츠가 추가될 때 변경하지 않는다. 새 작품은 다음 번호를 부여하고 기존 번호의 의미를 유지한다.

번호는 영구 식별자로 사용하며 삭제된 작품의 번호를 재사용하지 않는다. 화면 표시 순서는 번호와 분리된 `sortOrder`로 관리한다. 비공개 또는 준비 중인 작품은 공개 목록에 노출하지 않는다.

---

## 6. 화면 요구사항

### 6.1 Home / Project Reel

#### 목적

방문자가 사이트의 인상과 제작자의 정체성을 5초 안에 파악하게 한다.

#### 레이아웃

- 화면 전체를 차지하는 단일 장면
- 배경은 이주한의 작업을 상징하는 오리지널 실시간 그래픽 또는 영상 루프
- 중앙 또는 약간 치우친 위치에 이름과 역할
- 하단에는 현재 작품의 번호와 제목
- 양쪽 하단에는 이전/다음 작품 화살표
- 메뉴와 About은 콘텐츠 위에 고정

#### 표시 문구

```text
Backend · AI Engineer
LEE JUHAN
from Korea
```

보조 문구는 최대 2줄로 제한한다.

```text
기록하며 성장하고,
문제를 구조화해 구현합니다.
```

#### 상호작용

- 첫 진입 시 배경과 텍스트가 순차적으로 나타난다.
- 마우스 이동 시 배경 그래픽에 아주 약한 시차가 생긴다.
- 화면 하단의 이전/다음 영역에 hover하면 작품 번호와 제목이 나타난다.
- 다음 작품 클릭 시 현재 화면이 축소되거나 밀리며 다음 작품이 진입한다.
- 메뉴 버튼 클릭 시 Works List 화면으로 전환한다.
- About 클릭 시 About 화면으로 전환한다.

#### 금지

- hero 안에 카드 배치
- 통계 수치 3개 이상
- 기술 로고 띠
- 긴 자기소개문
- CTA 버튼 여러 개
- 대시보드형 패널

### 6.2 Works List

#### 목적

전체 작품을 한 번에 훑고 관심 작품으로 진입하게 한다.

#### 레이아웃

- 밝은 단색 배경
- 중앙 정렬된 세로 작품 목록
- 각 행은 번호, 썸네일, 제목으로 구성
- 데스크톱에서는 3열 또는 비대칭 위치에 작품이 배치될 수 있다.
- 모바일에서는 한 열의 세로 목록으로 고정한다.

#### 기본 행 구조

```text
007   [project thumbnail]   2025_AlphaLaboratory
      AI / Finance          LangGraph · Backtest
```

#### hover 규칙

- hover 전: 썸네일과 번호가 보인다.
- hover 중: 썸네일이 사라지거나 투명해지고 제목이 전면에 올라온다.
- 번호는 위 또는 아래로 짧게 슬라이드한다.
- 하나의 hover에 300~500ms 이상의 과한 모션을 쓰지 않는다.

#### 목록 표시 항목

- `HOME`
- `#007 2025_AlphaLaboratory`
- `#006 2025_CoupleMap`
- `#005 Snapocket`
- `#004 TradingAPP`
- `#003 GitBlog`
- `#002 Medical Data Analysis`
- `#001 RS-232 / FileSystemWatcher`

#### 필터

초기 버전에는 필터를 넣지 않는다. 작품 번호와 목록의 리듬이 필터보다 우선한다. 작품이 12개를 넘을 때만 분류 필터를 검토한다.

### 6.3 Work Detail

#### 목적

선택한 프로젝트의 실질적인 근거를 읽게 한다.

#### 진입

- Works List의 작품 행 클릭
- Home의 현재 작품 또는 이전/다음 링크 클릭
- 외부에서 `/works/alpha-laboratory` 형태의 URL 직접 접근

#### 첫 화면

- 작품 번호
- 분류
- 작품 제목
- 한 줄 설명
- 프로젝트 대표 이미지 또는 실제 화면 캡처
- 공개된 근거 유형에 맞는 `Open GitHub`, `Read Blog`, `View Demo` 또는 `Read Document` 링크

첫 진입 시에는 `#007 Alpha Laboratory`를 기본 작품으로 노출한다. Home에서 이전/다음 작품을 선택하면 작품 slug를 URL query 또는 별도 상세 URL과 동기화해 새로고침과 공유 시 동일한 작품을 복원한다.

#### 상세 정보 순서

1. `What I built`
2. `Why it mattered`
3. `How it works`
4. `What I learned`
5. `Evidence`

프로젝트 상태와 결과를 상세 화면 상단 메타데이터에 표시한다. 실험 또는 학습용 프로젝트는 서비스 운영 프로젝트처럼 표현하지 않는다.

#### 텍스트 규칙

- 제목은 1~2줄
- 한 문단은 4줄 이하
- 기술 스택은 본문을 대체하지 않는 메타데이터로 표시
- README를 그대로 복사하지 않고 문제-역할-결과 순서로 다시 쓴다.

#### 하단 내비게이션

```text
← #006 CoupleMap                         #004 TradingAPP →
```

마지막 작품에서는 첫 작품으로 순환한다.

### 6.4 About

#### 목적

작품 목록에서 드러난 작업 방식을 사람의 언어로 정리한다.

#### 표시 내용

```text
Backend · AI Engineer
이주한

기록하며 성장하고, AI와 백엔드 기술로
문제를 구조화하는 개발자입니다.
```

#### 섹션

1. `Profile`
   - 이름, 역할, 자기소개
2. `Working Method`
   - Build, Test, Iterate
   - Analyze, Record, Grow
3. `Focus`
   - Backend
   - AI / Data
   - Finance
   - Web
4. `Links`
   - GitHub
   - GitBlog
   - Email

#### 톤

About은 이력서처럼 항목을 나열하지 않는다. 작품을 만든 방식과 기록하는 습관을 짧은 문장으로 전달한다.

### 6.5 Loading / Unsupported

#### Loading

- 중앙에 이름 또는 `LEE JUHAN`
- 얇은 로딩 바 1개
- 배경은 흰색 또는 검은색 단색
- 로딩이 끝나면 선형 wipe 또는 fade로 Home 진입

#### WebGL 미지원

- 정적 배경 이미지로 대체
- 동일한 이름, 역할, 작품 목록 제공
- “최신 브라우저에서 더 풍부한 시각 효과를 볼 수 있습니다” 정도의 짧은 안내
- 핵심 정보와 링크는 숨기지 않는다.

---

## 7. 콘텐츠 모델

### 7.1 Work 타입

```ts
type Work = {
  id: string;
  number: string;
  sortOrder: number;
  slug: string;
  title: string;
  category: string;
  year?: string;
  status: "active" | "archived" | "experiment" | "learning";
  visibility: "public" | "private";
  shortTitle: string;
  oneLine: string;
  thumbnail: string;
  heroVisual: string;
  altText: string;
  technologies: string[];
  problem: string;
  role: string;
  implementation: string[];
  result?: string;
  learning: string;
  limitations?: string[];
  evidence: {
    label: string;
    type: "github" | "blog" | "demo" | "document";
    url: string;
    visibility?: "public" | "private";
  }[];
};
```

`result`가 아직 측정되지 않은 경우 임의의 수치를 작성하지 않고 현재 상태 또는 확인 가능한 산출물을 기술한다. `private` 근거는 공개 링크로 노출하지 않으며, 필요한 경우 `비공개 프로젝트` 또는 `관련 기록 보기`로 대체한다.

각 공개 작품은 최소한 `problem`, `role`, `implementation`, `learning`, `evidence`를 필수로 작성한다. `result`가 없는 경우에는 `현재 상태`를 상세 화면에 표시하고, `limitations`에는 아직 검증하지 못한 범위를 기록한다.

### 7.2 작품 콘텐츠

#### `#007 2025_AlphaLaboratory`

- category: `AI / Finance`
- oneLine: `AI가 알파 팩터를 만들고 검증하는 퀀트 투자 실험`
- technologies: `LangGraph`, `React`, `TypeScript`, `Flask`, `Pandas`, `NumPy`
- problem: 금융 데이터에서 가설을 세우고 검증하는 과정을 반복 가능한 흐름으로 만들고 싶었다.
- role: 멀티 에이전트 구조와 백테스트 흐름 설계 및 구현
- evidence: `https://github.com/LH99Tw/2025_AlphaLaboratory`

#### `#006 2025_CoupleMap`

- category: `Backend / Service`
- oneLine: `지도, 추천, 데이터 저장소를 연결한 데이트 추천 플랫폼`
- technologies: `FastAPI`, `MongoDB`, `Redis`, `Kakao Maps`, `LangChain`, `Docker`, `Kubernetes`, `GitHub Actions`
- problem: 장소 추천을 검색 결과가 아니라 사용자의 맥락을 반영하는 서비스 경험으로 만들고 싶었다.
- role: API, 인증, 데이터 모델, 지오스페이셜 조회, 추천 흐름 구현
- evidence: `https://github.com/LH99Tw/2025_CoupleMap`

#### `#005 Snapocket`

- category: `AI / Knowledge`
- oneLine: `OCR과 VLM으로 흩어진 문서를 다시 쓸 수 있는 지식으로 바꾸는 실험`
- technologies: `OCR`, `VLM`, `Python`, `Knowledge Management`
- problem: 이미지와 문서 형태로 흩어진 정보를 검색 가능한 지식으로 연결하고 싶었다.
- role: OCR/VLM 선택과 실험 과정 정리, 프로젝트 방향 설계
- evidence:
  - `https://lh99tw.github.io/categories/project/`
  - `https://github.com/LH99Tw/Snapocket-AI`는 비공개 상태이므로 공개 페이지에 직접 링크하지 않거나 상태를 명시한다.

#### `#004 TradingAPP`

- category: `Finance / Tool`
- oneLine: `트레이딩과 투자 전략을 코드로 실험하는 작업 공간`
- technologies: `Python`, `Market Data`, `Trading Logic`
- problem: 금융 관심사를 기록에서 실행 가능한 분석 도구로 확장하고 싶었다.
- role: 트레이딩 프로그램 구조와 데이터 처리 흐름 구현
- evidence: `https://github.com/LH99Tw/TradingAPP`

#### `#003 GitBlog`

- category: `Writing / System`
- oneLine: `AI와 금융 인사이트를 기록하며 다음 작업의 기준을 만드는 블로그`
- technologies: `Jekyll`, `Markdown`, `GitHub Pages`
- problem: 학습과 프로젝트 경험을 휘발되지 않는 작업 기록으로 남기고 싶었다.
- role: 콘텐츠 구조, 기술 글, 회고, 금융 기록 작성
- evidence: `https://lh99tw.github.io`

#### `#002 Medical Data Analysis`

- category: `Data / Field`
- oneLine: `도메인 데이터를 전처리하고 분석과 시각화로 연결한 실습`
- technologies: `Python`, `Data Preprocessing`, `Statistics`, `Map Visualization`
- problem: 의료 데이터를 구조화하고 분석 결과를 시각적으로 전달하는 과정을 경험했다.
- role: 전처리, 통계 분석, 지도 시각화 실습
- evidence: `https://lh99tw.github.io/blog/2026/05/21/%EC%9D%98%EB%A3%8C%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B6%84%EC%84%9D-%EC%8B%A4%EC%8A%B5/`

#### `#001 RS-232 / FileSystemWatcher`

- category: `System / Field`
- oneLine: `통신과 파일 이벤트를 통해 시스템 안의 데이터 흐름을 이해한 실습`
- technologies: `RS-232`, `FileSystemWatcher`, `System Events`
- problem: 화면 밖에서 발생하는 장치와 파일 시스템의 변화를 직접 다뤄보고 싶었다.
- role: 통신과 파일 감시 실습, 동작 과정 기록
- evidence: `https://lh99tw.github.io/blog/2026/05/15/rs-232-%ED%86%B5%EC%8B%A0%EA%B3%BC-filesystemwatcher-%EC%8B%A4%EC%8A%B5/`

---

## 8. 시각 방향

### 8.1 핵심 문장

`Editorial project reel for a backend and AI engineer.`

화면은 개발자용 제품 UI가 아니라, 작품을 큐레이션한 개인 릴처럼 보여야 한다.

### 8.2 구조적 특징

- 넓은 여백
- 화면 끝에 붙은 고정 내비게이션
- 얇은 선과 짧은 화살표
- 큰 글자와 작은 메타데이터의 대비
- 작품 번호의 반복
- 한 작품에 한 장면
- 검정/흰색 기반의 고대비 전환

### 8.3 색상

기본 모드:

- Home: 시각 콘텐츠에 따라 어두운 배경과 흰색 텍스트
- List: `#ffffff` 또는 따뜻한 백색 배경과 검정 텍스트
- About: List와 동일한 밝은 배경
- Detail: 작품 이미지에 따라 자동으로 결정하되 텍스트 대비를 보장

포인트 색상은 작품별로 아주 약하게만 사용한다. 프로젝트마다 다른 강한 색을 쓰지 않는다.

### 8.4 타이포그래피

- 제목: 넓은 자간을 가진 세리프 또는 개성 있는 디스플레이 폰트
- 본문/메타: 가독성 높은 산세리프
- 숫자: 모노스페이스 또는 숫자 폭이 안정적인 폰트
- 한 화면에서 폰트 패밀리는 최대 2개
- 제목의 자간은 화면 크기에 따라 조정하되 과도하게 벌리지 않는다.

권장 후보:

- Display: Cormorant Garamond 또는 Noto Serif KR
- UI: Pretendard 또는 IBM Plex Sans
- Number: IBM Plex Mono

### 8.5 이미지/그래픽

각 작품은 하나의 대표 비주얼을 갖는다.

- 실제 프로젝트 스크린샷
- 실제 데이터 시각화
- 프로젝트를 상징하는 오리지널 3D/2D 그래픽
- 블로그 글의 도표 또는 직접 제작한 이미지

AI 생성 이미지나 외부 이미지가 프로젝트의 실제 결과물처럼 오해되지 않도록 `concept visual` 표기를 구분해서 사용한다.

---

## 9. 인터랙션과 모션

### 9.1 Intro sequence

1. 로딩 바 표시
2. 로딩 바가 완료되며 화면 중앙에 선이 생김
3. 이름이 좌우 또는 위아래에서 들어옴
4. 역할이 먼저 보이고 이름이 뒤따름
5. 하단 작품 내비게이션이 마지막에 나타남

총 시간은 1.5초 이내를 목표로 한다. 사용자가 이미 방문한 경우 intro를 단축할 수 있다.

### 9.2 Menu transition

- 메뉴 버튼은 3개의 가로선이다.
- 클릭 시 각 선이 순차적으로 사라지고 X가 그려진다.
- 목록 배경이 화면을 덮는다.
- 작품 목록은 번호 → 썸네일 → 제목 순서로 짧게 나타난다.
- 닫을 때는 역순으로 사라진다.

### 9.3 Work slide

- 현재 작품의 hero visual은 opacity와 scale을 함께 전환한다.
- 이전/다음 내비게이션은 방향성을 유지한다.
- 작품 번호는 고정 위치에서 숫자만 교체한다.
- 제목은 한 방향으로 밀려나고 새 제목이 반대편에서 들어온다.
- 브라우저 뒤로가기로도 동일한 전환 상태를 복원한다.

### 9.4 List hover

- 이미지 opacity 변화
- 제목의 y축 이동
- 번호의 짧은 이동
- 선형 underline 또는 화살표의 길이 변화

### 9.5 Motion accessibility

`prefers-reduced-motion: reduce`일 때 다음으로 대체한다.

- 모든 화면 전환: 150ms 이하 fade
- 마우스 시차 제거
- 자동 재생 영상 일시정지
- 목록 stagger 제거

---

## 10. 기능 요구사항

### 10.1 라우팅

필수 경로:

- `/` Home
- `/works/` Works List
- `/works/:slug` Work Detail
- `/about/` About
- 존재하지 않는 경로: 404 화면 또는 `/works/` 이동

새로고침과 직접 URL 접근이 모든 경로에서 동작해야 한다.

### 10.2 내비게이션

- Home 로고 클릭: `/`
- About 클릭: `/about/`
- 메뉴 버튼 클릭: `/works/`
- 목록의 Home 클릭: `/`
- 작품 행 클릭: `/works/:slug`
- 이전/다음 클릭: 인접 작품 URL
- 외부 링크: 새 탭
- 외부 링크는 `noopener noreferrer`를 적용한다.

### 10.3 URL 상태

- 현재 작품은 URL로 식별 가능해야 한다.
- 브라우저 뒤로가기로 이전 화면에 돌아가야 한다.
- 목록에서 작품을 보고 뒤로가면 목록의 스크롤 위치를 복원한다.
- 외부 링크 이동 전에는 새 탭임을 아이콘으로 표시한다.
- 잘못된 slug를 임의의 작품으로 대체하지 않는다. 사용자가 작품을 찾을 수 있도록 404 또는 Works 목록으로 안내한다.

### 10.4 이미지 로딩

- 썸네일과 hero 이미지를 분리한다.
- 목록에서는 썸네일만 로드한다.
- 상세 진입 후 hero와 추가 이미지를 로드한다.
- 이미지 실패 시 제목, 번호, 단색 배경으로 레이아웃을 유지한다.

### 10.5 비디오/캔버스

MVP는 CSS와 Canvas 또는 Three.js 중 하나를 선택한다.

- 시각 효과가 단순하면 Canvas/CSS를 우선한다.
- 실제 3D 카메라와 깊이가 필요할 때만 Three.js를 사용한다.
- 첫 구현에서 WebGL을 제품의 정보 접근 조건으로 만들지 않는다.

Canvas/WebGL 시각 레이어는 콘텐츠 레이어와 분리한다. 초기화 실패, 컨텍스트 손실, 저성능 기기 감지 시 정적 이미지 또는 단색 배경으로 즉시 전환한다. 자동 재생 영상은 음소거 상태에서만 사용하고 모바일 및 `prefers-reduced-motion` 환경에서는 정지 이미지로 대체한다.

---

## 11. 기술 요구사항

### 11.1 권장 스택

- React
- TypeScript
- Vite
- React Router
- CSS Modules 또는 전역 CSS 변수
- GSAP 또는 Framer Motion
- Three.js는 배경 시각화가 필요할 때만 추가

### 11.2 상태

페이지 전환 상태는 라우터와 로컬 컴포넌트 상태로 처리한다.

- 현재 작품
- 메뉴 열림/닫힘
- 이미지 로딩 상태
- reduced-motion 여부
- 모바일/데스크톱 breakpoint
- Home의 현재 작품 index 또는 slug
- 메뉴가 열렸을 때의 포커스 대상

MVP에는 Zustand를 추가하지 않는다. 전역 상태가 실제로 필요해질 때 검토한다.

### 11.3 데이터

작품 데이터는 정적 TypeScript 파일로 관리한다.

```text
src/content/works.ts
src/content/profile.ts
public/assets/works/{slug}/
```

GitHub와 GitBlog를 빌드 시마다 호출하지 않는다. 외부 변경으로 화면이 깨지는 것을 막기 위해 검증된 정적 콘텐츠를 사용한다.

#### 콘텐츠 운영 규칙

- 원본 콘텐츠는 `src/content/`의 TypeScript 파일에만 저장한다.
- 작품 이미지와 영상은 `public/assets/works/{slug}/` 아래에 저장한다.
- 파일명은 `hero.webp`, `thumb.webp`, `detail-01.webp`처럼 역할을 포함한다.
- 외부 링크는 공개 전 수동 확인하고 CI에서 HTTP 상태를 검사한다.
- 작품 추가 시 `number`, `sortOrder`, `slug`, `status`, `visibility`, `evidence`를 모두 입력한다.
- 작품 수정은 Git commit 단위로 관리하며 콘텐츠 변경도 배포 기록에 남긴다.
- 이미지 원본 출처와 라이선스는 `public/assets/works/{slug}/README.md`에 기록한다.
- CMS와 데이터베이스는 작품 수가 30개 이상이거나 비개발자 편집이 필요해질 때 검토한다.

#### 업데이트 절차

1. 프로젝트 근거 링크와 공개 상태를 확인한다.
2. `works.ts`에 문제, 역할, 구현, 결과, 배움, 한계를 작성한다.
3. 대표 이미지와 대체 텍스트를 추가한다.
4. 로컬에서 모든 경로와 외부 링크를 확인한다.
5. 빌드, 접근성, 성능 검사를 통과시킨다.
6. Pull Request 또는 commit으로 변경 이력을 남기고 배포한다.

### 11.4 브라우저

- Chrome 최신 2개 버전
- Safari 최신 2개 버전
- Firefox 최신 2개 버전
- iOS Safari
- Android Chrome

### 11.5 개발 품질 도구

- TypeScript: 콘텐츠 타입과 라우트 파라미터 검증
- ESLint: React 및 접근성 규칙 적용
- Prettier: 포맷 통일
- Vitest: 콘텐츠 데이터와 순환 내비게이션 단위 테스트
- Playwright: 주요 경로, 키보드 탐색, 모바일 레이아웃 E2E 테스트
- Lighthouse CI: 성능, 접근성, SEO 회귀 검사
- GitHub Actions: `lint`, `typecheck`, `test`, `build`, 링크 검사 실행

현재 MVP는 Vite 기반 정적 SPA로 유지한다. TypeScript를 채택할 경우 `src/main.tsx`, `src/content/works.ts`, `src/content/profile.ts`로 전환하고 JSX 파일과 타입 정의가 혼재하지 않도록 한다.

### 11.6 배포

- 기본 배포: Vercel 또는 GitHub Pages 중 하나를 프로젝트 시작 전에 확정한다.
- Vercel 선택 시 SPA rewrite와 preview deployment를 설정한다.
- GitHub Pages 선택 시 `base` 경로와 SPA fallback 처리 방식을 설정한다.
- 모든 필수 경로의 새로고침과 직접 URL 접근을 배포 환경에서 확인한다.
- production 배포 전 preview 환경에서 링크, OG 메타, 모바일 화면을 검수한다.

---

## 12. 반응형 요구사항

### 12.1 데스크톱

- 전체 화면 hero
- 고정 모서리 내비게이션
- 중앙 작품 타이포그래피
- 하단 또는 좌우 작품 전환 영역
- 목록은 썸네일과 제목을 동시에 활용

### 12.2 태블릿

- hero 타이포그래피 크기 축소
- 이전/다음 제목은 번호와 화살표 중심
- 목록은 2열 또는 세로형으로 전환

### 12.3 모바일

- 이름은 2~3줄 내에서 안정적으로 표시
- About과 메뉴는 상단 모서리에 고정
- 작품 hero는 세로 비율 이미지 또는 crop
- 하단에 이전/다음 화살표를 크게 배치
- 목록은 번호 + 썸네일 + 제목의 1열 구조
- hover 전용 효과는 tap 상태로 대체

---

## 13. 접근성

- 메뉴 버튼은 `button` 요소로 구현한다.
- 메뉴 열림 상태를 `aria-expanded`로 알린다.
- 작품 목록은 키보드 Tab으로 순서대로 접근한다.
- 현재 작품에는 `aria-current="page"`를 제공한다.
- 화살표 버튼에는 작품 번호와 제목이 포함된 accessible name을 제공한다.
- 이미지에는 프로젝트를 설명하는 대체 텍스트를 제공한다.
- 텍스트 대비는 WCAG AA를 목표로 한다.
- 애니메이션은 reduced-motion 설정을 존중한다.
- 외부 링크에는 새 탭 이동을 명시한다.
- 메뉴가 열리면 첫 번째 메뉴 항목으로 포커스를 이동한다.
- 메뉴가 닫히면 메뉴 버튼으로 포커스를 복귀한다.
- `Escape`로 열린 메뉴를 닫을 수 있다.
- 열린 메뉴 내부에 키보드 포커스를 제한한다.
- 닫힌 메뉴의 링크는 키보드 순서에서 제외한다.
- 장식용 Canvas와 배경 그래픽은 `aria-hidden="true"`로 처리한다.
- 포커스 링을 제거하지 않으며 배경 위에서도 식별 가능한 대비를 확보한다.

---

## 14. SEO와 공유

### 14.1 기본 메타

```text
title: Lee Juhan | Backend · AI Engineer
description: 기록하며 성장하고, AI와 백엔드 기술로 문제를 구조화하는 개발자 이주한의 프로젝트 릴.
```

### 14.2 작품별 메타

각 작품 URL은 다음을 갖는다.

- 작품 제목 기반 `<title>`
- 한 줄 설명 기반 description
- 대표 이미지 기반 Open Graph image
- canonical URL

### 14.3 공유

작품 상세 URL을 그대로 공유할 수 있어야 한다. 별도의 공유 기능은 MVP에서 제외하지만 OG 메타는 제공한다.

Vite SPA에서는 클라이언트 실행 전 작품별 메타가 노출되지 않을 수 있으므로, 작품별 OG 메타가 필수라면 prerender 또는 정적 HTML 생성 방식을 사용한다. MVP에서 prerender를 적용하지 않는 경우 작품별 OG 메타는 후순위로 명시하고 기본 메타를 우선 제공한다.

---

## 15. 구현 단계

### Phase 1: 정적 구조

1. React/Vite 초기화
2. `/`, `/works/`, `/works/:slug`, `/about/` 라우팅
3. 작품 데이터 7개 입력
4. 고정 헤더와 메뉴 버튼
5. 목록 화면
6. 상세 화면
7. About 화면

완료 조건: 시각 효과 없이도 전체 정보 구조가 완결된다.

### Phase 2: 참조 구조 구현

1. Home hero full-screen 구성
2. 로딩 sequence
3. 메뉴 open/close 전환
4. 목록 hover 전환
5. 이전/다음 작품 슬라이드
6. 화면 전환 시 URL 상태 동기화

완료 조건: 사이트를 열었을 때 포트폴리오 릴처럼 탐색할 수 있다.

### Phase 3: 시각 엔진

1. 프로젝트별 대표 비주얼 제작
2. Canvas 또는 Three.js 배경 적용
3. 마우스 시차
4. 이미지 preload와 lazy loading
5. 모바일 단순화

완료 조건: 시각 효과가 콘텐츠를 가리지 않고 첫 인상을 강화한다.

### Phase 4: 품질

1. 키보드 QA
2. reduced-motion QA
3. 직접 URL 접근 QA
4. 모바일 QA
5. 이미지 실패 QA
6. 성능 최적화
7. 외부 링크 점검

---

## 16. 완료 기준

### 16.1 핵심 경험

- 첫 화면에서 `LEE JUHAN`과 `Backend · AI Engineer`가 즉시 보인다.
- 첫 화면에 인형뽑기 게임이나 3D 거리 요소가 없다.
- 메뉴를 열면 번호가 매겨진 작품 목록이 나온다.
- 작품 목록의 각 항목은 번호, 썸네일, 제목을 가진다.
- 작품 상세에서 프로젝트의 문제, 역할, 구현, 배움, 근거 링크를 확인할 수 있다.
- 이전/다음 작품으로 끊김 없이 이동한다.
- About에서 이름, 역할, 작업 방식, 연락 링크를 확인한다.

### 16.2 콘텐츠

- 최소 7개의 작품이 실제 GitHub 또는 GitBlog 근거와 연결된다.
- 비공개 저장소는 공개 근거처럼 표현하지 않는다.
- 프로젝트 성과를 검증할 수 없는 수치로 과장하지 않는다.
- 카드형 자기소개 문구 대신 작품별 서술을 사용한다.

### 16.3 기술

- Chrome/Safari/Firefox 최신 버전에서 동작한다.
- 모바일에서 목록과 상세가 읽힌다.
- WebGL 또는 Canvas 실패 시 정적 fallback이 제공된다.
- Lighthouse Performance 80 이상, Accessibility 90 이상, SEO 90 이상을 목표로 한다.
- 모바일 대표 이미지 1개는 500KB 이하를 권장한다.
- 초기 JavaScript 번들은 gzip 기준 250KB 이하를 목표로 한다.
- 모바일 LCP 2.5초 이하를 목표로 한다.
- 키보드만으로 모든 핵심 콘텐츠에 접근할 수 있다.
- WebGL 초기화 실패와 컨텍스트 손실 시 1초 이내 fallback이 보인다.
- 존재하지 않는 작품 URL은 임의의 작품을 보여주지 않고 404 또는 Works로 안내한다.
- 작품 데이터에 필수 필드가 누락되면 빌드 또는 타입 검사에서 실패한다.

---

## 17. QA 체크리스트

### Home

- [ ] 로딩 후 이름과 역할이 보인다.
- [ ] hero가 첫 viewport를 가득 채운다.
- [ ] 현재 작품 번호와 제목이 보인다.
- [ ] 이전/다음 클릭이 올바른 작품으로 이동한다.
- [ ] 마우스 시차가 과하지 않다.

### Works List

- [ ] 메뉴 버튼이 햄버거와 X 사이에서 전환된다.
- [ ] 작품 항목이 순서대로 노출된다.
- [ ] hover 또는 tap 시 제목을 확인할 수 있다.
- [ ] 작품을 선택하면 상세 URL로 이동한다.
- [ ] 모바일에서 1열 목록으로 읽힌다.

### Work Detail

- [ ] 작품 번호, 제목, 분류가 보인다.
- [ ] 대표 비주얼이 로드된다.
- [ ] 문제/역할/구현/결과/배움이 보인다.
- [ ] 작품에 등록된 Evidence 링크가 유효하다.
- [ ] 이전/다음 작품이 올바르다.

### About

- [ ] 이름과 역할이 보인다.
- [ ] 자기소개가 3~5줄 안에 읽힌다.
- [ ] 작업 방식과 관심 도메인이 보인다.
- [ ] 외부 링크가 새 탭으로 열린다.

### 접근성/성능

- [ ] Tab 키로 메뉴/목록/링크를 탐색할 수 있다.
- [ ] Escape로 열린 메뉴를 닫을 수 있다.
- [ ] reduced-motion에서 전환이 단순화된다.
- [ ] 이미지 로드 실패 시 레이아웃이 무너지지 않는다.
- [ ] 저성능 기기에서 fallback이 동작한다.
- [ ] 메뉴 열림/닫힘 시 포커스가 올바르게 이동한다.
- [ ] Escape로 메뉴를 닫을 수 있고 메뉴 버튼으로 포커스가 돌아온다.
- [ ] 존재하지 않는 slug가 첫 작품으로 잘못 표시되지 않는다.
- [ ] 작품별 제목, description, canonical, OG 이미지가 확인된다.
- [ ] Lighthouse와 링크 검사가 CI에서 통과한다.
- [ ] 모바일 이미지와 초기 번들이 성능 예산을 지킨다.

---

## 18. 향후 확장

- 작품 상세에 실제 데모 영상 또는 인터랙티브 프로토타입 삽입
- 프로젝트별 changelog와 업데이트 날짜 표시
- Blog 글을 작품의 참고 문헌처럼 연결
- `Play reel` 자동 작품 전환 모드
- 작품을 시간순/도메인순으로 재배열하는 숨겨진 모드
- 코드와 디자인 시스템을 Figma Code Connect로 연결

확장 기능은 기본 릴 경험을 흐리지 않는 경우에만 추가한다.

---

## 19. 결정 사항 요약

| 항목 | 결정 |
|---|---|
| 전체 콘셉트 | 개발 프로젝트를 작품 릴처럼 탐색하는 포트폴리오 |
| 참조 구조 | TAO TAJIMA식 full-screen home, 고정 헤더, 작품 목록, 작품 전환, About |
| 제거 요소 | 일본 거리, 인형뽑기, 아이템 획득, 프로필 카드 게임 |
| 첫 화면 | 이름, 역할, 대표 작품, 시각적 배경 |
| 주요 콘텐츠 | Alpha Laboratory, CoupleMap, Snapocket, TradingAPP, GitBlog, Data, System |
| 핵심 내비게이션 | Home / Works / About / Previous / Next |
| 데이터 방식 | 검증된 정적 TypeScript 콘텐츠 |
| 3D 사용 | 정보 접근과 분리된 시각 레이어로만 사용 |
| fallback | 정적 이미지 + 동일한 작품 목록과 상세 정보 |
| 저작권 원칙 | 참조 사이트의 구조적 아이디어만 참고하고 콘텐츠와 그래픽은 독자 제작 |
