import { useMemo, useState } from 'react';
import { X, BookOpen } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { PORTFOLIO_PRESETS } from '../constants';
import type { PortfolioPreset } from '../portfolioPresets';

export function DepartmentPicker() {
  const { replaceState, setSelectedPresetId, setShowOnboarding, setShowGuide, setShowManual, state } = usePortfolio();

  const groups = useMemo(() => {
    const order: string[] = [];
    const map: Record<string, PortfolioPreset[]> = {};
    for (const pr of PORTFOLIO_PRESETS) {
      const dept = pr.department === '자유전공학과' ? '기타' : (pr.department || '기타');
      if (!map[dept]) { map[dept] = []; order.push(dept); }
      map[dept].push(pr);
    }
    const etcIdx = order.indexOf('기타');
    if (etcIdx >= 0) {
      order.splice(etcIdx, 1);
      order.push('기타');
    }
    return order.map(dept => ({ dept, presets: map[dept] }));
  }, []);

  const [activeTab, setActiveTab] = useState(groups[0]?.dept || '');

  const activePresets = useMemo(
    () => groups.find(g => g.dept === activeTab)?.presets || [],
    [groups, activeTab]
  );

  const handleSelect = (preset: PortfolioPreset) => {
    const merged: any = { ...state };

    if (preset.state.profile) {
      const mp = { ...merged.profile };
      const pp = preset.state.profile;
      for (const key of Object.keys(pp)) {
        if (key === 'links') {
          if (!mp.links || mp.links.length === 0) mp.links = (pp as any).links;
        } else {
          if (!mp[key]) mp[key] = (pp as any)[key];
        }
      }
      merged.profile = mp;
    }

    if (!merged.about && preset.state.about) merged.about = preset.state.about;
    if (!merged.skills && preset.state.skills) merged.skills = preset.state.skills;
    if ((!merged.tools || merged.tools.length === 0) && preset.state.tools) merged.tools = preset.state.tools;
    if ((!merged.experience || merged.experience.length === 0) && preset.state.experience) merged.experience = preset.state.experience;
    if ((!merged.projects || merged.projects.length === 0) && preset.state.projects) merged.projects = preset.state.projects;
    if ((!merged.education || merged.education.length === 0) && preset.state.education) merged.education = preset.state.education;
    if (preset.state.theme) merged.theme = { ...merged.theme, ...preset.state.theme };

    replaceState(merged);
    setSelectedPresetId(preset.id);
    setShowOnboarding(false);
    setShowGuide(true);
  };

  const handleSkip = () => {
    setSelectedPresetId('free_major');
    setShowOnboarding(false);
  };

  return (
    <div className="fixed inset-0 z-[160] bg-white dark:bg-gray-950 flex flex-col">
      {/* Header — 입력 도우미와 동일 스타일, 구분선 없음 */}
      <div className="flex items-center gap-4 px-7 py-5">
        <div className="flex items-center gap-2.5 font-bold text-[15px] text-gray-900 dark:text-white">
          <span className="w-6 h-6 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 grid place-items-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4h7a6 6 0 0 1 0 12H9V22H6V4Z" />
            </svg>
          </span>
          POFO
        </div>
        <div className="flex-1" />
        <button
          onClick={() => setShowManual(true)}
          className="h-8 px-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5 mr-1"
          title="사용 설명서"
        >
          <BookOpen className="w-4 h-4" />
          설명서
        </button>
        <button
          onClick={handleSkip}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="닫기"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start">
        <div className="max-w-[720px] w-full px-6 py-10">
          <div className="text-center mb-8">
            <div className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
              전공을 선택해주세요
            </div>
            <div className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">
              전공에 맞는 샘플 데이터와 추천 기술스택이 자동으로 설정됩니다.
            </div>
          </div>

          {/* 학부 탭 */}
          <div className="flex justify-center gap-1.5 mb-6">
            {groups.map(({ dept }) => (
              <button
                key={dept}
                onClick={() => setActiveTab(dept)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === dept
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* 전공 목록 */}
          <div className="grid grid-cols-2 gap-2">
            {activePresets.map((pr) => (
              <button
                key={pr.id}
                onClick={() => handleSelect(pr)}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 text-left transition-all hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-sm active:scale-[0.98]"
              >
                <span className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg flex-shrink-0">
                  {pr.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-gray-900 dark:text-white truncate">
                    {pr.name}
                  </span>
                  <span className="block text-[10.5px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5 line-clamp-2">
                    {pr.desc}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer — 입력 도우미와 동일 스타일 */}
      <div className="flex items-center justify-center gap-3 px-7 py-5 border-t border-gray-200 dark:border-gray-800">
        <div className="w-full max-w-[520px] flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            건너뛰기
          </button>
          <button
            onClick={handleSkip}
            className="h-11 px-6 rounded-xl text-sm font-semibold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            빈 템플릿으로 시작
          </button>
        </div>
      </div>
    </div>
  );
}
