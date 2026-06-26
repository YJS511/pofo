import { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import { AlertTriangle, X, Info } from 'lucide-react';

interface ConfirmOptions {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

interface PromptOptions {
  title: string;
  message?: string;
  placeholder?: string;
  defaultValue?: string;
  confirmText?: string;
}

interface DialogContextType {
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
  prompt: (opts: PromptOptions) => Promise<string | null>;
  notify: (message: string, type?: 'info' | 'error') => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

type Modal =
  | { kind: 'confirm'; opts: ConfirmOptions; resolve: (v: boolean) => void }
  | { kind: 'prompt'; opts: PromptOptions; resolve: (v: string | null) => void };

interface Toast { id: number; message: string; type: 'info' | 'error'; }

export function DialogProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<Modal | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const toastSeq = useRef(0);

  const confirm = useCallback((opts: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => setModal({ kind: 'confirm', opts, resolve }));
  }, []);

  const prompt = useCallback((opts: PromptOptions) => {
    setInputValue(opts.defaultValue ?? '');
    return new Promise<string | null>((resolve) => setModal({ kind: 'prompt', opts, resolve }));
  }, []);

  const notify = useCallback((message: string, type: 'info' | 'error' = 'info') => {
    const id = ++toastSeq.current;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const close = (result: boolean | string | null) => {
    if (!modal) return;
    if (modal.kind === 'confirm') (modal.resolve as (v: boolean) => void)(result as boolean);
    else (modal.resolve as (v: string | null) => void)(result as string | null);
    setModal(null);
  };

  useEffect(() => {
    if (modal?.kind === 'prompt') {
      const t = setTimeout(() => { inputRef.current?.focus(); inputRef.current?.select(); }, 30);
      return () => clearTimeout(t);
    }
  }, [modal]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(modal.kind === 'confirm' ? false : null); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  const danger = modal?.kind === 'confirm' && modal.opts.danger;

  return (
    <DialogContext.Provider value={{ confirm, prompt, notify }}>
      {children}

      {modal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 animate-fadeIn" onClick={() => close(modal.kind === 'confirm' ? false : null)} />
          <div className="relative w-full max-w-[360px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-fadeIn">
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-start gap-3">
                {danger && (
                  <span className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-bold text-gray-900 dark:text-white">{modal.opts.title}</h3>
                  {modal.opts.message && (
                    <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                      {modal.opts.message}
                    </p>
                  )}
                </div>
              </div>

              {modal.kind === 'prompt' && (
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); close(inputValue.trim() ? inputValue : ''); } }}
                  placeholder={modal.opts.placeholder}
                  className="mt-3.5 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
                />
              )}
            </div>

            <div className="flex gap-2 px-5 pb-5">
              <button
                type="button"
                onClick={() => close(modal.kind === 'confirm' ? false : null)}
                className="flex-1 h-10 rounded-lg text-sm font-semibold border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {modal.kind === 'confirm' ? (modal.opts.cancelText || '취소') : '취소'}
              </button>
              <button
                type="button"
                onClick={() => close(modal.kind === 'confirm' ? true : (inputValue.trim() ? inputValue : ''))}
                className={`flex-1 h-10 rounded-lg text-sm font-semibold transition-colors ${
                  danger
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-750 dark:hover:bg-gray-100'
                }`}
              >
                {modal.kind === 'confirm' ? (modal.opts.confirmText || '확인') : (modal.opts.confirmText || '확인')}
              </button>
            </div>

            <button
              type="button"
              onClick={() => close(modal.kind === 'confirm' ? false : null)}
              className="absolute top-3 right-3 p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {toasts.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[210] flex flex-col items-center gap-2 pointer-events-none">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg animate-fadeIn ${
                t.type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              }`}
            >
              {t.type === 'error' ? <AlertTriangle className="w-4 h-4 flex-shrink-0" /> : <Info className="w-4 h-4 flex-shrink-0" />}
              {t.message}
            </div>
          ))}
        </div>
      )}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used within DialogProvider');
  return ctx;
}
