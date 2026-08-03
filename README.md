# Lee Juhan Interactive Project Reel

이주한의 Backend · AI 프로젝트와 기술 기록을 하나의 작품 목록처럼 탐색하는 인터랙티브 포트폴리오입니다.

TAO TAJIMA의 포트폴리오에서 영감을 받은 전체 화면 홈, 고정 내비게이션, 번호가 매겨진 작품 목록, 작품 간 전환 구조를 사용합니다. 참조 사이트의 이미지, 영상, 문구, 소스 코드는 사용하지 않으며 프로젝트 콘텐츠와 시각 리소스는 별도로 제작합니다.

## 주요 화면

- `/`: 이름, 역할, 대표 작품을 보여주는 Project Reel 홈
- `/works/`: 번호, 썸네일, 제목으로 구성된 전체 작품 목록
- `/works/:slug`: 프로젝트 문제, 역할, 구현, 결과, 배움, 근거 링크를 보여주는 상세 화면
- `/about/`: 프로필, 작업 방식, 관심 분야, 외부 링크

현재 구현은 프로젝트 구조와 전환 경험을 검증하기 위한 Vite 기반 React SPA입니다. 프로젝트 대표 이미지와 영상은 미디어 슬롯으로 분리되어 있으며, 실제 리소스는 추후 작품별 폴더에 추가합니다.

## 기술 스택

- React
- JavaScript JSX
- Vite
- React Router
- CSS

시각 효과가 실제로 필요한 경우 Canvas 또는 Three.js를 콘텐츠 접근과 분리된 배경 레이어로 추가합니다. WebGL이 지원되지 않거나 저성능 환경에서는 정적 배경과 동일한 프로젝트 정보로 대체합니다.

## 시작하기

### 요구 사항

- Node.js 20 이상 권장
- npm 10 이상 권장

### 설치 및 실행

```bash
npm install
npm run dev
```

개발 서버가 실행되면 터미널에 표시된 로컬 주소를 엽니다. 기본 주소는 `http://localhost:5173`입니다.

### 빌드 및 배포 전 확인

```bash
npm run build
npm run preview
```

`npm run build`는 `dist/` 디렉터리에 production 빌드 결과를 생성합니다. `dist/`는 Git에 커밋하지 않습니다.

## 프로젝트 구조

```text
.
├── PRD.md                 # 제품 요구사항과 구현 기준
├── index.html             # Vite 진입 HTML과 기본 SEO 메타
├── package.json           # 실행 스크립트와 의존성
├── package-lock.json      # 의존성 잠금 파일
├── vite.config.js         # Vite 설정
├── src/
│   ├── main.jsx           # 라우팅, 작품 데이터, 주요 화면 컴포넌트
│   └── styles.css         # 전체 화면과 반응형 스타일
├── public/
│   └── assets/
│       └── works/
│           └── {slug}/    # 작품별 이미지, 영상, 출처 문서
└── screenshots/           # 디자인 및 화면 검토용 캡처
```

## 콘텐츠 수정 방법

현재 작품 데이터는 `src/main.jsx`의 `works` 배열에 정적으로 저장되어 있습니다. 콘텐츠가 늘어나면 PRD에 정의된 구조에 맞춰 `src/content/works.js` 또는 TypeScript 전환 후 `src/content/works.ts`로 분리합니다.

작품을 추가하거나 수정할 때 다음 항목을 함께 확인합니다.

1. 고유한 `number`, `slug`, 제목, 분류, 연도를 입력합니다.
2. 문제, 담당 범위, 구현 방식, 결과 또는 현재 상태, 배움을 작성합니다.
3. 공개된 GitHub, Blog, Demo, Document 근거 링크를 등록합니다.
4. 비공개 저장소나 검증되지 않은 성과를 공개 근거처럼 표현하지 않습니다.
5. 대표 이미지에는 프로젝트를 설명하는 대체 텍스트를 준비합니다.
6. 작품별 리소스는 `public/assets/works/{slug}/` 아래에 저장합니다.

권장 리소스 구조:

```text
public/assets/works/alpha-laboratory/
├── hero.webp
├── thumb.webp
├── detail-01.webp
└── README.md             # 이미지 출처와 라이선스 기록
```

이미지 파일명은 `hero`, `thumb`, `detail-01`처럼 용도를 포함합니다. 대용량 원본이나 개인 정보가 포함된 파일은 저장소에 추가하지 않습니다.

## 업데이트 절차

1. 프로젝트의 공개 상태와 외부 근거 링크를 확인합니다.
2. 작품 데이터와 대표 리소스를 수정합니다.
3. `npm run build`로 production 빌드를 확인합니다.
4. 데스크톱과 모바일에서 Home, Works, Detail, About을 확인합니다.
5. 키보드 탐색, reduced-motion, 이미지 로드 실패 상태를 확인합니다.
6. 변경 내용을 작은 단위로 commit하고 배포합니다.

지속적인 업데이트가 필요하지만 CMS는 사용하지 않습니다. 현재 규모에서는 Git으로 콘텐츠와 리소스의 변경 이력을 함께 관리하는 방식이 가장 단순합니다. 작품 수가 30개 이상이거나 비개발자 편집이 필요해지면 CMS 또는 데이터베이스 도입을 검토합니다.

## 라우팅 및 배포 참고

React Router를 사용하는 SPA이므로 production 서버에서 다음 경로가 `index.html`로 fallback되어야 합니다.

```text
/
/works/
/works/{slug}
/about/
```

Vercel을 사용할 경우 SPA rewrite를 설정합니다. GitHub Pages를 사용할 경우 Vite `base` 설정과 새로고침 fallback 처리를 함께 설정해야 합니다. 배포 전에 작품 상세 URL을 직접 새로고침해 정상 접근되는지 확인합니다.

## 품질 기준

- 모바일에서도 작품 목록과 상세 내용을 읽을 수 있어야 합니다.
- WebGL 또는 Canvas 실패 시 핵심 콘텐츠에 접근할 수 있어야 합니다.
- 키보드만으로 메뉴, 작품 목록, 이전/다음 내비게이션을 사용할 수 있어야 합니다.
- `prefers-reduced-motion` 환경에서는 전환과 시차 효과를 단순화합니다.
- 외부 링크는 새 탭에서 열고 `noopener noreferrer`를 적용합니다.
- 프로젝트 성과는 확인 가능한 근거가 있을 때만 수치로 표현합니다.

상세한 제품 목표, 화면 요구사항, 데이터 모델, QA 기준은 [PRD.md](./PRD.md)를 참고합니다.

## 관련 링크

- GitHub: <https://github.com/LH99Tw>
- GitBlog: <https://lh99tw.github.io>
- CI/CD 및 Vercel 배포: [docs/CI-CD.md](./docs/CI-CD.md)
