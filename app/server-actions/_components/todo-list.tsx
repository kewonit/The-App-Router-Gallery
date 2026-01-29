import { Boundary } from '#/ui/boundary';
import { getTodos } from '../actions';
import { TodoItem } from './todo-item';

export async function TodoList() {
  const todos = await getTodos();

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <Boundary
      label="<TodoList> (Server Component)"
      size="small"
      animateRerendering={false}
    >
      <div className="flex flex-col gap-4">
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-300">
            Total:{' '}
            <span className="font-mono text-gray-500">{todos.length}</span>
          </span>
          <span className="text-gray-300">
            Pending:{' '}
            <span className="font-mono text-yellow-500">{pendingCount}</span>
          </span>
          <span className="text-gray-300">
            Completed:{' '}
            <span className="font-mono text-green-500">{completedCount}</span>
          </span>
        </div>

        {/* Todo Items */}
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-800 py-12">
            <div className="text-4xl">📝</div>
            <p className="text-gray-500">No todos yet. Add one above!</p>
          </div>
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
    <Boundary
      label="<TodoList> (Loading...)"
      size="small"
      color="blue"
      animateRerendering={false}
    >
      <div className="flex flex-col gap-4">
        {/* Stats skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-800" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-800" />
          <div className="h-4 w-28 animate-pulse rounded bg-gray-800" />
        </div>

        {/* Item skeletons */}
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/50 p-4"
            >
              <div className="size-5 animate-pulse rounded bg-gray-700" />
              <div className="h-4 flex-1 animate-pulse rounded bg-gray-800" />
              <div className="h-8 w-16 animate-pulse rounded bg-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </Boundary>
  );
}
