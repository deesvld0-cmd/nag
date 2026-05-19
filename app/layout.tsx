import './global.css';
import type { Metadata } from 'next';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'NANZAD FITNESS — Build Your Ultimate Physique',
  description: 'Elite training programs, expert coaches, and science-backed nutrition. Join 50,000+ athletes transforming their bodies with NANZAD FITNESS.',
  keywords: ['fitness', 'workout', 'gym', 'training', 'nutrition', 'bodybuilding'],
  openGraph: {
    title: 'NANZAD FITNESS',
    description: 'The world\'s most advanced fitness platform.',
    images: [{ url: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: '#0B0B0B', color: '#FFFFFF', fontFamily: "'Inter', sans-serif" }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
