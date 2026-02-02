import { Boundary } from '#/ui/boundary';
import { EmptyState } from '#/ui/demo-states';
import { getTodos } from '../actions';
import { TodoItem } from './todo-item';

export async function TodoList() {
  const todos = await getTodos();
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <Boundary label="TodoList (Async)" size="small" color="blue">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
          Todos{' '}
          <span className="font-mono tracking-tighter text-gray-500 dark:text-gray-600">
            ({completedCount}/{todos.length})
          </span>
        </h2>

        {todos.length === 0 ? (
          <EmptyState
            title="No todos yet"
            description="Add a todo using the form above to get started."
          />
        ) : (
          <div className="flex flex-col gap-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </div>
    </Boundary>
  );
}

export function TodoListSkeleton() {
  return (
    <Boundary label="TodoList (Loading)" size="small" color="blue" pulse>
      <div className="flex flex-col gap-4">
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg bg-gray-100 p-4 dark:bg-gray-900/50"
            >
              <div className="size-5 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 flex-1 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </Boundary>
  );
}
