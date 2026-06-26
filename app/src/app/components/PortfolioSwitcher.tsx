import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Plus, Copy, SquarePen, Trash2, Check, Building2, Upload } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { useDialog } from './Dialog';

function relTime(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return '방금 전';
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  const d = new Date(ts);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export function PortfolioSwitcher() {
  const {
    docs, activeId, createDoc, switchDoc, renameDoc, duplicateDoc, deleteDoc, duplicateForCompany, importDoc,
  } = usePortfolio();
  const { confirm, prompt, notify } = useDialog();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    requestAnimationFrame(() => document.addEventListener('mousedown', handler));
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const active = docs.find((d) => d.id === activeId);
  const sorted = [...docs].sort((a, b) => b.updatedAt - a.updatedAt);

  const handleRename = async (id: string, current: string) => {
    const name = await prompt({ title: '포트폴리오 이름 변경', placeholder: '포트폴리오 이름', defaultValue: current, confirmText: '변경' });
    if (name !== null && name.trim()) renameDoc(id, name);
  };

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirm({ title: `${name} 삭제`, message: '이 작업은 되돌릴 수 없습니다.', danger: true, confirmText: '삭제' });
    if (ok) deleteDoc(id);
  };

  const handleCompanyDup = async () => {
    const company = await prompt({ title: '회사용으로 복제', message: '지원할 회사명을 입력하면 그 회사 맞춤 포트폴리오 사본이 만들어집니다.', placeholder: '예: 네이버', defaultValue: active?.company || '', confirmText: '복제' });
    if (company && company.trim()) {
      duplicateForCompany(company);
      setOpen(false);
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        importDoc(parsed);
        setOpen(false);
        notify('포트폴리오를 불러왔어요');
      } catch {
        notify('JSON 파일을 읽지 못했어요. 올바른 포트폴리오 파일인지 확인해 주세요.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-8 max-w-[200px] px-2 rounded-lg flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        title="포트폴리오 전환"
      >
        <span className="truncate">{active?.name || '내 포트폴리오'}</span>
        {active?.company && (
          <span className="flex-shrink-0 inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-800 dark:bg-white text-white dark:text-gray-900">
            <Building2 className="w-2.5 h-2.5" />
            {active.company}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 p-1.5 overflow-hidden">
          <div className="max-h-[280px] overflow-y-auto">
            {sorted.map((d) => {
              const isActive = d.id === activeId;
              return (
                <div
                  key={d.id}
                  className="group flex items-center gap-2 px-2.5 py-2.5 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60"
                  onClick={() => { switchDoc(d.id); setOpen(false); }}
                >
                  <div className="w-4 flex-shrink-0">
                    {isActive && <Check className="w-4 h-4 text-gray-800 dark:text-white" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{d.name}</span>
                      {d.company && (
                        <span className="flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                          {d.company}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-400 dark:text-gray-500">{relTime(d.updatedAt)} 수정</div>
                  </div>

                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleRename(d.id, d.name); }}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-700 transition-colors"
                      title="이름 변경"
                    >
                      <SquarePen className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); duplicateDoc(d.id); setOpen(false); }}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-700 transition-colors"
                      title="복제"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleDelete(d.id, d.name); }}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 -mx-1.5 px-1.5 mt-1.5 pt-1.5">
            <button
              type="button"
              onClick={() => { createDoc({ onboard: true }); setOpen(false); }}
              className="w-full px-2.5 py-2.5 rounded-lg text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 flex items-center gap-2.5 transition-colors"
            >
              <Plus className="w-4 h-4 flex-shrink-0" />
              새 포트폴리오
            </button>
            <button
              type="button"
              onClick={handleCompanyDup}
              className="w-full px-2.5 py-2.5 rounded-lg text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 flex items-center gap-2.5 transition-colors"
            >
              <Building2 className="w-4 h-4 flex-shrink-0" />
              회사용으로 복제
            </button>
            <label className="w-full px-2.5 py-2.5 rounded-lg text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 flex items-center gap-2.5 transition-colors cursor-pointer">
              <Upload className="w-4 h-4 flex-shrink-0" />
              파일로 추가
              <input type="file" accept="application/json,.json" onChange={handleImportFile} className="hidden" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
