import React, { useState } from 'react';
import { X, User as UserIcon, Mail, Lock, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { User } from '../types/travel';
import { StorageService } from '../services/storageService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'register' && !name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg('Password should be at least 4 characters');
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: mode === 'register' ? name.trim() : email.split('@')[0],
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      savedDestinationIds: ['dest-goa', 'dest-manali'],
    };

    StorageService.setUser(newUser);
    setSuccessMsg(mode === 'register' ? 'Account created! Welcome to WanderWise.' : 'Welcome back!');
    
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 500);
  };

  const handleDemoLogin = () => {
    const demoUser = StorageService.loginDemoUser();
    setSuccessMsg('Logged in as Demo Traveler (Aarav Sharma)!');
    setTimeout(() => {
      onLoginSuccess(demoUser);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-teal-500/20 font-black">
            <UserIcon className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-white">
            {mode === 'login' ? 'Welcome Back!' : 'Join WanderWise'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login'
              ? 'Access your personalized ML travel recommendations & itineraries'
              : 'Create your account to save trips and get smart destination recommendations'}
          </p>
        </div>

        {/* 1-Click Demo Login */}
        <div className="mb-6 p-3.5 bg-teal-950/40 rounded-2xl border border-teal-500/30 text-center">
          <p className="text-[11px] font-semibold text-teal-300 mb-2">
            Evaluating the project or college demo?
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>1-Click Quick Demo Login</span>
          </button>
        </div>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 border-t border-slate-800" />
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Or {mode === 'login' ? 'Sign In' : 'Register'} with email</span>
          <div className="flex-1 border-t border-slate-800" />
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Patel"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@wanderwise.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer mt-2"
          >
            <span>{mode === 'login' ? 'Sign In to WanderWise' : 'Create My Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMsg('');
                }}
                className="font-bold text-teal-400 hover:underline cursor-pointer"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                }}
                className="font-bold text-teal-400 hover:underline cursor-pointer"
              >
                Log in here
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
