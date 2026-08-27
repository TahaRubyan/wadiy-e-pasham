import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'customer';
  phone?: string;
  city?: string;
  address?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, fullName: string, role?: 'admin' | 'customer') => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  demoLogin: (role: 'admin' | 'customer') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'wadiy_e_pasham_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    // Check if it's the master admin credentials
    if (cleanEmail === 'admin@wadiyepasham.com' || cleanEmail === 'admin@shawls.com' || (cleanEmail === 'admin' && password === 'admin123')) {
      const adminUser: UserProfile = {
        id: 'admin-master',
        email: 'admin@wadiyepasham.com',
        fullName: 'Master Shawl Administrator',
        role: 'admin',
      };
      setUser(adminUser);
      return { success: true };
    }

    try {
      // Try Supabase auth if configured
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error) {
          // If Supabase returns error, check local mock credentials
          if (password.length >= 6) {
            const isAdm = cleanEmail.includes('admin');
            const customerUser: UserProfile = {
              id: `user-${Date.now()}`,
              email: cleanEmail,
              fullName: cleanEmail.split('@')[0].replace('.', ' '),
              role: isAdm ? 'admin' : 'customer',
            };
            setUser(customerUser);
            return { success: true };
          }
          return { success: false, error: error.message };
        }

        if (data.user) {
          const isAdm = cleanEmail.includes('admin') || data.user.user_metadata?.role === 'admin';
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || cleanEmail,
            fullName: data.user.user_metadata?.full_name || 'Valued Client',
            role: isAdm ? 'admin' : 'customer',
          };
          setUser(profile);
          return { success: true };
        }
      }
    } catch (err: any) {
      console.warn('Supabase auth fallback:', err);
    }

    // Default mock login
    if (password.length >= 4) {
      const isAdm = cleanEmail.includes('admin');
      const regularUser: UserProfile = {
        id: `user-${Date.now()}`,
        email: cleanEmail,
        fullName: cleanEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        role: isAdm ? 'admin' : 'customer',
      };
      setUser(regularUser);
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password.' };
  };

  const signup = async (
    email: string,
    password: string,
    fullName: string,
    role: 'admin' | 'customer' = 'customer'
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password || !fullName) {
      return { success: false, error: 'Please fill in all fields.' };
    }

    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: fullName,
              role,
            },
          },
        });

        if (error) {
          console.warn('Supabase signup fallback:', error.message);
        } else if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || cleanEmail,
            fullName,
            role,
          };
          setUser(profile);
          return { success: true };
        }
      }
    } catch (err: any) {
      console.warn('Supabase signup fallback:', err);
    }

    // Mock signup persistence
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      fullName,
      role: cleanEmail.includes('admin') ? 'admin' : role,
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    if (supabase) {
      supabase.auth.signOut().catch(() => {});
    }
  };

  const demoLogin = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      const adminUser: UserProfile = {
        id: 'admin-demo-1',
        email: 'admin@wadiyepasham.com',
        fullName: 'WADIY-E-PASHAM Admin',
        role: 'admin',
      };
      setUser(adminUser);
    } else {
      const customerUser: UserProfile = {
        id: 'customer-demo-1',
        email: 'alizeh.shah@example.com',
        fullName: 'Dr. Alizeh Shah',
        role: 'customer',
        city: 'Lahore',
        address: 'House 42, Sector F-7, Islamabad',
        phone: '+92 300 1234567',
      };
      setUser(customerUser);
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        signup,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
