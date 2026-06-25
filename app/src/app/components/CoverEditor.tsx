import { useState } from 'react';
import { GRADIENTS, makeGradient } from '../constants';
import { PortfolioState } from '../types';
import { X, Upload, Plus } from 'lucide-react';

interface CoverEditorProps {
  state: PortfolioState;
  updateTheme: (updates: Partial<PortfolioState['theme']>) => void;
}

const SOLID_COLORS = [
  { name: '빨강', value: '#EF4444' },
  { name: '주황', value: '#F97316' },
  { name: '노랑', value: '#EAB308' },
  { name: '초록', value: '#10B981' },
  { name: '청록', value: '#14B8A6' },
  { name: '파랑', value: '#3B82F6' },
  { name: '보라', value: '#8B5CF6' }
];

export function CoverEditor({ state, updateTheme }: CoverEditorProps) {
  const [activeTab, setActiveTab] = useState<'gradient' | 'solid' | 'image' | 'none'>(() => {
    if (state.theme.noCover) return 'none';
    if (state.theme.coverImg) return 'image';
    if (state.theme.solidColor) return 'solid';
    return 'gradient';
  });

  const tabs = [
    { id: 'gradient' as const, label: '그라데이션' },
    { id: 'solid' as const, label: '단색' },
    { id: 'image' as const, label: '이미지' },
    { id: 'none' as const, label: '없음' }
  ];

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    if (tabId === 'none') {
      updateTheme({ noCover: true, cover: '', solidColor: '', coverImg: '', gradientCustom: '' });
    } else if (tabId === 'gradient') {
      updateTheme({ noCover: false, cover: 'sunset', solidColor: '', coverImg: '', gradientCustom: '' });
    } else if (tabId === 'solid') {
      updateTheme({ noCover: false, cover: '', solidColor: SOLID_COLORS[0].value, coverImg: '', gradientCustom: '' });
    } else if (tabId === 'image') {
      updateTheme({ noCover: false, cover: '', solidColor: '', coverImg: '', gradientCustom: '' });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { compressImage } = await import('../utils/image');
      const dataUrl = await compressImage(file, 1280);
      updateTheme({ coverImg: dataUrl, cover: '', solidColor: '' });
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => updateTheme({ coverImg: event.target?.result as string, cover: '', solidColor: '' });
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    updateTheme({ coverImg: '' });
  };

  return (
    <div className="space-y-3">
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[120px]">
        {activeTab === 'gradient' && (
          <div className="grid grid-cols-4 gap-2.5 animate-fadeIn">
            {Object.entries(GRADIENTS).map(([key, gradient]) => {
              const selected =
                state.theme.cover === key &&
                !state.theme.solidColor &&
                !state.theme.coverImg &&
                !state.theme.gradientCustom;
              return (
                <button
                  key={key}
                  onClick={() =>
                    updateTheme({ cover: key, solidColor: '', coverImg: '', gradientCustom: '' })
                  }
                  className={`h-12 rounded-lg overflow-hidden transition-transform ${
                    selected
                      ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white ring-offset-white dark:ring-offset-gray-950'
                      : 'hover:scale-95'
                  }`}
                  style={{
                    backgroundImage: gradient,
                    backgroundSize: '180% 180%',
                    backgroundPosition: 'center'
                  }}
                  title={key}
                />
              );
            })}

            {/* 커스텀 그라데이션 항목 */}
            {(() => {
              const customActive = !!state.theme.gradientCustom;
              return (
                <label
                  title="커스텀 그라데이션"
                  className={`relative h-12 rounded-lg cursor-pointer overflow-hidden flex items-center justify-center transition-transform ${
                    customActive
                      ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white ring-offset-white dark:ring-offset-gray-950'
                      : 'hover:scale-95'
                  }`}
                  style={
                    customActive
                      ? {
                          backgroundImage: makeGradient(state.theme.gradientCustom),
                          backgroundSize: '180% 180%',
                          backgroundPosition: 'center'
                        }
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
                    value={state.theme.gradientCustom || '#3B82F6'}
                    onChange={(e) =>
                      updateTheme({
                        gradientCustom: e.target.value,
                        cover: '',
                        solidColor: '',
                        coverImg: ''
                      })
                    }
                    className="sr-only"
                  />
                </label>
              );
            })()}
          </div>
        )}

        {activeTab === 'solid' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-4 gap-2.5">
              {SOLID_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateTheme({ solidColor: color.value, cover: '', coverImg: '' })}
                  className={`h-12 rounded-lg transition-transform ${
                    state.theme.solidColor === color.value
                      ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white ring-offset-white dark:ring-offset-gray-950'
                      : 'hover:scale-95'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}

              {/* 커스텀 색상 항목 */}
              {(() => {
                const isPreset = SOLID_COLORS.some((c) => c.value === state.theme.solidColor);
                const customActive = !!state.theme.solidColor && !isPreset;
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
                        ? { backgroundColor: state.theme.solidColor }
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
                      value={state.theme.solidColor || '#3B82F6'}
                      onChange={(e) =>
                        updateTheme({ solidColor: e.target.value, cover: '', coverImg: '' })
                      }
                      className="sr-only"
                    />
                  </label>
                );
              })()}
            </div>
          </div>
        )}

        {activeTab === 'image' && (
          <div className="space-y-3 animate-fadeIn">
            {state.theme.coverImg ? (
              <div className="relative">
                <img
                  src={state.theme.coverImg}
                  alt="Cover"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-800"
                />
                <button
                  onClick={handleImageRemove}
                  className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="이미지 제거"
                >
                  <X className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  이미지 업로드
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  권장 크기: 1280×520px
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        )}

        {activeTab === 'none' && (
          <div className="flex items-center justify-center h-32 border border-gray-200 dark:border-gray-800 rounded-lg animate-fadeIn">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              커버 이미지가 표시되지 않습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
