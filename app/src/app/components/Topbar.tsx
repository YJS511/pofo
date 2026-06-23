import { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { ExportMenu } from './ExportMenu';
import { Sparkles, Share2, Presentation, BookOpen, GraduationCap } from 'lucide-react';
import { openSlides } from '../utils/slides';

export function Topbar() {
  const { state, setShowGuide, setShowManual, resetState, setSelectedPresetId, setShowOnboarding } = usePortfolio();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const topbarButtonClass = 'h-10 min-w-10 px-2 sm:px-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-[color,background-color,transform] duration-150 active:scale-[0.96] flex items-center justify-center gap-1.5 flex-shrink-0';

  const startFromDepartment = () => {
    setShowExportMenu(false);
    if (!confirm('학과 선택부터 새 포트폴리오를 만들까요?\n현재 작성 중인 내용은 모두 사라집니다.')) return;

    resetState();
    setSelectedPresetId('');
    try {
      localStorage.removeItem('pofo.state');
      localStorage.removeItem('pofo.presetId');
    } catch {
      /* noop */
    }
    setShowOnboarding(true);
  };

  return (
    <>
      <div className="h-13 flex items-center gap-2 sm:gap-3 px-2 sm:px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-2 font-bold text-base flex-shrink-0">
          <div className="w-7 h-7 rounded-lg grid place-items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4h7a6 6 0 0 1 0 12H9V22H6V4Z" />
            </svg>
          </div>
          <span className="text-gray-900 dark:text-white">POFO</span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => { setShowExportMenu(false); setShowManual(true); }}
            className={topbarButtonClass}
            title="설명서"
            aria-label="설명서"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline whitespace-nowrap">설명서</span>
          </button>

          <button
            type="button"
            onClick={startFromDepartment}
            className={topbarButtonClass}
            title="학과 선택부터 새로 만들기"
            aria-label="학과 선택부터 새로 만들기"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline whitespace-nowrap">새로 만들기</span>
          </button>

          <button
            type="button"
            onClick={() => { setShowExportMenu(false); setShowGuide(true); }}
            className={topbarButtonClass}
            title="자동 입력"
            aria-label="자동 입력"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline whitespace-nowrap">자동 입력</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => openSlides(state)}
          className={topbarButtonClass}
          title="발표 모드"
          aria-label="발표 모드"
        >
          <Presentation className="w-4 h-4" />
          <span className="hidden sm:inline whitespace-nowrap">발표</span>
        </button>

        <button
          type="button"
          onClick={() => setShowExportMenu(!showExportMenu)}
          aria-label="공유 메뉴 열기"
          className="h-10 min-w-10 px-2 sm:px-3 rounded-lg text-sm font-medium bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-750 dark:hover:bg-gray-100 transition-[color,background-color,transform] duration-150 active:scale-[0.96] flex items-center justify-center gap-1.5 flex-shrink-0"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline whitespace-nowrap">공유</span>
        </button>
      </div>

      <ExportMenu
        isOpen={showExportMenu}
        onClose={() => setShowExportMenu(false)}
      />
    </>
  );
}
