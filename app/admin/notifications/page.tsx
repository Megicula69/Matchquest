import type { Metadata } from 'next';
import NotificationManagement from '../../../src/components/Admin/NotificationManagement';

export const metadata: Metadata = {
  title: 'Notification Center — Lungsod Arena Admin',
  description: 'Manage platform-wide broadcasts, scheduled announcements, and push notifications for students.',
};

export default function NotificationsPage() {
  return <NotificationManagement />;
}
