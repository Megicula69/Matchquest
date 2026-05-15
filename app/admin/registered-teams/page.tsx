import RegisteredTeams from '../../../src/components/Admin/RegisteredTeams';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registered Teams — Admin',
  description: 'View all teams registered via the Events page',
};

export default function Page() {
  return <RegisteredTeams />;
}
