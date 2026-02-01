'use client';

import { useActionState, useOptimistic, useTransition, use } from 'react';
import { addTodo, toggleTodo, deleteTodo } from '../actions';
import { Boundary } from '#/ui/boundary';

// Demo 1: useActionState for form handling
function AddTodoForm() {
  const [state, formAction, isPending] = useActionState(
    async (
      _prevState: { error?: string; success?: boolean } | null,
      formData: FormData,
    ) => {
      const result = await addTodo(formData);
      return result;
    },
    null,
  );

  return (
    <Boundary label="useActionState" color="blue">
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Form with useActionState
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manages form state, pending status, and action results
          </p>
        </div>

        <form action={formAction} className="flex gap-2">
          <input
            type="text"
            name="text"
            placeholder="Add a new todo..."
            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? 'Adding...' : 'Add'}
          </button>
        </form>

        {state?.error && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {state.error}
          </p>
        )}
        {state?.success && (
          <p className="text-sm text-green-600 dark:text-green-400">
            Todo added successfully
          </p>
        )}
      </div>
    </Boundary>
  );
}

// Demo 2: useOptimistic for instant UI updates
function OptimisticTodoList({
  todos,
}: {
  todos: { id: number; text: string; completed: boolean }[];
}) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, action: { type: 'toggle' | 'delete'; id: number }) => {
      if (action.type === 'toggle') {
        return state.map((todo) =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        );
      }
      if (action.type === 'delete') {
        return state.filter((todo) => todo.id !== action.id);
      }
      return state;
    },
  );

  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: number) => {
    startTransition(async () => {
      addOptimistic({ type: 'toggle', id });
      await toggleTodo(id);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      addOptimistic({ type: 'delete', id });
      await deleteTodo(id);
    });
  };

  return (
    <Boundary label="useOptimistic" color="violet">
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Optimistic Updates
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            UI updates instantly while the server catches up
          </p>
        </div>

        <div className="space-y-2">
          {optimisticTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between rounded-lg border p-3 transition-all ${
                todo.completed
                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                  : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggle(todo.id)}
                  disabled={isPending}
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                    todo.completed
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
                  }`}
                >
                  {todo.completed && (
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <span
                  className={`text-sm ${
                    todo.completed
                      ? 'text-gray-500 line-through dark:text-gray-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => handleDelete(todo.id)}
                disabled={isPending}
                className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {isPending && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Syncing with server...
          </p>
        )}
      </div>
    </Boundary>
  );
}

// Demo 3: use() hook with Promise
function UseHookDemo({ dataPromise }: { dataPromise: Promise<string> }) {
  const data = use(dataPromise);

  return (
    <Boundary label="use() Hook" color="pink">
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Reading Promises with use()
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Unwrap promises directly in render without useEffect
          </p>
        </div>
        <div className="rounded-lg bg-pink-50 p-3 dark:bg-pink-900/20">
          <p className="text-sm text-pink-800 dark:text-pink-200">
            Server time: <strong>{data}</strong>
          </p>
        </div>
      </div>
    </Boundary>
  );
}

// Hooks comparison reference
function HooksReference() {
  return (
    <Boundary label="React 19 Hooks Reference">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 pr-4 text-left font-medium text-gray-900 dark:text-gray-100">
                Hook
              </th>
              <th className="py-2 pr-4 text-left font-medium text-gray-900 dark:text-gray-100">
                Purpose
              </th>
              <th className="py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Replaces
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <tr>
              <td className="py-2 pr-4 font-mono text-blue-600">
                useActionState
              </td>
              <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                Form state + pending + result
              </td>
              <td className="py-2 text-gray-600 dark:text-gray-400">
                useState + useTransition combo
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-violet-600">
                useOptimistic
              </td>
              <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                Instant UI updates before server confirms
              </td>
              <td className="py-2 text-gray-600 dark:text-gray-400">
                Manual optimistic state patterns
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-pink-600">use()</td>
              <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                Read promises/context in render
              </td>
              <td className="py-2 text-gray-600 dark:text-gray-400">
                useEffect + useState for data
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-cyan-600">
                useFormStatus
              </td>
              <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                Form pending state in nested components
              </td>
              <td className="py-2 text-gray-600 dark:text-gray-400">
                Prop drilling isPending
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Boundary>
  );
}

export function React19Demos({
  todos,
  timePromise,
}: {
  todos: { id: number; text: string; completed: boolean }[];
  timePromise: Promise<string>;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <AddTodoForm />
        <UseHookDemo dataPromise={timePromise} />
      </div>

      <OptimisticTodoList todos={todos} />

      <HooksReference />
    </div>
  );
}
