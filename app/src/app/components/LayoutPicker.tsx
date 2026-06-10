import { PortfolioState } from '../types';

interface LayoutPickerProps {
  currentLayout: PortfolioState['theme']['layout'];
  onChange: (layout: PortfolioState['theme']['layout']) => void;
}

const layouts = [
  {
    id: 'notion' as const,
    name: '노션 기본',
    desc: '기본 레이아웃',
    thumbnailClass: 'lt-notion'
  },
  {
    id: 'sidebar' as const,
    name: '사이드바',
    desc: '좌측 프로필',
    thumbnailClass: 'lt-sidebar'
  },
  {
    id: 'minimal' as const,
    name: '미니멀',
    desc: '깔끔한 스타일',
    thumbnailClass: 'lt-minimal'
  },
  {
    id: 'tab' as const,
    name: '탭',
    desc: '섹션별 탭 네비게이션',
    thumbnailClass: 'lt-tab'
  }
];

export function LayoutPicker({ currentLayout, onChange }: LayoutPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {layouts.map((layout) => (
        <button
          key={layout.id}
          onClick={() => onChange(layout.id)}
          className={`flex flex-col items-center gap-2 p-3 border-[1.5px] rounded-[10px] transition-all ${
            currentLayout === layout.id
              ? 'border-gray-800 dark:border-white bg-gray-50 dark:bg-gray-900'
              : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-gray-950'
          }`}
        >
          {/* 썸네일 */}
          <div className={`lay-thumb ${layout.thumbnailClass} w-full h-[42px] rounded-md bg-gray-100 dark:bg-gray-800 relative overflow-hidden`} />

          {/* 이름 */}
          <span
            className={`text-xs font-semibold ${
              currentLayout === layout.id
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {layout.name}
          </span>

          {/* 설명 */}
          <span className="text-[10.5px] text-gray-500 dark:text-gray-500 leading-tight">
            {layout.desc}
          </span>
        </button>
      ))}
    </div>
  );
}
