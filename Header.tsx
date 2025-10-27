
import React, { useState } from 'react';
import Icon from './common/Icon';
import type { User } from '../types';

interface HeaderProps {
  onMenuClick: () => void;
}

const mockUser: User = {
  name: 'ADMIN',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
  email: 'admin@educonnect.com',
  level: 'Administrator'
};

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="flex items-center justify-between p-4 bg-card-bg shadow-sm flex-shrink-0">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="text-text-secondary md:hidden mr-4" aria-label="Open menu">
          <Icon name="menu" className="w-6 h-6" />
        </button>
        <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="search" className="w-5 h-5 text-gray-400" />
            </div>
            <input 
                type="text" 
                placeholder="Search for courses, skills, or mentors..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative text-text-secondary hover:text-primary p-2 rounded-full" aria-label="Notifications">
          <Icon name="notification" className="w-6 h-6" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        <div className="flex items-center space-x-2">
          <img src={mockUser.avatarUrl} alt={mockUser.name} className="w-10 h-10 rounded-full" />
          <div className="hidden md:block">
            <p className="font-semibold text-sm">{mockUser.name}</p>
            <p className="text-xs text-text-secondary">{mockUser.level}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;