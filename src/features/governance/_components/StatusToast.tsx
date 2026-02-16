'use client';

import { useEffect, useState } from 'react';
import { BellRing } from 'lucide-react';

/** * Interface for the custom governance update event.
 */
interface GovernanceUpdateEvent extends CustomEvent {
  detail: {
    message: string;
  };
}

/**
 * Feature: Governance Status Toast
 * Displays real-time updates using typed event synchronization.
 * @returns {JSX.Element | null}
 */
export default function StatusToast() {
  const [message, setMessage] = useState<string | null>(null);

  /**
   * Rule 51: Use useEffect for synchronization with external systems (Events).
   * Rule 52: Stable callback logic for interaction handlers.
   */
  useEffect(() => {
    const handleUpdate = (event: Event) => {
      const customEvent = event as GovernanceUpdateEvent;
      setMessage(customEvent.detail.message);
    };

    window.addEventListener('governance-update', handleUpdate);
    return () => window.removeEventListener('governance-update', handleUpdate);
  }, []);

  if (!message) return null;

  return (
    <div className='fixed bottom-8 right-8 flex items-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4'>
      <BellRing className='w-5 h-5 animate-bounce' />
      <p className='font-medium text-sm'>{message}</p>
      <button
        onClick={() => setMessage(null)}
        className='ml-4 opacity-70 hover:opacity-100'
        aria-label='Close notification'
      >
        ✕
      </button>
    </div>
  );
}
