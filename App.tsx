
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import FindTutors from './components/FindTutors';
import DigitalLibrary from './components/DigitalLibrary';
import SkillMarketplace from './components/SkillMarketplace';
import ProfileHub from './components/ProfileHub';
import Rewards from './components/Rewards';
import type { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tutors':
        return <FindTutors />;
      case 'library':
        return <DigitalLibrary />;
      case 'marketplace':
        return <SkillMarketplace />;
      case 'profile':
        return <ProfileHub />;
      case 'rewards':
        return <Rewards />;
      default:
        return <Dashboard />;
    }
  }, [currentPage]);

  return (
    <div className="flex h-screen bg-background text-text-primary">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main key={currentPage} className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 animate-fadeIn">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;