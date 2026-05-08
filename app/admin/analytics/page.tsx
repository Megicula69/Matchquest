import type { Metadata } from 'next';
import AnalyticsManagement from '../../../src/components/Admin/AnalyticsManagement';

export const metadata: Metadata = {
  title: 'Platform Analytics — Lungsod Arena Admin',
  description: 'Monitor platform growth, user engagement, and real-time infrastructure health metrics.',
};

export default function AnalyticsPage() {
  return <AnalyticsManagement />;
}
