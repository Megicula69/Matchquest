import type { Metadata } from 'next';
import SettingsManagement from '../../../src/components/Admin/SettingsManagement';

export const metadata: Metadata = {
  title: 'System Settings — Lungsod Arena Admin',
  description: 'Configure platform algorithms, manage themes, security settings, and external API integrations.',
};

export default function SettingsPage() {
  return <SettingsManagement />;
}
