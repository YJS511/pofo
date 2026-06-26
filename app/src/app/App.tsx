import { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './hooks/usePortfolioState';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Topbar } from './components/Topbar';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { GuideOverlay } from './components/GuideOverlay';
import { DepartmentPicker } from './components/DepartmentPicker';
import { ManualOverlay } from './components/ManualOverlay';
import { DialogProvider } from './components/Dialog';
import { PenLine, Eye, AlertTriangle, X } from 'lucide-react';

function AppContent() {
  const { showGuide, setShowGuide, showOnboarding, saveError, shareError, dismissShareError, showManual, setShowManual } = usePortfolio();
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  return (
    <>
      <div className="h-screen flex flex-col bg-white dark:bg-gray-950">
        <Topbar />
        {/* Desktop */}
        <div className="flex-1 hidden md:flex overflow-hidden">
          <Editor />
          <Preview />
        </div>
        {/* Mobile */}
        <div className="flex-1 flex flex-col md:hidden overflow-hidden">
          <div className={`flex-1 overflow-hidden ${mobileView === 'editor' ? '' : 'hidden'}`}>
            <Editor mobile />
          </div>
          <div className={`flex-1 overflow-hidden ${mobileView === 'preview' ? '' : 'hidden'}`}>
            <Preview />
          </div>
          <div className="flex border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex-shrink-0">
            <button
              onClick={() => setMobileView('editor')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold transition-colors ${
                mobileView === 'editor'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <PenLine className="w-4 h-4" />
              편집
            </button>
            <button
              onClick={() => setMobileView('preview')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold transition-colors ${
                mobileView === 'preview'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <Eye className="w-4 h-4" />
              미리보기
            </button>
          </div>
        </div>
      </div>
      {saveError && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium shadow-lg">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          저장 공간이 부족합니다. 브라우저 데이터를 정리해 주세요.
        </div>
      )}
      {shareError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-medium shadow-lg">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          공유 링크가 손상되었습니다. URL을 다시 확인해 주세요.
          <button onClick={dismissShareError} className="ml-1 p-0.5 rounded hover:bg-white/20">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      {showOnboarding && <DepartmentPicker />}
      {showGuide && !showOnboarding && <GuideOverlay onClose={() => setShowGuide(false)} />}
      {showManual && <ManualOverlay onClose={() => setShowManual(false)} />}
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <DialogProvider>
          <AppContent />
        </DialogProvider>
      </PortfolioProvider>
    </ErrorBoundary>
  );
}
