import { PortfolioState } from '../types';

interface StylePickerProps {
  currentStyle: PortfolioState['theme']['style'];
  onChange: (style: PortfolioState['theme']['style']) => void;
}

const styles = [
  {
    id: 'classic' as const,
    name: '클래식',
    desc: '이모지·컬러 태그',
    previewClass: 'sty-prev-classic'
  },
  {
    id: 'line' as const,
    name: '라인',
    desc: '대문자·아웃라인',
    previewClass: 'sty-prev-line'
  },
  {
    id: 'bold' as const,
    name: '볼드',
    desc: '강조색 큰 헤더',
    previewClass: 'sty-prev-bold'
  },
  {
    id: 'mono' as const,
    name: '모노',
    desc: '개발자·터미널',
    previewClass: 'sty-prev-mono'
  }
];

export function StylePicker({ currentStyle, onChange }: StylePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onChange(style.id)}
          className={`flex flex-col items-start gap-0.5 p-[9px] border-[1.5px] rounded-[10px] transition-all text-left relative overflow-hidden ${
            currentStyle === style.id
              ? 'border-gray-800 dark:border-white bg-gray-50 dark:bg-gray-900'
              : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-gray-950'
          }`}
        >
          {/* 미니 프리뷰 */}
          <div className={`sty-prev ${style.previewClass} w-full h-[18px] rounded bg-gray-100 dark:bg-gray-800 relative overflow-hidden mb-1`} />

          {/* 이름 */}
          <span
            className={`text-[12.5px] font-bold ${
              currentStyle === style.id
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {style.name}
          </span>

          {/* 설명 */}
          <span className="text-[10.5px] text-gray-500 dark:text-gray-400 leading-tight">
            {style.desc}
          </span>
        </button>
      ))}
    </div>
  );
}
