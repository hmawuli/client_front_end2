import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import { PageContent, Theme, PageContextType, AuthContextType } from './types';
import { INITIAL_PAGE_CONTENT, THEMES } from './constants';
import Dashboard from './components/Dashboard';
import PublicPage from './components/PublicPage';
import Login from './components/Login';
import Register from './components/Register';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

export const PageContext = createContext<PageContextType | null>(null);
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const RootRedirect: React.FC = () => {
    const authContext = useContext(AuthContext);
    return authContext?.isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}

const PageProvider: React.FC<{ children: React.ReactNode; isEditing?: boolean }> = ({ children, isEditing = false }) => {
  const [content, setContent] = useState<PageContent>(() => {
    try {
      const savedContent = window.localStorage.getItem('pageContent');
      return savedContent ? JSON.parse(savedContent) : INITIAL_PAGE_CONTENT;
    } catch (error) {
      console.error("Error reading page content from localStorage", error);
      return INITIAL_PAGE_CONTENT;
    }
  });
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const savedTheme = window.localStorage.getItem('pageTheme');
      return savedTheme ? JSON.parse(savedTheme) : THEMES[0];
    } catch (error) {
      console.error("Error reading page theme from localStorage", error);
      return THEMES[0];
    }
  });


  useEffect(() => {
    document.body.className = theme.className;
  }, [theme]);
  
  useEffect(() => {
    try {
        window.localStorage.setItem('pageContent', JSON.stringify(content));
    } catch (error) {
        console.error("Error saving page content to localStorage", error);
    }
  }, [content]);

  useEffect(() => {
    try {
        window.localStorage.setItem('pageTheme', JSON.stringify(theme));
    } catch (error) {
        console.error("Error saving page theme to localStorage", error);
    }
  }, [theme]);


  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <PageContext.Provider value={{ content, setContent, theme, setTheme, isEditing }}>
      {children}
    </PageContext.Provider>
  );
};


const App: React.FC = () => {
  const PageNotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-text-primary">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <div className="mt-8 space-x-4">
        <Link to="/" className="px-6 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
          Go Home
        </Link>
        <Link to="/public" className="px-6 py-2 bg-secondary text-white rounded-md hover:opacity-90 transition-opacity">
          View Public Page
        </Link>
      </div>
    </div>
  );

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={
              <PageProvider isEditing={true}>
                <Dashboard />
              </PageProvider>
            } />
          </Route>

          <Route path="/public" element={
             <PageProvider>
                <PublicPage />
             </PageProvider>
          } />
          <Route path="/about" element={
             <PageProvider>
                <AboutPage />
             </PageProvider>
          } />
          <Route path="/contact" element={
             <PageProvider>
                <ContactPage />
             </PageProvider>
          } />
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;