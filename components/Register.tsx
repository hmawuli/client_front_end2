import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import AuthLayout from './AuthLayout';
import type { AuthContextType } from '../types';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    (authContext as AuthContextType).login();
    navigate('/dashboard');
  };

  return (
    <AuthLayout title="Create Your Account">
      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
            Email Address
          </label>
          <div className="mt-1">
            <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-base-100"/>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-secondary">
            Password
          </label>
          <div className="mt-1">
            <input id="password" name="password" type="password" required className="appearance-none block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-base-100"/>
          </div>
        </div>
        
         <div>
          <label htmlFor="confirm-password"  className="block text-sm font-medium text-text-secondary">
            Confirm Password
          </label>
          <div className="mt-1">
            <input id="confirm-password" name="confirm-password" type="password" required className="appearance-none block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-base-100"/>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-opacity"
          >
            Create Account
          </button>
        </div>
      </form>
        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
    </AuthLayout>
  );
};

export default Register;
