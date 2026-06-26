import { useState, useRef } from 'react';
import { ChevronDown, Check, X, ImagePlus, User, Mail, Lightbulb, Wrench, Box, Briefcase, Rocket, GraduationCap, Sparkles, Target } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { STEPS, TOOL_CATS, EXP_FIELDS, PROJ_FIELDS, EDU_FIELDS, LINK_FIELDS } from '../constants';
import { getDeptData } from '../departmentData';
import { RepeaterForm } from './RepeaterForm';
import { useDialog } from './Dialog';
import { IconControl } from './IconControl';
import { CustomSectionEditor } from './CustomSectionEditor';
import { SkillSuggestions } from './SkillSuggestions';
import { GitHubImport } from './GitHubImport';
import { Experience, Project, Education, Link, CustomSection } from '../types';
import type { DeptToolCat } from '../departmentData';

function ProjectImageUpload({ image, onChange }: { image: string; onChange: (v: string) => void }) {
  const { notify } = useDialog();
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { notify('5MB 이하의 이미지만 업로드할 수 있습니다.', 'error'); return; }
    try {
      const { compressImage } = await import('../utils/image');
      const dataUrl = await compressImage(file, 800);
      onChange(dataUrl);
    } catch {
      const reader = new FileReader();
      reader.onload = (ev) => onChange(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (image) {
    return (
      <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
        <img src={image} alt="프로젝트 스크린샷" className="w-full h-32 object-cover" />
        <button
          onClick={() => onChange('')}
          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors text-sm">
      <ImagePlus className="w-4 h-4" />
      스크린샷 추가 (2MB 이하)
      <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </label>
  );
}

const stepIconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-4 h-4 inline" />,
  User: <User className="w-4 h-4 inline" />,
  Mail: <Mail className="w-4 h-4 inline" />,
  Lightbulb: <Lightbulb className="w-4 h-4 inline" />,
  Wrench: <Wrench className="w-4 h-4 inline" />,
  Box: <Box className="w-4 h-4 inline" />,
  Briefcase: <Briefcase className="w-4 h-4 inline" />,
  Rocket: <Rocket className="w-4 h-4 inline" />,
  GraduationCap: <GraduationCap className="w-4 h-4 inline" />,
  Sparkles: <Sparkles className="w-4 h-4 inline" />,
};

function ToolEditor({ tools, onChange, cats }: { tools: string[]; onChange: (t: string[]) => void; cats: DeptToolCat[] }) {
  const [input, setInput] = useState('');

  const add = (name: string) => {
    const t = name.trim();
    if (t && !tools.includes(t)) onChange([...tools, t]);
  };
  const remove = (name: string) => onChange(tools.filter(t => t !== name));
  const toggle = (name: string) => tools.includes(name) ? remove(name) : add(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v.includes(',')) {
      v.split(',').forEach(s => add(s));
      setInput('');
    } else {
      setInput(v);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) { add(input); setInput(''); }
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKey}
        placeholder="도구명 입력 (쉼표 또는 Enter로 추가)"
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 text-sm"
      />

      {tools.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tools.map(t => (
            <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-800 dark:bg-white text-white dark:text-gray-900 text-xs font-medium">
              {t}
              <button onClick={() => remove(t)} className="hover:opacity-70"><X className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
      )}

      {cats.map(cat => (
        <div key={cat.name}>
          <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{cat.name}</h4>
          <div className="flex flex-wrap gap-2">
            {cat.items.map(tool => {
              const sel = tools.includes(tool);
              return (
                <button
                  key={tool}
                  onClick={() => toggle(tool)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all ${
                    sel
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

export function AccordionEditor() {
  const { state, updateProfile, updateState, updateTarget, selectedPresetId } = usePortfolio();
  const deptToolCats = getDeptData(selectedPresetId).toolCats;
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set([0]));

  const t = (s: string) => s?.trim().length > 0;
  const isStepComplete = (stepId: string): boolean => {
    switch (stepId) {
      case 'target':
        return t(state.target?.company);
      case 'profile':
        return t(state.profile.name) && t(state.profile.role);
      case 'contact':
        return t(state.profile.email) || t(state.profile.location);
      case 'about':
        return t(state.about);
      case 'skills':
        return t(state.skills);
      case 'tools':
        return state.tools.length > 0;
      case 'experience':
        return state.experience.length > 0;
      case 'projects':
        return state.projects.length > 0;
      case 'education':
        return state.education.length > 0;
      case 'custom':
        return state.custom && state.custom.length > 0;
      default:
        return false;
    }
  };

  // 지원 회사는 선택 항목이라 완성도 계산에서 제외
  const scored = STEPS.filter(s => s.id !== 'target');
  const completedCount = scored.filter(s => isStepComplete(s.id)).length;
  const totalCount = scored.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  const toggleStep = (index: number) => {
    const newOpenSteps = new Set(openSteps);
    if (newOpenSteps.has(index)) {
      newOpenSteps.delete(index);
    } else {
      newOpenSteps.add(index);
    }
    setOpenSteps(newOpenSteps);
  };

  const renderStepContent = (stepId: string, stepIndex: number) => {
    switch (stepId) {
      case 'target':
        return (
          <div className="space-y-4">
            <p className="text-[12.5px] text-gray-500 dark:text-gray-400 leading-relaxed -mt-1">
              지원할 회사·직무를 입력하면 미리보기 상단에 맞춤 배지와 지원 동기가 표시되고, 내보내기 파일명에도 회사명이 반영됩니다. <span className="text-gray-400 dark:text-gray-500">(선택 사항)</span>
            </p>
            <div>
              <input
                type="text"
                value={state.target?.company || ''}
                onChange={(e) => updateTarget({ company: e.target.value })}
                placeholder="지원 회사명 (예: 네이버)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              />
            </div>
            <div>
              <input
                type="text"
                value={state.target?.position || ''}
                onChange={(e) => updateTarget({ position: e.target.value })}
                placeholder="지원 직무 (예: 프론트엔드 개발)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              />
            </div>
            <div>
              <textarea
                value={state.target?.motivation || ''}
                onChange={(e) => updateTarget({ motivation: e.target.value })}
                placeholder="지원 동기 한 줄 (예: 사용자 중심 서비스를 함께 만들고 싶습니다)"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 resize-none"
              />
            </div>
            {state.target?.company && (
              <button
                onClick={() => updateTarget({ company: '', position: '', motivation: '' })}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                지원 회사 정보 지우기
              </button>
            )}
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4">
            <div>
              <IconControl />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <input
                type="text"
                value={state.profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                placeholder="이름 (예: 홍길동)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              />
            </div>
            <div>
              <input
                type="text"
                value={state.profile.role}
                onChange={(e) => updateProfile({ role: e.target.value })}
                placeholder="직무 (예: 프론트엔드 개발자)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              />
            </div>
            <div>
              <input
                type="text"
                value={state.profile.tagline}
                onChange={(e) => updateProfile({ tagline: e.target.value })}
                placeholder="한 줄 태그라인 (예: 사용자 경험에 진심인 개발자)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <input
                type="email"
                value={state.profile.email}
                onChange={(e) => updateProfile({ email: e.target.value })}
                placeholder="이메일 (예: me@example.com)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              />
            </div>
            <div>
              <input
                type="text"
                value={state.profile.location}
                onChange={(e) => updateProfile({ location: e.target.value })}
                placeholder="위치 (예: 서울, 대한민국)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              />
            </div>
            <div>
              <input
                type="text"
                value={state.profile.github}
                onChange={(e) => updateProfile({ github: e.target.value })}
                placeholder="GitHub (예: github.com/username)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              />
            </div>
            <div>
              <input
                type="text"
                value={state.profile.website}
                onChange={(e) => updateProfile({ website: e.target.value })}
                placeholder="웹사이트 (예: mysite.dev)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              />
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <RepeaterForm<Link>
                items={state.profile.links}
                fields={LINK_FIELDS}
                label="링크"
                onChange={(links) => updateProfile({ links })}
                emptyItem={{ label: '', url: '' }}
              />
            </div>
          </div>
        );

      case 'about':
        return (
          <div>
            <textarea
              value={state.about}
              onChange={(e) => updateState({ about: e.target.value })}
              placeholder="안녕하세요! 저는..."
              rows={6}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 resize-none"
            />
          </div>
        );

      case 'skills':
        return (
          <div>
            <input
              type="text"
              value={state.skills}
              onChange={(e) => updateState({ skills: e.target.value })}
              placeholder="React, TypeScript, Node.js (쉼표로 구분)"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            />

            {state.skills && (
              <div className="mt-4 flex flex-wrap gap-2">
                {state.skills.split(',').map((skill, idx) => {
                  const trimmed = skill.trim();
                  if (!trimmed) return null;
                  return (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-xs font-medium"
                    >
                      {trimmed}
                    </span>
                  );
                })}
              </div>
            )}

            <SkillSuggestions
              currentSkills={state.skills}
              onAdd={(skill) => {
                const newSkills = state.skills.trim()
                  ? `${state.skills.trim()}, ${skill}`
                  : skill;
                updateState({ skills: newSkills });
              }}
            />
          </div>
        );

      case 'tools':
        return <ToolEditor tools={state.tools} onChange={(tools) => updateState({ tools })} cats={deptToolCats} />;

      case 'experience':
        return (
          <div>
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

      case 'projects':
        return (
          <div>
            <GitHubImport />
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
                demo: '',
                image: ''
              }}
              renderExtra={(item, idx) => (
                <ProjectImageUpload
                  image={item.image}
                  onChange={(image) => {
                    const updated = [...state.projects];
                    updated[idx] = { ...updated[idx], image };
                    updateState({ projects: updated });
                  }}
                />
              )}
            />
          </div>
        );

      case 'education':
        return (
          <div>
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

      case 'custom':
        return (
          <div>
            <CustomSectionEditor
              sections={state.custom || []}
              onChange={(custom) => updateState({ custom })}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 scroll-pt-2 hide-scrollbar">
      {/* Completeness dashboard */}
      <div className="mb-4 p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">포트폴리오 완성도</span>
          <span className={`text-xs font-bold ${pct === 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>{pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${pct === 100 ? 'bg-green-500' : 'bg-gray-800 dark:bg-white'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {STEPS.map((step, index) => {
          const isOpen = openSteps.has(index);
          const isComplete = isStepComplete(step.id);

          return (
            <div
              key={step.id}
              data-step={index}
              className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all"
            >
              {/* Header */}
              <button
                onClick={() => toggleStep(index)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  isOpen
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors ${
                    isComplete
                      ? 'border-gray-800 dark:border-white bg-gray-800 dark:bg-white text-white dark:text-gray-900'
                      : 'border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600'
                  }`}
                >
                  {isComplete ? <Check className="w-3.5 h-3.5" /> : index + 1}
                </span>
                <span
                  className={`flex-1 text-sm font-semibold ${
                    isOpen
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {stepIconMap[step.icon]} {step.nav}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Content */}
              {isOpen && (
                <div className="px-4 py-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                  {renderStepContent(step.id, index)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
