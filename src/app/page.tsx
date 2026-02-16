import { Suspense } from 'react';
import { fetchGovernedAssets } from '@/features/governance/actions';
import { GovernedAsset } from '@/features/governance/types';
import GovernanceGallery from '@/features/governance/GovernanceGallery';
import UploadCardClient from '@/features/governance/UploadCardClient';

/**
 * Main Governance Lab Page.
 * Rule 3.1: Initialize promises early to eliminate waterfalls.
 */
export default async function GovernancePage() {
  const assetsPromise = fetchGovernedAssets();

  return (
    <main className='max-w-7xl mx-auto px-6 py-20 space-y-24'>
      <section>
        <UploadCardClient />
      </section>

      <section className='space-y-12'>
        <h2 className='text-4xl font-bold text-white text-center tracking-tight'>
          Audited Asset Library
        </h2>

        {/* Suspense isolates the API call from the initial shell render */}
        <Suspense
          fallback={<div className='grid grid-cols-3 gap-8 animate-pulse' />}
        >
          <GalleryWrapper promise={assetsPromise} />
        </Suspense>
      </section>
    </main>
  );
}

/**
 * Typed Wrapper for the Gallery.
 * Rule 5.1: Zero-Inference typing for shared logic.
 */
async function GalleryWrapper({
  promise,
}: {
  promise: Promise<GovernedAsset[]>;
}) {
  const assets = await promise;

  if (assets.length === 0) {
    return (
      <div className='text-center py-32 border border-dashed border-slate-800 rounded-[3rem] bg-slate-900/10'>
        <p className='text-slate-500 font-medium'>
          No assets found in the governance lab.
        </p>
        <p className='text-xs text-slate-600 mt-2'>
          The AI agent is ready for your first upload.
        </p>
      </div>
    );
  }

  return <GovernanceGallery assets={assets} />;
}
