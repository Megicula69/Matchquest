import type { Metadata } from 'next';
import MatchmakingManagement from '../../../src/components/Admin/MatchmakingManagement';

export const metadata: Metadata = {
  title: 'Matchmaking Management — Lungsod Arena Admin',
  description: 'Monitor active matchmaking sessions, analyze queue times, and manage skill-based player matching.',
};

export default function MatchmakingPage() {
  return <MatchmakingManagement />;
}
