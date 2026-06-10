import { useState } from 'react';

interface PeriodPickerProps {
  value: { start: string; end: string };
  onChange: (value: { start: string; end: string }) => void;
  label?: string;
}

export function PeriodPicker({ value, onChange, label }: PeriodPickerProps) {
  const [isPresent, setIsPresent] = useState(false);

  const handleStartChange = (start: string) => {
    onChange({ ...value, start });
  };

  const handleEndChange = (end: string) => {
    onChange({ ...value, end });
  };

  const handlePresentToggle = (checked: boolean) => {
    setIsPresent(checked);
    if (checked) {
      onChange({ ...value, end: '' });
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[11.5px] font-semibold text-gray-500 dark:text-gray-400">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <input
          type="month"
          value={value.start}
          onChange={(e) => handleStartChange(e.target.value)}
          className="flex-1 min-w-0 px-3 py-2 text-[13.5px] rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
          style={{ colorScheme: 'light' }}
        />
        <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">–</span>
        <input
          type="month"
          value={value.end}
          onChange={(e) => handleEndChange(e.target.value)}
          disabled={isPresent}
          className="flex-1 min-w-0 px-3 py-2 text-[13.5px] rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 disabled:opacity-50"
          style={{ colorScheme: 'light' }}
        />
        <label className="flex items-center gap-1.5 text-[13px] text-gray-700 dark:text-gray-300 flex-shrink-0 cursor-pointer whitespace-nowrap">
          <input
            type="checkbox"
            checked={isPresent}
            onChange={(e) => handlePresentToggle(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-gray-400 cursor-pointer"
            style={{ accentColor: '#4A4A4A' }}
          />
          현재
        </label>
      </div>
    </div>
  );
}

// Helper to extract period from object format
export function parsePeriod(periodStr: string): { start: string; end: string } {
  if (!periodStr) return { start: '', end: '' };
  const parts = periodStr.split(' – ');
  return {
    start: parts[0] || '',
    end: parts[1] || ''
  };
}

// Helper to format period to string
export function formatPeriod(period: { start: string; end: string }): string {
  if (!period.start) return '';
  if (!period.end) return `${period.start} – 현재`;
  return `${period.start} – ${period.end}`;
}
