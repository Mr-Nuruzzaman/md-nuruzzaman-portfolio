import type { MetadataRoute } from 'next';
import { profile } from '@/data/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.brandName} — ${profile.title}`,
    short_name: profile.brandName,
    description: profile.positioning,
    start_url: '/',
    display: 'browser',
    background_color: '#0E0D0B',
    theme_color: '#0E0D0B',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  };
}
