'use client';

import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type BaseFieldProps = {
  label: string;
  name: string;
  error?: string;
  helpText?: string;
};

type InputFieldProps = BaseFieldProps &
  Omit<ComponentPropsWithoutRef<'input'>, 'name'> & { as?: 'input' };

type TextareaFieldProps = BaseFieldProps &
  Omit<ComponentPropsWithoutRef<'textarea'>, 'name'> & { as: 'textarea' };

type SelectFieldProps = BaseFieldProps &
  Omit<ComponentPropsWithoutRef<'select'>, 'name'> & { as: 'select' };

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>(function FormField(props, ref) {
  const id = useId();
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  const {
    label,
    name,
    error,
    helpText,
    as = 'input',
    className,
    required,
    ...rest
  } = props;

  const hasError = Boolean(error);

  const baseClasses = clsx(
    'w-full rounded-lg border bg-gray-100 dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100',
    'placeholder:text-gray-400 dark:placeholder:text-gray-600',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-950',
    'disabled:cursor-not-allowed disabled:opacity-50',
    {
      'border-gray-200 dark:border-gray-800 focus:border-blue-600 focus:ring-blue-600':
        !hasError,
      'border-red-600 focus:border-red-600 focus:ring-red-600': hasError,
    },
    className,
  );

  const describedBy = [hasError ? errorId : null, helpText ? helpId : null]
    .filter(Boolean)
    .join(' ');

  const commonProps = {
    id,
    name,
    'aria-invalid': hasError ? ('true' as const) : undefined,
    'aria-describedby': describedBy || undefined,
    'aria-required': required,
    className: baseClasses,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && (
          <span className="text-red-400" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {as === 'textarea' ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...commonProps}
          {...(rest as ComponentPropsWithoutRef<'textarea'>)}
        />
      ) : as === 'select' ? (
        <select
          ref={ref as React.Ref<HTMLSelectElement>}
          {...commonProps}
          {...(rest as ComponentPropsWithoutRef<'select'>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type={(rest as ComponentPropsWithoutRef<'input'>).type || 'text'}
          {...commonProps}
          {...(rest as ComponentPropsWithoutRef<'input'>)}
        />
      )}

      {/* Error message */}
      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-sm text-red-400"
        >
          <svg
            className="size-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {/* Help text */}
      {helpText && !hasError && (
        <p id={helpId} className="text-xs text-gray-600 dark:text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
});
