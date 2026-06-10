import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { STEPS, TOOL_CATS, EXP_FIELDS, PROJ_FIELDS, EDU_FIELDS, LINK_FIELDS } from '../constants';
import { getDeptData } from '../departmentData';
import { RepeaterForm } from './RepeaterForm';
import { IconControl } from './IconControl';
import { CustomSectionEditor } from './CustomSectionEditor';
import { SkillSuggestions } from './SkillSuggestions';
import { GitHubImport } from './GitHubImport';
import { Experience, Project, Education, Link, CustomSection } from '../types';

export function AccordionEditor() {
  const { state, updateProfile, updateState, selectedPresetId } = usePortfolio();
  const deptToolCats = getDeptData(selectedPresetId).toolCats;
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set([0]));

  const isStepComplete = (stepId: string): boolean => {
    switch (stepId) {
      case 'profile':
        return !!(state.profile.name && state.profile.role);
      case 'contact':
        return !!(state.profile.email || state.profile.location);
      case 'about':
        return !!state.about;
      case 'skills':
        return !!state.skills;
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
        return (
          <div className="space-y-4">
            {deptToolCats.map((category) => (
              <div key={category.name}>
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
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
                demo: ''
              }}
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
                  {step.emoji} {step.nav}
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
