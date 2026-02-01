import { Suspense } from 'react';
import { Boundary } from '#/ui/boundary';
import { TodoList, TodoListSkeleton } from './_components/todo-list';
import { AddTodoForm } from './_components/add-todo-form';
import { ActionButtons } from './_components/action-buttons';

export default function Page() {
  return (
    <Boundary label="page.tsx">
      <div className="flex flex-col gap-6">
        <AddTodoForm />

        <Suspense fallback={<TodoListSkeleton />}>
          <TodoList />
        </Suspense>

        <ActionButtons />
      </div>
    </Boundary>
  );
}
