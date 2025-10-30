
import React from 'react';
import PublicPage from './PublicPage';
import ThemeSelector from './ThemeSelector';


const Editor: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="w-80 bg-base-100 p-6 border-r border-base-300 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-text-primary">Customization</h2>
        <ThemeSelector />
        {/* Future controls can be added here */}
      </div>
      <div className="flex-1 bg-base-300 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto shadow-2xl">
          <PublicPage />
        </div>
      </div>
    </div>
  );
};

export default Editor;
