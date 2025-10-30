
import React, { useContext } from 'react';
import { PageContext } from '../App';
import { THEMES } from '../constants';
import type { PageContextType } from '../types';

const ThemeSelector: React.FC = () => {
  const context = useContext(PageContext);

  if (!context) return null;

  const { theme, setTheme } = context;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-text-primary">Color Theme</h3>
      <div className="grid grid-cols-2 gap-4">
        {THEMES.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t)}
            className={`p-2 rounded-lg border-2 ${
              theme.name === t.name ? 'border-primary' : 'border-transparent'
            } hover:border-primary/50 transition-all`}
          >
            <div className="font-medium text-sm mb-2 text-text-primary">{t.name}</div>
            <div className="flex space-x-1 h-8 rounded overflow-hidden">
                <div style={{backgroundColor: t.colors.primary}} className="w-1/4"></div>
                <div style={{backgroundColor: t.colors.secondary}} className="w-1/4"></div>
                <div style={{backgroundColor: t.colors.accent}} className="w-1/4"></div>
                <div style={{backgroundColor: t.colors['base-100']}} className="w-1/4 border border-base-300"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
