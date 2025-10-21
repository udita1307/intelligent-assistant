
import React from 'react';
import { Icon } from './Icon';

interface QueryInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const QueryInput: React.FC<QueryInputProps> = ({ query, setQuery, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="relative">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., Suggest best pet-friendly coffee places inside malls within 10 km of my location"
        className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 pr-20 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow duration-300 text-gray-200 placeholder-gray-500"
        rows={3}
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors duration-300 flex items-center justify-center shadow-lg hover:shadow-cyan-500/50"
        aria-label="Submit query"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          <Icon type="search" className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};
