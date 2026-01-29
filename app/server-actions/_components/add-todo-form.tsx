'use client';

import { useActionState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { addTodo, type ActionState } from '../actions';
import { SubmitButton } from './submit-button';

const initialState: ActionState = { success: false, message: '' };

export function AddTodoForm() {
  const [state, formAction] = useActionState(addTodo, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear form and focus input on successful submission
  useEffect(() => {
    if (state.success && state.timestamp) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }, [state.success, state.timestamp]);

  // Focus input on validation error
  useEffect(() => {
    if (!state.success && state.errors?.text) {
      inputRef.current?.focus();
    }
  }, [state.success, state.errors]);

  const hasError = !state.success && state.errors?.text;

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="todo-input" className="sr-only">
          Add a new todo
        </label>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              id="todo-input"
              name="text"
              type="text"
              placeholder="What needs to be done?"
              autoComplete="off"
              aria-describedby={hasError ? 'todo-error' : undefined}
              aria-invalid={hasError ? 'true' : undefined}
              className={clsx(
                'w-full rounded-lg border bg-gray-900 px-4 py-3 text-sm text-gray-100',
                'placeholder:text-gray-600',
                'focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none',
                {
                  'border-gray-800 focus:border-blue-600 focus:ring-blue-600':
                    !hasError,
                  'border-red-600 focus:border-red-600 focus:ring-red-600':
                    hasError,
                },
              )}
            />
          </div>

          <SubmitButton />
        </div>

        {/* Error message */}
        {hasError && (
          <p
            id="todo-error"
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
            {state.errors?.text?.[0]}
          </p>
        )}

        {/* Success message */}
        {state.success && state.message && (
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
      </div>

      {/* Tips */}
      <div className="text-xs text-gray-600">
        <span className="font-medium text-gray-500">Tips:</span> Press Enter to
        submit • Min 3 characters • Max 200 characters
      </div>
    </form>
  );
}
