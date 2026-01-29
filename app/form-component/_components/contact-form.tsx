'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import Form from 'next/form';
import clsx from 'clsx';
import { submitContactForm, type FormState } from '../actions';
import { FormField } from './form-field';
import { SubmitButton } from './submit-button';

const initialState: FormState = { success: false, message: '' };

const SUBJECTS = [
  { value: '', label: 'Select a subject...' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
];

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const firstErrorRef = useRef<HTMLInputElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle success state
  useEffect(() => {
    if (state.success && state.timestamp) {
      setShowSuccess(true);
      formRef.current?.reset();

      // Hide success after 5 seconds
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state.success, state.timestamp]);

  // Focus first error field
  useEffect(() => {
    if (!state.success && state.errors) {
      const errorFields = ['name', 'email', 'subject', 'message'] as const;
      for (const field of errorFields) {
        if (state.errors[field]?.length) {
          const element = formRef.current?.querySelector(
            `[name="${field}"]`,
          ) as HTMLInputElement | null;
          element?.focus();
          break;
        }
      }
    }
  }, [state.success, state.errors, state.timestamp]);

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="flex size-16 items-center justify-center rounded-full bg-green-900/50">
          <svg
            className="size-8 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-100">Message Sent!</h3>
          <p className="mt-1 text-sm text-gray-400">{state.message}</p>
        </div>
        <button
          onClick={() => setShowSuccess(false)}
          className="mt-2 text-sm text-blue-400 hover:text-blue-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <Form ref={formRef} action={formAction} className="flex flex-col gap-5">
      {/* General error */}
      {state.errors?.general && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-400"
        >
          <svg
            className="size-5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {state.errors.general[0]}
        </div>
      )}

      {/* Form fields */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FormField
          ref={firstErrorRef}
          label="Name"
          name="name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          error={state.errors?.name?.[0]}
          defaultValue={state.data?.name}
          required
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
          error={state.errors?.email?.[0]}
          defaultValue={state.data?.email}
          required
        />
      </div>

      <FormField
        label="Subject"
        name="subject"
        as="select"
        error={state.errors?.subject?.[0]}
        defaultValue={state.data?.subject}
        required
      >
        {SUBJECTS.map((subject) => (
          <option key={subject.value} value={subject.value}>
            {subject.label}
          </option>
        ))}
      </FormField>

      <FormField
        label="Message"
        name="message"
        as="textarea"
        placeholder="Your message here..."
        rows={4}
        error={state.errors?.message?.[0]}
        defaultValue={state.data?.message}
        required
        helpText="Min 10 characters, max 500 characters"
      />

      {/* Submit button */}
      <div className="flex items-center justify-between gap-4">
        <SubmitButton>Send Message</SubmitButton>

        <p className="text-xs text-gray-600">
          All fields are validated server-side
        </p>
      </div>
    </Form>
  );
}
