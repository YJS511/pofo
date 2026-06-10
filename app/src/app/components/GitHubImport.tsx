import { useState } from 'react';
import { Loader2, Github, Star, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolioState';

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  created_at: string;
  updated_at: string;
}

export function GitHubImport() {
  const { state, updateState } = usePortfolio();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const fetchRepos = async () => {
    if (!username.trim()) {
      setError('GitHub 사용자명을 입력해주세요');
      return;
    }

    setLoading(true);
    setError('');
    setRepos([]);

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('사용자를 찾을 수 없습니다');
        }
        throw new Error('저장소를 불러오는데 실패했습니다');
      }

      const data: GitHubRepo[] = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = (repo: GitHubRepo) => {
    const newProject = {
      name: repo.name,
      period: '',
      role: '',
      tech: repo.language || '',
      desc: repo.description || '',
      result: '',
      repo: repo.html_url,
      demo: '',
      stars: repo.stargazers_count
    };

    const exists = state.projects.some(p => p.repo === repo.html_url);
    if (exists) {
      setError('이미 추가된 프로젝트입니다');
      return;
    }

    updateState({
      projects: [...state.projects, newProject]
    });
  };

  const handleImportAll = () => {
    const newProjects = repos
      .filter(repo => !state.projects.some(p => p.repo === repo.html_url))
      .map(repo => ({
        name: repo.name,
        period: '',
        role: '',
        tech: repo.language || '',
        desc: repo.description || '',
        result: '',
        repo: repo.html_url,
        demo: '',
        stars: repo.stargazers_count
      }));

    if (newProjects.length === 0) {
      setError('추가할 새 프로젝트가 없습니다');
      return;
    }

    updateState({
      projects: [...state.projects, ...newProjects]
    });
  };

  return (
    <div className="mb-5 p-3.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-900/30 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
          🐙 GitHub에서 프로젝트 가져오기
        </span>
      </div>

      <div className="flex gap-1.5">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchRepos()}
          placeholder="사용자명 또는 github.com/user/repo"
          className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
        />
        <button
          onClick={fetchRepos}
          disabled={loading}
          className="h-8 px-3.5 text-xs font-semibold rounded-lg bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 flex-shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </>
          ) : (
            '불러오기'
          )}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {repos.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              {repos.length}개의 저장소
            </p>
            <button
              onClick={handleImportAll}
              className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              전체 추가
            </button>
          </div>

          <div className="max-h-[240px] overflow-y-auto space-y-1.5">
            {repos.map((repo) => {
              const isImported = state.projects.some(p => p.repo === repo.html_url);

              return (
                <div
                  key={repo.name}
                  className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h4 className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                          {repo.name}
                        </h4>
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center gap-0.5 text-[10px] text-gray-500 dark:text-gray-400">
                            <Star className="w-2.5 h-2.5" />
                            {repo.stargazers_count}
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-1 mb-1.5">
                        {repo.description || '설명 없음'}
                      </p>
                      {repo.language && (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleImport(repo)}
                      disabled={isImported}
                      className={`h-7 px-2.5 text-[11px] font-semibold rounded-md transition-colors flex-shrink-0 ${
                        isImported
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                          : 'bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100'
                      }`}
                    >
                      {isImported ? '추가됨' : '추가'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
