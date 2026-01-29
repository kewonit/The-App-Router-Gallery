import { Suspense } from 'react';
import { Boundary } from '#/ui/boundary';
import { TodoList, TodoListSkeleton } from './_components/todo-list';
import { AddTodoForm } from './_components/add-todo-form';
import { ActionButtons } from './_components/action-buttons';

export default function Page() {
  return (
    <Boundary label="page.tsx" animateRerendering={false}>
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-100">Todo Manager</h1>
          <p className="text-sm text-gray-400">
            A production-grade todo app demonstrating Server Actions with
            optimistic updates, form validation, and error handling.
          </p>
        </div>

        {/* Add Todo Form */}
        <Boundary
          label="<AddTodoForm> (Client Component)"
          size="small"
          color="blue"
          animateRerendering={false}
        >
          <AddTodoForm />
        </Boundary>

        {/* Todo List with Suspense */}
        <Suspense fallback={<TodoListSkeleton />}>
          <TodoList />
        </Suspense>

        {/* Bulk Actions */}
        <Boundary
          label="<ActionButtons> (Client Component)"
          size="small"
          color="violet"
          animateRerendering={false}
        >
          <ActionButtons />
        </Boundary>
      </div>
    </Boundary>
  );
}
