'use server';

import { revalidatePath } from 'next/cache';

// Type definitions for our todo items
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

// In-memory store for demo purposes
// In production, this would be a database
const todoStore = new Map<string, Todo>();

// Initialize with some sample data
const initialTodos: Todo[] = [
  {
    id: '1',
    text: 'Learn Server Actions',
    completed: true,
    createdAt: Date.now() - 3600000,
  },
  {
    id: '2',
    text: 'Build production-grade forms',
    completed: false,
    createdAt: Date.now() - 1800000,
  },
  {
    id: '3',
    text: 'Implement optimistic updates',
    completed: false,
    createdAt: Date.now() - 900000,
  },
];

// Seed initial data
initialTodos.forEach((todo) => todoStore.set(todo.id, todo));

// Simulate network delay for demo purposes
async function simulateDelay(ms: number = 500): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

// Generate a unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ============================================
// Server Actions
// ============================================

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  timestamp?: number;
};

/**
 * Get all todos - a cached server function
 */
export async function getTodos(): Promise<Todo[]> {
  await simulateDelay(300);
  return Array.from(todoStore.values()).sort(
    (a, b) => b.createdAt - a.createdAt,
  );
}

/**
 * Add a new todo item
 * Demonstrates form validation and error handling
 */
export async function addTodo(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await simulateDelay();

  const text = formData.get('text');

  // Validation
  const errors: Record<string, string[]> = {};

  if (!text || typeof text !== 'string') {
    errors.text = ['Todo text is required'];
  } else if (text.trim().length === 0) {
    errors.text = ['Todo text cannot be empty'];
  } else if (text.trim().length < 3) {
    errors.text = ['Todo must be at least 3 characters'];
  } else if (text.trim().length > 200) {
    errors.text = ['Todo must be less than 200 characters'];
  }

  // Check for duplicate (case-insensitive)
  const existingTodos = Array.from(todoStore.values());
  const isDuplicate = existingTodos.some(
    (todo) => todo.text.toLowerCase() === String(text).trim().toLowerCase(),
  );

  if (isDuplicate) {
    errors.text = ['This todo already exists'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Validation failed',
      errors,
      timestamp: Date.now(),
    };
  }

  // Create the todo
  const todo: Todo = {
    id: generateId(),
    text: String(text).trim(),
    completed: false,
    createdAt: Date.now(),
  };

  todoStore.set(todo.id, todo);

  // Revalidate to update the UI
  revalidatePath('/server-actions');

  return {
    success: true,
    message: 'Todo added successfully',
    timestamp: Date.now(),
  };
}

/**
 * Toggle todo completion status
 * Demonstrates optimistic updates
 */
export async function toggleTodo(id: string): Promise<ActionState> {
  await simulateDelay();

  const todo = todoStore.get(id);

  if (!todo) {
    return { success: false, message: 'Todo not found', timestamp: Date.now() };
  }

  // Toggle the completed status
  todo.completed = !todo.completed;
  todoStore.set(id, todo);

  revalidatePath('/server-actions');

  return {
    success: true,
    message: `Todo ${todo.completed ? 'completed' : 'uncompleted'}`,
    timestamp: Date.now(),
  };
}

/**
 * Delete a todo item
 * Demonstrates destructive actions with confirmation
 */
export async function deleteTodo(id: string): Promise<ActionState> {
  await simulateDelay();

  const todo = todoStore.get(id);

  if (!todo) {
    return { success: false, message: 'Todo not found', timestamp: Date.now() };
  }

  todoStore.delete(id);

  revalidatePath('/server-actions');

  return { success: true, message: 'Todo deleted', timestamp: Date.now() };
}

/**
 * Update todo text
 * Demonstrates inline editing
 */
export async function updateTodo(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await simulateDelay();

  const id = formData.get('id');
  const text = formData.get('text');

  // Validation
  if (!id || typeof id !== 'string') {
    return {
      success: false,
      message: 'Todo ID is required',
      timestamp: Date.now(),
    };
  }

  if (!text || typeof text !== 'string' || text.trim().length < 3) {
    return {
      success: false,
      message: 'Todo must be at least 3 characters',
      errors: { text: ['Todo must be at least 3 characters'] },
      timestamp: Date.now(),
    };
  }

  const todo = todoStore.get(id);

  if (!todo) {
    return { success: false, message: 'Todo not found', timestamp: Date.now() };
  }

  todo.text = text.trim();
  todoStore.set(id, todo);

  revalidatePath('/server-actions');

  return { success: true, message: 'Todo updated', timestamp: Date.now() };
}

/**
 * Clear all completed todos
 * Demonstrates bulk actions
 */
export async function clearCompleted(): Promise<ActionState> {
  await simulateDelay();

  let deletedCount = 0;
  const entries = Array.from(todoStore.entries());

  for (const [id, todo] of entries) {
    if (todo.completed) {
      todoStore.delete(id);
      deletedCount++;
    }
  }

  if (deletedCount === 0) {
    return {
      success: false,
      message: 'No completed todos to clear',
      timestamp: Date.now(),
    };
  }

  revalidatePath('/server-actions');

  return {
    success: true,
    message: `Cleared ${deletedCount} completed todo${deletedCount > 1 ? 's' : ''}`,
    timestamp: Date.now(),
  };
}

/**
 * Reset todos to initial state
 * For demo purposes
 */
export async function resetTodos(): Promise<ActionState> {
  await simulateDelay(300);

  todoStore.clear();
  initialTodos.forEach((todo) =>
    todoStore.set(todo.id, { ...todo, createdAt: Date.now() }),
  );

  revalidatePath('/server-actions');

  return {
    success: true,
    message: 'Todos reset to initial state',
    timestamp: Date.now(),
  };
}
