
import React from 'react';
import type { GeminiResponse } from '../types';
import { Icon } from './Icon';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ResultsDisplayProps {
  response: GeminiResponse;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ response }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mt-6 animate-fade-in">
      <div className="text-gray-200 space-y-4">
        <MarkdownRenderer content={response.text} />
      </div>
      {response.sources.length > 0 && (
        <div className="mt-8 pt-4 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
            <Icon type="link" className="w-5 h-5" />
            Sources
          </h3>
          <ul className="space-y-2">
            {response.sources.map((source, index) => (
              // FIX: Add a check for source.uri to ensure we only render sources with a valid link.
              source.uri && (
                <li key={index}>
                  <a
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:text-cyan-300 hover:underline transition-colors duration-200 break-all text-sm"
                  >
                    {source.title || source.uri}
                  </a>
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};