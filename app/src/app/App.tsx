import { PortfolioProvider, usePortfolio } from './hooks/usePortfolioState';
import { Topbar } from './components/Topbar';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { GuideOverlay } from './components/GuideOverlay';
import { DepartmentPicker } from './components/DepartmentPicker';

function AppContent() {
  const { showGuide, setShowGuide, showOnboarding } = usePortfolio();

  return (
    <>
      <div className="h-screen flex flex-col bg-white dark:bg-gray-950">
        <Topbar />
        <div className="flex-1 flex overflow-hidden">
          <Editor />
          <Preview />
        </div>
      </div>
      {showOnboarding && <DepartmentPicker />}
      {showGuide && !showOnboarding && <GuideOverlay onClose={() => setShowGuide(false)} />}
    </>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
