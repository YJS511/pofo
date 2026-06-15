import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-8">
        <div className="max-w-md text-center space-y-4">
          <div className="text-5xl">⚠️</div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            오류가 발생했습니다
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {this.state.error?.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }
}
