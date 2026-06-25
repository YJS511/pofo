import { useState } from 'react';
import { ClipboardList, LayoutGrid, Palette } from 'lucide-react';
import { AccordionEditor } from './AccordionEditor';
import { TemplatePanel } from './TemplatePanel';
import { StylePanel } from './StylePanel';

const TABS = [
  { key: 'portfolio' as const, label: '포트폴리오', short: '편집', icon: ClipboardList },
  { key: 'template' as const, label: '템플릿', short: '템플릿', icon: LayoutGrid },
  { key: 'style' as const, label: '스타일', short: '스타일', icon: Palette },
];

export function Editor({ mobile }: { mobile?: boolean }) {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'template' | 'style'>('portfolio');

  return (
    <div className={`flex flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 ${
      mobile ? 'w-full h-full' : 'w-[440px]'
    }`}>
      <div className="flex gap-1 p-2 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        {TABS.map(({ key, label, short, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 h-9 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === key
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {mobile && <Icon className="w-4 h-4" />}
            <span className={mobile ? 'hidden min-[400px]:inline' : ''}>{mobile ? short : label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'portfolio' && <AccordionEditor />}
      {activeTab === 'template' && <TemplatePanel />}
      {activeTab === 'style' && <StylePanel />}
    </div>
  );
}
