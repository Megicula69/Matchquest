import type { Metadata } from 'next';
import SimulationManagement from '../../../src/components/Admin/SimulationManagement';

export const metadata: Metadata = {
  title: 'Student Simulation CMS — Lungsod Arena Admin',
  description: 'Manage interactive story chapters, branching dialogue, and student-life simulation assets.',
};

export default function SimulationPage() {
  return <SimulationManagement />;
}
