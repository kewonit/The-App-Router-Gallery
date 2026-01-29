'use client';

import { useActionState } from 'react';
import Form from 'next/form';
import clsx from 'clsx';
import { subscribeNewsletter, type FormState } from '../actions';

const initialState: FormState = { success: false, message: '' };

export function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeNewsletter, initialState);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-gray-200">Newsletter</h3>
        <p className="text-sm text-gray-500">
          Inline form with immediate feedback
        </p>
      </div>

      <Form action={formAction}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={state.errors?.email ? 'true' : undefined}
              aria-describedby={
                state.errors?.email ? 'newsletter-error' : undefined
              }
              className={clsx(
                'w-full rounded-lg border bg-gray-900 px-4 py-2.5 text-sm text-gray-100',
                'placeholder:text-gray-600',
                'focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none',
                {
                  'border-gray-800 focus:border-violet-600 focus:ring-violet-600':
                    !state.errors?.email,
                  'border-red-600 focus:border-red-600 focus:ring-red-600':
                    state.errors?.email,
                },
              )}
            />
          </div>

          <SubscribeButton />
        </div>
      </Form>

      {/* Feedback messages */}
      {state.errors?.email && (
        <p
          id="newsletter-error"
          role="alert"
          className="flex items-center gap-1.5 text-sm text-red-400"
        >
          <svg
            className="size-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {state.errors.email[0]}
        </p>
      )}

      {state.success && (
        <p className="flex items-center gap-1.5 text-sm text-green-400">
          <svg
            className="size-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {state.message}
        </p>
      )}

      {/* Pro tip */}
      <p className="text-xs text-gray-600">
        <strong className="text-gray-500">Try:</strong> Enter
        "existing@test.com" to see duplicate error
      </p>
    </div>
  );
}

function SubscribeButton() {
  // Import here to use useFormStatus inside Form context
  const { useFormStatus } = require('react-dom');
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        'rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
        'focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none',
        'disabled:cursor-not-allowed',
        {
          'bg-violet-600 text-white hover:bg-violet-500': !pending,
          'bg-violet-600/50 text-violet-200': pending,
        },
      )}
    >
      {pending ? (
        <span className="size-4 animate-spin rounded-full border-2 border-violet-200 border-t-transparent" />
      ) : (
        'Subscribe'
      )}
    </button>
  );
}
