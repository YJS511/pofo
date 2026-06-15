import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Trash2, Plus } from 'lucide-react';

interface Field {
  key: string;
  label?: string;
  placeholder: string;
  type?: 'text' | 'textarea' | 'month' | 'select';
  options?: string[];
  fullWidth?: boolean;
}

function parseDatePart(s: string): { y: string; m: string; d: string } {
  const c = s.trim().replace(/-/g, '.');
  const p = c.split('.');
  return { y: p[0] || '', m: p[1] || '', d: p[2] || '' };
}

function fmtDate(y: string, m: string, d: string): string {
  if (!y) return '';
  let s = y;
  if (m) s += `.${m.padStart(2, '0')}`;
  if (m && d) s += `.${d.padStart(2, '0')}`;
  return s;
}

const NOW_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: NOW_YEAR - 2009 }, (_, i) => String(NOW_YEAR + 2 - i));
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

const selCls = "px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400";

function DateSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { y, m, d } = useMemo(() => parseDatePart(value), [value]);
  const set = (ny: string, nm: string, nd: string) => onChange(fmtDate(ny, nm, nd));
  return (
    <div className="flex items-center gap-1.5">
      <select value={y} onChange={e => set(e.target.value, m, d)} className={selCls + " w-[80px]"}>
        <option value="">년</option>
        {YEARS.map(v => <option key={v} value={v}>{v}</option>)}
      </select>
      <select value={m} onChange={e => set(y, e.target.value, d)} className={selCls + " w-[62px]"}>
        <option value="">월</option>
        {MONTHS.map(v => <option key={v} value={v}>{v}</option>)}
      </select>
      <select value={d} onChange={e => set(y, m, e.target.value)} className={selCls + " w-[62px]"}>
        <option value="">일</option>
        {DAYS.map(v => <option key={v} value={v}>{v}</option>)}
      </select>
    </div>
  );
}

interface RepeaterFormProps<T> {
  items: T[];
  fields: Field[];
  label: string;
  onChange: (items: T[]) => void;
  emptyItem: T;
  renderExtra?: (item: T, index: number) => React.ReactNode;
}

export function RepeaterForm<T extends Record<string, any>>({
  items,
  fields,
  label,
  onChange,
  emptyItem,
  renderExtra
}: RepeaterFormProps<T>) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    items.length > 0 ? 0 : null
  );

  const addItem = () => {
    onChange([...items, { ...emptyItem }]);
    setExpandedIndex(items.length);
  };

  const removeItem = (index: number) => {
    if (confirm(`이 ${label}을(를) 삭제할까요?`)) {
      onChange(items.filter((_, i) => i !== index));
      setExpandedIndex(null);
    }
  };

  const updateItem = (index: number, key: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const moveItem = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;

    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
    setExpandedIndex(newIndex);
  };

  const renderField = (field: Field, item: T, index: number) => {
    const value = item[field.key] || '';

    if (field.type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => updateItem(index, field.key, e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 resize-none"
        />
      );
    }

    if (field.type === 'month') {
      const sep = value.includes(' ~ ') ? ' ~ ' : value.includes(' – ') ? ' – ' : ' ~ ';
      const parts = value.split(sep);
      const startVal = parts[0] || '';
      const endVal = parts[1] || '';
      const build = (s: string, e: string) => {
        if (!s && !e) return '';
        if (s && !e) return s;
        return `${s} ~ ${e}`;
      };
      return (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
            {field.label || '기간'}
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            <DateSelect value={startVal} onChange={s => updateItem(index, field.key, build(s, endVal))} />
            <span className="text-gray-400 text-sm">~</span>
            <DateSelect value={endVal} onChange={e => updateItem(index, field.key, build(startVal, e))} />
          </div>
        </div>
      );
    }

    if (field.type === 'select' && field.options) {
      return (
        <select
          value={value}
          onChange={(e) => updateItem(index, field.key, e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">{field.placeholder}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => updateItem(index, field.key, e.target.value)}
        placeholder={field.placeholder}
        list={field.options ? `datalist-${field.key}` : undefined}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
      />
    );
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all"
        >
          {/* Header */}
          <div
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {label} {index + 1}
            </span>
            <div className="flex-1" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                moveItem(index, -1);
              }}
              disabled={index === 0}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                moveItem(index, 1);
              }}
              disabled={index === items.length - 1}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeItem(index);
              }}
              className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-950 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          {expandedIndex === index && (
            <div className="p-4 space-y-3">
              {fields.map((field) => (
                <div key={field.key} className={field.fullWidth ? 'col-span-2' : ''}>
                  {renderField(field, item, index)}
                </div>
              ))}
              {renderExtra?.(item, index)}
            </div>
          )}
        </div>
      ))}

      {/* Add Button */}
      <button
        onClick={addItem}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span className="font-medium">{label} 추가</span>
      </button>
    </div>
  );
}
