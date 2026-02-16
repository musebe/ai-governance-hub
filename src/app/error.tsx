'use client';

/**
 * Mandatory Rule 82: Graceful degradation for route segments.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className='flex flex-col items-center justify-center py-20 space-y-4'>
      <h2 className='text-xl font-bold text-red-400'>
        Governance Lab Connection Failed
      </h2>
      <button
        onClick={() => reset()}
        className='px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors'
      >
        Retry Connection
      </button>
    </div>
  );
}
