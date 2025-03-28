import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, className, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            ${
              error
                ? 'focus:ring-red-500 focus:border-red-500'
                : 'focus:ring-primary-500 focus:border-primary-500'
            }
            ${className || ''}
          `}
          rows={5}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
