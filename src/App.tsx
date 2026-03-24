import { useState, useCallback, useEffect } from 'react';
import PixelMonster from './components/PixelMonster';
import ScreenDecor from './components/ScreenDecor';
import { playMove, playSelect, playBack, playPageTurn } from './utils/audio';

// ─── Icon helper: all icons live in /icons/*.png ───
function PixelImg({ name, size = 28 }: { name: string; size?: number }) {
  return (
    <img
      src={`/icons/${name}.png`}
      alt={name}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain', imageRendering: 'pixelated' }}
      draggable={false}
    />
  );
}

// Page definitions
type PageId = 'splash' | 'about' | 'skills' | 'websites' | 'games' | 'neuro' | 'publications' | 'contact' | 'menu';

interface PageItem {
  label: string;
  url?: string;
}

const PAGES_ORDER: PageId[] = ['splash', 'about', 'skills', 'websites', 'games', 'neuro', 'publications', 'contact'];

const PAGE_DATA: Record<string, { title: string; items: PageItem[] }> = {
  websites: {
    title: 'WEBSITES',
    items: [
      { label: 'FLASH CARD', url: 'https://hsnflashcard.vercel.app/' },
      { label: 'PRODUCTIVITY', url: 'https://todo-y4it.vercel.app/' },
      { label: 'SRC', url: 'https://smc-src.vercel.app/auth?tab=signup' },
      { label: 'SEW', url: 'https://joinsew.vercel.app/' },
    ],
  },
  games: {
    title: 'GAMES',
    items: [
      { label: 'RANKED', url: 'https://rankedgame.vercel.app/' },
      { label: 'MISHU', url: 'https://mishu-theta.vercel.app/' },
      { label: 'CRICKET MANAGER', url: 'https://mishu-theta.vercel.app/' },
      { label: 'SAVE ASSASSIN', url: 'https://github.com/hadbierox196/save-assassin' },
      { label: 'VL IMPOSTER', url: 'https://github.com/hadbierox196/Vl_imposter' },
    ],
  },
  neuro: {
    title: 'NEURO',
    items: [
      { label: 'LIF NEURON', url: 'https://github.com/hadbierox196/LIF-neuron' },
      { label: 'HODGKIN HUXLEY', url: 'https://github.com/hadbierox196/Hodgkin-huxley-model' },
    ],
  },
  publications: {
    title: 'PUBLICATIONS',
    items: [],
  },
  contact: {
    title: 'CONTACT',
    items: [
      { label: 'GITHUB', url: 'https://github.com/hadbierox196' },
      { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/hasan-farooq-89b1aa361?utm_source=share&utm_content=profile&utm_medium=member_android' },
      { label: 'INSTAGRAM', url: 'https://www.instagram.com/hf.mayb.19' },
    ],
  },
  skills: {
    title: 'SKILLS',
    items: [
      { label: 'HTML, CSS, JS' },
      { label: 'REACT JS' },
      { label: 'PYTHON' },
      { label: 'DATA ANALYSIS' },
      { label: 'GRAPHIC DESIGNING' },
      { label: 'COMP. NEUROSCIENCE' },
    ],
  },
};

const MENU_ITEMS: { label: string; page: PageId }[] = [
  { label: 'ABOUT ME', page: 'about' },
  { label: 'SKILLS', page: 'skills' },
  { label: 'WEBSITES', page: 'websites' },
  { label: 'GAMES', page: 'games' },
  { label: 'NEURO', page: 'neuro' },
  { label: 'PUBLICATIONS', page: 'publications' },
  { label: 'CONTACT', page: 'contact' },
];

// Maps page id → icon filename (without .png)
const PAGE_ICON_MAP: Record<string, string> = {
  about: 'about',
  skills: 'skills',
  websites: 'websites',
  games: 'games',
  neuro: 'neuro',
  publications: 'publications',
  contact: 'contacts',
};

// Maps contact label → icon filename (without .png)
const CONTACT_ICON_MAP: Record<string, string> = {
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  INSTAGRAM: 'instagram',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('splash');
  const [cursorIndex, setCursorIndex] = useState(0);
  const [splashOption, setSplashOption] = useState(0);
  const [prevPage, setPrevPage] = useState<PageId | null>(null);

  const navigateTo = useCallback((page: PageId) => {
    setPrevPage(currentPage);
    setCurrentPage(page);
    setCursorIndex(0);
    setSplashOption(0);
    playPageTurn();
  }, [currentPage]);

  const getPageItems = useCallback((): PageItem[] => {
    const data = PAGE_DATA[currentPage];
    return data ? data.items : [];
  }, [currentPage]);

  const handleLeft = useCallback(() => {
    if (currentPage === 'splash') {
      setSplashOption(o => (o === 0 ? 1 : 0));
      playMove();
      return;
    }
    const idx = PAGES_ORDER.indexOf(currentPage);
    if (idx > 0) navigateTo(PAGES_ORDER[idx - 1]);
    else if (currentPage === 'menu') navigateTo('splash');
  }, [currentPage, navigateTo]);

  const handleRight = useCallback(() => {
    if (currentPage === 'splash') {
      setSplashOption(o => (o === 0 ? 1 : 0));
      playMove();
      return;
    }
    const idx = PAGES_ORDER.indexOf(currentPage);
    if (idx >= 0 && idx < PAGES_ORDER.length - 1) navigateTo(PAGES_ORDER[idx + 1]);
  }, [currentPage, navigateTo]);

  const handleUp = useCallback(() => {
    if (currentPage === 'menu') {
      setCursorIndex(i => Math.max(0, i - 1));
      playMove();
      return;
    }
    const items = getPageItems();
    if (items.length > 0) {
      setCursorIndex(i => Math.max(0, i - 1));
      playMove();
    }
  }, [currentPage, getPageItems]);

  const handleDown = useCallback(() => {
    if (currentPage === 'menu') {
      setCursorIndex(i => Math.min(MENU_ITEMS.length - 1, i + 1));
      playMove();
      return;
    }
    const items = getPageItems();
    if (items.length > 0) {
      setCursorIndex(i => Math.min(items.length - 1, i + 1));
      playMove();
    }
  }, [currentPage, getPageItems]);

  const handleA = useCallback(() => {
    if (currentPage === 'splash') {
      playSelect();
      if (splashOption === 0) navigateTo('about');
      else navigateTo('menu');
      return;
    }
    if (currentPage === 'menu') {
      playSelect();
      navigateTo(MENU_ITEMS[cursorIndex].page);
      return;
    }
    const items = getPageItems();
    if (items.length > 0 && items[cursorIndex]?.url) {
      playSelect();
      window.open(items[cursorIndex].url, '_blank');
    }
  }, [currentPage, splashOption, cursorIndex, navigateTo, getPageItems]);

  const handleB = useCallback(() => {
    playBack();
    if (currentPage === 'menu') { navigateTo('splash'); return; }
    if (currentPage !== 'splash') {
      if (prevPage && prevPage !== currentPage) navigateTo(prevPage);
      else navigateTo('splash');
    }
  }, [currentPage, prevPage, navigateTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft': handleLeft(); break;
        case 'ArrowRight': handleRight(); break;
        case 'ArrowUp': handleUp(); e.preventDefault(); break;
        case 'ArrowDown': handleDown(); e.preventDefault(); break;
        case 'a': case 'A': case 'Enter': handleA(); break;
        case 'b': case 'B': case 'Escape': handleB(); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleLeft, handleRight, handleUp, handleDown, handleA, handleB]);

  const pageIdx = PAGES_ORDER.indexOf(currentPage);
  const showNav = pageIdx > 0;
  const canGoPrev = pageIdx > 0;
  const canGoNext = pageIdx >= 0 && pageIdx < PAGES_ORDER.length - 1;

  return (
    <div
      className="pixel-font w-screen flex flex-col"
      style={{ height: '100dvh', maxHeight: '100dvh', overflow: 'hidden', background: '#0a0a0a' }}
    >
      {/* ─── CONSOLE TOP STRIP ─── */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <div className="flex gap-1">
          <div className="console-dot" />
          <div className="console-dot" />
        </div>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: '#1a1a1a' }} />
        <div className="flex gap-1">
          <div className="console-dot" />
          <div className="console-dot" />
        </div>
      </div>

      {/* ─── SCREEN AREA ─── */}
      <div className="flex-1 flex flex-col min-h-0 px-3 pb-1">
        <div className="screen-bg screen-border flex-1 flex flex-col min-h-0 relative overflow-hidden">
          {/* Game background decorations */}
          <ScreenDecor />
          {/* Pixel monster */}
          <PixelMonster />

          {/* Page content */}
          <div className="flex-1 flex flex-col min-h-0 relative" style={{ zIndex: 2 }}>
            {currentPage === 'splash' && <SplashPage selected={splashOption} />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'skills' && <SkillsPage />}
            {currentPage === 'menu' && <MenuPage cursorIndex={cursorIndex} />}
            {(['websites', 'games', 'neuro', 'publications', 'contact'] as PageId[]).includes(currentPage) && (
              <ListPage page={currentPage} cursorIndex={cursorIndex} />
            )}
          </div>

          {/* ─── PRV / NXT bar ─── */}
          {showNav && (
            <div
              className="flex justify-between items-center px-4 py-2 flex-shrink-0"
              style={{ zIndex: 3, borderTop: '2px solid #eee', background: 'rgba(248,248,240,0.95)' }}
            >
              <button
                className="nav-bar flex items-center gap-1"
                onClick={handleLeft}
                style={{ opacity: canGoPrev ? 1 : 0.3 }}
              >
                <span>&#9664;</span> PRV
              </button>
              <button
                className="nav-bar flex items-center gap-1"
                onClick={handleRight}
                style={{ opacity: canGoNext ? 1 : 0.3 }}
              >
                NXT <span>&#9654;</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── CONTROL PANEL ─── */}
      <div
        className="control-panel flex items-center justify-between px-5"
        style={{ height: '34%', minHeight: '140px', maxHeight: '220px' }}
      >
        {/* D-PAD */}
        <div className="relative" style={{ width: '115px', height: '115px' }}>
          {/* Shadow */}
          <div className="dpad-shadow absolute"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '112px', height: '112px' }}
          />
          {/* Yellow cross */}
          <div className="dpad-body absolute"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px' }}
          />
          {/* Center dot */}
          <div className="absolute" style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '14px', height: '14px', borderRadius: '50%', background: '#CA8A04', zIndex: 5,
          }} />
          {/* Clickable areas */}
          <button className="dpad-btn" style={{ top: 0, left: '30%', width: '40%', height: '30%' }}
            onClick={handleUp} aria-label="Up" />
          <button className="dpad-btn" style={{ bottom: 0, left: '30%', width: '40%', height: '30%' }}
            onClick={handleDown} aria-label="Down" />
          <button className="dpad-btn" style={{ top: '30%', left: 0, width: '30%', height: '40%' }}
            onClick={handleLeft} aria-label="Left" />
          <button className="dpad-btn" style={{ top: '30%', right: 0, width: '30%', height: '40%' }}
            onClick={handleRight} aria-label="Right" />
        </div>

        {/* A / B BUTTONS */}
        <div className="flex items-center gap-5" style={{ marginRight: '4px' }}>
          <button className="btn-ab" onClick={handleA}>A</button>
          <button className="btn-ab" onClick={handleB}>B</button>
        </div>
      </div>

      {/* ─── CONSOLE BOTTOM STRIP ─── */}
      <div className="flex justify-center py-2">
        <div style={{ width: 60, height: 4, borderRadius: 2, background: '#1a1a1a' }} />
      </div>
    </div>
  );
}

/* ═══════════════════════ PAGE COMPONENTS ═══════════════════════ */

function SplashPage({ selected }: { selected: number }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <div className="text-center mb-10">
        <div className="splash-big mb-2">MY</div>
        <div className="splash-sub">PORTFOLIO</div>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <span className="cursor-arrow" style={{ visibility: selected === 0 ? 'visible' : 'hidden' }}>
            &#9654;
          </span>
          <span className="splash-option">START</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="cursor-arrow" style={{ visibility: selected === 1 ? 'visible' : 'hidden' }}>
            &#9654;
          </span>
          <span className="splash-option">LIST</span>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      {/* Title */}
      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
        <PixelImg name="about" size={32} />
        <span className="page-title">ABOUT ME</span>
      </div>
      {/* Divider */}
      <div className="flex-shrink-0 mb-3" style={{ height: 2, background: '#EAB308' }} />
      {/* Body */}
      <div className="body-text">
        I'M <span className="text-yellow-500 font-bold">HASSAN FAROOQ</span>, CURRENTLY PURSUING MBBS AT SARGODHA
        MEDICAL COLLEGE. ALONG WITH MY MEDICAL STUDIES, I'M ACTIVELY ENGAGED IN{' '}
        <span className="text-yellow-500 font-bold">RESEARCH</span> WORK,{' '}
        <span className="text-yellow-500 font-bold">WEB DEVELOPMENT</span> PROJECTS, AND{' '}
        <span className="text-yellow-500 font-bold">GRAPHIC DESIGNING</span>, WHERE I BLEND CREATIVITY WITH
        TECHNICAL SKILLS. MY GOAL IS TO INTEGRATE MEDICINE, TECHNOLOGY, AND DESIGN TO DEVELOP INNOVATIVE AND
        VISUALLY IMPACTFUL SOLUTIONS THAT MAKE A DIFFERENCE.
      </div>
    </div>
  );
}

function SkillsPage() {
  const skills = PAGE_DATA.skills.items;
  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      {/* Title */}
      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
        <PixelImg name="skills" size={32} />
        <span className="page-title">SKILLS</span>
      </div>
      {/* Divider */}
      <div className="flex-shrink-0 mb-4" style={{ height: 2, background: '#EAB308' }} />
      {/* List */}
      <div className="flex flex-col gap-4">
        {skills.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <PixelImg name="star" size={18} />
            <span className="list-item-text">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListPage({ page, cursorIndex }: { page: PageId; cursorIndex: number }) {
  const data = PAGE_DATA[page];
  if (!data) return null;

  const iconName = PAGE_ICON_MAP[page];
  const isContact = page === 'contact';

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      {/* Title */}
      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
        {iconName && <PixelImg name={iconName} size={32} />}
        <span className="page-title">{data.title}</span>
      </div>
      {/* Divider */}
      <div className="flex-shrink-0 mb-4" style={{ height: 2, background: '#EAB308' }} />
      {/* Items or empty */}
      {data.items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="list-item-text" style={{ color: '#999' }}>COMING SOON...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Cursor */}
              <span
                className="cursor-arrow"
                style={{ visibility: cursorIndex === i ? 'visible' : 'hidden' }}
              >
                &#9654;
              </span>
              {/* Contact icon */}
              {isContact && CONTACT_ICON_MAP[item.label] && (
                <PixelImg name={CONTACT_ICON_MAP[item.label]} size={24} />
              )}
              {/* Label */}
              <span className="list-item-text" style={{ fontWeight: cursorIndex === i ? 'bold' : 'normal' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuPage({ cursorIndex }: { cursorIndex: number }) {
  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      {/* Title */}
      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
        <PixelImg name="menu" size={32} />
        <span className="page-title">MENU</span>
      </div>
      {/* Divider */}
      <div className="flex-shrink-0 mb-4" style={{ height: 2, background: '#EAB308' }} />
      {/* Items */}
      <div className="flex flex-col gap-4">
        {MENU_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className="cursor-arrow"
              style={{ visibility: cursorIndex === i ? 'visible' : 'hidden' }}
            >
              &#9654;
            </span>
            <PixelImg name={PAGE_ICON_MAP[item.page] || ''} size={22} />
            <span className="list-item-text" style={{ fontWeight: cursorIndex === i ? 'bold' : 'normal' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
