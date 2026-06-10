import { useState, useMemo } from 'react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { getDeptData } from '../departmentData';

interface SkillSuggestionsProps {
  currentSkills: string;
  onAdd: (skill: string) => void;
}

export function SkillSuggestions({ currentSkills, onAdd }: SkillSuggestionsProps) {
  const { selectedPresetId } = usePortfolio();
  const [showAll, setShowAll] = useState(false);
  const LIMIT = 16;

  const skillList = useMemo(() => getDeptData(selectedPresetId).skills, [selectedPresetId]);

  const currentSet = new Set(
    currentSkills
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );

  const filtered = skillList.filter(
    (skill) => !currentSet.has(skill.toLowerCase())
  );

  const shown = showAll ? filtered : filtered.slice(0, LIMIT);
  const hasMore = filtered.length > LIMIT;

  return (
    <div className="mt-4">
      <span className="block text-[11.5px] text-gray-500 dark:text-gray-400 mb-2">
        추천 기술 — 클릭하면 추가돼요
      </span>
      <div className="flex flex-wrap gap-1.5">
        {shown.map((skill) => (
          <button
            key={skill}
            onClick={() => onAdd(skill)}
            className="h-[27px] px-2.5 rounded-md text-[12.5px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all whitespace-nowrap"
          >
            {skill}
          </button>
        ))}
        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="h-[27px] px-2.5 rounded-md text-[12.5px] font-medium bg-transparent border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-900 dark:hover:border-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-all whitespace-nowrap"
          >
            +{filtered.length - LIMIT}개 더
          </button>
        )}
      </div>
    </div>
  );
}
