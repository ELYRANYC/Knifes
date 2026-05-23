'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string;
  error?: string;
  hint?: string;
  large?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  { label, error, hint, large, className, id, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="field-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn('field', large && 'field-lg', className)}
        {...rest}
      />
      {error ? (
        <p className="field-error">{error}</p>
      ) : hint ? (
        <p className="text-[12px] mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default TextInput;

export function TextArea({
  label,
  error,
  className,
  ...rest
}: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
  label?: string;
  error?: string;
}) {
  return (
    <div className="w-full">
      {label && <label className="field-label">{label}</label>}
      <textarea className={cn('field min-h-[80px] resize-y', className)} {...rest} />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
