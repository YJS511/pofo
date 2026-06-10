import { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, ArrowRight, Notebook } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { GUIDE_STEPS, GuideStep, EXP_FIELDS, PROJ_FIELDS, EDU_FIELDS, LINK_FIELDS } from '../constants';
import { getDeptData } from '../departmentData';
import { IconControl } from './IconControl';
import { SkillSuggestions } from './SkillSuggestions';
import { RepeaterForm } from './RepeaterForm';
import { CustomSectionEditor } from './CustomSectionEditor';
import { Experience, Project, Education, Link, CustomSection } from '../types';

interface GuideOverlayProps {
  onClose: () => void;
}

const TEXT_PATHS = [
  'profile.name', 'profile.role', 'profile.tagline', 'profile.location',
  'profile.email', 'profile.github', 'profile.website', 'about', 'skills',
];

export function GuideOverlay({ onClose }: GuideOverlayProps) {
  const { state, updateProfile, updateState, selectedPresetId } = usePortfolio();
  const deptToolCats = getDeptData(selectedPresetId).toolCats;
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const currentStep = GUIDE_STEPS[currentIndex];
  const progress = Math.round((currentIndex / (GUIDE_STEPS.length - 1)) * 100);

  const getPathValue = (path: string): string => {
    const parts = path.split('.');
    let value: any = state;
    for (const key of parts) {
      if (value == null) return '';
      value = value[key];
    }
    return value == null ? '' : String(value);
  };

  const setPathValue = (path: string, value: string) => {
    const parts = path.split('.');
    if (parts[0] === 'profile') {
      updateProfile({ [parts[1]]: value });
    } else if (parts[0] === 'about') {
      updateState({ about: value });
    } else if (parts[0] === 'skills') {
      updateState({ skills: value });
    }
  };

  const [presetSnap] = useState<Record<string, string>>(() => {
    const snap: Record<string, string> = {};
    for (const p of TEXT_PATHS) {
      const parts = p.split('.');
      let v: any = state;
      for (const k of parts) { if (v == null) break; v = v[k]; }
      snap[p] = v == null ? '' : String(v);
    }
    return snap;
  });

  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const guideVal = (path: string) => drafts[path] ?? '';
  const guidePh = (path: string, fallback: string) => presetSnap[path] || fallback;
  const guideSet = (path: string, value: string) => {
    setDrafts(prev => ({ ...prev, [path]: value }));
  };

  const syncDrafts = () => {
    for (const [path, val] of Object.entries(drafts)) {
      if (val) setPathValue(path, val);
    }
  };

  const handleClose = () => {
    syncDrafts();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'TEXTAREA' && target.id !== 'g-input') return;
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, drafts]);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < GUIDE_STEPS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep.type === 'intro') {
      handleClose();
    } else {
      handleNext();
    }
  };

  const renderStepContent = () => {
    if (currentStep.type === 'intro') {
      return (
        <div className="guide-card" style={{ textAlign: 'center' }}>
          <div className="text-6xl mb-5">✨</div>
          <div className="text-[32px] font-extrabold leading-tight mb-3 tracking-tight">
            몇 가지 질문에 답하면<br />포트폴리오가 완성돼요
          </div>
          <div className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-7">
            한 항목씩 차근차근 안내해 드릴게요. 언제든 건너뛰거나 나갈 수 있어요.
          </div>
          <ul className="max-w-[300px] mx-auto text-left space-y-2">
            {['기본 정보 · 연락처 · 링크', '소개 · 기술 스택 · 도구', '경력 · 프로젝트 · 학력 · 커스텀'].map((text, idx) => (
              <li key={idx} className="flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-400">
                <span className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-xs text-gray-400 dark:text-gray-600 flex-shrink-0">
                  {idx + 1}
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (currentStep.type === 'done') {
      return (
        <div className="guide-card" style={{ textAlign: 'center' }}>
          <div className="text-[64px] mb-5">🎉</div>
          <div className="text-[32px] font-extrabold leading-tight mb-3 tracking-tight">
            입력을 마쳤어요!
          </div>
          <div className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
            미리보기에서 다듬거나 바로 내보낼 수 있어요.
          </div>
        </div>
      );
    }

    const kicker = (
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-gray-800 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-2 py-0.5 rounded">
          {currentIndex}/{GUIDE_STEPS.length - 2}
        </span>
        <span className="text-[13px] font-semibold tracking-wide text-gray-800 dark:text-gray-200">
          {currentStep.kicker}
        </span>
      </div>
    );

    let inputArea = null;

    if (currentStep.type === 'text' && currentStep.path) {
      inputArea = (
        <>
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id="g-input"
            type="text"
            value={guideVal(currentStep.path)}
            onChange={(e) => guideSet(currentStep.path!, e.target.value)}
            placeholder={guidePh(currentStep.path, currentStep.ph || '')}
            className="w-full bg-transparent border-none border-b-2 border-gray-300 dark:border-gray-700 px-0.5 py-2.5 text-2xl font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-gray-800 dark:focus:border-white transition-colors"
          />
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
            <kbd className="font-mono text-[11px] bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5">Enter ↵</kbd>
            <span>로 다음으로</span>
          </div>
        </>
      );
    }

    if (currentStep.type === 'textarea' && currentStep.path) {
      inputArea = (
        <>
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            id="g-input"
            value={guideVal(currentStep.path)}
            onChange={(e) => guideSet(currentStep.path!, e.target.value)}
            placeholder={guidePh(currentStep.path, currentStep.ph || '')}
            rows={6}
            className="w-full bg-transparent border-[1.5px] border-gray-300 dark:border-gray-700 rounded-xl px-4 py-4 text-lg font-normal text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 leading-relaxed min-h-[140px] resize-vertical focus:outline-none focus:border-gray-800 dark:focus:border-white transition-colors"
          />
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
            <kbd className="font-mono text-[11px] bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5">Enter ↵</kbd>
            <span>다음 ·</span>
            <kbd className="font-mono text-[11px] bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5">Shift + Enter</kbd>
            <span>줄바꿈</span>
          </div>
        </>
      );
    }

    if (currentStep.type === 'skills' && currentStep.path) {
      const skillsDraft = guideVal(currentStep.path);
      inputArea = (
        <>
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id="g-input"
            type="text"
            value={skillsDraft}
            onChange={(e) => guideSet(currentStep.path!, e.target.value)}
            placeholder={guidePh(currentStep.path, currentStep.ph || '')}
            className="w-full bg-transparent border-none border-b-2 border-gray-300 dark:border-gray-700 px-0.5 py-2.5 text-2xl font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-gray-800 dark:focus:border-white transition-colors"
          />
          {skillsDraft && (
            <div className="flex flex-wrap gap-2 mt-5">
              {skillsDraft.split(',').map((skill, idx) => {
                const trimmed = skill.trim();
                if (!trimmed) return null;
                return (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-xs font-medium"
                  >
                    {trimmed}
                  </span>
                );
              })}
            </div>
          )}
          <SkillSuggestions
            currentSkills={skillsDraft}
            onAdd={(skill) => {
              const next = skillsDraft.trim()
                ? `${skillsDraft.trim()}, ${skill}`
                : skill;
              guideSet(currentStep.path!, next);
            }}
          />
        </>
      );
    }

    if (currentStep.type === 'icon') {
      inputArea = (
        <div className="mt-2">
          <IconControl />
        </div>
      );
    }

    if (currentStep.type === 'tools') {
      inputArea = (
        <div className="space-y-5 mt-2">
          {deptToolCats.map((category) => (
            <div key={category.name}>
              <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">
                {category.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((tool) => {
                  const isSelected = state.tools.includes(tool);
                  return (
                    <button
                      key={tool}
                      onClick={() => {
                        const tools = isSelected
                          ? state.tools.filter((t) => t !== tool)
                          : [...state.tools, tool];
                        updateState({ tools });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all ${
                        isSelected
                          ? 'border-gray-800 dark:border-white bg-gray-800 dark:bg-white text-white dark:text-gray-900'
                          : 'border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600'
                      }`}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (currentStep.type === 'links') {
      inputArea = (
        <div className="mt-4">
          <RepeaterForm<Link>
            items={state.profile.links}
            fields={LINK_FIELDS}
            label="링크"
            onChange={(links) => updateProfile({ links })}
            emptyItem={{ label: '', url: '' }}
          />
        </div>
      );
    }

    if (currentStep.type === 'custom') {
      inputArea = (
        <div className="mt-4">
          <CustomSectionEditor
            sections={state.custom || []}
            onChange={(custom) => updateState({ custom })}
          />
        </div>
      );
    }

    if (currentStep.type === 'section' && currentStep.key) {
      if (currentStep.key === 'experience') {
        inputArea = (
          <div className="mt-4">
            <RepeaterForm<Experience>
              items={state.experience}
              fields={EXP_FIELDS}
              label="경력"
              onChange={(experience) => updateState({ experience })}
              emptyItem={{
                company: '',
                role: '',
                level: '',
                type: '',
                period: '',
                desc: ''
              }}
            />
          </div>
        );
      } else if (currentStep.key === 'projects') {
        inputArea = (
          <div className="mt-4">
            <RepeaterForm<Project>
              items={state.projects}
              fields={PROJ_FIELDS}
              label="프로젝트"
              onChange={(projects) => updateState({ projects })}
              emptyItem={{
                name: '',
                period: '',
                role: '',
                tech: '',
                desc: '',
                result: '',
                repo: '',
                demo: ''
              }}
            />
          </div>
        );
      } else if (currentStep.key === 'education') {
        inputArea = (
          <div className="mt-4">
            <RepeaterForm<Education>
              items={state.education}
              fields={EDU_FIELDS}
              label="학력"
              onChange={(education) => updateState({ education })}
              emptyItem={{
                school: '',
                degree: '',
                period: ''
              }}
            />
          </div>
        );
      }
    }

    return (
      <div className="guide-card w-full max-w-[620px] mx-auto px-7 py-10 pb-16">
        {kicker}
        <div className="text-[32px] font-extrabold leading-tight mb-3 tracking-tight text-gray-900 dark:text-white">
          {currentStep.q}
        </div>
        {currentStep.hint && (
          <div className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-7">
            {currentStep.hint}
          </div>
        )}
        {inputArea}
      </div>
    );
  };

  const renderFooter = () => {
    if (currentStep.type === 'intro') {
      return (
        <div className="w-full max-w-[620px] flex items-center gap-3">
          <button
            onClick={handleSkip}
            className="h-11 px-5 rounded-lg text-[15px] font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            나중에 직접 입력
          </button>
          <div className="flex-1" />
          <button
            onClick={handleNext}
            className="h-11 px-5 rounded-lg text-[15px] font-semibold bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            시작하기
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      );
    }

    if (currentStep.type === 'done') {
      return (
        <div className="w-full max-w-[620px] flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="h-11 px-5 rounded-lg text-[15px] font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            이전
          </button>
          <div className="flex-1" />
          <button
            onClick={handleClose}
            className="h-11 px-5 rounded-lg text-[15px] font-semibold bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            미리보기로 이동
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      );
    }

    const nextLabel = currentIndex === GUIDE_STEPS.length - 2 ? '완료' : '다음';

    return (
      <div className="w-full max-w-[620px] flex items-center gap-3">
        <button
          onClick={handlePrev}
          className="h-11 px-5 rounded-lg text-[15px] font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          이전
        </button>
        <div className="flex-1" />
        <button
          onClick={handleSkip}
          className="h-11 px-5 rounded-lg text-[15px] font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          건너뛰기
        </button>
        <button
          onClick={handleNext}
          className="h-11 px-5 rounded-lg text-[15px] font-semibold bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          {nextLabel}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[150] bg-white dark:bg-gray-950 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-4 px-7 py-5">
        <div className="flex items-center gap-2.5 font-bold text-[15px] text-gray-900 dark:text-white">
          <span className="w-6 h-6 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 grid place-items-center">
            <Notebook className="w-3.5 h-3.5" />
          </span>
          입력 도우미
        </div>
        <div className="flex-1 h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden max-w-[520px] mx-auto">
          <div
            className="h-full bg-gray-800 dark:bg-white rounded-full transition-all duration-350 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums min-w-[54px] text-right">
          {Math.min(currentIndex + 1, GUIDE_STEPS.length)} / {GUIDE_STEPS.length}
        </span>
        <button
          onClick={handleClose}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="나가기 (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start">
        {renderStepContent()}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-3 px-7 py-5 border-t border-gray-200 dark:border-gray-800">
        {renderFooter()}
      </div>
    </div>
  );
}
