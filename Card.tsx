
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-card-bg rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
