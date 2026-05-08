'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { users, User, UserRole } from '../data/users';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage on load
    const savedUsername = localStorage.getItem('la_username');
    const savedRole = localStorage.getItem('la_role') as UserRole;
    const savedIsLoggedIn = localStorage.getItem('la_isLoggedIn') === 'true';

    if (savedIsLoggedIn && savedUsername) {
      const foundUser = users.find(u => u.username === savedUsername);
      if (foundUser) {
        setUser(foundUser);
        setIsLoggedIn(true);
      }
    }
    setIsLoading(false);
  }, []);

  // Protection Logic
  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn && pathname !== '/login') {
      router.push('/login');
    } else if (isLoggedIn && pathname === '/login') {
      if (user?.role === 'admin') router.push('/admin');
      else router.push('/user');
    }

    // Role-based route protection
    if (isLoggedIn) {
      if (pathname.startsWith('/admin') && user?.role !== 'admin') {
        router.push('/login'); // Or an access denied page
      }
      if (pathname.startsWith('/user') && user?.role !== 'user') {
        router.push('/login');
      }
    }
  }, [isLoggedIn, pathname, isLoading, user, router]);

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      setIsLoggedIn(true);
      localStorage.setItem('la_username', foundUser.username);
      localStorage.setItem('la_role', foundUser.role);
      localStorage.setItem('la_isLoggedIn', 'true');
      
      if (foundUser.role === 'admin') router.push('/admin');
      else router.push('/user');
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.clear();
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
