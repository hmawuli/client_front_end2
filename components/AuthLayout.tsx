import React from 'react';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8 text-text-primary">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-primary">
            WOW LOGBOOK
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold">
            {title}
          </h2>
        </div>
        <div className="bg-base-100 shadow-xl rounded-2xl p-8 space-y-6">
            {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
