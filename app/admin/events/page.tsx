import type { Metadata } from 'next';
import EventsManagement from '../../../src/components/Admin/EventsManagement';

export const metadata: Metadata = {
  title: 'Events & Attendance — Lungsod Arena Admin',
  description: 'Manage campus gaming events, community meetups, and track student attendance via QR codes.',
};

export default function EventsPage() {
  return <EventsManagement />;
}
