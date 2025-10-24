import React from 'react';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-brand-brown text-brand-cream shadow-md">
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-center md:text-left">
          <span role="img" aria-label="egg" className="mr-3">🥚</span>
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;