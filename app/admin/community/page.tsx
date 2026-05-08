import type { Metadata } from 'next';
import CommunityManagement from '../../../src/components/Admin/CommunityManagement';

export const metadata: Metadata = {
  title: 'Community Hub — Lungsod Arena Admin',
  description: 'Manage student organizations, moderate community posts, and coordinate campus gaming events.',
};

export default function CommunityPage() {
  return <CommunityManagement />;
}
