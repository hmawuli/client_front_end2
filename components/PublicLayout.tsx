import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PageContext } from '../App';
import EditableText from './EditableText';
import type { PageContextType } from '../types';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const context = useContext(PageContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { content, setContent, isEditing } = context;

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
      isActive ? 'bg-primary/10 text-primary' : 'hover:bg-base-300'
    }`;

  return (
    <div className="bg-base-100 text-text-primary font-sans flex flex-col min-h-screen">
      <header className="py-4 px-8 border-b border-base-300 sticky top-0 bg-base-100/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/public">
            <EditableText
              isEditing={isEditing}
              value={content.logo}
              onSave={(value) => setContent(prev => ({...prev, logo: value}))}
              className="text-2xl font-bold text-primary"
            />
          </Link>
          <nav className="flex items-center space-x-2">
            <NavLink to="/public" end className={navLinkClasses}>Home</NavLink>
            <NavLink to="/about" className={navLinkClasses}>About</NavLink>
            <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
          </nav>
        </div>
      </header>

      <div className="flex-grow">
        {children}
      </div>

      <footer className="bg-base-200 py-10 px-8 text-text-secondary border-t border-base-300">
        <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center space-x-6 mb-4">
                <Link to="/public" className="hover:text-primary transition-colors">Home</Link>
                <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} {content.logo}. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;