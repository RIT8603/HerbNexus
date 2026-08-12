"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, UserRole } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAtLeast: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const roleHierarchy: Record<UserRole, number> = {
  PUBLIC: 0,
  OBSERVER: 1,
  EXPERT: 2,
  RESEARCHER: 3,
  CONSERVATION_AUTHORITY: 4,
  ADMIN: 5,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load auth state from localStorage on mount
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        setAuthState({
          user: JSON.parse(user),
          token,
          isAuthenticated: true,
        });
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Basic mock implementation for now, should connect to backend API
    const mockUser: User = {
      id: '1',
      email,
      full_name: 'Mock User',
      role: 'OBSERVER',
      is_active: true,
      created_at: new Date().toISOString(),
    };
    const mockToken = 'mock-jwt-token';
    
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    setAuthState({
      user: mockUser,
      token: mockToken,
      isAuthenticated: true,
    });
  };

  const register = async (email: string, password: string, fullName: string) => {
    // Basic mock implementation for now
    const mockUser: User = {
      id: '1',
      email,
      full_name: fullName,
      role: 'OBSERVER',
      is_active: true,
      created_at: new Date().toISOString(),
    };
    const mockToken = 'mock-jwt-token';
    
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    setAuthState({
      user: mockUser,
      token: mockToken,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  const isAtLeast = (role: UserRole) => {
    if (!authState.user) return false;
    return roleHierarchy[authState.user.role] >= roleHierarchy[role];
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, isLoading, isAtLeast }}>
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
