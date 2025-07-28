import { useState } from 'react';
import { Header } from './components/Header';
import { ErrorInput } from './components/ErrorInput';
import { DemoModeSelector } from './components/DemoModeSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { mockAnalyzeError } from './services/mockAI';
import { ErrorType, AnalysisResult, ErrorTicket } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [currentError, setCurrentError] = useState('');
  const [currentType, setCurrentType] = useState<ErrorType>('Formula Error');

  const handleAnalyze = async (errorMessage: string, errorType: ErrorType) => {
    setIsLoading(true);
    setError(null);
    setCurrentResult(null);
    setCurrentError(errorMessage);
    setCurrentType(errorType);

    try {
      const result = await mockAnalyzeError(errorMessage, errorType);
      setCurrentResult(result);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSelect = (ticket: ErrorTicket) => {
    setCurrentError(ticket.error);
    setCurrentType(ticket.type);

    // Auto-analyze the demo ticket
    handleAnalyze(ticket.error, ticket.type);
  };

  return (
    <div className='min-h-screen bg-airtable-gray-light'>
      <Header />

      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='space-y-8'>
          {/* Demo Mode Selector */}
          <DemoModeSelector
            onSelectDemo={handleDemoSelect}
            disabled={isLoading}
          />

          {/* Error Input Form */}
          <ErrorInput
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            initialError={currentError}
            initialType={currentType}
          />

          {/* Loading State */}
          {isLoading && <LoadingSpinner message='Analyzing with AI...' />}

          {/* Error Display */}
          {error && (
            <div className='card'>
              <div className='flex items-center space-x-3'>
                <div className='flex-shrink-0'>
                  <div className='h-5 w-5 bg-red-500 rounded-full flex items-center justify-center'>
                    <span className='text-white text-xs font-bold'>!</span>
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-red-700'>Error</h3>
                  <p className='text-red-600'>{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {currentResult && !isLoading && (
            <ResultDisplay result={currentResult} />
          )}

          {/* Welcome Message */}
          {!currentResult && !isLoading && !error && (
            <div className='card text-center'>
              <div className='py-8'>
                <h2 className='text-2xl font-semibold text-airtable-gray-dark mb-4'>
                  Welcome to AI-Powered Airtable Support
                </h2>
                <p className='text-airtable-gray mb-6 max-w-2xl mx-auto'>
                  Get instant help with your Airtable errors. Simply paste your
                  error message above, select the error type, and let our AI
                  provide clear explanations and solutions.
                </p>
                <div className='flex items-center justify-center space-x-8 text-sm text-airtable-gray'>
                  <div className='flex items-center'>
                    <div className='w-2 h-2 bg-airtable-blue rounded-full mr-2'></div>
                    Formula Errors
                  </div>
                  <div className='flex items-center'>
                    <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
                    API Issues
                  </div>
                  <div className='flex items-center'>
                    <div className='w-2 h-2 bg-yellow-500 rounded-full mr-2'></div>
                    Workflow Problems
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
