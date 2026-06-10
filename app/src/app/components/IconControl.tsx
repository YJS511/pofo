import { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { EMOJI_CATS } from '../constants';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

type IconMode = 'emoji' | 'photo' | 'none';

export function IconControl() {
  const { state, updateProfile } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState(0);

  // 현재 모드 결정
  const getCurrentMode = (): IconMode => {
    if (!state.profile.emoji && !state.profile.iconImg) return 'none';
    if (state.profile.iconImg) return 'photo';
    return 'emoji';
  };

  const [mode, setMode] = useState<IconMode>(getCurrentMode);

  const handleModeChange = (newMode: IconMode) => {
    setMode(newMode);
    if (newMode === 'none') {
      updateProfile({ emoji: '', iconImg: '' });
    } else if (newMode === 'emoji' && !state.profile.emoji) {
      updateProfile({ emoji: EMOJI_CATS[0].list[0], iconImg: '' });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      updateProfile({ iconImg: dataUrl, emoji: '' });
    };
    reader.readAsDataURL(file);
  };

  const handleEmojiSelect = (emoji: string) => {
    updateProfile({ emoji, iconImg: '' });
  };

  const handleRemovePhoto = () => {
    updateProfile({ iconImg: '' });
    setMode('emoji');
  };

  return (
    <div className="flex gap-4">
      {/* 좌측: 프리뷰 */}
      <div className="flex flex-col gap-2 w-[72px] flex-shrink-0">
        <div
          className={`w-[72px] h-[72px] rounded-[14px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden ${
            mode === 'photo' && state.profile.iconImg ? 'bg-transparent' : ''
          }`}
        >
          {mode === 'photo' && state.profile.iconImg ? (
            <img
              src={state.profile.iconImg}
              alt="Icon"
              className={`w-full h-full object-cover ${
                state.profile.iconShape === 'circle' ? 'rounded-full' : ''
              }`}
            />
          ) : mode === 'emoji' && state.profile.emoji ? (
            <span className="text-[40px]">{state.profile.emoji}</span>
          ) : (
            <span className="text-[30px] text-gray-400 dark:text-gray-600">
              <ImageIcon className="w-8 h-8" />
            </span>
          )}
        </div>
      </div>

      {/* 우측: 컨트롤 */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        {/* 모드 탭 */}
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
          <button
            onClick={() => handleModeChange('emoji')}
            className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded transition-all ${
              mode === 'emoji'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            이모지
          </button>
          <button
            onClick={() => handleModeChange('photo')}
            className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded transition-all ${
              mode === 'photo'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            사진
          </button>
          <button
            onClick={() => handleModeChange('none')}
            className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded transition-all ${
              mode === 'none'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            없음
          </button>
        </div>

        {/* 모드별 콘텐츠 */}
        {mode === 'emoji' && (
          <div className="flex-1 flex flex-col gap-2 min-h-[80px] max-h-[160px]">
            {/* 카테고리 탭 */}
            <div className="flex gap-1 flex-shrink-0">
              {EMOJI_CATS.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex-1 text-center text-[11.5px] px-1 py-1.5 rounded-md transition-all whitespace-nowrap ${
                    activeCategory === idx
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* 이모지 그리드 */}
            <div className="grid grid-cols-8 gap-1 overflow-y-auto p-1 flex-1">
              {EMOJI_CATS[activeCategory].list.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEmojiSelect(emoji)}
                  className={`aspect-square rounded-lg text-[19px] flex items-center justify-center transition-all hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    state.profile.emoji === emoji && !state.profile.iconImg
                      ? 'bg-gray-200/70 dark:bg-gray-700/70 ring-2 ring-gray-800 dark:ring-gray-300'
                      : ''
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'photo' && (
          <div className="flex gap-2 items-stretch h-9">
            {/* 업로드 버튼 */}
            <label className="flex-shrink-0 h-full px-4 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 whitespace-nowrap">
              <span className="text-xs font-bold">↑</span>
              {state.profile.iconImg ? '변경' : '업로드'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* 형태 선택 */}
            <div className="flex-1 flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg min-w-0 h-full">
              <button
                onClick={() => updateProfile({ iconShape: 'rounded' })}
                className={`flex-1 rounded text-xs font-semibold whitespace-nowrap px-2 flex items-center justify-center transition-all ${
                  state.profile.iconShape === 'rounded'
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                사각형
              </button>
              <button
                onClick={() => updateProfile({ iconShape: 'circle' })}
                className={`flex-1 rounded text-xs font-semibold whitespace-nowrap px-2 flex items-center justify-center transition-all ${
                  state.profile.iconShape === 'circle'
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                원형
              </button>
            </div>

            {/* 제거 버튼 */}
            {state.profile.iconImg && (
              <button
                onClick={handleRemovePhoto}
                className="flex-shrink-0 h-full w-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 bg-gray-100 dark:bg-gray-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {mode === 'none' && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-[12.5px] text-gray-500 dark:text-gray-400 leading-relaxed">
              아이콘을 표시하지 않습니다.<br />
              이모지 또는 사진 탭에서 선택하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
