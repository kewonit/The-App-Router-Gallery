'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Form from 'next/form';
import { subscribeNewsletter, type FormState } from '../actions';

const initialState: FormState = { success: false, message: '' };

export function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeNewsletter, initialState);

  return (
    <Form action={formAction} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-violet-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-violet-600"
        />
        <SubscribeButton />
      </div>
      {state.success && (
        <p className="text-xs text-green-600 dark:text-green-400">
          {state.message}
        </p>
      )}
    </Form>
  );
}

function SubscribeButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500 disabled:opacity-50"
    >
      {pending ? '...' : 'Subscribe'}
    </button>
  );
}
