import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioState } from '../types';
import { parseShareHash } from '../utils/export';

interface PortfolioContextType {
  state: PortfolioState;
  updateState: (updates: Partial<PortfolioState>) => void;
  updateProfile: (updates: Partial<PortfolioState['profile']>) => void;
  updateTheme: (updates: Partial<PortfolioState['theme']>) => void;
  replaceState: (next: PortfolioState) => void;
  resetState: () => void;
  resetContentOnly: () => void;
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
  about: '',
  skills: '',
  tools: [],
  experience: [],
  projects: [],
  education: [],
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
  sectionOrder: ['skills', 'tools', 'experience', 'projects', 'education'],
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
  }

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
    about,
    skills,
    tools,
    experience,
    projects,
    education,
    custom,
    theme,
    sectionOrder,
    github,
  };
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortfolioState>(() => {
    if (typeof window === 'undefined') return createEmptyState();
    try {
      const saved = localStorage.getItem('pofo.state');
      return saved ? validateAndNormalizeState(JSON.parse(saved)) : createEmptyState();
    } catch {
      return createEmptyState();
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [showGuide, setShowGuide] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedPresetId, setSelectedPresetIdRaw] = useState(() => {
    try { return localStorage.getItem('pofo.presetId') || ''; } catch { return ''; }
  });
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try {
      if (localStorage.getItem('pofo.presetId')) return false;
      const saved = localStorage.getItem('pofo.state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.profile?.name) return false;
      }
      return true;
    } catch { return true; }
  });

  const setSelectedPresetId = (id: string) => {
    setSelectedPresetIdRaw(id);
    try { localStorage.setItem('pofo.presetId', id); } catch {}
  };

  useEffect(() => {
    try {
      localStorage.setItem('pofo.state', JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }, [state]);

  const updateState = (updates: Partial<PortfolioState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const updateProfile = (updates: Partial<PortfolioState['profile']>) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates }
    }));
  };

  const updateTheme = (updates: Partial<PortfolioState['theme']>) => {
    setState(prev => ({
      ...prev,
      theme: { ...prev.theme, ...updates }
    }));
  };

  const replaceState = (next: PortfolioState) => {
    setState(validateAndNormalizeState(next));
  };

  const resetState = () => setState(createEmptyState());

  const resetContentOnly = () => {
    setState(prev => ({ ...createEmptyState(), theme: prev.theme }));
  };

  // 공유 링크(#p=) 파싱
  useEffect(() => {
    parseShareHash().then((shared) => {
      if (shared) {
        replaceState(shared);
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
      replaceState,
      resetState,
      resetContentOnly,
      currentStep,
      setCurrentStep,
      showGuide,
      setShowGuide,
      viewMode,
      setViewMode,
      selectedPresetId,
      setSelectedPresetId,
      showOnboarding,
      setShowOnboarding
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
