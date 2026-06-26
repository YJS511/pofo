import { ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { PortfolioState } from '../types';

interface SectionOrderEditorProps {
  state: PortfolioState;
  onChange: (sectionOrder: string[]) => void;
  onToggleHidden: (key: string) => void;
}

export function SectionOrderEditor({ state, onChange, onToggleHidden }: SectionOrderEditorProps) {
  const sectionLabels: Record<string, string> = {
    skills: '기술 스택',
    tools: '서비스 · 도구',
    experience: '경력',
    projects: '프로젝트',
    education: '교육',
    certifications: '자격증',
  };

  (state.custom || []).forEach((cs) => {
    sectionLabels[`cs:${cs.id}`] = cs.title || '커스텀 섹션';
  });

  // 현재 순서 (없으면 기본 순서)
  const currentOrder = state.sectionOrder && state.sectionOrder.length > 0
    ? state.sectionOrder
    : ['skills', 'tools', 'experience', 'projects', 'education', 'certifications'];

  // 커스텀 섹션을 현재 순서에 추가 (아직 없는 경우)
  const customKeys = (state.custom || []).map((cs) => `cs:${cs.id}`);
  const allKeys = [...new Set([...currentOrder, ...customKeys])];

  const hidden = state.hidden || [];

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...allKeys];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    // Swap
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];

    onChange(newOrder);
  };

  return (
    <div className="space-y-2">
      {allKeys.map((key, index) => {
        const isHidden = hidden.includes(key);
        return (
          <div
            key={key}
            className={`flex items-center gap-1.5 px-2.5 py-2 border rounded-lg transition-colors ${
              isHidden
                ? 'bg-gray-50/60 dark:bg-gray-900/40 border-gray-200/70 dark:border-gray-800/70'
                : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800'
            }`}
          >
            <span
              className={`flex-1 text-sm font-medium truncate ${
                isHidden
                  ? 'text-gray-400 dark:text-gray-500 line-through'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {sectionLabels[key] || key}
            </span>

            <div className="flex gap-0.5">
              <button
                onClick={() => moveSection(index, 'up')}
                disabled={index === 0}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="위로"
                aria-label="위로 이동"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              <button
                onClick={() => moveSection(index, 'down')}
                disabled={index === allKeys.length - 1}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="아래로"
                aria-label="아래로 이동"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => onToggleHidden(key)}
              className={`p-1 rounded transition-colors ${
                isHidden
                  ? 'text-gray-400 dark:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
              title={isHidden ? '활성화 (미리보기·발표에 표시)' : '비활성화 (미리보기·발표에서 숨김)'}
              aria-label={isHidden ? '섹션 활성화' : '섹션 비활성화'}
            >
              {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        );
      })}
    </div>
  );
}
