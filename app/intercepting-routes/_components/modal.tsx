'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    },
    [onDismiss],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.addEventListener('keydown', onKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onKeyDown, mounted]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onDismiss();
    }
  };

  // Don't render portal during SSR or before client-side mount
  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Photo modal"
    >
      <div
        ref={dialogRef}
        className="relative m-4 max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl border border-gray-800 bg-gray-950 shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-gray-900/80 text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-200"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal indicator */}
        <div className="absolute top-3 left-3 z-10 rounded bg-cyan-900/80 px-2 py-1 text-xs font-medium text-cyan-300">
          📸 Intercepted Modal
        </div>

        {children}
      </div>
    </div>,
    document.body,
  );
}
