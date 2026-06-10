import { useState } from 'react';
import { PortfolioState } from '../types';
import { ExternalLink, Github } from 'lucide-react';

interface TabLayoutProps {
  state: PortfolioState;
  getCoverBackground: () => string;
}

export function TabLayout({ state, getCoverBackground }: TabLayoutProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // 섹션 레이블 맵핑
  const sectionLabels: Record<string, string> = {
    skills: '🛠️ 기술 스택',
    tools: '🧰 서비스 · 도구',
    experience: '💼 경력',
    projects: '🚀 프로젝트',
    education: '🎓 교육',
  };

  // 커스텀 섹션 추가
  (state.custom || []).forEach((cs) => {
    sectionLabels[`cs:${cs.id}`] = `${cs.emoji || '📌'} ${cs.title || '커스텀 섹션'}`;
  });

  // 섹션 순서 (sectionOrder가 있으면 사용, 없으면 기본 순서)
  const orderedSections = state.sectionOrder && state.sectionOrder.length > 0
    ? state.sectionOrder
    : ['skills', 'tools', 'experience', 'projects', 'education'];

  // 탭 데이터 생성 (내용이 있는 섹션만)
  const tabs = orderedSections.map((key) => ({
    key,
    label: sectionLabels[key] || key,
    content: renderSectionContent(key, state),
  })).filter((tab) => tab.content !== null);

  return (
    <div className={`mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-lg overflow-hidden ${
      state.theme.wide ? 'max-w-full' : 'max-w-4xl'
    }`}>
      {/* Cover */}
      {!state.theme.noCover && (
        <div
          className="h-52 w-full"
          style={{
            background: getCoverBackground()
          }}
        />
      )}

      {/* Content */}
      <div className="p-12">
        {/* Profile Header */}
        <div className="mb-8">
          {state.profile.iconImg || state.profile.emoji ? (
            <div className="mb-4">
              {state.profile.iconImg ? (
                <img
                  src={state.profile.iconImg}
                  alt="Profile"
                  className={`w-20 h-20 object-cover ${
                    state.profile.iconShape === 'circle' ? 'rounded-full' : 'rounded-xl'
                  }`}
                />
              ) : (
                <div className="text-6xl">{state.profile.emoji}</div>
              )}
            </div>
          ) : null}

          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            {state.profile.name || '이름 없음'}
          </h1>

          {state.profile.tagline && (
            <div className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {state.profile.tagline}
            </div>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {state.profile.role && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">직무</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {state.profile.role}
                </span>
              </div>
            )}
            {state.profile.location && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">위치</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {state.profile.location}
                </span>
              </div>
            )}
            {state.profile.email && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">이메일</span>
                <a
                  href={`mailto:${state.profile.email}`}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  {state.profile.email}
                </a>
              </div>
            )}
            {state.profile.github && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">GitHub</span>
                <a
                  href={state.profile.github.startsWith('http') ? state.profile.github : `https://${state.profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  {state.profile.github.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {state.profile.website && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">웹사이트</span>
                <a
                  href={state.profile.website.startsWith('http') ? state.profile.website : `https://${state.profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  {state.profile.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* About */}
        {state.about && (
          <div className="mb-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
            <div className="flex gap-3">
              <span className="text-2xl">💡</span>
              <div className="flex-1 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {state.about}
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        {tabs.length > 0 && (
          <>
            <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200 dark:border-gray-800">
              {tabs.map((tab, index) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTabIndex(index)}
                  className={`px-4 py-2 text-sm font-semibold transition-all border-b-2 -mb-px ${
                    activeTabIndex === index
                      ? 'border-gray-800 dark:border-white text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="animate-fadeIn">
              {tabs[activeTabIndex]?.content}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 섹션별 콘텐츠 렌더링
function renderSectionContent(key: string, state: PortfolioState) {
  if (key === 'skills') {
    if (!state.skills) return null;
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span>🛠️</span>
          <span>기술 스택</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {state.skills.split(',').map((skill, idx) => {
            const trimmed = skill.trim();
            if (!trimmed) return null;
            return (
              <span
                key={idx}
                className="px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-sm font-medium"
              >
                {trimmed}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  if (key === 'tools') {
    if (!state.tools || state.tools.length === 0) return null;
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span>🧰</span>
          <span>서비스 · 도구</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {state.tools.map((tool, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 text-sm font-medium"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (key === 'experience') {
    if (!state.experience || state.experience.length === 0) return null;
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span>💼</span>
          <span>경력</span>
        </h2>
        <div className="space-y-6">
          {state.experience.map((exp, idx) => (
            <div key={idx} className="border-l-2 border-gray-200 dark:border-gray-800 pl-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {exp.role || '직무'}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <span>{exp.company || '회사'}</span>
                    {exp.level && <span>· {exp.level}</span>}
                    {exp.type && (
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs">
                        {exp.type}
                      </span>
                    )}
                  </div>
                </div>
                {exp.period && (
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {exp.period}
                  </span>
                )}
              </div>
              {exp.desc && (
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {exp.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (key === 'projects') {
    if (!state.projects || state.projects.length === 0) return null;
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span>🚀</span>
          <span>프로젝트</span>
        </h2>
        <div className="space-y-6">
          {state.projects.map((proj, idx) => (
            <div key={idx} className="border-l-2 border-gray-200 dark:border-gray-800 pl-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {proj.name || '프로젝트'}
                </h3>
                {proj.period && (
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {proj.period}
                  </span>
                )}
              </div>
              {proj.role && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {proj.role}
                </div>
              )}
              {proj.desc && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-wrap">
                  {proj.desc}
                </p>
              )}
              {proj.result && (
                <div className="mb-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                  <div className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">
                    성과
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {proj.result}
                  </p>
                </div>
              )}
              {proj.tech && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {proj.tech.split(',').map((tech, i) => {
                    const trimmed = tech.trim();
                    if (!trimmed) return null;
                    return (
                      <span
                        key={i}
                        className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium"
                      >
                        {trimmed}
                      </span>
                    );
                  })}
                </div>
              )}
              <div className="flex gap-3">
                {proj.repo && (
                  <a
                    href={proj.repo.startsWith('http') ? proj.repo : `https://${proj.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {proj.demo && (
                  <a
                    href={proj.demo.startsWith('http') ? proj.demo : `https://${proj.demo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>데모</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (key === 'education') {
    if (!state.education || state.education.length === 0) return null;
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span>🎓</span>
          <span>교육</span>
        </h2>
        <div className="space-y-4">
          {state.education.map((edu, idx) => (
            <div key={idx} className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {edu.school || '학교'}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {edu.degree || '전공 / 학위'}
                </div>
              </div>
              {edu.period && (
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {edu.period}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 커스텀 섹션 처리
  if (key.startsWith('cs:')) {
    const csId = key.slice(3);
    const customSection = (state.custom || []).find((cs) => cs.id === csId);
    if (!customSection || !customSection.items || customSection.items.length === 0) return null;

    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span>{customSection.emoji || '📌'}</span>
          <span>{customSection.title || '커스텀 섹션'}</span>
        </h2>
        <div className="space-y-4">
          {customSection.items.map((item, idx) => {
            if (!item.title) return null;
            return (
              <div key={idx} className="border-l-2 border-gray-200 dark:border-gray-800 pl-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.sub && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.sub}
                      </div>
                    )}
                  </div>
                  {item.period && (
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {item.period}
                    </span>
                  )}
                </div>
                {item.desc && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {item.desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
