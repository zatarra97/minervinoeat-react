import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: UseFormRegister<any>;
  name: string;
  value?: string;
  isLoading?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  error, 
  register, 
  name, 
  type = "text",
  value,
  disabled,
  isLoading = false,
  ...props 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-1">
        <div className="h-5 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
        <div className="h-12 bg-gray-200 special-rounded w-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 pl-5">
        {label}
      </label>
      <input
        type={type}
        className={`w-full px-4 py-2 border special-rounded outline-none transition-colors
          ${error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:border-orange-500'
          }
          ${disabled ? 'bg-slate-100 text-gray-700 cursor-not-allowed' : 'bg-white'}
        `}
        {...(register ? register(name) : { name, value })}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}; 