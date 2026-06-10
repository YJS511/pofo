import { useState } from 'react';
import { ChevronUp, ChevronDown, Trash2, Plus } from 'lucide-react';

interface Field {
  key: string;
  label?: string;
  placeholder: string;
  type?: 'text' | 'textarea' | 'month' | 'select';
  options?: string[];
  fullWidth?: boolean;
}

interface RepeaterFormProps<T> {
  items: T[];
  fields: Field[];
  label: string;
  onChange: (items: T[]) => void;
  emptyItem: T;
}

export function RepeaterForm<T extends Record<string, any>>({
  items,
  fields,
  label,
  onChange,
  emptyItem
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
      return (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
            {field.label || '기간'}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="month"
              value={value.split(' – ')[0] || ''}
              onChange={(e) => {
                const end = value.split(' – ')[1] || '';
                updateItem(index, field.key, end ? `${e.target.value} – ${end}` : e.target.value);
              }}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <span className="text-gray-400">–</span>
            <input
              type="month"
              value={value.split(' – ')[1] || ''}
              onChange={(e) => {
                const start = value.split(' – ')[0] || '';
                updateItem(index, field.key, `${start} – ${e.target.value}`);
              }}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
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
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
          </button>

          {/* Content */}
          {expandedIndex === index && (
            <div className="p-4 space-y-3">
              {fields.map((field) => (
                <div key={field.key} className={field.fullWidth ? 'col-span-2' : ''}>
                  {renderField(field, item, index)}
                </div>
              ))}
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
