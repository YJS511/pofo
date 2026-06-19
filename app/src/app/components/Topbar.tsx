import { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { ExportMenu } from './ExportMenu';
import { Sparkles, Share2, Presentation, BookOpen, FilePlus2, MoreHorizontal } from 'lucide-react';
import { openSlides } from '../utils/slides';

export function Topbar() {
  const { state, setShowGuide, setShowManual, resetState, setSelectedPresetId, setShowOnboarding } = usePortfolio();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMore) return;
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setShowMore(false);
    };
    const raf = requestAnimationFrame(() => document.addEventListener('mousedown', handler));
    return () => { cancelAnimationFrame(raf); document.removeEventListener('mousedown', handler); };
  }, [showMore]);

  return (
    <>
      <div className="h-13 flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-2 font-bold text-base">
          <div className="w-7 h-7 rounded-lg grid place-items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4h7a6 6 0 0 1 0 12H9V22H6V4Z" />
            </svg>
          </div>
          <span className="text-gray-900 dark:text-white">POFO</span>
        </div>

        <div className="flex-1" />

        {/* 더보기 메뉴 */}
        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setShowMore(!showMore)}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="더보기"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showMore && (
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg py-1 z-50">
              <button
                onClick={() => {
                  setShowMore(false);
                  if (confirm('새로운 포트폴리오를 만들까요?\n현재 작성 중인 내용은 모두 사라집니다.')) {
                    resetState();
                    setSelectedPresetId('');
                    try { localStorage.removeItem('pofo.presetId'); } catch {}
                    setShowOnboarding(true);
                  }
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <FilePlus2 className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                새로 만들기
              </button>
              <button
                onClick={() => { setShowMore(false); setShowGuide(true); }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                자동 입력
              </button>
              <div className="mx-3 my-1 border-t border-gray-100 dark:border-gray-800" />
              <button
                onClick={() => { setShowMore(false); setShowManual(true); }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                사용 설명서
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => openSlides(state)}
          className="h-8 px-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          title="발표 모드"
        >
          <Presentation className="w-4 h-4" />
          발표
        </button>

        <button
          onClick={() => setShowExportMenu(!showExportMenu)}
          aria-label="공유 메뉴 열기"
          className="h-8 px-3 rounded-lg text-sm font-medium bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-750 dark:hover:bg-gray-100 transition-colors flex items-center gap-1.5"
        >
          <Share2 className="w-4 h-4" />
          공유
        </button>
      </div>

      <ExportMenu
        isOpen={showExportMenu}
        onClose={() => setShowExportMenu(false)}
      />
    </>
  );
}
