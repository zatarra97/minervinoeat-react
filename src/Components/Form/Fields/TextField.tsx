import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: UseFormRegister<any>;
  name: string;
  value?: string;
}

export const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  error, 
  register, 
  name, 
  type = "text",
  value,
  disabled,
  ...props 
}) => {
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