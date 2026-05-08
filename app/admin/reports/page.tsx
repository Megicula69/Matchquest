import type { Metadata } from 'next';
import ModerationManagement from '../../../src/components/Admin/ModerationManagement';

export const metadata: Metadata = {
  title: 'Reports & Moderation — Lungsod Arena Admin',
  description: 'Monitor player behavior, review evidence for toxic chat or cheating, and manage account bans.',
};

export default function ReportsPage() {
  return <ModerationManagement />;
}
