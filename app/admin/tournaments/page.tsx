import type { Metadata } from 'next';
import TournamentManagement from '../../../src/components/Admin/TournamentManagement';

export const metadata: Metadata = {
  title: 'Tournament Management — Lungsod Arena Admin',
  description: 'Organize and manage e-sports tournaments, brackets, and live matches.',
};

export default function TournamentsPage() {
  return <TournamentManagement />;
}
