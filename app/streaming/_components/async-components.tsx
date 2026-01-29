import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function FastComponent() {
  await connection();
  await delay(100);

  return (
    <Boundary label="FastComponent (100ms)" size="small" color="cyan">
      <div className="flex flex-col gap-2">
        <div className="h-2 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-2 w-1/3 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-2 w-2/3 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>
    </Boundary>
  );
}

export async function MediumComponent() {
  await connection();
  await delay(500);

  return (
    <Boundary label="MediumComponent (500ms)" size="small" color="blue">
      <div className="flex flex-col gap-2">
        <div className="h-2 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-2 w-1/3 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-2 w-2/3 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>
    </Boundary>
  );
}

export async function SlowComponent() {
  await connection();
  await delay(1500);

  return (
    <Boundary label="SlowComponent (1500ms)" size="small" color="orange">
      <div className="flex flex-col gap-2">
        <div className="h-2 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-2 w-1/3 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-2 w-2/3 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>
    </Boundary>
  );
}

export async function VerySlowComponent() {
  await connection();
  await delay(3000);

  return (
    <Boundary label="VerySlowComponent (3000ms)" size="small" color="pink">
      <div className="flex flex-col gap-2">
        <div className="h-2 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-2 w-1/3 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-2 w-2/3 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>
    </Boundary>
  );
}
