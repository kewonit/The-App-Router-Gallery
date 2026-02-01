'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

let productViews = 1234;
let lastUpdated = new Date().toISOString();

export async function getProductData() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return {
    views: productViews,
    lastUpdated,
    fetchedAt: new Date().toISOString(),
  };
}

export async function incrementViews() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  productViews += 1;
  lastUpdated = new Date().toISOString();
}

export async function revalidateByPath() {
  await incrementViews();
  revalidatePath('/revalidation');
  return { success: true, method: 'revalidatePath' };
}

export async function revalidateByTag() {
  await incrementViews();
  revalidateTag('product-data', 'default');
  return { success: true, method: 'revalidateTag' };
}

export async function simulateWebhook() {
  // Simulates an external webhook triggering revalidation
  await new Promise((resolve) => setTimeout(resolve, 500));
  productViews += 10;
  lastUpdated = new Date().toISOString();
  revalidateTag('product-data', 'default');
  return { success: true, method: 'webhook', added: 10 };
}
