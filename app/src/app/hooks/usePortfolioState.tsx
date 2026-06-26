import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { PortfolioState } from '../types';
import { parseShareHash } from '../utils/export';
import {
  DocMeta, genId, loadIndex, saveIndex, getActiveId, setActiveId,
  loadDocRaw, saveDoc, removeDoc, defaultDocName, makeMeta,
} from '../utils/docStore';

interface PortfolioContextType {
  state: PortfolioState;
  updateState: (updates: Partial<PortfolioState>) => void;
  updateProfile: (updates: Partial<PortfolioState['profile']>) => void;
  updateTheme: (updates: Partial<PortfolioState['theme']>) => void;
  updateTarget: (updates: Partial<PortfolioState['target']>) => void;
  replaceState: (next: PortfolioState) => void;
  resetState: () => void;
  resetContentOnly: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  showGuide: boolean;
  setShowGuide: (show: boolean) => void;
  viewMode: 'desktop' | 'mobile';
  setViewMode: (mode: 'desktop' | 'mobile') => void;
  selectedPresetId: string;
  setSelectedPresetId: (id: string) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  saveError: boolean;
  saveStatus: 'idle' | 'saving' | 'saved';
  shareError: boolean;
  dismissShareError: () => void;
  showManual: boolean;
  setShowManual: (show: boolean) => void;
  // 다중 포트폴리오
  docs: DocMeta[];
  activeId: string;
  createDoc: (opts?: { onboard?: boolean }) => void;
  switchDoc: (id: string) => void;
  renameDoc: (id: string, name: string) => void;
  duplicateDoc: (id: string) => void;
  deleteDoc: (id: string) => void;
  duplicateForCompany: (company: string) => void;
  importDoc: (raw: any) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const createEmptyState = (): PortfolioState => ({
  profile: {
    name: '',
    role: '',
    tagline: '',
    location: '',
    email: '',
    github: '',
    website: '',
    emoji: '👋',
    iconImg: '',
    iconShape: 'rounded',
    links: []
  },
  target: { company: '', position: '', motivation: '' },
  about: '',
  skills: '',
  tools: [],
  experience: [],
  projects: [],
  education: [],
  certifications: [],
  custom: [],
  theme: {
    mode: 'light',
    font: 'sans',
    cover: 'graphite',
    coverImg: '',
    solidColor: '',
    gradientCustom: '',
    accent: '',
    layout: 'notion',
    wide: true,
    style: 'classic',
    noCover: false
  },
  sectionOrder: ['skills', 'tools', 'experience', 'projects', 'education', 'certifications'],
  hidden: [],
  github: { user: '', repos: [] }
});

export function validateAndNormalizeState(input: any): PortfolioState {
  const base = createEmptyState();
  if (!input || typeof input !== 'object') return base;

  // 1. profile 객체 검증 및 보정
  const profile = { ...base.profile };
  if (input.profile && typeof input.profile === 'object') {
    Object.keys(profile).forEach((key) => {
      const k = key as keyof typeof profile;
      if (k === 'links') {
        profile.links = Array.isArray(input.profile.links)
          ? input.profile.links.filter((l: any) => l && typeof l === 'object').map((l: any) => ({
              label: String(l?.label || ''),
              url: String(l?.url || '')
            }))
          : [];
      } else if (input.profile[k] !== undefined) {
        profile[k] = String(input.profile[k]);
      }
    });
  }

  // 2. theme 객체 검증 및 보정
  const theme = { ...base.theme };
  if (input.theme && typeof input.theme === 'object') {
    Object.keys(theme).forEach((key) => {
      const k = key as keyof typeof theme;
      if (k === 'wide' || k === 'noCover') {
        theme[k] = input.theme[k] === undefined ? base.theme[k] : Boolean(input.theme[k]);
      } else if (input.theme[k] !== undefined) {
        theme[k] = input.theme[k];
      }
    });
  }

  // 2-1. target(지원 회사) 검증
  const target = {
    company: String(input.target?.company || ''),
    position: String(input.target?.position || ''),
    motivation: String(input.target?.motivation || ''),
  };

  // 3. 단순 문자열 필드 보정
  const about = typeof input.about === 'string' ? input.about : String(input.about || '');
  const skills = typeof input.skills === 'string' ? input.skills : String(input.skills || '');

  // 4. 배열 필드 검증
  const tools = Array.isArray(input.tools) ? input.tools.map(String) : [];
  
  const experience = Array.isArray(input.experience)
    ? input.experience.map((e: any) => ({
        role: String(e?.role || ''),
        company: String(e?.company || ''),
        period: String(e?.period || ''),
        desc: String(e?.desc || ''),
        level: e?.level ? String(e.level) : undefined,
        type: e?.type ? String(e.type) : undefined,
      }))
    : [];

  const projects = Array.isArray(input.projects)
    ? input.projects.map((p: any) => ({
        name: String(p?.name || ''),
        period: String(p?.period || ''),
        role: String(p?.role || ''),
        desc: String(p?.desc || ''),
        result: String(p?.result || ''),
        tech: String(p?.tech || ''),
        link: String(p?.link || ''),
        repo: String(p?.repo || ''),
        demo: String(p?.demo || ''),
        image: String(p?.image || ''),
        stars: typeof p?.stars === 'number' ? p.stars : undefined,
      }))
    : [];

  const education = Array.isArray(input.education)
    ? input.education.map((edu: any) => ({
        school: String(edu?.school || ''),
        degree: String(edu?.degree || ''),
        period: String(edu?.period || ''),
      }))
    : [];

  const certifications = Array.isArray(input.certifications)
    ? input.certifications.map((c: any) => ({
        name: String(c?.name || ''),
        status: ['acquired', 'preparing', 'planned'].includes(c?.status) ? c.status : 'planned',
        date: String(c?.date || ''),
      }))
    : [];

  const custom = Array.isArray(input.custom)
    ? input.custom.map((c: any) => ({
        id: String(c?.id || Math.random().toString(36).substring(2, 9)),
        title: String(c?.title || ''),
        emoji: String(c?.emoji || '📌'),
        items: Array.isArray(c?.items)
          ? c.items.map((item: any) => ({
              title: String(item?.title || ''),
              sub: String(item?.sub || ''),
              period: String(item?.period || ''),
              desc: String(item?.desc || ''),
            }))
          : [],
      }))
    : [];

  // 5. sectionOrder 검증
  let sectionOrder = base.sectionOrder;
  if (Array.isArray(input.sectionOrder) && input.sectionOrder.length > 0) {
    sectionOrder = input.sectionOrder.map(String);
    for (const key of base.sectionOrder) {
      if (!sectionOrder.includes(key)) sectionOrder.push(key);
    }
  }

  // 5-1. hidden(비활성 섹션 목록 — 미리보기·슬라이드 공통) 검증
  const hidden = Array.isArray(input.hidden)
    ? input.hidden.map(String)
    : (Array.isArray(input.slideHide) ? input.slideHide.map(String) : []);

  // 6. github 검증
  const github = {
    user: String(input.github?.user || ''),
    repos: Array.isArray(input.github?.repos) ? input.github.repos.map((r: any) => ({
      name: String(r?.name || ''),
      html_url: String(r?.html_url || ''),
      description: String(r?.description || ''),
      stargazers_count: typeof r?.stargazers_count === 'number' ? r.stargazers_count : 0,
      language: r?.language ? String(r.language) : null,
    })) : []
  };

  return {
    profile,
    target,
    about,
    skills,
    tools,
    experience,
    projects,
    education,
    certifications,
    custom,
    theme,
    sectionOrder,
    hidden,
    github,
  };
}

// 다중 문서 부트스트랩 (최초 1회) — 기존 단일 pofo.state 자동 마이그레이션
function bootstrapDocs(): { index: DocMeta[]; activeId: string; state: PortfolioState } {
  if (typeof window === 'undefined') {
    return { index: [], activeId: '', state: createEmptyState() };
  }
  let index = loadIndex();
  let activeId = getActiveId();

  if (index.length === 0) {
    // 기존 단일 포트폴리오를 첫 문서로 이전
    let st = createEmptyState();
    try {
      const old = localStorage.getItem('pofo.state');
      if (old) st = validateAndNormalizeState(JSON.parse(old));
    } catch { /* keep empty */ }
    const id = genId();
    saveDoc(id, st);
    index = [makeMeta(id, defaultDocName(st), st)];
    saveIndex(index);
    activeId = id;
    setActiveId(id);
    try { localStorage.removeItem('pofo.state'); } catch { /* noop */ }
    return { index, activeId, state: st };
  }

  if (!activeId || !index.find((d) => d.id === activeId)) {
    activeId = index[0].id;
    setActiveId(activeId);
  }
  const raw = loadDocRaw(activeId);
  const state = raw ? validateAndNormalizeState(raw) : createEmptyState();
  return { index, activeId, state };
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const bootRef = useRef<ReturnType<typeof bootstrapDocs> | null>(null);
  if (bootRef.current === null) bootRef.current = bootstrapDocs();
  const boot = bootRef.current;

  const [docs, setDocs] = useState<DocMeta[]>(boot.index);
  const [activeId, setActiveIdState] = useState<string>(boot.activeId);
  const [state, setState] = useState<PortfolioState>(boot.state);

  const MAX_HISTORY = 50;
  const historyRef = useRef<PortfolioState[]>([]);
  const futureRef = useRef<PortfolioState[]>([]);
  const isUndoRedoRef = useRef(false);

  const pushHistory = useCallback((prev: PortfolioState) => {
    if (isUndoRedoRef.current) return;
    const snapshot = structuredClone(prev);
    historyRef.current = [...historyRef.current.slice(-MAX_HISTORY + 1), snapshot];
    futureRef.current = [];
  }, []);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const syncUndoRedo = useCallback(() => {
    setCanUndo(historyRef.current.length > 0);
    setCanRedo(futureRef.current.length > 0);
  }, []);

  const undo = useCallback(() => {
    if (historyRef.current.length === 0) return;
    const prev = historyRef.current[historyRef.current.length - 1];
    historyRef.current = historyRef.current.slice(0, -1);
    isUndoRedoRef.current = true;
    setState(current => {
      futureRef.current = [...futureRef.current, current];
      return prev;
    });
    isUndoRedoRef.current = false;
    syncUndoRedo();
  }, [syncUndoRedo]);

  const redo = useCallback(() => {
    if (futureRef.current.length === 0) return;
    const next = futureRef.current[futureRef.current.length - 1];
    futureRef.current = futureRef.current.slice(0, -1);
    isUndoRedoRef.current = true;
    setState(current => {
      historyRef.current = [...historyRef.current, current];
      return next;
    });
    isUndoRedoRef.current = false;
    syncUndoRedo();
  }, [syncUndoRedo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if (mod && e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); }
      if (mod && e.key === 'y') { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  const [currentStep, setCurrentStep] = useState(0);
  const [showGuide, setShowGuide] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedPresetId, setSelectedPresetIdRaw] = useState(() => {
    try { return localStorage.getItem('pofo.presetId') || ''; } catch { return ''; }
  });
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try { if (localStorage.getItem('pofo.presetId')) return false; } catch { /* noop */ }
    return !boot.state.profile?.name?.trim();
  });

  const [saveError, setSaveError] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const savedTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const firstSaveRef = useRef(true);

  const setSelectedPresetId = (id: string) => {
    setSelectedPresetIdRaw(id);
    try { localStorage.setItem('pofo.presetId', id); } catch {}
  };

  useEffect(() => {
    // 초기 마운트 시에는 "저장됨" 표시를 띄우지 않음
    if (firstSaveRef.current) {
      firstSaveRef.current = false;
      return;
    }
    clearTimeout(saveTimerRef.current);
    setSaveStatus('saving');
    saveTimerRef.current = setTimeout(() => {
      try {
        saveDoc(activeId, state);
        // 목록 메타(회사·수정시각) 갱신
        setDocs((prev) => {
          const next = prev.map((d) =>
            d.id === activeId
              ? { ...d, company: state.target?.company?.trim() || '', updatedAt: Date.now() }
              : d
          );
          saveIndex(next);
          return next;
        });
        if (saveError) setSaveError(false);
        setSaveStatus('saved');
        clearTimeout(savedTimerRef.current);
        savedTimerRef.current = setTimeout(() => setSaveStatus('idle'), 1800);
      } catch {
        setSaveError(true);
        setSaveStatus('idle');
      }
    }, 400);
    return () => clearTimeout(saveTimerRef.current);
  }, [state, activeId]);

  const updateState = (updates: Partial<PortfolioState>) => {
    setState(prev => { pushHistory(prev); syncUndoRedo(); return { ...prev, ...updates }; });
  };

  const updateProfile = (updates: Partial<PortfolioState['profile']>) => {
    setState(prev => { pushHistory(prev); syncUndoRedo(); return { ...prev, profile: { ...prev.profile, ...updates } }; });
  };

  const updateTheme = (updates: Partial<PortfolioState['theme']>) => {
    setState(prev => { pushHistory(prev); syncUndoRedo(); return { ...prev, theme: { ...prev.theme, ...updates } }; });
  };

  const updateTarget = (updates: Partial<PortfolioState['target']>) => {
    setState(prev => { pushHistory(prev); syncUndoRedo(); return { ...prev, target: { ...prev.target, ...updates } }; });
  };

  const replaceState = (next: PortfolioState) => {
    setState(prev => { pushHistory(prev); syncUndoRedo(); return validateAndNormalizeState(next); });
  };

  const resetState = () => {
    setState(prev => { pushHistory(prev); syncUndoRedo(); return createEmptyState(); });
  };

  const resetContentOnly = () => {
    setState(prev => { pushHistory(prev); syncUndoRedo(); return { ...createEmptyState(), theme: prev.theme }; });
  };

  // ── 다중 포트폴리오 ─────────────────────────────
  const resetHistory = () => {
    historyRef.current = [];
    futureRef.current = [];
    setCanUndo(false);
    setCanRedo(false);
  };

  const persistActive = () => {
    try { saveDoc(activeId, state); } catch { /* quota */ }
  };

  const openDoc = (id: string, st: PortfolioState) => {
    setActiveIdState(id);
    setActiveId(id);
    isUndoRedoRef.current = true;
    setState(st);
    isUndoRedoRef.current = false;
    resetHistory();
  };

  const addDoc = (st: PortfolioState, name: string): string => {
    persistActive();
    const id = genId();
    saveDoc(id, st);
    setDocs(prev => {
      const next = [...prev, makeMeta(id, name, st)];
      saveIndex(next);
      return next;
    });
    openDoc(id, st);
    return id;
  };

  const switchDoc = (id: string) => {
    if (id === activeId) return;
    persistActive();
    const raw = loadDocRaw(id);
    openDoc(id, raw ? validateAndNormalizeState(raw) : createEmptyState());
  };

  const createDoc = (opts?: { onboard?: boolean }) => {
    addDoc(createEmptyState(), '내 포트폴리오');
    setSelectedPresetId('');
    if (opts?.onboard) setShowOnboarding(true);
  };

  const renameDoc = (id: string, name: string) => {
    setDocs(prev => {
      const next = prev.map(d => d.id === id ? { ...d, name: name.trim() || d.name } : d);
      saveIndex(next);
      return next;
    });
  };

  const duplicateDoc = (id: string) => {
    const rawSrc = id === activeId ? state : loadDocRaw(id);
    const src = id === activeId ? state : (rawSrc ? validateAndNormalizeState(rawSrc) : createEmptyState());
    const meta = docs.find(d => d.id === id);
    addDoc(structuredClone(src), `${meta?.name || defaultDocName(src)} 복사본`);
  };

  const duplicateForCompany = (company: string) => {
    const c = company.trim();
    if (!c) return;
    const copy = structuredClone(state);
    copy.target = { ...copy.target, company: c };
    addDoc(copy, `${c} 지원용`);
  };

  // JSON 파일에서 새 포트폴리오로 추가
  const importDoc = (raw: any) => {
    const st = validateAndNormalizeState(raw);
    addDoc(st, defaultDocName(st));
  };

  const deleteDoc = (id: string) => {
    removeDoc(id);
    const remaining = docs.filter(d => d.id !== id);
    if (remaining.length === 0) {
      // 모두 삭제하면 빈 문서로 초기화하고 학과 선택부터 다시 시작
      const st = createEmptyState();
      const newId = genId();
      saveDoc(newId, st);
      const next = [makeMeta(newId, '내 포트폴리오', st)];
      setDocs(next);
      saveIndex(next);
      openDoc(newId, st);
      try { localStorage.removeItem('pofo.presetId'); } catch { /* noop */ }
      setSelectedPresetId('');
      setShowOnboarding(true);
      return;
    }
    setDocs(() => { saveIndex(remaining); return remaining; });
    if (id === activeId) {
      const raw = loadDocRaw(remaining[0].id);
      openDoc(remaining[0].id, raw ? validateAndNormalizeState(raw) : createEmptyState());
    }
  };

  const [shareError, setShareError] = useState(false);

  // 공유 링크(#p=) 파싱
  useEffect(() => {
    const h = location.hash || '';
    const hasShareParam = /[#&]p=/.test(h);
    parseShareHash().then((shared) => {
      if (shared) {
        replaceState(shared);
        try {
          history.replaceState(null, '', location.pathname + location.search);
        } catch {
          /* noop */
        }
      } else if (hasShareParam) {
        setShareError(true);
        try {
          history.replaceState(null, '', location.pathname + location.search);
        } catch {
          /* noop */
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PortfolioContext.Provider value={{
      state,
      updateState,
      updateProfile,
      updateTheme,
      updateTarget,
      replaceState,
      resetState,
      resetContentOnly,
      undo,
      redo,
      canUndo,
      canRedo,
      currentStep,
      setCurrentStep,
      showGuide,
      setShowGuide,
      viewMode,
      setViewMode,
      selectedPresetId,
      setSelectedPresetId,
      showOnboarding,
      setShowOnboarding,
      saveError,
      saveStatus,
      shareError,
      dismissShareError: () => setShareError(false),
      showManual,
      setShowManual,
      docs,
      activeId,
      createDoc,
      switchDoc,
      renameDoc,
      duplicateDoc,
      deleteDoc,
      duplicateForCompany,
      importDoc,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
}
