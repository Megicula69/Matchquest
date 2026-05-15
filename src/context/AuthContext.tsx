'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { users, User } from '../data/users';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserProfile } from '../types';
import { createDefaultProfile } from '../data/profileDefaults';
import { initialStoryState } from '../data/storyDefaults';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  registerAccount: (account: RegisterAccountInput) => Promise<{ success: boolean; message?: string }>;
  registerTeam: (team: RegisterTeamInput) => Promise<{ success: boolean; message?: string }>;
  hasRegisteredTeam: (username: string) => boolean;
  getUserRegisteredTeamName: (username: string) => string | null;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterAccountInput {
  fullName: string;
  username: string;
  password: string;
}

interface RegisterTeamInput {
  teamName: string;
  captainUsername: string;
}

interface RegisteredTeam {
  teamName: string;
  captainUsername: string;
  roster: string[];
}

const REGISTERED_USERS_KEY = 'mq_registered_users';
const REGISTERED_TEAMS_KEY = 'mq_registered_teams';
const STORY_STATE_KEY = 'mq_story_state';
const AUTH_STORAGE_KEYS = ['la_username', 'la_role', 'la_isLoggedIn'];

function readStoredArray<T>(key: string): T[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue as T[] : [];
  } catch {
    return [];
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [registeredUsers, setRegisteredUsers] = useLocalStorage<User[]>(REGISTERED_USERS_KEY, []);
  const [registeredTeams, setRegisteredTeams] = useLocalStorage<RegisteredTeam[]>(REGISTERED_TEAMS_KEY, []);
  const [profiles, setProfiles] = useLocalStorage<Record<string, UserProfile>>('mq_profiles', {});
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const savedUsername = localStorage.getItem('la_username');
    const savedIsLoggedIn = localStorage.getItem('la_isLoggedIn') === 'true';
    if (!savedIsLoggedIn || !savedUsername) {
      return null;
    }

    const storedUsers = [...users, ...readStoredArray<User>(REGISTERED_USERS_KEY)];
    return storedUsers.find(userRecord => userRecord.username === savedUsername) ?? null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return localStorage.getItem('la_isLoggedIn') === 'true' && Boolean(localStorage.getItem('la_username'));
  });
  const [isLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const allUsers = [...users, ...registeredUsers];

  const ensureProfileExists = useCallback((userRecord: User) => {
    setProfiles(currentProfiles => {
      if (currentProfiles[userRecord.username]) {
        return currentProfiles;
      }

      return {
        ...currentProfiles,
        [userRecord.username]: createDefaultProfile(userRecord),
      };
    });
  }, [setProfiles]);

  const resetStoryState = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORY_STATE_KEY, JSON.stringify(initialStoryState));
    window.dispatchEvent(new CustomEvent(`local-storage-${STORY_STATE_KEY}`, { detail: initialStoryState }));
  }, []);

  useEffect(() => {
    if (user) {
      ensureProfileExists(user);
    }
  }, [user, ensureProfileExists]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isLoggedIn && pathname !== '/login') {
      router.push('/login');
    } else if (isLoggedIn && pathname === '/login') {
      if (user?.role === 'admin') router.push('/admin');
      else router.push('/user');
    }

    if (isLoggedIn) {
      if (pathname.startsWith('/admin') && user?.role !== 'admin') {
        router.push('/login');
      }
      if (pathname.startsWith('/user') && user?.role !== 'user') {
        router.push('/login');
      }
    }
  }, [isLoggedIn, pathname, isLoading, user, router]);

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = allUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      setIsLoggedIn(true);
      ensureProfileExists(foundUser);
      localStorage.setItem('la_username', foundUser.username);
      localStorage.setItem('la_role', foundUser.role);
      localStorage.setItem('la_isLoggedIn', 'true');

      if (foundUser.role === 'admin') router.push('/admin');
      else router.push('/user');

      return true;
    }

    return false;
  };

  const registerAccount = async ({ fullName, username, password }: RegisterAccountInput) => {
    const trimmedUsername = username.trim();
    const trimmedFullName = fullName.trim();

    if (!trimmedUsername || !password || !trimmedFullName) {
      return { success: false, message: 'Complete all registration fields.' };
    }

    const existingUser = allUsers.find(userRecord => userRecord.username.toLowerCase() === trimmedUsername.toLowerCase());
    if (existingUser) {
      return { success: false, message: 'That username is already taken.' };
    }

    const newUser: User = {
      username: trimmedUsername,
      password,
      role: 'user',
      fullName: trimmedFullName,
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    ensureProfileExists(newUser);
    resetStoryState();

    return { success: true };
  };

  const registerTeam = async ({ teamName, captainUsername }: RegisterTeamInput) => {
    const trimmedTeamName = teamName.trim();
    const trimmedCaptainUsername = captainUsername.trim();

    if (!trimmedTeamName || !trimmedCaptainUsername) {
      return { success: false, message: 'Complete all team registration fields.' };
    }

    const captainUser = allUsers.find(userRecord => userRecord.username.toLowerCase() === trimmedCaptainUsername.toLowerCase());
    if (!captainUser) {
      return { success: false, message: 'Create the captain account first, then register the team.' };
    }

    const existingTeam = registeredTeams.find(team => team.teamName.toLowerCase() === trimmedTeamName.toLowerCase());
    if (existingTeam) {
      return { success: false, message: 'That team name is already registered.' };
    }

    const newTeam: RegisteredTeam = {
      teamName: trimmedTeamName,
      captainUsername: trimmedCaptainUsername,
      roster: [trimmedCaptainUsername],
    };

    const updatedTeams = [...registeredTeams, newTeam];
    setRegisteredTeams(updatedTeams);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    AUTH_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
    router.push('/login');
  };

  const hasRegisteredTeam = (username: string) => {
    const userObj = allUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
    const fullName = userObj?.fullName;

    return registeredTeams.some(
      team => 
        team.captainUsername.toLowerCase() === username.toLowerCase() ||
        team.roster.some(m => 
          m.toLowerCase() === username.toLowerCase() || 
          (fullName && m.toLowerCase() === fullName.toLowerCase())
        )
    );
  };

  const getUserRegisteredTeamName = (username: string) => {
    const team = registeredTeams.find(
      entry => 
        entry.captainUsername.toLowerCase() === username.toLowerCase() ||
        entry.roster.some(m => m.toLowerCase() === username.toLowerCase())
    );

    return team?.teamName ?? null;
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, registerAccount, registerTeam, hasRegisteredTeam, getUserRegisteredTeamName, logout, isLoading }}>
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