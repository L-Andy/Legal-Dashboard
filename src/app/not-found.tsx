'use client'

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex justify-center mb-8">
          <img src={'/assets/logo.png'} alt='Legal tracker' className='h-auto w-auto scale-75' />
        </div>

        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-primary mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link href="/dashboard" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
} 