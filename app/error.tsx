'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-bebas text-4xl text-white mb-2">Something went wrong</h1>
      <p className="text-white/50 text-sm max-w-md mb-8">
        {error.message || 'An unexpected error occurred. You can try again or return home.'}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button type="button" onClick={() => reset()} className="btn-primary py-2.5 px-6 text-sm">
          Try again
        </button>
        <Link href="/" className="py-2.5 px-6 text-sm font-semibold text-white/70 border border-white/15 rounded-xl hover:bg-white/5 transition-colors">
          Home
        </Link>
      </div>
    </div>
  );
}
