'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Mock user database
const USERS = {
  'admin@company.com': {
    password: 'admin123',
    role: 'admin'
  },
  'employee@company.com': {
    password: 'employee123',
    role: 'employee'
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const user = USERS[email as keyof typeof USERS];
    if (user && user.password === password) {
      // Store user data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', user.role);
      
      router.push('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="relative h-16 w-64 mx-auto">
          <Image
            src="/accord-logo.png"
            alt="Accord Plastics"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 256px"
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#002B5C]">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#002B5C] focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#002B5C] focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#002B5C] hover:bg-[#003872] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002B5C] transition-colors duration-200 shadow-sm"
            >
              Sign in
            </button>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <p>Demo Accounts:</p>
            <p>Admin: admin@company.com / admin123</p>
            <p>Employee: employee@company.com / employee123</p>
          </div>
        </form>
      </div>
    </div>
  );
} 