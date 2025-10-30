import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PageContext, AuthContext } from '../App';
import Editor from './Editor';
import Analytics from './Analytics';
import { EyeIcon, ChartPieIcon, PencilSquareIcon, CheckCircleIcon, ArrowLeftOnRectangleIcon } from './icons';
import type { PageContextType, AuthContextType } from '../types';


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'analytics'>('editor');
  const pageContext = useContext(PageContext);
  const authContext = useContext(AuthContext);

  if (!pageContext || !authContext) return null;

  const { content } = pageContext;
  const { logout } = authContext;

  const TabButton: React.FC<{ tabName: 'editor' | 'analytics'; icon: React.ReactNode; children: React.ReactNode }> = ({ tabName, icon, children }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg transition-colors ${
        activeTab === tabName ? 'bg-primary/20 text-primary' : 'hover:bg-base-300'
      }`}
    >
      {icon}
      <span className="font-medium">{children}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-base-200 text-text-primary font-sans">
      <aside className="w-64 bg-base-100 p-4 border-r border-base-300 flex flex-col">
        <div className="text-2xl font-bold text-primary mb-8">{content.logo}</div>
        <nav className="flex flex-col space-y-2">
          <TabButton tabName="editor" icon={<PencilSquareIcon />}>Page Editor</TabButton>
          <TabButton tabName="analytics" icon={<ChartPieIcon />}>Analytics</TabButton>
        </nav>
        <div className="mt-auto">
          <Link to="/public" target="_blank" className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg transition-colors hover:bg-base-300 text-text-secondary">
             <EyeIcon />
            <span className="font-medium">View Public Page</span>
          </Link>
           <button onClick={logout} className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg transition-colors hover:bg-base-300 text-text-secondary">
             <ArrowLeftOnRectangleIcon />
            <span className="font-medium">Logout</span>
          </button>
          <button className="flex items-center space-x-3 mt-4 px-4 py-3 w-full text-left rounded-lg transition-colors bg-accent text-white hover:bg-accent/90">
            <CheckCircleIcon />
            <span className="font-medium">Publish Changes</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {activeTab === 'editor' && <Editor />}
        {activeTab === 'analytics' && <Analytics />}
      </main>
    </div>
  );
};

export default Dashboard;