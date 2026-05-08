import type { Metadata } from 'next';
import UserManagement from '../../../src/components/Admin/UserManagement';

export const metadata: Metadata = {
  title: 'User Management — Lungsod Arena Admin',
  description: 'Manage all registered users, roles, verification status, and account actions.',
};

export default function UsersPage() {
  return <UserManagement />;
}
