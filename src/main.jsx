import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import * as THREE from 'three';
import './styles.css';

const works = [
  { number: '005', slug: 'alpha-laboratory', title: 'AlphaLaboratory', shortTitle: 'AlphaLaboratory', category: 'AI / Finance', year: '2025', heroImage: '/assets/works/alpha-laboratory-hero.png', oneLine: 'AI가 알파 팩터를 만들고 검증하는 퀀트 투자 실험', technologies: ['LangGraph', 'React', 'TypeScript', 'Flask', 'Pandas'], problem: '금융 데이터에서 가설을 세우고 검증하는 과정을 반복 가능한 흐름으로 만들고 싶었습니다.', role: '멀티 에이전트 구조와 백테스트 흐름을 설계하고 실험 결과를 화면으로 연결했습니다.', implementation: ['알파 팩터를 생성하는 역할을 분리했습니다.', 'LangGraph로 에이전트 사이의 실행 순서를 조정했습니다.', 'React와 TypeScript로 실험 상태와 결과를 확인하는 화면을 구성했습니다.'], learning: '금융 도메인의 불확실성을 코드로 다룰 때는 모델보다 검증 흐름과 기록의 일관성이 더 중요하다는 것을 배웠습니다.' },
  { number: '004', slug: 'couplemap', title: '2025_CoupleMap', shortTitle: 'CoupleMap', category: 'Backend / Service', year: '2025', heroImage: '/assets/works/couplemap-hero.png', oneLine: '지도, 추천, 데이터 저장소를 연결한 데이트 추천 플랫폼', technologies: ['FastAPI', 'MongoDB', 'Redis', 'Docker', 'Kubernetes'], problem: '장소 추천을 검색 결과가 아니라 사용자의 맥락을 반영하는 서비스 경험으로 만들고 싶었습니다.', role: 'API, 인증, 데이터 모델, 지오스페셜 조회, 추천 흐름을 구현했습니다.', implementation: ['FastAPI로 인증과 추천 API를 분리했습니다.', 'MongoDB의 위치 데이터와 Redis 캐시를 연결했습니다.', 'Docker Compose, Kubernetes, GitHub Actions로 배포 흐름을 정리했습니다.'], learning: '하나의 기능도 API, 저장소, 외부 지도 서비스, 배포 환경이 함께 움직여야 실제 제품이 된다는 것을 경험했습니다.' },
  { number: '003', slug: 'snapocket', title: 'Snapocket', shortTitle: 'Snapocket', category: 'AI / Knowledge', year: '2025', heroImage: '/assets/works/snapocket-hero.png', oneLine: 'OCR과 VLM으로 흩어진 문서를 다시 쓰는 지식으로 바꾸는 실험', technologies: ['OCR', 'VLM', 'Python', 'Knowledge Management'], problem: '이미지와 문서 형태로 흩어진 정보를 검색 가능한 지식으로 연결하고 싶었습니다.', role: 'OCR/VLM 선택과 실험 과정을 기록하고 프로젝트 방향을 설계했습니다.', implementation: ['OCR 모델별 인식 품질과 사용 조건을 비교했습니다.', '문서의 구조와 의미를 보존하는 VLM 활용 가능성을 검토했습니다.', '실험 결과를 GitBlog 글로 남겨 다음 판단의 근거로 만들었습니다.'], learning: '모델을 선택하는 일은 성능 수치 하나가 아니라 입력 데이터, 후처리, 사용 목적을 함께 설계하는 일이었습니다.' },
  { number: '002', slug: 'data-mining', title: '지하철 DCRNN', shortTitle: '지하철 DCRNN', category: 'Data / Analysis', year: '2026', heroImage: '/assets/works/data-mining-hero.png', oneLine: '도메인 데이터를 전처리하고 분석과 시각화로 연결한 데이터 마이닝 실습', technologies: ['Python', 'Data Preprocessing', 'Statistics', 'Visualization'], problem: '데이터를 구조화하고 분석 결과를 시각적으로 전달하는 과정을 경험했습니다.', role: '전처리, 통계 분석, 시각화 실습을 수행하고 과정을 문서화했습니다.', implementation: ['원천 데이터를 분석 가능한 형태로 전처리했습니다.', '범주별 분포와 관계를 통계적으로 확인했습니다.', '분석 결과를 시각화해 패턴을 비교했습니다.'], learning: '데이터의 맥락을 이해해야 분석 결과가 실제 의사결정으로 이어진다는 것을 배웠습니다.' },
  { number: '001', slug: 'coding-run', title: '코딩런', shortTitle: '코딩런', category: 'Backend / Challenge', year: '2026', heroImage: '/assets/works/coding-run-hero.png', oneLine: '문제를 작은 단위로 쪼개고 반복해서 해결하는 코딩 기록', technologies: ['Python', 'Algorithms', 'Problem Solving'], problem: '꾸준한 문제 해결 훈련을 실제 구현 습관으로 연결하고 싶었습니다.', role: '문제 풀이 과정을 기록하고, 풀이와 개선 과정을 반복했습니다.', implementation: ['문제를 입력과 출력의 단위로 분해했습니다.', '자료구조와 알고리즘 선택을 비교했습니다.', '실패한 접근을 기록해 다음 풀이에 재사용했습니다.'], learning: '빠른 정답보다 문제를 구조화하고 다시 설명할 수 있는 풀이 과정이 중요하다는 기준을 세웠습니다.' },
];

const profile = { name: 'LEE JUHAN', role: 'Backend · AI Engineer', intro: '기록하며 성장하고, AI와 백엔드 기술로 문제를 구조화하는 개발자입니다.', description: '프로젝트를 만들고, 실험하고, 기록합니다. Python과 FastAPI를 중심으로 서비스의 구조를 만들며, 데이터와 금융 도메인까지 관심을 확장하고 있습니다.', methods: ['Build, Test, Iterate.', 'Analyze, Record, Grow.'], focus: ['Backend', 'AI / Data', 'Finance', 'Web'] };

function App() {
  const [transitioning, setTransitioning] = useState(false);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.dataset.page = location.pathname === '/' ? 'home' : 'light';
    setTransitioning(true);
    const timer = window.setTimeout(() => setTransitioning(false), 520);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);
  const transitionKind = location.pathname === '/about/' ? 'about-transition' : location.pathname.startsWith('/works/') ? 'detail-transition' : 'default-transition';
  return <div className="site-shell"><Header /><ScrollProgress /><LiquidFilter /><RouteVisualTransition />{location.pathname === '/about/' && <div className={`page-transition ${transitionKind} ${transitioning ? 'is-active' : ''}`} aria-hidden="true" />}<Routes><Route path="/" element={<Home />} /><Route path="/works/" element={<WorksList />} /><Route path="/works/:slug" element={<WorkDetail />} /><Route path="/about/" element={<AboutReference />} /><Route path="*" element={<Home />} /></Routes></div>;
}

function Header() {
  const location = useLocation();
  const [aboutOpen, setAboutOpen] = useState(location.pathname === '/about/');
  useEffect(() => setAboutOpen(location.pathname === '/about/'), [location.pathname]);
  const target = aboutOpen ? '/' : '/about/';
  return <header className="site-header"><div className="header-left"><Link className="brand-link" to="/">LEE JUHAN</Link><Link className="about-link" to="/about/">About <span aria-hidden="true">↗</span></Link></div><div className="header-right"><a href="https://github.com/LH99Tw" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://lh99tw.github.io" target="_blank" rel="noreferrer">GitBlog ↗</a></div><Link className={`menu-button ${aboutOpen ? 'is-open' : ''}`} to={target} aria-label={aboutOpen ? 'Close About page' : 'Open About page'} aria-pressed={aboutOpen}><span /><span /><span /></Link></header>;
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

const liquidVertexShader = `varying vec2 vUv; uniform float progress; uniform float direction; void main(){ vUv=uv; vec3 p=position; float travel=direction>0.0?uv.x:1.0-uv.x; float pulse=smoothstep(0.0,0.16,progress)*smoothstep(1.0,0.84,progress); float boundary=direction>0.0?1.0-progress:progress; float mirrorBand=exp(-pow((travel-boundary)/0.065,2.0))*pulse; p.x+=sin(uv.y*3.14159)*0.035*mirrorBand; p.z+=0.22*mirrorBand; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }`;
const liquidFragmentShader = `varying vec2 vUv; uniform sampler2D texture1; uniform sampler2D texture2; uniform float progress; uniform float direction; uniform float planeAspect; uniform float imageAspect1; uniform float imageAspect2; vec2 coverUv(vec2 uv,float imageAspect){ if(imageAspect>planeAspect){ uv.x=(uv.x-0.5)*(planeAspect/imageAspect)+0.5; } else { uv.y=(uv.y-0.5)*(imageAspect/planeAspect)+0.5; } return uv; } void main(){ float travel=direction>0.0?vUv.x:1.0-vUv.x; float pulse=smoothstep(0.0,0.16,progress)*smoothstep(1.0,0.84,progress); float boundary=direction>0.0?1.0-progress:progress; float width=0.045+0.02*pulse; vec2 outgoingPlaneUv=vUv; float reflectedTravel=2.0*boundary-travel; vec2 mirrorPlaneUv=outgoingPlaneUv; mirrorPlaneUv.x=direction>0.0?reflectedTravel:1.0-reflectedTravel; mirrorPlaneUv.x=clamp(mirrorPlaneUv.x,0.0,1.0); float mirrorBand=exp(-pow((travel-boundary)/0.065,2.0))*pulse; float sweep=direction>0.0?smoothstep(boundary-width,boundary+width,travel):1.0-smoothstep(boundary-width,boundary+width,travel); vec4 outgoing=texture2D(texture1,coverUv(outgoingPlaneUv,imageAspect1)); vec4 reflected=texture2D(texture1,coverUv(mirrorPlaneUv,imageAspect1)); reflected.rgb=reflected.rgb*1.12+vec3(0.035); outgoing=mix(outgoing,reflected,mirrorBand*0.94); vec4 incoming=texture2D(texture2,coverUv(vUv,imageAspect2)); gl_FragColor=mix(outgoing,incoming,sweep); }`;

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
  const [position, setPosition] = useState(0); const [direction, setDirection] = useState(1); const positionRef = React.useRef(0); const settleTimerRef = React.useRef(null); const settleFrameRef = React.useRef(0); const index = ((Math.round(position) % works.length) + works.length) % works.length; const current = works[index]; const previous = works[(index - 1 + works.length) % works.length]; const next = works[(index + 1) % works.length]; const changing = Math.abs(position - Math.round(position)) > 0.012;
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
  return <main className="home-page"><div className={`home-visual ${changing ? 'is-changing' : ''} ${direction > 0 ? 'slide-forward' : 'slide-back'}`}><div className="reel-viewport"><ThreeReel position={position} /></div><div className="visual-wash" /><div className="home-identity" /><div className="home-caption" key={`caption-${current.slug}`}><span className="caption-number">#{current.number}</span><span className="caption-title">{current.title}</span><span className="caption-category">{current.category}</span></div><div className="chapter-wheel" aria-label="Project chapters"><div className="chapter-wheel-track">{works.map((work, itemIndex) => { const offset = circularChapterOffset(itemIndex, index); return <button key={work.slug} className={`chapter-item ${itemIndex === index ? 'is-active' : ''}`} style={{ transform: `translateX(${offset * 162}px) translateZ(${Math.abs(offset) * -70}px) rotateY(${offset * -20}deg)` }} onClick={() => { if (itemIndex !== index) goToChapter(offset > 0 ? 1 : -1); }} type="button"><span>#{work.number}</span><strong>{work.shortTitle}</strong></button>; })}</div></div><div className="home-nav"><button className="slide-link slide-prev" onClick={() => goToChapter(-1)} type="button"><span className="slide-label">PREVIOUS</span><strong>← #{previous.number} {previous.shortTitle}</strong></button><Link className="slide-link slide-current" to={`/works/${current.slug}`}><span className="slide-label">OPEN WORK</span><strong>VIEW DETAILS ↗</strong></Link><button className="slide-link slide-next" onClick={() => goToChapter(1)} type="button"><span className="slide-label">NEXT</span><strong>#{next.number} {next.shortTitle} →</strong></button></div></div></main>;
}

function WorksList() {
  return <main className="light-page works-page"><Reveal className="page-intro"><span className="eyebrow">PROJECT REEL / 001—005</span><h1>Works</h1><p>다섯 개의 프로젝트를 하나의 작품 목록처럼 정리했습니다.</p></Reveal><div className="works-index"><Link className="index-home" to="/"><span>00</span><strong>Home</strong><em>Return to the reel ↗</em></Link>{works.map((work, index) => <Reveal key={work.slug} className="work-reveal" style={{ '--reveal-delay': `${index * 70}ms` }}><Link className="index-row" to={`/works/${work.slug}`}><span className="index-number">{work.number}</span><MediaSlot compact label="MEDIA SLOT" /><span className="index-copy"><strong>{work.title}</strong><em>{work.oneLine}</em></span><span className="index-meta">{work.category}<br />{work.year}</span><span className="index-arrow">↗</span></Link></Reveal>)}</div></main>;
}

function WorkDetail() {
  const { slug } = useParams(); const navigate = useNavigate(); const work = works.find((item) => item.slug === slug) || works[0]; const currentIndex = works.findIndex((item) => item.slug === work.slug); const previous = works[(currentIndex - 1 + works.length) % works.length]; const next = works[(currentIndex + 1) % works.length];
  return <main className="detail-page"><section className="detail-hero"><MediaSlot hero image={work.heroImage} label="MEDIA SLOT / ADD PROJECT VISUAL LATER" /><div className="detail-visual-overlay" /><div className="detail-heading"><span className="eyebrow">#{work.number} / {work.category} / {work.year}</span><h1>{work.title}</h1><p>{work.oneLine}</p><div className="detail-links"><ExternalLink work={work} /></div></div></section><section className="detail-body"><div className="detail-index"><span>#{work.number}</span><span>{work.category}</span><span>{work.year}</span></div><div className="detail-content"><DetailSection title="What I built"><p>{work.role}</p></DetailSection><DetailSection title="Why it mattered"><p>{work.problem}</p></DetailSection><DetailSection title="How it works"><ul>{work.implementation.map((item) => <li key={item}>{item}</li>)}</ul></DetailSection><DetailSection title="What I learned"><p>{work.learning}</p></DetailSection><div className="tech-strip"><span className="eyebrow">TECHNOLOGIES</span><div>{work.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div></div></section><nav className="work-switcher" aria-label="Work navigation"><button type="button" onClick={() => navigate(`/works/${previous.slug}`)}><span>← #{previous.number}</span><strong>{previous.shortTitle}</strong></button><Link to="/works/">All works <span>↗</span></Link><button type="button" onClick={() => navigate(`/works/${next.slug}`)}><span>#{next.number} →</span><strong>{next.shortTitle}</strong></button></nav></main>;
}

function ExternalLink({ work }) {
  const urls = { 'alpha-laboratory': 'https://github.com/LH99Tw/2025_AlphaLaboratory', couplemap: 'https://github.com/LH99Tw/2025_CoupleMap', snapocket: 'https://lh99tw.github.io/categories/project/', 'data-mining': 'https://lh99tw.github.io/blog/2026/05/21/%EC%9D%98%EB%A3%8C%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B6%84%EC%84%9D-%EC%8B%A4%EC%8A%B5/', 'coding-run': 'https://github.com/LH99Tw' };
  return <a href={urls[work.slug]} target="_blank" rel="noreferrer">Open evidence ↗</a>;
}

function DetailSection({ title, children }) { return <Reveal className="detail-section-reveal"><section className="detail-section"><h2>{title}</h2><div>{children}</div></section></Reveal>; }

function About() {
  const facts = [['NAME', '이주한'], ['ROLE', profile.role], ['BASED IN', 'Korea'], ['AGE', '추후 공개'], ['SCHOOL', '추후 입력'], ['MAJOR', '추후 입력']];
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
    <section className="about-reference-band about-reference-facts"><div className="about-reference-index"><b>01</b><span>THE FACTS</span></div><div className="about-reference-content"><span className="about-reference-kicker">A FEW THINGS, WITHOUT THE RESUME VOICE.</span><h2>사람을 먼저<br /><em>소개합니다.</em></h2><div className="about-fact-list">{facts.map(([label, value]) => <div className="about-fact-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><p className="about-reference-note">나이, 학교, 전공은 실제 정보를 확인한 뒤 공개합니다. 지금은 작업과 기록을 통해 먼저 만나주세요.</p></div><div className="about-reference-photo"><img src="/assets/works/couplemap-hero.png" alt="CoupleMap 프로젝트 화면" /><span>02 / THE WORK IS PART OF THE BIOGRAPHY</span></div></section>
    <section className="about-reference-band about-reference-belief"><div className="about-reference-index"><b>02</b><span>MY BELIEF</span></div><div className="about-reference-content"><span className="about-reference-kicker">WHAT I THINK DEVELOPMENT IS</span><blockquote>개발은<br /><em>복잡한 문제에</em><br />이름을 붙이는 일입니다.</blockquote><p className="about-reference-body">저에게 개발은 코드를 빠르게 작성하는 일이 아니라, 모호한 문제를 관찰하고 작은 단위로 나누어 다시 이해하는 과정에 가깝습니다. 그래서 만들고, 테스트하고, 기록합니다.</p><div className="about-reference-steps"><span>BUILD</span><b>→</b><span>TEST</span><b>→</b><span>RECORD</span><b>→</b><span>GROW</span></div></div><div className="about-reference-shape" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div></section>
    <section className="about-reference-band about-reference-small"><div className="about-reference-index"><b>03</b><span>SMALL THINGS</span></div><div className="about-reference-content"><span className="about-reference-kicker">TMI, BUT MAYBE THE IMPORTANT PART</span><h2>프로젝트 바깥의<br /><em>작은 기록들.</em></h2><div className="about-tmi-list"><article><b>01</b><h3>기록하는 편</h3><p>배운 내용과 실패한 접근을 기술 블로그에 다시 씁니다.</p></article><article><b>02</b><h3>관심의 방향</h3><p>AI와 백엔드에서 시작해 데이터와 금융으로 질문을 넓혀갑니다.</p></article><article><b>03</b><h3>작은 습관</h3><p>프로젝트를 만든 뒤, 왜 그렇게 만들었는지 문장으로 남깁니다.</p></article><article><b>04</b><h3>요즘의 질문</h3><p>좋은 개발은 무엇을 이해하게 했는지에 가깝지 않을까.</p></article></div></div></section>
    <section className="about-reference-footer"><div><span className="about-reference-kicker">READ MORE / KEEP IN TOUCH</span><h2>더 자세한 생각은<br /><em>여기에 계속 씁니다.</em></h2></div><nav className="about-reference-links" aria-label="GitBlog links">{blogLinks.map(([label, href]) => <a href={href} key={label} target="_blank" rel="noreferrer"><span>{label}</span><b>↗</b></a>)}<a href="https://github.com/LH99Tw" target="_blank" rel="noreferrer"><span>GitHub</span><b>↗</b></a></nav><Link className="about-reference-back" to="/">← Back to the reel</Link></section>
  </main>;
}

function NameLockup() { return <><span>LEE</span><span>JUHAN</span></>; }

function MediaSlot({ hero = false, compact = false, label, image }) {
  return <div className={`media-slot ${hero ? 'media-slot-hero' : ''} ${compact ? 'media-slot-compact' : ''}`} aria-label="미디어 준비 영역" style={image ? { backgroundImage: `url(${image})` } : undefined}><span>{label}</span></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>);
