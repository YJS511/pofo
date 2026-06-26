import { usePortfolio } from '../hooks/usePortfolioState';
import { Palette, Layout, Type, Image as ImageIcon, List, Plus } from 'lucide-react';
import { SectionOrderEditor } from './SectionOrderEditor';
import { CoverEditor } from './CoverEditor';
import { LayoutPicker } from './LayoutPicker';
import { StylePicker } from './StylePicker';

import { ACCENT_SWATCHES } from '../constants';

const ACCENT_COLORS = ACCENT_SWATCHES.slice(0, 7).map((hex, idx) => {
  const names = ['다크그레이', '빨강', '주황', '황갈색', '틸', '파랑', '보라'];
  return { name: names[idx], value: hex };
});

export function StylePanel() {
  const { state, updateTheme, updateState } = usePortfolio();

  const fonts = [
    { id: 'sans', name: 'Sans' },
    { id: 'serif', name: 'Serif' },
    { id: 'mono', name: 'Mono' }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 hide-scrollbar">

      {/* Cover */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">커버</h3>
        </div>
        <CoverEditor state={state} updateTheme={updateTheme} />
      </div>

      {/* Accent Color */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">강조 색상</h3>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => updateTheme({ accent: color.value })}
              className={`h-12 rounded-lg transition-transform ${
                state.theme.accent === color.value
                  ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white ring-offset-white dark:ring-offset-gray-950'
                  : 'hover:scale-95'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}

          {/* 커스텀 강조 색상 항목 */}
          {(() => {
            const isPreset = ACCENT_COLORS.some((c) => c.value === state.theme.accent);
            const customActive = !!state.theme.accent && !isPreset;
            return (
              <label
                title="커스텀 색상"
                className={`relative h-12 rounded-lg cursor-pointer overflow-hidden flex items-center justify-center transition-transform ${
                  customActive
                    ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white ring-offset-white dark:ring-offset-gray-950'
                    : 'hover:scale-95'
                }`}
                style={
                  customActive
                    ? { backgroundColor: state.theme.accent }
                    : {
                        background:
                          'conic-gradient(from 0deg, #f87171, #fbbf24, #4ade80, #22d3ee, #60a5fa, #c084fc, #f87171)'
                      }
                }
              >
                {!customActive && (
                  <Plus className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                )}
                <input
                  type="color"
                  value={state.theme.accent || '#3B82F6'}
                  onChange={(e) => updateTheme({ accent: e.target.value })}
                  className="sr-only"
                />
              </label>
            );
          })()}
        </div>
      </div>

      {/* Layout */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Layout className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">레이아웃</h3>
        </div>
        <LayoutPicker
          currentLayout={state.theme.layout}
          onChange={(layout) => updateTheme({ layout })}
        />

        <div className="mt-3">
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            너비
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => updateTheme({ wide: false })}
              className={`flex-1 h-10 rounded-lg text-sm font-semibold border-[1.5px] transition-all ${
                !state.theme.wide
                  ? 'border-gray-800 dark:border-white bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white'
                  : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-400 dark:hover:border-gray-600 bg-white dark:bg-gray-950'
              }`}
            >
              기본 너비
            </button>
            <button
              onClick={() => updateTheme({ wide: true })}
              className={`flex-1 h-10 rounded-lg text-sm font-semibold border-[1.5px] transition-all ${
                state.theme.wide
                  ? 'border-gray-800 dark:border-white bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white'
                  : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-400 dark:hover:border-gray-600 bg-white dark:bg-gray-950'
              }`}
            >
              전체 너비
            </button>
          </div>
        </div>
      </div>

      {/* Style */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">디자인 스타일</h3>
        </div>
        <StylePicker
          currentStyle={state.theme.style}
          onChange={(style) => updateTheme({ style })}
        />
      </div>

      {/* Font */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">폰트</h3>
        </div>
        <div className="flex gap-2">
          {fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => updateTheme({ font: font.id as any })}
              className={`flex-1 h-10 rounded-lg text-sm font-semibold border-[1.5px] transition-all ${
                state.theme.font === font.id
                  ? 'border-gray-800 dark:border-white bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white'
                  : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-400 dark:hover:border-gray-600 bg-white dark:bg-gray-950'
              }`}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section Order + 활성/비활성 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <List className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">섹션 순서 · 표시</h3>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
          눈 아이콘으로 섹션을 켜고 끌 수 있어요. 끈 섹션은 미리보기와 발표 슬라이드 모두에서 빠집니다.
        </p>
        <SectionOrderEditor
          state={state}
          onChange={(sectionOrder) => updateState({ sectionOrder })}
          onToggleHidden={(key) => {
            const set = new Set(state.hidden || []);
            if (set.has(key)) set.delete(key);
            else set.add(key);
            updateState({ hidden: Array.from(set) });
          }}
        />
      </div>
    </div>
  );
}
