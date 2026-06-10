import { useMemo, useState } from 'react';
import { Notebook } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { PORTFOLIO_PRESETS } from '../constants';
import type { PortfolioPreset } from '../portfolioPresets';

export function DepartmentPicker() {
  const { replaceState, setSelectedPresetId, setShowOnboarding, setShowGuide, state } = usePortfolio();

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
      {/* Header */}
      <div className="flex items-center gap-3 px-7 py-5 border-b border-gray-200 dark:border-gray-800">
        <span className="w-7 h-7 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 grid place-items-center">
          <Notebook className="w-4 h-4" />
        </span>
        <span className="font-bold text-base text-gray-900 dark:text-white">POFO</span>
        <div className="flex-1" />
        <button
          onClick={handleSkip}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          건너뛰기
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-6 py-10">
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
    </div>
  );
}
