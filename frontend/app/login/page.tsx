'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { apiClient } from '@/lib/api';
import { saveToken } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post('/api/auth/login', {
        email,
        password
      });

      saveToken(response.data.access_token);
      await new Promise(resolve => setTimeout(resolve, 100));
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-12 px-4">
      {/* ULTRA DARK Blue Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#000208] via-[#00050f] to-black opacity-95" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a1929_1px,transparent_1px),linear-gradient(to_bottom,#0a1929_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Animated Dark Blue Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(15, 40, 90, 0.2) 0%, rgba(15, 40, 90, 0) 70%)',
            filter: 'blur(80px)',
            top: '-200px',
            left: '-150px',
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(20, 50, 100, 0.15) 0%, rgba(20, 50, 100, 0) 70%)',
            filter: 'blur(80px)',
            bottom: '-200px',
            right: '-150px',
          }}
          animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, delay: 3 }}
        />
      </div>

      <motion.div
        className="max-w-md w-full relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <Link
          href="/"
          className="group mb-8 inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors"
        >
          <div className="bg-[#00080f]/60 group-hover:bg-[#000c15]/80 border-2 border-blue-900/40 group-hover:border-blue-800/60 rounded-xl px-5 py-3 transition-all">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-bold">Back</span>
            </div>
          </div>
        </Link>

        {/* Login Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition duration-500" />

          <div className="relative bg-gradient-to-br from-[#00080f]/90 to-[#000510]/90 p-10 rounded-3xl border-2 border-blue-900/40 backdrop-blur-2xl">
            {/* Logo & Title */}
            <div className="text-center mb-10">
              <div className="relative inline-block mb-5">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-900/40 to-blue-800/40 rounded-2xl blur-lg" />
                <div className="relative bg-gradient-to-br from-[#000510] to-[#00080f] px-8 py-4 rounded-2xl border-2 border-blue-900/40">
                  <h1 className="text-4xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                      TODO
                    </span>
                    <span className="text-white ml-3 text-3xl">AI</span>
                  </h1>
                </div>
              </div>

              <h2 className="text-4xl font-black text-white mb-2">Welcome Back</h2>
              <p className="text-blue-200/80">Sign in to unlock AI-powered productivity</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-red-900/20 rounded-2xl blur-lg" />
                  <div className="relative bg-red-900/20 border-2 border-red-700/40 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-sm text-red-300 font-semibold">{error}</p>
                  </div>
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-black text-blue-200 mb-3 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-900/20 to-blue-800/20 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="relative w-full px-6 py-4 bg-[#00080f]/80 border-2 border-blue-900/40 rounded-xl text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-700/60 focus:bg-[#000c15]/90 transition-all backdrop-blur-sm font-medium"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-black text-blue-200 mb-3 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-900/20 to-blue-800/20 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="relative w-full px-6 py-4 bg-[#00080f]/80 border-2 border-blue-900/40 rounded-xl text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-700/60 focus:bg-[#000c15]/90 transition-all backdrop-blur-sm font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="group relative w-full py-5 text-white font-black text-lg rounded-2xl overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-blue-900/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      SIGNING IN...
                    </>
                  ) : (
                    'SIGN IN'
                  )}
                </span>
              </motion.button>
            </form>

            <p className="mt-8 text-center text-blue-200/70">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-300 hover:text-blue-200 font-black transition-colors">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
