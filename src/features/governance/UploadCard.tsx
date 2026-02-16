'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState, Suspense } from 'react';

/**
 * Feature: Content Governance Upload
 * Wrapped in Suspense to resolve 'Math.random()' hydration errors.
 */
export default function UploadCard() {
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Rule 50: Logic triggered by user action belongs in event handlers.
   */
  const handleSuccess = () => {
    setIsProcessing(true);
  };

  return (
    <Suspense
      fallback={
        <div className='h-[200px] animate-pulse bg-slate-900/50 rounded-2xl' />
      }
    >
      <div className='max-w-2xl mx-auto p-12 border-2 border-dashed border-slate-800 rounded-[2rem] bg-slate-900/20 text-center'>
        <h2 className='text-2xl font-bold text-white mb-2'>
          AI Governance Lab
        </h2>
        <p className='text-slate-400 mb-8 max-w-sm mx-auto'>
          Upload assets for automated auditing.
        </p>

        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleSuccess}
          options={{
            folder: 'governance_lab',
            tags: ['governance_scan_pending'],
          }}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              disabled={isProcessing}
              className='px-10 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-2xl font-semibold transition-all shadow-xl shadow-blue-500/10'
            >
              {isProcessing ? 'Agent Analyzing...' : 'Select Image'}
            </button>
          )}
        </CldUploadWidget>
      </div>
    </Suspense>
  );
}
