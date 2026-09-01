import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rijan Regmi | Full-Stack Developer & Software Engineer',
    short_name: 'Rijan Regmi',
    description: 'Personal portfolio, technical certifications, and engineering showcase of Rijan Regmi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#9333ea',
    icons: [
      {
        src: '/assets/imgs/RJNnobg.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/imgs/RJN.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
