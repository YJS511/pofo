import { usePortfolio } from '../hooks/usePortfolioState';
import { Layout, Palette } from 'lucide-react';
import { TEMPLATE_PRESETS, STYLE_PRESETS } from '../constants';

export function TemplatePanel() {
  const { state, updateTheme } = usePortfolio();

  const PresetButton = ({ pr, onClick, isActive }: { pr: any; onClick: () => void; isActive?: boolean }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all ${
        isActive
          ? 'border-gray-800 dark:border-white bg-gray-50 dark:bg-gray-900 shadow-sm'
          : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-gray-900/40'
      }`}
    >
      <span className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg flex-shrink-0">
        {pr.emoji}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold text-gray-900 dark:text-white truncate">
          {pr.name}
        </span>
        <span className="block text-[11px] text-gray-500 dark:text-gray-400 leading-normal mt-0.5">
          {pr.desc}
        </span>
      </span>
    </button>
  );

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 hide-scrollbar bg-white dark:bg-gray-950">
      {/* 템플릿 (레이아웃 구조) */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Layout className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
          <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">템플릿</h4>
          <span className="text-[10.5px] text-gray-400 dark:text-gray-500 ml-auto">레이아웃 구조</span>
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {TEMPLATE_PRESETS.map((pr) => {
            const isActive = state.theme.layout === pr.theme.layout && !!state.theme.noCover === !!pr.theme.noCover;
            return <PresetButton key={pr.id} pr={pr} onClick={() => updateTheme(pr.theme)} isActive={isActive} />;
          })}
        </div>
      </section>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* 스타일 (시각 테마) */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
          <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">스타일</h4>
          <span className="text-[10.5px] text-gray-400 dark:text-gray-500 ml-auto">시각 디자인 테마</span>
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {STYLE_PRESETS.map((pr) => {
            const isActive = state.theme.style === pr.theme.style && state.theme.font === pr.theme.font;
            return <PresetButton key={pr.id} pr={pr} onClick={() => updateTheme(pr.theme)} isActive={isActive} />;
          })}
        </div>
      </section>
    </div>
  );
}
