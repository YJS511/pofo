import { useState } from 'react';
import { CustomSection, CustomItem } from '../types';
import { Trash2, ChevronDown, Plus } from 'lucide-react';

interface CustomSectionEditorProps {
  sections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
}

const EMOJI_OPTIONS = ['🏆', '🎖️', '📜', '📌', '⭐', '💡', '🔖', '🧩', '🎯', '🌍', '🗣️', '🤝', '📊', '🔬', '🎨', '🏅', '🥇', '✅', '📋', '🌟', '💼', '🎓', '🚀', '💻', '🔥', '✨', '📣', '🎤'];

const QUICK_PRESETS = [
  { emoji: '🏅', title: '자격증' },
  { emoji: '🏆', title: '수상 경력' },
  { emoji: '🌟', title: '대외활동' },
  { emoji: '🎓', title: '교육 · 부트캠프' },
];

export function CustomSectionEditor({ sections, onChange }: CustomSectionEditorProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const addSection = (preset?: { emoji: string; title: string }) => {
    const newSection: CustomSection = {
      id: `cs_${Date.now()}`,
      emoji: preset?.emoji || '📌',
      title: preset?.title || '',
      items: [{ title: '', sub: '', period: '', desc: '' }],
    };
    const newSections = [...sections, newSection];
    onChange(newSections);

    // 새로 추가된 섹션 자동 펼치기
    setExpandedSections(new Set([...expandedSections, newSection.id]));
  };

  const removeSection = (id: string) => {
    const section = sections.find((s) => s.id === id);
    if (section && !confirm(`"${section.title || '섹션'}"을(를) 삭제할까요?`)) {
      return;
    }
    onChange(sections.filter((s) => s.id !== id));
  };

  const updateSection = (id: string, updates: Partial<CustomSection>) => {
    onChange(
      sections.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const updateItem = (sectionId: string, itemIndex: number, updates: Partial<CustomItem>) => {
    onChange(
      sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          items: s.items.map((item, idx) =>
            idx === itemIndex ? { ...item, ...updates } : item
          ),
        };
      })
    );
  };

  const addItem = (sectionId: string) => {
    onChange(
      sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          items: [...s.items, { title: '', sub: '', period: '', desc: '' }],
        };
      })
    );
  };

  const removeItem = (sectionId: string, itemIndex: number) => {
    onChange(
      sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          items: s.items.filter((_, idx) => idx !== itemIndex),
        };
      })
    );
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.id);
        return (
          <div
            key={section.id}
            className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEmojiPicker(showEmojiPicker === section.id ? null : section.id);
                  }}
                  className="w-10 h-10 rounded-lg bg-white dark:bg-gray-950 flex items-center justify-center text-2xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                  title="이모지 변경"
                >
                  {section.emoji || '📌'}
                </button>

                {/* Emoji Picker Dropdown */}
                {showEmojiPicker === section.id && (
                  <div
                    className="absolute top-12 left-0 z-50 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-2 w-64"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-8 gap-1">
                      {EMOJI_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => {
                            updateSection(section.id, { emoji });
                            setShowEmojiPicker(null);
                          }}
                          className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <input
                type="text"
                value={section.title}
                onChange={(e) => {
                  e.stopPropagation();
                  updateSection(section.id, { title: e.target.value });
                }}
                onClick={(e) => e.stopPropagation()}
                placeholder="섹션 이름 (예: 수상, 자격증)"
                className="flex-1 bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:border-gray-800 dark:focus:border-white px-2 py-1 text-sm font-semibold outline-none transition-colors"
              />

              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Section Content */}
            {isExpanded && (
              <div className="p-4 space-y-4">
                {/* Items */}
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        항목 {itemIndex + 1}
                      </span>
                      {section.items.length > 1 && (
                        <button
                          onClick={() => removeItem(section.id, itemIndex)}
                          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 p-1 rounded transition-colors"
                          title="항목 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(section.id, itemIndex, { title: e.target.value })}
                        placeholder="항목 제목"
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={item.sub}
                          onChange={(e) => updateItem(section.id, itemIndex, { sub: e.target.value })}
                          placeholder="부제목 (선택)"
                          className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
                        />
                        <input
                          type="text"
                          value={item.period}
                          onChange={(e) => updateItem(section.id, itemIndex, { period: e.target.value })}
                          placeholder="날짜/기간 (선택)"
                          className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
                        />
                      </div>

                      <textarea
                        value={item.desc}
                        onChange={(e) => updateItem(section.id, itemIndex, { desc: e.target.value })}
                        placeholder="설명 (선택)"
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 resize-none"
                      />
                    </div>
                  </div>
                ))}

                {/* Add Item Button */}
                <button
                  onClick={() => addItem(section.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  항목 추가
                </button>

                {/* Delete Section Button */}
                <button
                  onClick={() => removeSection(section.id)}
                  className="w-full mt-4 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                >
                  이 섹션 삭제
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* Add Section Buttons */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          섹션 추가
        </label>

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-2">
          {QUICK_PRESETS.map((preset) => (
            <button
              key={preset.title}
              onClick={() => addSection(preset)}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              {preset.emoji} {preset.title}
            </button>
          ))}
        </div>

        {/* Custom Add Button */}
        <button
          onClick={() => addSection()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
          직접 추가
        </button>
      </div>
    </div>
  );
}
