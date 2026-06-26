import { PortfolioState } from '../types';

// 다중 포트폴리오 문서 저장소 (localStorage)
//  - pofo.docIndex : DocMeta[]  (목록 메타데이터)
//  - pofo.doc.<id> : PortfolioState (각 문서 전체 상태)
//  - pofo.activeId : string (현재 열린 문서 id)

export interface DocMeta {
  id: string;
  name: string;
  company: string;
  updatedAt: number;
}

const INDEX_KEY = 'pofo.docIndex';
const ACTIVE_KEY = 'pofo.activeId';
const docKey = (id: string) => `pofo.doc.${id}`;

export function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function loadIndex(): DocMeta[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveIndex(index: DocMeta[]): void {
  try { localStorage.setItem(INDEX_KEY, JSON.stringify(index)); } catch { /* quota */ }
}

export function getActiveId(): string {
  try { return localStorage.getItem(ACTIVE_KEY) || ''; } catch { return ''; }
}

export function setActiveId(id: string): void {
  try { localStorage.setItem(ACTIVE_KEY, id); } catch { /* noop */ }
}

export function loadDocRaw(id: string): any | null {
  try {
    const raw = localStorage.getItem(docKey(id));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDoc(id: string, state: PortfolioState): void {
  localStorage.setItem(docKey(id), JSON.stringify(state));
}

export function removeDoc(id: string): void {
  try { localStorage.removeItem(docKey(id)); } catch { /* noop */ }
}

export function defaultDocName(state: PortfolioState): string {
  const name = state.profile?.name?.trim();
  const company = state.target?.company?.trim();
  if (company) return `${company} 지원용`;
  if (name) return `${name}의 포트폴리오`;
  return '내 포트폴리오';
}

export function makeMeta(id: string, name: string, state: PortfolioState): DocMeta {
  return { id, name, company: state.target?.company?.trim() || '', updatedAt: Date.now() };
}
