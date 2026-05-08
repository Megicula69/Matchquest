import type { Metadata } from 'next';
import SecurityManagement from '../../../src/components/Admin/SecurityManagement';

export const metadata: Metadata = {
  title: 'Security Operations Center — Lungsod Arena Admin',
  description: 'Monitor real-time access logs, track security threats, and manage platform-wide session integrity.',
};

export default function SecurityPage() {
  return <SecurityManagement />;
}
