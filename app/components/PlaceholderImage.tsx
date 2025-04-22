import React from 'react';

interface PlaceholderImageProps {
  title: string;
  className?: string;
}

export default function PlaceholderImage({ title, className = '' }: PlaceholderImageProps) {
  return (
    <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
      <div className="text-center p-4">
        <svg
          className="w-12 h-12 mx-auto text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="mt-2 text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
} 