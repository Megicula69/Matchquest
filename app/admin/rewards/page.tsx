import type { Metadata } from 'next';
import RewardsManagement from '../../../src/components/Admin/RewardsManagement';

export const metadata: Metadata = {
  title: 'Rewards & Achievements — Lungsod Arena Admin',
  description: 'Manage XP systems, badges, seasonal rewards, and student leaderboards.',
};

export default function RewardsPage() {
  return <RewardsManagement />;
}
