
import React from 'react';
import Icon from './common/Icon';
import type { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <li
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive
          ? 'bg-primary text-white shadow-lg'
          : 'text-text-secondary hover:bg-gray-200 hover:text-text-primary'
      }`}
      onClick={onClick}
    >
      <Icon name={icon} className="w-6 h-6 mr-4" />
      <span className="font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen, setOpen }) => {
  const navItems: { id: Page; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'tutors', label: 'Find Tutors', icon: 'tutors' },
    { id: 'library', label: 'Digital Library', icon: 'library' },
    { id: 'marketplace', label: 'Skill Marketplace', icon: 'marketplace' },
    { id: 'profile', label: 'Profile Hub', icon: 'profile' },
    { id: 'rewards', label: 'Rewards & Aid', icon: 'rewards' },
  ];

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    setOpen(false);
  };

  return (
    <>
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)}></div>
        <aside className={`absolute md:relative z-40 md:z-auto flex flex-col w-64 bg-card-bg h-full shadow-lg md:shadow-none transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="flex items-center justify-center h-20 border-b">
                <h1 className="text-2xl font-bold text-primary">Edu-Connect</h1>
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul>
                {navItems.map((item) => (
                    <NavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    isActive={currentPage === item.id}
                    onClick={() => handleNavigation(item.id)}
                    />
                ))}
                </ul>
            </nav>
            <div className="p-4 border-t">
                <NavItem icon="logout" label="Logout" isActive={false} onClick={() => alert('Logged out!')} />
            </div>
        </aside>
    </>
  );
};

export default Sidebar;
