
import React, { useState, useCallback } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { fetchInformation } from './services/geminiService';
import { QueryInput } from './components/QueryInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Spinner } from './components/Spinner';
import { Icon } from './components/Icon';
import type { GeminiResponse } from './types';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<GeminiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { geolocation, getGeolocation } = useGeolocation();

  const handleSubmit = useCallback(async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await fetchInformation(query, geolocation.coordinates);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [query, geolocation.coordinates]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="mt-8 text-center">
          <Spinner />
          <p className="mt-4 text-gray-400">Retrieving information...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
          <p><strong>Error:</strong> {error}</p>
        </div>
      );
    }
    if (response) {
      return <ResultsDisplay response={response} />;
    }
    return (
        <div className="text-center mt-12 text-gray-500">
            <Icon type="brain" className="w-16 h-16 mx-auto text-gray-600"/>
            <p className="mt-4 text-lg">Ask me anything.</p>
            <p>Your intelligent assistant is ready to help.</p>
        </div>
    );
  };
  
  const LocationStatus: React.FC = () => {
    if (geolocation.isLoading) {
      return (
          <div className="flex items-center text-sm text-yellow-400">
            <div className="w-4 h-4 border-2 border-t-transparent border-yellow-400 rounded-full animate-spin mr-2"></div>
            Fetching location...
          </div>
      );
    }
    if (geolocation.error) {
      return (
        <div className="text-sm text-red-400">
          Location Error: {geolocation.error.message}.{' '}
          <button onClick={getGeolocation} className="underline hover:text-red-300">Retry</button>
        </div>
      );
    }
    if (geolocation.coordinates) {
      return (
          <div className="flex items-center text-sm text-green-400">
            <Icon type="location" className="w-4 h-4 mr-1"/>
            Location enabled
          </div>
      );
    }
    return null;
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Intelligent Retrieval Assistant
          </h1>
          <p className="mt-2 text-gray-400">Your multi-domain information retrieval expert.</p>
        </header>

        <div className="bg-gray-800 border border-gray-700 shadow-2xl shadow-black/30 rounded-xl p-6">
          <QueryInput
            query={query}
            setQuery={setQuery}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <div className="mt-4 h-5">
            <LocationStatus />
          </div>
        </div>

        <div className="mt-4">
            {renderContent()}
        </div>
      </main>
      <footer className="text-center p-4 text-gray-600 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
