'use client';

import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../../src/components/Layout';
import { HomePage, FindPage, EventsPage, MePage, StoryPage } from '../../src/views';
import { useLocalStorage } from '../../src/hooks/useLocalStorage';
import { UserProfile } from '../../src/types';

import { ThemeProvider } from '../../src/context/ThemeContext';

export default function MatchQuestDashboard() {
  const [profile, setProfile] = useLocalStorage<UserProfile | null>('mq_profile', null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize profile if not exists
    if (!profile) {
      setProfile({
        username: 'EliteGamer',
        favoriteGame: 'Valorant',
        arenaScore: 1000,
        rank: 'Bronze I',
        stats: { kda: '0.0', winRate: '0%', tournaments: 0, reputation: 100 },
        onboarded: true
      });
    }
  }, [profile, setProfile]);

  if (!mounted) return null;

  return (
    <ThemeProvider>
      <HashRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/find" element={<FindPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/me" element={<MePage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MainLayout>
      </HashRouter>
    </ThemeProvider>
  );
}
