'use server';

import { redirect } from 'next/navigation';

// ============================================
// Types
// ============================================

export type FormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    general?: string[];
  };
  data?: { name: string; email: string; subject: string; message: string };
  timestamp?: number;
};

// ============================================
// Validation Helpers
// ============================================

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Basic XSS prevention
    .slice(0, 1000); // Limit length
}

// ============================================
// Form Actions
// ============================================

/**
 * Standard form submission with validation
 */
export async function submitContactForm(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Extract and sanitize form data
  const rawName = formData.get('name');
  const rawEmail = formData.get('email');
  const rawSubject = formData.get('subject');
  const rawMessage = formData.get('message');

  const name = typeof rawName === 'string' ? sanitizeInput(rawName) : '';
  const email = typeof rawEmail === 'string' ? sanitizeInput(rawEmail) : '';
  const subject =
    typeof rawSubject === 'string' ? sanitizeInput(rawSubject) : '';
  const message =
    typeof rawMessage === 'string' ? sanitizeInput(rawMessage) : '';

  // Validation
  const errors: FormState['errors'] = {};

  // Name validation
  if (!name) {
    errors.name = ['Name is required'];
  } else if (name.length < 2) {
    errors.name = ['Name must be at least 2 characters'];
  } else if (name.length > 50) {
    errors.name = ['Name must be less than 50 characters'];
  }

  // Email validation
  if (!email) {
    errors.email = ['Email is required'];
  } else if (!validateEmail(email)) {
    errors.email = ['Please enter a valid email address'];
  }

  // Subject validation
  if (!subject) {
    errors.subject = ['Please select a subject'];
  }

  // Message validation
  if (!message) {
    errors.message = ['Message is required'];
  } else if (message.length < 10) {
    errors.message = ['Message must be at least 10 characters'];
  } else if (message.length > 500) {
    errors.message = ['Message must be less than 500 characters'];
  }

  // Return errors if any
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please fix the errors below',
      errors,
      data: { name, email, subject, message },
      timestamp: Date.now(),
    };
  }

  // Simulate random server error (10% chance)
  if (Math.random() < 0.1) {
    return {
      success: false,
      message: 'Server error occurred. Please try again.',
      errors: { general: ['An unexpected error occurred'] },
      data: { name, email, subject, message },
      timestamp: Date.now(),
    };
  }

  // Success!
  return {
    success: true,
    message: `Thank you ${name}! Your message has been sent.`,
    data: { name, email, subject, message },
    timestamp: Date.now(),
  };
}

/**
 * Search form with redirect
 */
export async function handleSearch(formData: FormData): Promise<void> {
  const query = formData.get('query');

  if (typeof query === 'string' && query.trim()) {
    // Redirect to search results (simulated)
    redirect(`/form-component?search=${encodeURIComponent(query.trim())}`);
  }
}

/**
 * Newsletter subscription
 */
export async function subscribeNewsletter(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const rawEmail = formData.get('email');
  const email = typeof rawEmail === 'string' ? sanitizeInput(rawEmail) : '';

  if (!email) {
    return {
      success: false,
      message: 'Email is required',
      errors: { email: ['Email is required'] },
      timestamp: Date.now(),
    };
  }

  if (!validateEmail(email)) {
    return {
      success: false,
      message: 'Invalid email',
      errors: { email: ['Please enter a valid email address'] },
      timestamp: Date.now(),
    };
  }

  // Simulate duplicate check
  if (email.includes('existing')) {
    return {
      success: false,
      message: 'Already subscribed',
      errors: { email: ['This email is already subscribed'] },
      timestamp: Date.now(),
    };
  }

  return {
    success: true,
    message: `Subscribed! Check ${email} for confirmation.`,
    timestamp: Date.now(),
  };
}
