import type { Metadata } from 'next';
import MediaManagement from '../../../src/components/Admin/MediaManagement';

export const metadata: Metadata = {
  title: 'Media Library — Lungsod Arena Admin',
  description: 'Manage tournament banners, simulation story assets, and promotional videos.',
};

export default function MediaPage() {
  return <MediaManagement />;
}
