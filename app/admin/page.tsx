import type { Metadata } from 'next';
import AdminDashboard from '../../src/components/Admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Lungsod Arena — Admin Dashboard',
  description:
    'E-sports management dashboard for Lungsod Arena. Monitor tournaments, users, matchmaking, and campus gaming activities.',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
