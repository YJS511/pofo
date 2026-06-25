import { useState } from 'react';
import {
  Copy, Download, Upload, X, Check, ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolioState';
import {
  exportJSON,
  downloadFile,
  copyToClipboard,
  exportPDF,
  buildStandaloneHTML,
  exportPPTX,
  downloadZip,
  toMarkdown,
} from '../utils/export';
import { PortfolioState } from '../types';
 
interface ExportMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
 
type Fmt = 'json' | 'html' | 'md' | 'pdf' | 'pptx' | 'zip';

const FORMATS: { value: Fmt; label: string; hint: string; copy: boolean }[] = [
  { value: 'html', label: 'HTML (.html)', hint: '현재 디자인한 테마, 컬러, 커버, 이모지가 완벽 보존된 단독 HTML', copy: true },
  { value: 'zip', label: '배포용 ZIP (.zip)', hint: 'Netlify Drop 등에 드래그하여 바로 웹사이트를 개설할 수 있는 압축 파일', copy: false },
  { value: 'md', label: 'Markdown (.md)', hint: 'GitHub README, Notion, 블로그 등에 바로 붙여넣기 가능', copy: true },
  { value: 'json', label: 'JSON 데이터 (.json)', hint: '구조화된 백업본 — 다른 기기로 이전', copy: true },
  { value: 'pdf', label: 'PDF 문서', hint: '인쇄형 문서 — 복사는 지원하지 않아요', copy: false },
  { value: 'pptx', label: 'PowerPoint (.pptx)', hint: '편집 가능한 슬라이드 — 복사는 지원하지 않아요', copy: false }
];
 
export function ExportMenu({ isOpen, onClose }: ExportMenuProps) {
  const { state, replaceState } = usePortfolio();
  const [fmt, setFmt] = useState<Fmt>('html');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;
 
  const fname = (state.profile.name || 'portfolio').replace(/\s+/g, '-').toLowerCase();
  const current = FORMATS.find((f) => f.value === fmt)!;
 
  const flash = (m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(''), 2200);
  };
 
  const getText = (f: Fmt): string =>
    f === 'json' ? exportJSON(state) : f === 'md' ? toMarkdown(state) : buildStandaloneHTML(state);
 
  const handleCopy = async () => {
    const ok = await copyToClipboard(getText(fmt));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
 
  const handleDownload = async () => {
    try {
      if (fmt === 'json') {
        downloadFile(`${fname}.json`, exportJSON(state), 'application/json');
        flash('🗂️ JSON(.json)을 다운로드했어요');
      } else if (fmt === 'md') {
        downloadFile(`${fname}.md`, toMarkdown(state), 'text/markdown');
        flash('📝 Markdown(.md)을 다운로드했어요');
      } else if (fmt === 'html') {
        downloadFile(`${fname}-portfolio.html`, buildStandaloneHTML(state), 'text/html');
        flash('🌐 단독 HTML을 다운로드했어요');
      } else if (fmt === 'zip') {
        downloadZip(`${fname}-portfolio.zip`, buildStandaloneHTML(state));
        flash('📦 배포용 ZIP(.zip)을 다운로드했어요!');
      } else if (fmt === 'pdf') {
        exportPDF(state);
      } else if (fmt === 'pptx') {
        setBusy(true);
        flash('📽️ PowerPoint 파일을 만드는 중…');
        await exportPPTX(state);
        flash('📽️ PowerPoint(.pptx)를 다운로드했어요');
      }
    } catch (e) {
      flash('내보내기에 실패했어요 (인터넷 연결 확인)');
    } finally {
      setBusy(false);
    }
  };
 
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const next = JSON.parse(ev.target?.result as string) as PortfolioState;
        replaceState(next);
        flash('✅ JSON을 불러왔어요');
      } catch {
        flash('JSON을 읽지 못했어요');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };
 


  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Menu */}
      <div className="fixed top-16 right-4 w-[340px] max-w-[calc(100vw-32px)] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">공유 및 내보내기</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">

          {/* 웹 사이트 배포 섹션 */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">
              웹 사이트 배포
            </div>

            <a
              href="https://app.netlify.com/drop"
              target="_blank"
              rel="noreferrer"
              className="w-full h-9 px-3 rounded-lg text-xs font-semibold bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-750 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Netlify Drop 바로가기
            </a>
          </div>

          {/* 파일 내보내기 섹션 */}
          <div className="space-y-2.5 pt-3 border-t border-gray-200 dark:border-gray-800">
            <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">
              파일 내보내기
            </div>
            
            <select
              value={fmt}
              onChange={(e) => setFmt(e.target.value as Fmt)}
              className="w-full h-9 px-2.5 rounded-lg border border-gray-350 dark:border-gray-650 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              {FORMATS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
            
            <div className="text-[11px] text-gray-500 dark:text-gray-400 px-1 leading-normal min-h-[32px]">
              {current.hint}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!current.copy || busy}
                className="flex-1 h-9 px-3 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-150 dark:hover:bg-gray-850 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? '복사됨!' : '복사'}
              </button>
              <button
                onClick={handleDownload}
                disabled={busy}
                className="flex-1 h-9 px-3 rounded-lg text-xs font-semibold bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-750 dark:hover:bg-gray-100 disabled:opacity-60 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                다운로드
              </button>
            </div>
          </div>



          {/* 데이터 관리 */}
          <div className="space-y-2.5 pt-3 border-t border-gray-200 dark:border-gray-800">
            <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">
              데이터 관리
            </div>

            <label className="w-full h-9 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-850 cursor-pointer flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <Upload className="w-3.5 h-3.5" />
              JSON 불러오기
              <input type="file" accept="application/json,.json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>

        {msg && (
          <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800/40 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-300 font-semibold">{msg}</p>
          </div>
        )}
      </div>
    </>
  );
}
