'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import Form from 'next/form';
import { submitContactForm, type FormState } from '../actions';
import { SubmitButton } from './submit-button';

const initialState: FormState = { success: false, message: '' };

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success && state.timestamp) {
      setShowSuccess(true);
      formRef.current?.reset();
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.success, state.timestamp]);

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="text-4xl">✓</div>
        <p className="text-gray-600 dark:text-gray-400">Message sent</p>
        <button
          onClick={() => setShowSuccess(false)}
          className="text-sm text-blue-500 dark:text-blue-400"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <Form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
          required
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-blue-600"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-blue-600"
        />
      </div>

      <select
        name="subject"
        required
        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-600"
      >
        <option value="">Subject...</option>
        <option value="general">General</option>
        <option value="support">Support</option>
        <option value="feedback">Feedback</option>
      </select>

      <textarea
        name="message"
        placeholder="Message..."
        rows={3}
        required
        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-blue-600"
      />

      <SubmitButton>Send</SubmitButton>
    </Form>
  );
}
