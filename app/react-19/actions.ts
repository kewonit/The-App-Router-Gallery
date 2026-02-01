'use server';

import { revalidatePath } from 'next/cache';

// Simulated database
let todos: { id: number; text: string; completed: boolean }[] = [
  { id: 1, text: 'Learn React 19 features', completed: true },
  { id: 2, text: 'Try useOptimistic hook', completed: false },
  { id: 3, text: 'Explore use() hook', completed: false },
];

let nextId = 4;

export async function getTodos() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...todos];
}

export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string;
  if (!text?.trim()) {
    return { error: 'Todo text is required' };
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  todos.push({ id: nextId++, text: text.trim(), completed: false });
  revalidatePath('/react-19');
  return { success: true };
}

export async function toggleTodo(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  revalidatePath('/react-19');
}

export async function deleteTodo(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  todos = todos.filter((t) => t.id !== id);
  revalidatePath('/react-19');
}
