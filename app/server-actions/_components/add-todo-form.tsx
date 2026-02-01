'use client';

import { useActionState, useRef, useEffect } from 'react';
import { addTodo, type ActionState } from '../actions';
import { SubmitButton } from './submit-button';

const initialState: ActionState = { success: false, message: '' };

export function AddTodoForm() {
  const [state, formAction] = useActionState(addTodo, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.success && state.timestamp) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }, [state.success, state.timestamp]);

  return (
    <form ref={formRef} action={formAction} className="flex gap-2">
      <input
        ref={inputRef}
        name="text"
        type="text"
        placeholder="Add a todo..."
        autoComplete="off"
        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-blue-600"
      />
      <SubmitButton />
    </form>
  );
}
