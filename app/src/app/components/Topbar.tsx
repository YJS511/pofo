import { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { ExportMenu } from './ExportMenu';
import { Sparkles, Share2, Presentation } from 'lucide-react';
import { openSlides } from '../utils/slides';

export function Topbar() {
  const { state, setShowGuide } = usePortfolio();
  const [showExportMenu, setShowExportMenu] = useState(false);

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

        <button
          onClick={() => setShowGuide(true)}
          className="h-8 px-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          title="자동 입력"
        >
          <Sparkles className="w-4 h-4" />
          자동 입력
        </button>

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
