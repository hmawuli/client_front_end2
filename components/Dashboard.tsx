import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContext, AuthContext } from '../App';
import Editor from './Editor';
import Analytics from './Analytics';
import { EyeIcon, ChartPieIcon, PencilSquareIcon, CheckCircleIcon, ArrowLeftOnRectangleIcon, CloudArrowUpIcon, ExclamationTriangleIcon } from './icons';
import type { PageContextType, AuthContextType, PageContent, Theme } from '../types';


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'analytics'>('editor');
  const pageContext = useContext(PageContext);
  const authContext = useContext(AuthContext);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  
  const [savedContent, setSavedContent] = useState<PageContent | null>(null);
  const [savedTheme, setSavedTheme] = useState<Theme | null>(null);

  useEffect(() => {
      if (pageContext) {
        if (!savedContent) {
          // Initialize saved state on first render
          setSavedContent(JSON.parse(JSON.stringify(pageContext.content)));
          setSavedTheme(JSON.parse(JSON.stringify(pageContext.theme)));
        } else {
          const contentChanged = JSON.stringify(pageContext.content) !== JSON.stringify(savedContent);
          const themeChanged = JSON.stringify(pageContext.theme) !== JSON.stringify(savedTheme);
          if (contentChanged || themeChanged) {
              setHasUnsavedChanges(true);
              setIsPublished(false); // New changes exist after a publish
          }
        }
      }
  }, [pageContext, pageContext?.content, pageContext?.theme, savedContent, savedTheme]);


  if (!pageContext || !authContext) return null;

  const { content, theme } = pageContext;
  const { logout } = authContext;

  const handlePublish = () => {
    setIsPublishing(true);
    setShowConfirmModal(false);

    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      setHasUnsavedChanges(false);
      
      // "Save" the current state by updating the saved snapshots
      setSavedContent(JSON.parse(JSON.stringify(content)));
      setSavedTheme(JSON.parse(JSON.stringify(theme)));

      // Reset the "Published!" message after a few seconds
      setTimeout(() => {
        setIsPublished(false);
      }, 3000);
    }, 1500);
  };

  const getPublishButtonContent = () => {
      if (isPublishing) {
          return (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-medium">Publishing...</span>
              </>
          );
      }
      if (isPublished) {
          return (
              <>
                <CheckCircleIcon />
                <span className="font-medium">Published!</span>
              </>
          );
      }
      return (
          <>
            <CloudArrowUpIcon />
            <span className="font-medium">Publish Changes</span>
          </>
      );
  };

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
    <>
      <div className="flex h-screen bg-base-200 text-text-primary font-sans">
        <aside className="w-64 bg-base-100 p-4 border-r border-base-300 flex flex-col">
          <div className="text-2xl font-bold text-primary mb-8">{content.logo}</div>
          <nav className="flex flex-col space-y-2">
            <TabButton tabName="editor" icon={<PencilSquareIcon />}>Page Editor</TabButton>
            <TabButton tabName="analytics" icon={<ChartPieIcon />}>Analytics</TabButton>
          </nav>
          <div className="mt-auto">
            <button onClick={logout} className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg transition-colors hover:bg-base-300 text-text-secondary">
               <ArrowLeftOnRectangleIcon />
              <span className="font-medium">Logout</span>
            </button>
            <Link to="/public" target="_blank" className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg transition-colors hover:bg-base-300 text-text-secondary">
               <EyeIcon />
              <span className="font-medium">View Public Page</span>
            </Link>
            <button
                onClick={() => setShowConfirmModal(true)}
                disabled={!hasUnsavedChanges || isPublishing}
                className={`flex items-center justify-center space-x-3 mt-4 px-4 py-3 w-full rounded-lg transition-all duration-300 text-white ${
                    isPublished ? 'bg-green-500' :
                    hasUnsavedChanges ? 'bg-accent hover:bg-accent/90 animate-pulse' : 'bg-accent/50 cursor-not-allowed'
                }`}
            >
                {getPublishButtonContent()}
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          {activeTab === 'editor' && <Editor />}
          {activeTab === 'analytics' && <Analytics />}
        </main>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
            <div className="bg-base-100 rounded-lg shadow-2xl p-6 max-w-md w-full">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                       <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-bold text-text-primary" id="modal-title">
                            Publish Changes
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-text-secondary">
                                Are you sure you want to make these changes live? This action cannot be undone.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        onClick={handlePublish}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent text-base font-medium text-white hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                    >
                        Confirm Publish
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowConfirmModal(false)}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-base-300 shadow-sm px-4 py-2 bg-base-100 text-base font-medium text-text-primary hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;