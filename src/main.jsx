import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import './styles.css';

const works = [
  { number: '005', slug: 'alpha-laboratory', title: '2025_AlphaLaboratory', shortTitle: 'Alpha Laboratory', category: 'AI / Finance', year: '2025', oneLine: 'AI가 알파 팩터를 만들고 검증하는 퀀트 투자 실험', technologies: ['LangGraph', 'React', 'TypeScript', 'Flask', 'Pandas'], problem: '금융 데이터에서 가설을 세우고 검증하는 과정을 반복 가능한 흐름으로 만들고 싶었습니다.', role: '멀티 에이전트 구조와 백테스트 흐름을 설계하고 실험 결과를 화면으로 연결했습니다.', implementation: ['알파 팩터를 생성하는 역할을 분리했습니다.', 'LangGraph로 에이전트 사이의 실행 순서를 조정했습니다.', 'React와 TypeScript로 실험 상태와 결과를 확인하는 화면을 구성했습니다.'], learning: '금융 도메인의 불확실성을 코드로 다룰 때는 모델보다 검증 흐름과 기록의 일관성이 더 중요하다는 것을 배웠습니다.' },
  { number: '004', slug: 'couplemap', title: '2025_CoupleMap', shortTitle: 'CoupleMap', category: 'Backend / Service', year: '2025', oneLine: '지도, 추천, 데이터 저장소를 연결한 데이트 추천 플랫폼', technologies: ['FastAPI', 'MongoDB', 'Redis', 'Docker', 'Kubernetes'], problem: '장소 추천을 검색 결과가 아니라 사용자의 맥락을 반영하는 서비스 경험으로 만들고 싶었습니다.', role: 'API, 인증, 데이터 모델, 지오스페셜 조회, 추천 흐름을 구현했습니다.', implementation: ['FastAPI로 인증과 추천 API를 분리했습니다.', 'MongoDB의 위치 데이터와 Redis 캐시를 연결했습니다.', 'Docker Compose, Kubernetes, GitHub Actions로 배포 흐름을 정리했습니다.'], learning: '하나의 기능도 API, 저장소, 외부 지도 서비스, 배포 환경이 함께 움직여야 실제 제품이 된다는 것을 경험했습니다.' },
  { number: '003', slug: 'snapocket', title: 'Snapocket', shortTitle: 'Snapocket', category: 'AI / Knowledge', year: '2025', oneLine: 'OCR과 VLM으로 흩어진 문서를 다시 쓰는 지식으로 바꾸는 실험', technologies: ['OCR', 'VLM', 'Python', 'Knowledge Management'], problem: '이미지와 문서 형태로 흩어진 정보를 검색 가능한 지식으로 연결하고 싶었습니다.', role: 'OCR/VLM 선택과 실험 과정을 기록하고 프로젝트 방향을 설계했습니다.', implementation: ['OCR 모델별 인식 품질과 사용 조건을 비교했습니다.', '문서의 구조와 의미를 보존하는 VLM 활용 가능성을 검토했습니다.', '실험 결과를 GitBlog 글로 남겨 다음 판단의 근거로 만들었습니다.'], learning: '모델을 선택하는 일은 성능 수치 하나가 아니라 입력 데이터, 후처리, 사용 목적을 함께 설계하는 일이었습니다.' },
  { number: '002', slug: 'data-mining', title: 'Data Mining', shortTitle: 'Data Mining', category: 'Data / Analysis', year: '2026', oneLine: '도메인 데이터를 전처리하고 분석과 시각화로 연결한 데이터 마이닝 실습', technologies: ['Python', 'Data Preprocessing', 'Statistics', 'Visualization'], problem: '데이터를 구조화하고 분석 결과를 시각적으로 전달하는 과정을 경험했습니다.', role: '전처리, 통계 분석, 시각화 실습을 수행하고 과정을 문서화했습니다.', implementation: ['원천 데이터를 분석 가능한 형태로 전처리했습니다.', '범주별 분포와 관계를 통계적으로 확인했습니다.', '분석 결과를 시각화해 패턴을 비교했습니다.'], learning: '데이터의 맥락을 이해해야 분석 결과가 실제 의사결정으로 이어진다는 것을 배웠습니다.' },
  { number: '001', slug: 'coding-run', title: 'Coding Run', shortTitle: 'Coding Run', category: 'Backend / Challenge', year: '2026', oneLine: '문제를 작은 단위로 쪼개고 반복해서 해결하는 코딩 기록', technologies: ['Python', 'Algorithms', 'Problem Solving'], problem: '꾸준한 문제 해결 훈련을 실제 구현 습관으로 연결하고 싶었습니다.', role: '문제 풀이 과정을 기록하고, 풀이와 개선 과정을 반복했습니다.', implementation: ['문제를 입력과 출력의 단위로 분해했습니다.', '자료구조와 알고리즘 선택을 비교했습니다.', '실패한 접근을 기록해 다음 풀이에 재사용했습니다.'], learning: '빠른 정답보다 문제를 구조화하고 다시 설명할 수 있는 풀이 과정이 중요하다는 기준을 세웠습니다.' },
];

const profile = { name: 'LEE JUHAN', role: 'Backend · AI Engineer', intro: '기록하며 성장하고, AI와 백엔드 기술로 문제를 구조화하는 개발자입니다.', description: '프로젝트를 만들고, 실험하고, 기록합니다. Python과 FastAPI를 중심으로 서비스의 구조를 만들며, 데이터와 금융 도메인까지 관심을 확장하고 있습니다.', methods: ['Build, Test, Iterate.', 'Analyze, Record, Grow.'], focus: ['Backend', 'AI / Data', 'Finance', 'Web'] };

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); document.documentElement.dataset.page = location.pathname === '/' ? 'home' : 'light'; setMenuOpen(false); }, [location.pathname]);
  return <div className={`site-shell ${menuOpen ? 'menu-is-open' : ''}`}><Header menuOpen={menuOpen} onMenu={() => setMenuOpen((open) => !open)} /><Routes><Route path="/" element={<Home />} /><Route path="/works/" element={<WorksList />} /><Route path="/works/:slug" element={<WorkDetail />} /><Route path="/about/" element={<About />} /><Route path="*" element={<Home />} /></Routes><MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} /></div>;
}

function Header({ menuOpen, onMenu }) {
  return <header className="site-header"><div className="header-left"><Link className="brand-link" to="/">LEE JUHAN</Link><Link className="about-link" to="/about/">About <span aria-hidden="true">↗</span></Link></div><div className="header-right"><a href="https://github.com/LH99Tw" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://lh99tw.github.io" target="_blank" rel="noreferrer">GitBlog ↗</a></div><button className={`menu-button ${menuOpen ? 'is-open' : ''}`} type="button" aria-label={menuOpen ? 'Close works menu' : 'Open works menu'} aria-expanded={menuOpen} onClick={onMenu}><span /><span /><span /></button></header>;
}

function MenuOverlay({ open, onClose }) {
  return <aside className={`works-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}><div className="menu-inner"><Link className="menu-home" to="/" onClick={onClose}>Home <span>↗</span></Link><div className="menu-list">{works.map((work) => <Link className="menu-row" to={`/works/${work.slug}`} key={work.slug} onClick={onClose}><span className="menu-number">{work.number}</span><MediaSlot compact label="MEDIA SLOT" /><span className="menu-title">{work.title}</span><span className="menu-category">{work.category}</span></Link>)}</div></div></aside>;
}

function Home() {
  const [index, setIndex] = useState(0); const current = works[index]; const previous = works[(index - 1 + works.length) % works.length]; const next = works[(index + 1) % works.length];
  const go = (direction) => setIndex((value) => (value + direction + works.length) % works.length);
  return <main className="home-page"><div className="home-visual"><MediaSlot hero label="MEDIA SLOT / ADD HERO VISUAL LATER" /><div className="visual-wash" /><div className="home-identity"><span className="home-role">{profile.role}</span><h1><NameLockup /></h1><span className="home-origin">from Korea</span></div><div className="home-caption"><span className="caption-number">#{current.number}</span><span className="caption-title">{current.title}</span><span className="caption-category">{current.category}</span></div><div className="home-nav"><button className="slide-link slide-prev" onClick={() => go(-1)} type="button"><span className="slide-label">PREVIOUS</span><strong>← #{previous.number} {previous.shortTitle}</strong></button><Link className="slide-link slide-current" to={`/works/${current.slug}`}><span className="slide-label">OPEN WORK</span><strong>VIEW DETAILS ↗</strong></Link><button className="slide-link slide-next" onClick={() => go(1)} type="button"><span className="slide-label">NEXT</span><strong>#{next.number} {next.shortTitle} →</strong></button></div></div></main>;
}

function WorksList() {
  return <main className="light-page works-page"><div className="page-intro"><span className="eyebrow">PROJECT REEL / 001—005</span><h1>Works</h1><p>다섯 개의 프로젝트를 하나의 작품 목록처럼 정리했습니다.</p></div><div className="works-index"><Link className="index-home" to="/"><span>00</span><strong>Home</strong><em>Return to the reel ↗</em></Link>{works.map((work) => <Link className="index-row" to={`/works/${work.slug}`} key={work.slug}><span className="index-number">{work.number}</span><MediaSlot compact label="MEDIA SLOT" /><span className="index-copy"><strong>{work.title}</strong><em>{work.oneLine}</em></span><span className="index-meta">{work.category}<br />{work.year}</span><span className="index-arrow">↗</span></Link>)}</div></main>;
}

function WorkDetail() {
  const { slug } = useParams(); const navigate = useNavigate(); const work = works.find((item) => item.slug === slug) || works[0]; const currentIndex = works.findIndex((item) => item.slug === work.slug); const previous = works[(currentIndex - 1 + works.length) % works.length]; const next = works[(currentIndex + 1) % works.length];
  return <main className="detail-page"><section className="detail-hero"><MediaSlot hero label="MEDIA SLOT / ADD PROJECT VISUAL LATER" /><div className="detail-visual-overlay" /><div className="detail-heading"><span className="eyebrow">#{work.number} / {work.category} / {work.year}</span><h1>{work.title}</h1><p>{work.oneLine}</p><div className="detail-links"><ExternalLink work={work} /></div></div></section><section className="detail-body"><div className="detail-index"><span>#{work.number}</span><span>{work.category}</span><span>{work.year}</span></div><div className="detail-content"><DetailSection title="What I built"><p>{work.role}</p></DetailSection><DetailSection title="Why it mattered"><p>{work.problem}</p></DetailSection><DetailSection title="How it works"><ul>{work.implementation.map((item) => <li key={item}>{item}</li>)}</ul></DetailSection><DetailSection title="What I learned"><p>{work.learning}</p></DetailSection><div className="tech-strip"><span className="eyebrow">TECHNOLOGIES</span><div>{work.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div></div></section><nav className="work-switcher" aria-label="Work navigation"><button type="button" onClick={() => navigate(`/works/${previous.slug}`)}><span>← #{previous.number}</span><strong>{previous.shortTitle}</strong></button><Link to="/works/">All works <span>↗</span></Link><button type="button" onClick={() => navigate(`/works/${next.slug}`)}><span>#{next.number} →</span><strong>{next.shortTitle}</strong></button></nav></main>;
}

function ExternalLink({ work }) {
  const urls = { 'alpha-laboratory': 'https://github.com/LH99Tw/2025_AlphaLaboratory', couplemap: 'https://github.com/LH99Tw/2025_CoupleMap', snapocket: 'https://lh99tw.github.io/categories/project/', 'data-mining': 'https://lh99tw.github.io/blog/2026/05/21/%EC%9D%98%EB%A3%8C%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B6%84%EC%84%9D-%EC%8B%A4%EC%8A%B5/', 'coding-run': 'https://github.com/LH99Tw' };
  return <a href={urls[work.slug]} target="_blank" rel="noreferrer">Open evidence ↗</a>;
}

function DetailSection({ title, children }) { return <section className="detail-section"><h2>{title}</h2><div>{children}</div></section>; }

function About() {
  return <main className="light-page about-page"><div className="about-top"><div><span className="eyebrow">PROFILE / LEE JUHAN</span><h1><NameLockup /></h1><p className="about-role">{profile.role}</p></div><p className="about-lede">{profile.intro}</p></div><div className="about-grid"><section><span className="eyebrow">ABOUT</span><p className="about-copy">{profile.description}</p></section><section><span className="eyebrow">WORKING METHOD</span><div className="method-list">{profile.methods.map((method) => <strong key={method}>{method}</strong>)}</div></section><section><span className="eyebrow">FOCUS</span><div className="focus-list">{profile.focus.map((item, index) => <span key={item}><i>0{index + 1}</i>{item}</span>)}</div></section><section><span className="eyebrow">LINKS</span><div className="about-links"><a href="https://github.com/LH99Tw" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://lh99tw.github.io" target="_blank" rel="noreferrer">GitBlog ↗</a><a href="mailto:hello@lh99tw.dev">Email ↗</a></div></section></div><Link className="back-link" to="/">← Back to the reel</Link></main>;
}

function NameLockup() { return <><span>LEE</span><span>JUHAN</span></>; }

function MediaSlot({ hero = false, compact = false, label }) {
  return <div className={`media-slot ${hero ? 'media-slot-hero' : ''} ${compact ? 'media-slot-compact' : ''}`} aria-label="미디어 준비 영역"><span>{label}</span></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>);
