'use client';

import dynamic from 'next/dynamic';

/**
 * Client-only wrapper for the UploadCard.
 * Rule 3.2: Disables SSR to prevent Math.random() hydration mismatches.
 */
const DynamicUploadCard = dynamic(() => import('./UploadCard'), {
  ssr: false,
  loading: () => (
    <div className='h-40 animate-pulse bg-slate-900/50 rounded-2xl' />
  ),
});

export default function UploadCardClient() {
  return <DynamicUploadCard />;
}
