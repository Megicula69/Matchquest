"use client";

import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../src/components/Layout';
import { HomePage, FindPage, EventsPage, MePage, StoryPage } from '../src/views';
import { useLocalStorage } from '../src/hooks/useLocalStorage';
import { UserProfile } from '../src/types';
import onboardingStyles from '../src/components/Onboarding/Onboarding.module.css';

const Onboarding: React.FC<{ onComplete: (username: string, game: string) => void }> = ({ onComplete }) => {
  const [user, setUser] = useState('');
  const [game, setGame] = useState('');

  return (
    <div className={onboardingStyles.onboardingContainer}>
      <div className={onboardingStyles.onboardingCard}>
        <h1>ARENA ACCESS</h1>
        <div className={onboardingStyles.inputField}>
          <label>IDENTITY TAG</label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter username..."
          />
        </div>
        <div className={onboardingStyles.inputField}>
          <label>PRIMARY SPECIALIZATION</label>
          <select
            value={game}
            onChange={(e) => setGame(e.target.value)}
          >
            <option value="">Select a title...</option>
            <option value="Valorant">Valorant</option>
            <option value="League of Legends">League of Legends</option>
            <option value="CS:GO">CS:GO</option>
            <option value="Apex Legends">Apex Legends</option>
            <option value="Dota 2">Dota 2</option>
          </select>
        </div>
        <button
          className={onboardingStyles.enterBtn}
          disabled={!user || !game}
          onClick={() => onComplete(user, game)}
        >
          ENTER ARENA
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [profile, setProfile] = useLocalStorage<UserProfile | null>('mq_profile', null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!profile) {
    return (
      <Onboarding
        onComplete={(username, favoriteGame) => {
          setProfile({
            username,
            favoriteGame,
            arenaScore: 1000,
            rank: 'Bronze I',
            stats: { kda: '0.0', winRate: '0%', tournaments: 0, reputation: 100 },
            onboarded: true
          });
        }}
      />
    );
  }

  return (
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
  );
}
