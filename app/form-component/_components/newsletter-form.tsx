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
      className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-violet-200 transition-all duration-150 hover:cursor-pointer hover:bg-violet-500 hover:shadow-md focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-violet-900/30 dark:focus-visible:ring-offset-gray-950"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </span>
      ) : (
        'Subscribe'
      )}
    </button>
  );
}
