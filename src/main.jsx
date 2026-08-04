import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import * as THREE from 'three';
import './styles.css';
import './final-overrides.css';

const works = [
  { number: '005', slug: 'alpha-laboratory', title: 'AlphaLaboratory', shortTitle: 'AlphaLaboratory', category: 'AI / Finance', year: '2025', period: '2025.05 — 2025.10', team: '이주한 · 1인 개발', heroImage: '/assets/works/alpha-laboratory-hero.png', oneLine: '자연어로 알파 수식을 만들고 S&P 500 데이터로 검증하는 퀀트 투자 플랫폼', technologies: ['LangGraph', 'React', 'TypeScript', 'Flask', 'Pandas', 'NumPy'], problem: '알파 수식 작성, 데이터 처리, 백테스트, 포트폴리오 성과 확인이 분리되어 있어 초심자가 전략을 끝까지 검증하기 어려웠습니다.', role: 'Flask API와 React 화면을 연결하고, 데이터 파이프라인·멀티 에이전트·유전 알고리즘·백테스트 흐름을 통합했습니다.', implementation: ['Yahoo Finance S&P 500 데이터를 수집하고 결측값을 보간한 뒤 101개 알파 팩터를 계산했습니다.', 'DataAnalyst·AlphaResearcher·PortfolioManager 역할의 LangGraph 멀티 에이전트 흐름을 구성했습니다.', '리밸런싱 주기·거래비용·성과 지표를 반영한 비동기 백테스트와 포트폴리오 분석 API를 구현했습니다.'], troubleshooting: '백테스트 API에서 랜덤 더미 데이터가 생성되어 포트폴리오 결과와 불일치하던 문제를 실제 데이터 기반 계산으로 통일해 해결했습니다.', learning: '모델보다 데이터 출처와 백테스트 조건의 일관성이 결과 신뢰도를 좌우한다는 것을 배웠습니다.' },
  { number: '004', slug: 'couplemap', title: '2025_CoupleMap', shortTitle: 'CoupleMap', category: 'Backend / Service', year: '2025', period: '2025.10 — 2025.11', team: 'LH99Tw · sungendary', heroImage: '/assets/works/couplemap-hero.png', oneLine: '지도·인증·저장소·로컬 LLM을 연결한 커플 데이트 추천 플랫폼', technologies: ['FastAPI', 'Native JavaScript', 'MongoDB', 'Redis', 'Kakao Maps', 'Docker', 'Kubernetes'], problem: '주변 장소를 단순 검색하는 것을 넘어, 커플의 위치와 취향을 반영한 추천과 저장·방문 흐름을 하나의 서비스로 연결하고자 했습니다.', role: 'JWT 인증, MongoDB 지오스페셜 조회, Redis 세션 관리, Kakao Maps 화면, LangChain 기반 추천 API를 구현했습니다.', implementation: ['회원가입·로그인과 access/refresh JWT 인증을 구성하고 refresh 토큰을 Redis에 보관했습니다.', 'MongoDB 2dsphere 쿼리로 주변 장소를 조회하고 Kakao Maps 마커·추천 카드와 연결했습니다.', 'LangChain과 Ollama 기반 데이트 코스 추천 API, Docker Compose·Kubernetes·GitHub Actions 배포 구성을 마련했습니다.'], troubleshooting: '새로고침 뒤 로그인 상태가 로그아웃처럼 보이던 문제를 지도 초기 렌더링 후 백엔드 세션을 동기화하는 방식으로 해결했고, Ollama에서 지원하지 않는 옵션은 ChatOllama 서브클래스로 제거했습니다.', learning: '지도 서비스는 추천 로직만으로 완성되지 않고 인증·지오데이터·캐시·배포 환경이 함께 안정화되어야 한다는 것을 경험했습니다.' },
  { number: '003', slug: 'snapocket', title: 'Snapocket', shortTitle: 'Snapocket', category: 'AI / Knowledge', year: '2026', period: '2026.03 — 2026.04', team: 'LH99Tw · gmlwlsdl', heroImage: '/assets/works/snapocket.jpg', oneLine: '문서·분석·태그·검색·캘린더를 한 흐름으로 연결하는 지식 관리 서비스', technologies: ['Next.js 16', 'React 19', 'TypeScript', 'FastAPI', 'Docker'], problem: '문서가 업로드·분석·검색·태깅 기능별로 분리되면 사용자가 기록을 다시 활용하기 어렵기 때문에 하나의 작업 흐름으로 묶고자 했습니다.', role: 'Next.js App Router와 FastAPI 모노레포 구조를 정리하고 문서·분석·태그·검색·캘린더 엔티티와 업로드 기능의 기반을 구성했습니다.', implementation: ['Next.js 프론트엔드와 FastAPI 백엔드를 단일 Docker 이미지로 실행하도록 구성했습니다.', '문서·분석·태그·검색·캘린더·그래프 도메인을 분리해 확장 가능한 엔티티 구조를 만들었습니다.', '개발 환경과 AI 컨테이너를 Docker Compose 프로필로 분리해 기본 실행과 AI 실행을 독립시켰습니다.'], troubleshooting: 'Next.js standalone 빌드가 Docker 런타임에서 동작하려면 output 설정과 Node 실행 경로가 필요해 멀티스테이지 이미지와 entrypoint에서 FastAPI·Next.js를 함께 구동하도록 정리했습니다.', learning: 'AI 기능을 붙이기 전에 문서 도메인과 실행 환경을 분리해두는 것이 협업과 확장성에 더 큰 영향을 준다는 것을 배웠습니다.' },
  { number: '002', slug: 'data-mining', title: '지하철 DCRNN', shortTitle: '지하철 DCRNN', category: 'Data / Analysis', year: '2025', period: '2025.09', team: '이주한 · 1인 개발', heroImage: '/assets/works/dataming.webp', overlayImage: '/assets/works/Dataminingoveraly.svg', oneLine: '의료 데이터 전처리와 Leaf-TPC 5-Fold 검증을 재현 가능한 실험으로 정리한 데이터마이닝 프로젝트', technologies: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Jupyter', 'Conda'], problem: '노트북 환경과 데이터 경로가 달라지면 실험이 재현되지 않고, 전처리·검증 결과를 다시 확인하기 어려웠습니다.', role: '전용 Conda 커널과 프로젝트 루트를 고정하고 raw 데이터·실험·로그를 분리해 분석 파이프라인을 구성했습니다.', implementation: ['전용 커널의 Python 실행 경로와 버전을 확인해 환경 차이로 인한 실행 오류를 줄였습니다.', 'raw 데이터와 실험 디렉터리를 분리하고 seed를 고정해 Leaf-TPC 5-Fold CV를 실행했습니다.', '환경 설정과 실행 결과를 logs에 남겨 동일한 실험을 다시 실행할 수 있도록 했습니다.'], troubleshooting: 'Jupyter 커널이 의도한 Conda 환경을 사용하지 않거나 작업 경로가 달라지는 문제를 커널 경로 확인·ROOT 고정·영문 임시 디렉터리 설정으로 해결했습니다.', learning: '데이터 분석에서는 모델 선택만큼 실행 환경·경로·seed를 기록하는 재현성 설계가 중요하다는 것을 배웠습니다.' },
  { number: '001', slug: 'coding-run', title: '코딩런', shortTitle: '코딩런', category: 'Unity / Education', year: '2025', period: '2025.05 — 2025.06', team: 'LH99Tw · korsss22 · rbgus66e3 · vaintvibon · ogeonu21 · combo124 · ddingdol02 · rhehdud · Plumby325 · chocochip57', heroImage: '/assets/works/codingrun.png', oneLine: 'Unity로 구현한 코딩 학습형 게임의 캡스톤 프로젝트', technologies: ['Unity 2021.3', 'C#', 'URP', 'UGUI', 'Timeline'], problem: '코딩 개념을 글과 문제 풀이만으로 학습하면 초보자가 실행 결과와 성취감을 연결하기 어려웠습니다.', role: 'Unity 프로젝트 구조와 학습 콘텐츠·게임 UI·플레이 흐름을 팀 단위로 구현하고 모바일 빌드 환경을 정리했습니다.', implementation: ['Unity 씬과 Assets·Packages·ProjectSettings 구조를 분리해 팀 작업 기반을 구성했습니다.', '학습과 플레이가 연결되는 게임 화면, UI, 애니메이션·Timeline 요소를 구현했습니다.', 'URP·UGUI·모바일 모듈을 사용해 Android 중심의 실행 환경을 구성했습니다.'], troubleshooting: '여러 팀원이 Unity 에셋과 씬을 병렬 수정할 때 충돌이 발생하지 않도록 프로젝트 설정과 폴더 구조를 공유하고, 기능별 작업을 분리해 병합했습니다.', learning: '교육형 게임은 기능 구현보다 학습 흐름과 피드백을 플레이 경험 안에 자연스럽게 배치하는 일이 중요하다는 것을 배웠습니다.' },
];

const profile = { name: 'LEE JUHAN', role: 'Backend · AI Engineer', intro: '기록하며 성장하고, AI와 백엔드 기술로 문제를 구조화하는 개발자입니다.', description: '프로젝트를 만들고, 실험하고, 기록합니다. Python과 FastAPI를 중심으로 서비스의 구조를 만들며, 데이터와 금융 도메인까지 관심을 확장하고 있습니다.', methods: ['Build, Test, Iterate.', 'Analyze, Record, Grow.'], focus: ['Backend', 'AI / Data', 'Finance', 'Web'] };
const technologyGroups = {
  'alpha-laboratory': [['🧠 AI', ['LangGraph', 'Pandas', 'NumPy']], ['🖥️ Frontend', ['React', 'TypeScript']], ['⚙️ Backend', ['Flask']]],
  couplemap: [['⚙️ Backend', ['FastAPI', 'Native JavaScript']], ['🗺️ Data & Service', ['MongoDB', 'Redis', 'Kakao Maps']], ['🚀 Infra', ['Docker', 'Kubernetes']]],
  snapocket: [['🖥️ Frontend', ['Next.js 16', 'React 19', 'TypeScript']], ['⚙️ Backend', ['FastAPI']], ['🚀 Infra', ['Docker']]],
  'data-mining': [['🧠 AI & Data', ['Python', 'Pandas', 'NumPy', 'scikit-learn']], ['🧪 Experiment', ['Jupyter', 'Conda']]],
  'coding-run': [['🎮 Engine', ['Unity 2021.3', 'C#']], ['🎨 UI & Motion', ['URP', 'UGUI', 'Timeline']]],
};

const technologyBadge = {
  Python: ['3776AB', 'python'], TensorFlow: ['FF6F00', 'tensorflow'], Pandas: ['150458', 'pandas'], NumPy: ['013243', 'numpy'],
  'scikit-learn': ['F7931E', 'scikitlearn'], React: ['61DAFB', 'react'], TypeScript: ['3178C6', 'typescript'],
  Flask: ['000000', 'flask'], FastAPI: ['009688', 'fastapi'], MongoDB: ['47A248', 'mongodb'], Redis: ['DC382D', 'redis'],
  'Kakao Maps': ['FFCD00', 'kakao'], Docker: ['2496ED', 'docker'], Kubernetes: ['326CE5', 'kubernetes'],
  LangGraph: ['1C3C3C', ''], 'Native JavaScript': ['F7DF1E', 'javascript'], 'Next.js 16': ['000000', 'nextdotjs'],
  'React 19': ['61DAFB', 'react'], 'Unity 2021.3': ['222C37', 'unity'], 'C#': ['239120', 'csharp'], URP: ['222C37', 'unity'], UGUI: ['222C37', 'unity'],
  Timeline: ['222C37', 'unity'], Jupyter: ['F37626', 'jupyter'], Conda: ['44A833', 'anaconda'],
};

function getTechnologyBadgeUrl(technology) {
  const [color, logo] = technologyBadge[technology] || ['4B5563', ''];
  const logoQuery = logo ? `&logo=${logo}&logoColor=white` : '';
  return `https://img.shields.io/badge/${encodeURIComponent(technology)}-${color}?style=flat-square${logoQuery}`;
}

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/LH99Tw', icon: '/assets/contact/github.png' },
  { label: 'Threads', href: 'https://www.threads.com/@hhannn001', icon: '/assets/contact/threads.png' },
  { label: 'Instagram', href: 'https://www.instagram.com/hhannn999/', icon: '/assets/contact/instagram.png' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/juhan-lee-a45441354', icon: '/assets/contact/linkedin.png' },
  { label: 'Email', href: 'mailto:contact@example.com', icon: '/assets/contact/gmail.png' },
];

function formatAge() {
  const birthYear = 2002;
  const birthMonth = 8;
  const birthDate = 26;
  const today = new Date();
  const koreanAge = today.getFullYear() - birthYear + 1;
  let internationalAge = today.getFullYear() - birthYear;
  const birthdayHasPassed = today.getMonth() > birthMonth || (today.getMonth() === birthMonth && today.getDate() >= birthDate);
  if (!birthdayHasPassed) internationalAge -= 1;
  return `${koreanAge}세 (만 ${internationalAge}세)`;
}

function App() {
  const [transitioning, setTransitioning] = useState(false);
  const [leavingAbout, setLeavingAbout] = useState(false);
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    const sources = [...works.map((work) => work.heroImage), '/assets/profile.png', '/assets/asset/band.png', '/assets/asset/sake.jpg', '/assets/asset/kuromi.JPG', '/assets/asset/picnic.jpg', '/assets/asset/ramen.jpg', '/assets/asset/cola.jpg', '/assets/asset/gym.jpg', '/assets/asset/scaremovie.jpg'];
    sources.forEach((src) => { const image = new Image(); image.decoding = 'async'; image.src = src; });
  }, []);
  useEffect(() => {
    const wasAbout = previousPath.current === '/about/';
    const isAbout = location.pathname === '/about/';
    setLeavingAbout(wasAbout && !isAbout);
    previousPath.current = location.pathname;
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.dataset.page = location.pathname === '/' ? 'home' : 'light';
    setTransitioning(true);
    const timer = window.setTimeout(() => setTransitioning(false), 720);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);
  const transitionKind = location.pathname === '/about/' ? 'about-transition' : location.pathname.startsWith('/works/') ? 'detail-transition' : 'default-transition';
  const returningHome = location.pathname === '/' && previousPath.current === '/about/';
  const isLeavingAbout = leavingAbout || returningHome;
  const showAboutTransition = location.pathname === '/about/';
  const transitionClass = transitioning ? 'is-active' : '';
  const shellClass = location.pathname === '/about/' ? 'site-shell about-shell' : location.pathname === '/' && isLeavingAbout ? 'site-shell home-returning' : 'site-shell';
  return <div className={shellClass}><Header /><ScrollProgress /><RouteVisualTransition />{showAboutTransition && <div className={`page-transition about-transition ${transitionClass}`} aria-hidden="true" />}<Routes><Route path="/" element={<Home />} /><Route path="/works/" element={<WorksList />} /><Route path="/works/:slug" element={<WorkDetail />} /><Route path="/about/" element={<AboutReference />} /><Route path="*" element={<Home />} /></Routes></div>;
}

function Header() {
  const location = useLocation();
  const [aboutOpen, setAboutOpen] = useState(location.pathname === '/about/');
  useEffect(() => setAboutOpen(location.pathname === '/about/'), [location.pathname]);
  const target = aboutOpen ? '/' : '/about/';
  return <header className="site-header"><div className="header-left"><Link className="brand-link" to="/">LEE JUHAN</Link><Link className="about-link" to="/about/">About <span aria-hidden="true">↗</span></Link><Link className="works-link" to="/works/">Works <span aria-hidden="true">↗</span></Link></div><div className="header-right"><a href="https://github.com/LH99Tw" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://lh99tw.github.io" target="_blank" rel="noreferrer">GitBlog ↗</a></div><Link className={`menu-button ${aboutOpen ? 'is-open' : ''}`} to={target} onClick={() => setAboutOpen((open) => !open)} aria-label={aboutOpen ? 'Close About page' : 'Open About page'} aria-pressed={aboutOpen}><span /><span /><span /></Link></header>;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <span className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}

function LiquidFilter() {
  return <svg className="liquid-filter" aria-hidden="true" focusable="false"><defs><filter id="liquid-displacement" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.045" numOctaves="2" seed="7" result="noise"><animate attributeName="baseFrequency" dur="0.76s" values="0.012 0.045;0.035 0.018;0.012 0.045" repeatCount="indefinite" /></feTurbulence><feDisplacementMap in="SourceGraphic" in2="noise" scale="38" xChannelSelector="R" yChannelSelector="G" /></filter></defs></svg>;
}

function RouteVisualTransition() {
  const location = useLocation();
  const previousPath = React.useRef(location.pathname);
  const [transition, setTransition] = useState(null);
  useEffect(() => {
    const fromMatch = previousPath.current.match(/^\/works\/([^/]+)/);
    const toMatch = location.pathname.match(/^\/works\/([^/]+)/);
    previousPath.current = location.pathname;
    if (!fromMatch || !toMatch || fromMatch[1] === toMatch[1]) return undefined;
    const from = works.find((work) => work.slug === fromMatch[1]);
    const to = works.find((work) => work.slug === toMatch[1]);
    if (!from || !to) return undefined;
    setTransition({ from, to });
    const timer = window.setTimeout(() => setTransition(null), 1450);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);
  if (!transition) return null;
  return <ThreeBlendTransition from={transition.from} to={transition.to} />;
}

function Reveal({ children, className = '', style }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(node); } }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={style} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
}

function MenuOverlay({ open, onClose }) {
  return <aside className={`works-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}><div className="menu-inner"><Link className="menu-home" to="/" onClick={onClose}>Home <span>↗</span></Link><div className="menu-list">{works.map((work) => <Link className="menu-row" to={`/works/${work.slug}`} key={work.slug} onClick={onClose}><span className="menu-number">{work.number}</span><MediaSlot compact label="MEDIA SLOT" /><span className="menu-title">{work.title}</span><span className="menu-category">{work.category}</span></Link>)}</div></div></aside>;
}

function circularChapterOffset(itemIndex, activeIndex) { const total = works.length; let offset = itemIndex - activeIndex; if (offset > total / 2) offset -= total; if (offset < -total / 2) offset += total; return offset; }

const liquidVertexShader = `varying vec2 vUv; uniform float progress; uniform float direction; void main(){ vUv=uv; vec3 p=position; float travel=direction>0.0?uv.x:1.0-uv.x; float pulse=smoothstep(0.0,0.12,progress)*smoothstep(1.0,0.88,progress); float boundary=direction>0.0?1.0-progress:progress; float bulge=exp(-pow((travel-boundary)/0.075,2.0))*pulse; p.x+=sin(uv.y*3.14159)*0.022*bulge; p.z+=0.16*bulge; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }`;
const liquidFragmentShader = `varying vec2 vUv; uniform sampler2D texture1; uniform sampler2D texture2; uniform float progress; uniform float direction; uniform float planeAspect; uniform float imageAspect1; uniform float imageAspect2; vec2 coverUv(vec2 uv,float imageAspect){ if(imageAspect>planeAspect){ uv.x=(uv.x-0.5)*(planeAspect/imageAspect)+0.5; } else { uv.y=(uv.y-0.5)*(imageAspect/planeAspect)+0.5; } return uv; } void main(){ float travel=direction>0.0?vUv.x:1.0-vUv.x; float boundary=direction>0.0?1.0-progress:progress; float width=0.055; float sweep=direction>0.0?smoothstep(boundary-width,boundary+width,travel):1.0-smoothstep(boundary-width,boundary+width,travel); float gate=smoothstep(0.0,0.12,progress); sweep*=gate; vec4 outgoing=texture2D(texture1,coverUv(vUv,imageAspect1)); vec4 incoming=texture2D(texture2,coverUv(vUv,imageAspect2)); gl_FragColor=mix(outgoing,incoming,sweep); }`;

const heroImageAspect = 1672 / 941;

function createLiquidScene(mount, fromTexture, toTexture, direction = 1) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.z = 2.6;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);
  const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);
  const uniforms = {
    texture1: { value: fromTexture },
    texture2: { value: toTexture },
    progress: { value: 0 },
    time: { value: 0 },
    direction: { value: direction },
    planeAspect: { value: 1 },
    imageAspect1: { value: heroImageAspect },
    imageAspect2: { value: heroImageAspect },
  };
  const material = new THREE.ShaderMaterial({ uniforms, transparent: true, vertexShader: liquidVertexShader, fragmentShader: liquidFragmentShader });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  const resize = () => {
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    const aspect = width / Math.max(height, 1);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    uniforms.planeAspect.value = aspect;
    const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(35 / 2)) * camera.position.z;
    mesh.scale.set((viewHeight * aspect) / 2, viewHeight / 2, 1);
  };
  resize();
  return { scene, camera, renderer, geometry, material, uniforms, resize };
}

function ThreeBlendTransition({ from, to }) {
  const mountRef = React.useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    const loader = new THREE.TextureLoader();
    const fromTexture = loader.load(from.heroImage);
    const toTexture = loader.load(to.heroImage);
    [fromTexture, toTexture].forEach((texture) => { texture.colorSpace = THREE.SRGBColorSpace; texture.minFilter = THREE.LinearFilter; texture.magFilter = THREE.LinearFilter; });
    const liquid = createLiquidScene(mount, fromTexture, toTexture, 1);
    const started = performance.now();
    const duration = 1450;
    let raf = 0;
    const draw = (now) => {
      const raw = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      liquid.uniforms.progress.value = eased;
      liquid.uniforms.time.value = now * 0.001;
      liquid.renderer.render(liquid.scene, liquid.camera);
      if (raw < 1) raf = requestAnimationFrame(draw);
    };
    window.addEventListener('resize', liquid.resize);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', liquid.resize); liquid.geometry.dispose(); liquid.material.dispose(); fromTexture.dispose(); toTexture.dispose(); liquid.renderer.dispose(); if (mount.contains(liquid.renderer.domElement)) mount.removeChild(liquid.renderer.domElement); };
  }, [from.slug, to.slug]);
  return <div ref={mountRef} className="three-transition-stage" aria-hidden="true" />;
}

function ThreeReel({ position }) {
  const mountRef = React.useRef(null);
  const positionRef = React.useRef(position);
  useEffect(() => {
    positionRef.current = position;
    const canvas = mountRef.current?.querySelector('canvas');
    if (canvas) canvas.dispatchEvent(new CustomEvent('three-reel-position', { detail: position }));
  }, [position]);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 2.6;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.className = 'three-reel-canvas';
    const geometry = new THREE.PlaneGeometry(2, 2, 48, 48);
    const loader = new THREE.TextureLoader();
    const textures = works.map((work) => loader.load(work.heroImage));
    textures.forEach((texture) => { texture.colorSpace = THREE.SRGBColorSpace; texture.minFilter = THREE.LinearFilter; texture.magFilter = THREE.LinearFilter; });
    const initialBase = Math.floor(positionRef.current);
    const uniforms = { texture1: { value: textures[((initialBase % works.length) + works.length) % works.length] }, texture2: { value: textures[((initialBase + 1) % works.length + works.length) % works.length] }, progress: { value: positionRef.current - initialBase }, time: { value: 0 }, direction: { value: 1 }, planeAspect: { value: 1 }, imageAspect1: { value: heroImageAspect }, imageAspect2: { value: heroImageAspect } };
    const material = new THREE.ShaderMaterial({ uniforms, transparent: true, vertexShader: liquidVertexShader, fragmentShader: liquidFragmentShader });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const resize = () => { const width = mount.clientWidth; const height = mount.clientHeight; renderer.setSize(width, height, false); const aspect = width / Math.max(height, 1); camera.aspect = aspect; camera.updateProjectionMatrix(); uniforms.planeAspect.value = aspect; const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(35 / 2)) * camera.position.z; mesh.scale.set((viewHeight * aspect) / 2, viewHeight / 2, 1); };
    let previousPosition = positionRef.current;
    const updatePosition = (nextPosition) => {
      const baseStep = Math.floor(nextPosition);
      const fraction = nextPosition - baseStep;
      const fromIndex = ((baseStep % works.length) + works.length) % works.length;
      const toIndex = ((baseStep + 1) % works.length + works.length) % works.length;
      uniforms.texture1.value = textures[fromIndex];
      uniforms.texture2.value = textures[toIndex];
      uniforms.progress.value = fraction;
      uniforms.direction.value = nextPosition >= previousPosition ? 1 : -1;
      previousPosition = nextPosition;
    };
    const onPosition = (event) => updatePosition(event.detail);
    const onResize = () => resize();
    resize();
    window.addEventListener('resize', onResize);
    let raf = 0;
    const draw = (now) => { uniforms.time.value = now * 0.001; renderer.render(scene, camera); raf = requestAnimationFrame(draw); };
    raf = requestAnimationFrame(draw);
    renderer.domElement.addEventListener('three-reel-position', onPosition);
    updatePosition(positionRef.current);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); renderer.domElement.removeEventListener('three-reel-position', onPosition); geometry.dispose(); material.dispose(); textures.forEach((texture) => texture.dispose()); renderer.dispose(); if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); };
  }, []);
  return <div ref={mountRef} className="three-reel" aria-hidden="true" />;
}

function Home() {
  const [position, setPosition] = useState(2); const [direction, setDirection] = useState(1); const positionRef = React.useRef(2); const settleTimerRef = React.useRef(null); const settleFrameRef = React.useRef(0); const index = ((Math.round(position) % works.length) + works.length) % works.length; const current = works[index]; const previous = works[(index - 1 + works.length) % works.length]; const next = works[(index + 1) % works.length]; const changing = Math.abs(position - Math.round(position)) > 0.012;
  const applyPosition = React.useCallback((nextPosition) => { positionRef.current = nextPosition; setPosition(nextPosition); }, []);
  const settleTo = React.useCallback((target) => { cancelAnimationFrame(settleFrameRef.current); const start = positionRef.current; const startedAt = performance.now(); const duration = 600; const tick = (now) => { const raw = Math.min((now - startedAt) / duration, 1); const eased = 1 - Math.pow(1 - raw, 3); applyPosition(start + (target - start) * eased); if (raw < 1) settleFrameRef.current = requestAnimationFrame(tick); else { positionRef.current = target; setPosition(target); } }; settleFrameRef.current = requestAnimationFrame(tick); }, [applyPosition]);
  const goToChapter = React.useCallback((chapterDirection) => { cancelAnimationFrame(settleFrameRef.current); window.clearTimeout(settleTimerRef.current); setDirection(chapterDirection >= 0 ? 1 : -1); settleTo(Math.round(positionRef.current) + chapterDirection); }, [settleTo]);
  const scheduleSettle = React.useCallback(() => { window.clearTimeout(settleTimerRef.current); settleTimerRef.current = window.setTimeout(() => settleTo(Math.round(positionRef.current)), 120); }, [settleTo]);
  const go = React.useCallback((amount) => { cancelAnimationFrame(settleFrameRef.current); window.clearTimeout(settleTimerRef.current); setDirection(amount >= 0 ? 1 : -1); applyPosition(positionRef.current + amount); scheduleSettle(); }, [applyPosition, scheduleSettle]);
  useEffect(() => {
    const onWheel = (event) => { if (Math.abs(event.deltaY) < 0.5) return; event.preventDefault(); go(Math.max(-0.18, Math.min(0.18, event.deltaY * 0.002))); };
    const onKeyDown = (event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowDown') goToChapter(1); if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') goToChapter(-1); };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKeyDown); window.clearTimeout(settleTimerRef.current); cancelAnimationFrame(settleFrameRef.current); };
  }, [go]);
  const chapterItems = works.map((work, itemIndex) => {
    const offset = circularChapterOffset(itemIndex, position);
    return <button key={work.slug} className={`chapter-item ${itemIndex === index ? 'is-active' : ''}`} style={{ transform: `translateX(${offset * 162}px) translateZ(${Math.abs(offset) * -70}px) rotateY(${offset * -20}deg)` }} onClick={() => { if (itemIndex !== index) goToChapter(offset > 0 ? 1 : -1); }} type="button"><span>#{work.number}</span><strong>{work.shortTitle}</strong></button>;
  });
  return <main className="home-page"><div className={`home-visual ${changing ? 'is-changing' : ''} ${direction > 0 ? 'slide-forward' : 'slide-back'}`}><div className="home-image-fallback" style={{ backgroundImage: `url(${current.heroImage})` }} aria-hidden="true" /><div className="reel-viewport"><ThreeReel position={position} /></div><div className="home-identity" /><div className="home-caption" key={`caption-${current.slug}`}><span className="caption-number">#{current.number}</span><span className="caption-title">{current.title}</span><span className="caption-category">{current.category}</span></div><div className="chapter-wheel" aria-label="Project chapters"><div className="chapter-wheel-track">{chapterItems}</div></div><div className="home-nav"><button className="slide-link slide-prev" onClick={() => goToChapter(-1)} type="button"><span className="slide-label">PREVIOUS</span><strong>← #{previous.number} {previous.shortTitle}</strong></button><Link className="slide-link slide-current" to={`/works/${current.slug}`}><span className="slide-label">OPEN WORK</span><strong>VIEW DETAILS ↗</strong></Link><button className="slide-link slide-next" onClick={() => goToChapter(1)} type="button"><span className="slide-label">NEXT</span><strong>#{next.number} {next.shortTitle} →</strong></button></div><div className="home-entry-veil" aria-hidden="true" /></div></main>;
}

function WorksList() {
  return <main className="light-page works-page"><Reveal className="page-intro"><span className="eyebrow">PROJECT REEL / 001—005</span><h1>Works</h1></Reveal><div className="works-index"><Link className="index-home" to="/"><span>00</span><strong>Home</strong><em>Return to the reel ↗</em></Link>{works.map((work, index) => <Reveal key={work.slug} className="work-reveal" style={{ '--reveal-delay': `${index * 70}ms` }}><Link className="index-row" to={`/works/${work.slug}`}><span className="index-number">{work.number}</span><span className="index-media"><img src={work.heroImage} alt="" /><b>{work.shortTitle}</b></span><span className="index-copy"><strong>{work.title}</strong><em>{work.oneLine}</em></span><span className="index-meta">{work.category}<br />{work.year}</span><span className="index-arrow">↗</span></Link></Reveal>)}</div></main>;
}

function WorkDetail() {
  const { slug } = useParams(); const navigate = useNavigate(); const work = works.find((item) => item.slug === slug) || works[0]; const currentIndex = works.findIndex((item) => item.slug === work.slug); const previous = works[(currentIndex - 1 + works.length) % works.length]; const next = works[(currentIndex + 1) % works.length];
  return <main className="detail-page"><section className={`detail-hero ${work.overlayImage ? 'has-project-overlay' : ''}`}><MediaSlot hero image={work.heroImage} label="MEDIA SLOT / ADD PROJECT VISUAL LATER" />{work.overlayImage && <img className="project-overlay-image" src={work.overlayImage} alt="데이터마이닝 프로젝트 오버레이" />}<div className="detail-visual-overlay" /><div className="detail-heading"><span className="eyebrow">#{work.number} / {work.category} / {work.year}</span><div className="detail-project-meta"><span>TEAM / {work.team}</span><span>DEVELOPMENT / {work.period}</span></div><h1>{work.title}</h1><p>{work.oneLine}</p><div className="detail-links"><ExternalLink work={work} /></div></div></section><section className="detail-body"><div className="detail-index"><span>#{work.number}</span><span>{work.category}</span><span>{work.year}</span></div><div className="detail-content"><DetailSection title="What we built"><ul>{work.implementation.map((item) => <li key={item}>{item}</li>)}</ul></DetailSection><DetailSection title="Why it mattered"><p>{work.problem}</p></DetailSection><DetailSection title="What I made"><p>{work.role}</p></DetailSection><DetailSection title="Trouble shooting"><p>{work.troubleshooting}</p></DetailSection><DetailSection title="What I learned"><p>{work.learning}</p></DetailSection><DetailSection title="Technologies"><div className="technology-groups">{technologyGroups[work.slug].map(([group, technologies]) => <div className="technology-group" key={group}><p><strong>{group}</strong></p><div className="technology-badges">{technologies.map((technology) => <img key={technology} src={getTechnologyBadgeUrl(technology)} alt={technology} loading="lazy" />)}</div></div>)}</div></DetailSection></div></section><nav className="work-switcher" aria-label="Work navigation"><button type="button" onClick={() => navigate(`/works/${previous.slug}`)}><span>← #{previous.number}</span><strong>{previous.shortTitle}</strong></button><Link to="/works/">All works <span>↗</span></Link><button type="button" onClick={() => navigate(`/works/${next.slug}`)}><span>#{next.number} →</span><strong>{next.shortTitle}</strong></button></nav></main>;
}

function ExternalLink({ work }) {
  const urls = { 'alpha-laboratory': 'https://github.com/LH99Tw/2025_AlphaLaboratory', couplemap: 'https://github.com/LH99Tw/2025_CoupleMap', snapocket: 'https://github.com/LH99Tw/2026-Snapocket', 'data-mining': 'https://github.com/LH99Tw/2025_DataMining', 'coding-run': 'https://github.com/LH99Tw/2025_Capstone_CodingRun' };
  return <a href={urls[work.slug]} target="_blank" rel="noreferrer">Open evidence ↗</a>;
}

function DetailSection({ title, children }) { return <Reveal className="detail-section-reveal"><section className="detail-section"><h2>{title}</h2><div>{children}</div></section></Reveal>; }

function About() {
  const facts = [['NAME', '이주한'], ['ROLE', profile.role], ['INTERESTS', '금융 · 데이터분석'], ['AGE', formatAge()], ['SCHOOL', '경기대학교'], ['MAJOR', '인공지능']];
  const blogLinks = [['홈', 'https://lh99tw.github.io/'], ['프로필', 'https://lh99tw.github.io/profile/'], ['프로그래밍', 'https://lh99tw.github.io/categories/programming/'], ['금융', 'https://lh99tw.github.io/categories/finance/'], ['일상', 'https://lh99tw.github.io/categories/daily/']];
  return <main className="light-page about-page about-reference">
    <section className="about-reference-hero">
      <div className="about-reference-copy">
        <span className="eyebrow">ABOUT / 2026</span>
        <h1><NameLockup /></h1>
        <div className="about-reference-hero-meta"><span>{profile.role}</span><span>PERSONAL ARCHIVE / 01</span></div>
      </div>
      <div className="about-reference-hero-intro"><p>기록하며 성장하고,<br /><em>문제를 구조화합니다.</em></p><span>Scroll to know me ↓</span></div>
      <div className="about-reference-stage"><div className="about-reference-stage-image"><img src="/assets/works/alpha-laboratory-hero.png" alt="Alpha Laboratory 프로젝트 화면" /><i className="stage-petal stage-petal-one" /><i className="stage-petal stage-petal-two" /><i className="stage-petal stage-petal-three" /></div><span className="stage-label">01 / THE PERSON BEHIND THE WORK</span></div>
    </section>
    <section className="about-reference-band about-reference-facts"><div className="about-reference-index"><b>01</b><span>THE FACTS</span></div><div className="about-reference-content"><span className="about-reference-kicker">A FEW THINGS, WITHOUT THE RESUME VOICE.</span><h2>사람을 먼저<br /><em>소개합니다.</em></h2><div className="about-fact-list">{facts.map(([label, value]) => <div className="about-fact-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><p className="about-reference-note">경기대학교에서 인공지능을 전공하며, 금융과 데이터분석에 관심을 두고 있습니다.</p></div><div className="about-reference-photo"><img src="/assets/works/couplemap-hero.png" alt="CoupleMap 프로젝트 화면" /><span>02 / THE WORK IS PART OF THE BIOGRAPHY</span></div></section>
    <section className="about-reference-band about-reference-belief"><div className="about-reference-index"><b>02</b><span>MY BELIEF</span></div><div className="about-reference-content"><span className="about-reference-kicker">WHAT I THINK DEVELOPMENT IS</span><blockquote>개발은<br /><em>복잡한 문제에</em><br />이름을 붙이는 일입니다.</blockquote><p className="about-reference-body">저에게 개발은 코드를 빠르게 작성하는 일이 아니라, 모호한 문제를 관찰하고 작은 단위로 나누어 다시 이해하는 과정에 가깝습니다. 그래서 만들고, 테스트하고, 기록합니다.</p><div className="about-reference-steps"><span>BUILD</span><b>→</b><span>TEST</span><b>→</b><span>RECORD</span><b>→</b><span>GROW</span></div></div><div className="about-reference-shape" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div></section>
    <section className="about-reference-band about-reference-small"><div className="about-reference-index"><b>03</b><span>SMALL THINGS</span></div><div className="about-reference-content"><span className="about-reference-kicker">TMI, BUT MAYBE THE IMPORTANT PART</span><h2>프로젝트 바깥의<br /><em>작은 기록들.</em></h2><div className="about-tmi-list"><article><b>01</b><h3>기록하는 편</h3><p>배운 내용과 실패한 접근을 기술 블로그에 다시 씁니다.</p></article><article><b>02</b><h3>관심의 방향</h3><p>AI와 백엔드에서 시작해 데이터와 금융으로 질문을 넓혀갑니다.</p></article><article><b>03</b><h3>작은 습관</h3><p>프로젝트를 만든 뒤, 왜 그렇게 만들었는지 문장으로 남깁니다.</p></article><article><b>04</b><h3>요즘의 질문</h3><p>좋은 개발은 무엇을 이해하게 했는지에 가깝지 않을까.</p></article></div></div></section>
    <section className="about-reference-footer"><div><span className="about-reference-kicker">CONTACT / KEEP IN TOUCH</span><h2>다섯 개의 창구로<br /><em>연결되어 있습니다.</em></h2></div><nav className="about-contact-icons" aria-label="Contact links">{contactLinks.map(({ label, href, icon }) => <a href={href} key={label} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer'} aria-label={label}><img src={icon} alt="" /><span>{label}</span></a>)}</nav><Link className="about-reference-back" to="/">← Back to the reel</Link></section>
  </main>;
}

function NameLockup() { return <><span>LEE</span><span>JUHAN</span></>; }

function AboutReference() {
  const facts = [['이름', '이주한'], ['포지션', 'Backend · AI Engineer'], ['관심분야', '금융 · 데이터분석'], ['나이', formatAge()], ['MBTI', 'INTJ']];
  const skills = [['Python', 3], ['Java', 1], ['SQL', 3], ['JS', 2]];
  const blogLinks = [['GitBlog', 'https://lh99tw.github.io/'], ['GitHub', 'https://github.com/LH99Tw'], ['프로그래밍', 'https://lh99tw.github.io/categories/programming/']];
  return <main className="light-page about-reference about-reference-grid">
    <section className="about-grid-hero">
      <div className="about-grid-portrait"><img src="/assets/profile.png" alt="이주한 프로필 사진" /></div>
      <div className="about-grid-hero-copy"><span className="about-grid-eyebrow">개발자</span><h1>이주한</h1><div className="about-grid-hero-lines"><p>사람들의 습관이 되는<br />서비스를 만드는 개발자</p><small>가 되고싶다!</small></div></div>
    </section>
    <section className="about-grid-panel about-grid-about"><h2>ABOUT</h2><div className="about-grid-columns"><div className="about-grid-facts">{facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="about-grid-list"><div><h3>EDUCATION</h3><div className="education-list"><div className="education-row"><span>2021</span><p>창원 명곡고등학교<br /><b>졸업</b></p></div><div className="education-row"><span>2027</span><p>경기대학교 인공지능전공<br /><b>졸업예정</b></p></div></div></div><div><h3>SKILLS</h3>{skills.map(([skill, score]) => <p className="about-skill" key={skill}><span>{skill}</span><i style={{ '--skill-width': `${score * 20}%` }} /></p>)}</div><div className="about-tools-block"><h3>TOOLS</h3><div className="about-tools"><img src="/assets/tools/codex-mark.svg" alt="Codex" /><img src="/assets/tools/orca.ico" alt="Orca" /><img src="/assets/tools/github.svg" alt="GitHub" /><img src="/assets/tools/notion.svg" alt="Notion" /></div></div></div></div></section>
    <section className="about-grid-tmi"><div className="about-grid-section-heading"><h2>SMALL<br />THINGS</h2><p>사적인 취미😆</p></div><div className="about-grid-tmi-list"><div className="tmi-column"><article><div className="tmi-visual tmi-photo-card"><img src="/assets/asset/band.png" alt="교내 밴드부 Traum 공연 사진" /><span className="tmi-card-index">01 / SINGING</span><div className="tmi-card-copy"><strong>노래</strong><em>24, 25년도 교내 밴드부 Traum에서 보컬로 활동</em></div></div></article><article><div className="tmi-visual tmi-photo-card"><img src="/assets/asset/ramen.jpg" alt="라멘 사진" /><span className="tmi-card-index">05 / RAMEN</span><div className="tmi-card-copy"><strong>라멘</strong><em>라멘 맛집 도장깨기로<br />10kg 증량했었다ㅠㅠ</em></div></div></article></div><div className="tmi-column"><article><div className="tmi-visual tmi-photo-card"><img src="/assets/asset/sake.jpg" alt="니혼슈와 식사 사진" /><span className="tmi-card-index">02 / NIHONSHU</span><div className="tmi-card-copy"><strong>니혼슈</strong><em>200종 이상 마셔봤을정도 , , ,</em></div></div></article><article><div className="tmi-visual tmi-photo-card"><img src="/assets/asset/cola.jpg" alt="콜라 캔 사진" /><span className="tmi-card-index">06 / COLA</span><div className="tmi-card-copy"><strong>콜라</strong><em>콜라를 좋아해서,<br />아이디도 zhffk~</em></div></div></article></div><div className="tmi-column"><article><div className="tmi-visual tmi-photo-card"><img src="/assets/asset/kuromi.JPG" alt="쿠로미 컬렉션 사진" /><span className="tmi-card-index">03 / COLLECTION</span><div className="tmi-card-copy"><strong>쿠로미</strong><em>귀여운 캐릭터들을 좋아하고,<br />그 중 쿠로미를 모으는중</em></div></div></article><article><div className="tmi-visual tmi-photo-card"><img src="/assets/asset/gym.jpg" alt="헬스장 운동 사진" /><span className="tmi-card-index">07 / GYM</span><div className="tmi-card-copy"><strong>운동</strong><em>군대에서부터<br />4년째 출근중</em></div></div></article></div><div className="tmi-column"><article><div className="tmi-visual tmi-photo-card"><img src="/assets/asset/picnic.jpg" alt="여자친구랑 여행 사진" /><span className="tmi-card-index">04 / TRAVEL</span><div className="tmi-card-copy"><strong>여자친구랑 여행</strong><em>여자친구랑 여행다니기!!</em></div></div></article><article><div className="tmi-visual tmi-photo-card"><img src="/assets/asset/scaremovie.jpg" alt="공포 영화 감상 사진" /><span className="tmi-card-index">08 / SCARY CONTENT</span><div className="tmi-card-copy"><strong>공포컨텐츠 시청!!</strong><em>영화, 게임 등 다양한<br />공포컨텐츠가 재밌어요</em></div></div></article></div></div></section>
    <footer className="about-grid-footer"><div><div className="about-grid-contact-icons">{contactLinks.map(({ label, href, icon }) => <a key={label} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer'} aria-label={label}><img src={icon} alt="" /><span>{label}</span></a>)}</div></div><div className="about-grid-footer-mark" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div></footer>
  </main>;
}

function MediaSlot({ hero = false, compact = false, label, image }) {
  return <div className={`media-slot ${hero ? 'media-slot-hero' : ''} ${compact ? 'media-slot-compact' : ''}`} aria-label="미디어 준비 영역" style={image ? { backgroundImage: `url(${image})` } : undefined}><span>{label}</span></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>);
