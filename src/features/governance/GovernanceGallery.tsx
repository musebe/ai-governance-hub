'use client';

import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { GovernedAsset } from './types';

/**
 * Feature: Governance Gallery with Auto-Polling
 * Rule 5.1: Uses immutable sorting and automated state synchronization.
 */
export default function GovernanceGallery({
  assets,
}: {
  assets: GovernedAsset[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition(); // Cleaned: Removed unused isPending

  // Check if any asset is still awaiting AI analysis from MediaFlows
  const isStillProcessing = assets.some(
    (asset) =>
      asset.tags.includes('governance_scan_pending') &&
      !asset.tags.includes('status_approved') &&
      !asset.tags.includes('status_rejected'),
  );

  useEffect(() => {
    if (!isStillProcessing) return;

    const interval = setInterval(() => {
      startTransition(() => {
        router.refresh(); // Rule 2.2: Re-fetches fresh data from fetchGovernedAssets
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isStillProcessing, router]);

  const sortedAssets = assets.toSorted(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
      {sortedAssets.map((asset) => (
        <div
          key={asset.public_id}
          className='group relative aspect-square rounded-[2rem] overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl transition-all hover:border-blue-500/50'
        >
          <CldImage
            width='600'
            height='600'
            src={asset.public_id}
            alt='Audited Asset'
            crop='fill'
            gravity='auto'
            className={`w-full h-full object-cover transition-all duration-700 ${
              asset.tags.includes('governance_scan_pending') &&
              !asset.tags.includes('status_approved')
                ? 'blur-md grayscale opacity-50 scale-105'
                : 'blur-0 grayscale-0 opacity-100 scale-100'
            }`}
          />

          <div className='absolute top-6 right-6 flex flex-col gap-2 items-end'>
            <StatusBadge asset={asset} />
            {asset.tags.includes('governance_scan_pending') &&
              !asset.tags.includes('status_approved') && (
                <div className='flex items-center gap-2 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20 backdrop-blur-md'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full animate-ping' />
                  <span className='text-[10px] text-blue-400 font-bold uppercase tracking-widest'>
                    AI Analyzing
                  </span>
                </div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ asset }: { asset: GovernedAsset }) {
  const isApproved = asset.tags.includes('status_approved');
  const isRejected = asset.tags.includes('status_rejected');

  if (!isApproved && !isRejected) return null;

  return (
    <span
      className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-lg backdrop-blur-md ${
        isApproved
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50'
          : 'bg-rose-500/10 text-rose-400 border-rose-500/50'
      }`}
    >
      {isApproved ? 'Approved' : 'Rejected'}
    </span>
  );
}
