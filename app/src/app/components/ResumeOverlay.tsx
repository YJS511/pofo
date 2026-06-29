import { useMemo, useRef } from 'react';
import { X, Printer, FileText } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { buildResumeHTML } from '../utils/export-resume';

interface ResumeOverlayProps {
  onClose: () => void;
}

export function ResumeOverlay({ onClose }: ResumeOverlayProps) {
  const { state } = usePortfolio();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 미리보기용 — 자동 인쇄 비활성
  const html = useMemo(() => buildResumeHTML(state, { autoPrint: false }), [state]);

  const handlePrint = () => {
    const win = iframeRef.current?.contentWindow;
    if (win) {
      win.focus();
      win.print();
    }
  };

  return (
    <div className="fixed inset-0 z-[160] bg-gray-100 dark:bg-gray-950 flex flex-col">
      {/* Top bar */}
      <div className="h-13 flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex-shrink-0">
        <div className="flex items-center gap-2 font-bold text-[15px] text-gray-900 dark:text-white">
          <FileText className="w-4 h-4" />
          이력서 미리보기
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">
          유한대학교 이력서 양식 · A4
        </span>
        <div className="flex-1" />
        <button
          type="button"
          onClick={handlePrint}
          className="h-9 px-4 rounded-lg text-sm font-semibold bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-750 dark:hover:bg-gray-100 transition-colors flex items-center gap-1.5"
        >
          <Printer className="w-4 h-4" />
          인쇄 · PDF 저장
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* A4 document preview */}
      <div className="flex-1 overflow-auto">
        <iframe
          ref={iframeRef}
          title="이력서 미리보기"
          srcDoc={html}
          className="w-full h-full border-0 bg-white"
        />
      </div>
    </div>
  );
}
