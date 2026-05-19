import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-bebas text-8xl text-[#D4FF00]/30 leading-none mb-2">404</p>
      <h1 className="font-bebas text-3xl text-white mb-2">Page not found</h1>
      <p className="text-white/50 text-sm max-w-md mb-8">The page you are looking for does not exist or was moved.</p>
      <Link href="/" className="btn-primary py-2.5 px-6 text-sm inline-block">
        Back to home
      </Link>
    </div>
  );
}
