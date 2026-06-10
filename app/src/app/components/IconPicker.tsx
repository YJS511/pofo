import { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { EMOJI_CATS } from '../constants';
import { Upload, X } from 'lucide-react';

export function IconPicker() {
  const { state, updateProfile } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState(0);

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

  const removeIcon = () => {
    updateProfile({ iconImg: '', emoji: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Preview */}
        <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
          {state.profile.iconImg ? (
            <img
              src={state.profile.iconImg}
              alt="Icon"
              className={`w-full h-full object-cover ${
                state.profile.iconShape === 'circle' ? 'rounded-full' : ''
              }`}
            />
          ) : state.profile.emoji ? (
            <span className="text-4xl">{state.profile.emoji}</span>
          ) : (
            <span className="text-2xl text-gray-400">📷</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex-1 space-y-2">
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              이미지 업로드
            </span>
          </label>

          {(state.profile.iconImg || state.profile.emoji) && (
            <button
              onClick={removeIcon}
              className="block px-4 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              제거
            </button>
          )}

          {/* Shape */}
          <div className="flex gap-2">
            <button
              onClick={() => updateProfile({ iconShape: 'rounded' })}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                state.profile.iconShape === 'rounded'
                  ? 'border-gray-800 dark:border-white bg-gray-100 dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
            >
              사각형
            </button>
            <button
              onClick={() => updateProfile({ iconShape: 'circle' })}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                state.profile.iconShape === 'circle'
                  ? 'border-gray-800 dark:border-white bg-gray-100 dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
            >
              원형
            </button>
          </div>
        </div>
      </div>

      {/* Emoji Picker */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
        <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
          또는 이모지 선택
        </h4>

        {/* Categories */}
        <div className="flex gap-1 mb-3">
          {EMOJI_CATS.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === idx
                  ? 'bg-gray-800 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Emoji Grid */}
        <div className="grid grid-cols-8 gap-1">
          {EMOJI_CATS[activeCategory].list.map((emoji, idx) => (
            <button
              key={idx}
              onClick={() => updateProfile({ emoji, iconImg: '' })}
              className={`aspect-square rounded-lg text-2xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                state.profile.emoji === emoji && !state.profile.iconImg
                  ? 'bg-gray-100 dark:bg-gray-800 ring-2 ring-gray-800 dark:ring-white'
                  : ''
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
