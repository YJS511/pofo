import { Monitor, Smartphone, RotateCcw, Undo2, Redo2 } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolioState';

export function PreviewControlBar() {
  const { viewMode, setViewMode, resetContentOnly, undo, redo, canUndo, canRedo } = usePortfolio();

  return (
    <div className="absolute bottom-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-1 p-1 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg pointer-events-auto">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="실행 취소 (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="다시 실행 (Ctrl+Shift+Z)"
        >
          <Redo2 className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
        <button
          onClick={() => {
            if (confirm('현재 내용을 모두 지우고 빈 상태로 초기화할까요?\n디자인(테마·커버·폰트 등)은 유지됩니다.')) {
              resetContentOnly();
            }
          }}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all"
          title="내용 초기화 (디자인 유지)"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg pointer-events-auto">
        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
            viewMode === 'mobile'
              ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-900 shadow-sm hover:bg-gray-750 dark:hover:bg-gray-100'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
          }`}
          title="모바일 뷰"
        >
          <Smartphone className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('desktop')}
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
            viewMode === 'desktop'
              ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-900 shadow-sm hover:bg-gray-750 dark:hover:bg-gray-100'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
          }`}
          title="데스크톱 뷰"
        >
          <Monitor className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
