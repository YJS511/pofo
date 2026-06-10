import { useState } from 'react';
import { AccordionEditor } from './AccordionEditor';
import { TemplatePanel } from './TemplatePanel';
import { StylePanel } from './StylePanel';

export function Editor() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'template' | 'style'>('portfolio');

  return (
    <div className="w-[440px] flex flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
      {/* Tabs */}
      <div className="flex gap-1 p-2 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`flex-1 h-9 rounded-lg text-sm font-semibold transition-colors ${
            activeTab === 'portfolio'
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          포트폴리오
        </button>
        <button
          onClick={() => setActiveTab('template')}
          className={`flex-1 h-9 rounded-lg text-sm font-semibold transition-colors ${
            activeTab === 'template'
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          템플릿
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 h-9 rounded-lg text-sm font-semibold transition-colors ${
            activeTab === 'style'
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          스타일
        </button>
      </div>

      {/* Content */}
      {activeTab === 'portfolio' && <AccordionEditor />}
      {activeTab === 'template' && <TemplatePanel />}
      {activeTab === 'style' && <StylePanel />}
    </div>
  );
}
