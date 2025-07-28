import { useState } from 'react';
import { ErrorType } from '../types';
import { Search } from 'lucide-react';

interface ErrorInputProps {
  onAnalyze: (error: string, type: ErrorType) => void;
  isLoading: boolean;
  initialError?: string;
  initialType?: ErrorType;
}

export const ErrorInput: React.FC<ErrorInputProps> = ({
  onAnalyze,
  isLoading,
  initialError = '',
  initialType = 'Formula Error',
}) => {
  const [error, setError] = useState(initialError);
  const [errorType, setErrorType] = useState<ErrorType>(initialType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error.trim()) {
      onAnalyze(error.trim(), errorType);
    }
  };

  const errorTypes: ErrorType[] = [
    'Formula Error',
    'API Error',
    'Workflow Issue',
  ];

  return (
    <form onSubmit={handleSubmit} className='card'>
      <div className='space-y-4'>
        <div>
          <label
            htmlFor='error-type'
            className='block text-sm font-medium text-airtable-gray-dark mb-2'
          >
            Error Type
          </label>
          <select
            id='error-type'
            value={errorType}
            onChange={(e) => setErrorType(e.target.value as ErrorType)}
            className='select-field'
            disabled={isLoading}
          >
            {errorTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor='error-message'
            className='block text-sm font-medium text-airtable-gray-dark mb-2'
          >
            Error Message
          </label>
          <textarea
            id='error-message'
            value={error}
            onChange={(e) => setError(e.target.value)}
            placeholder='Paste your Airtable error message here...'
            rows={4}
            className='input-field resize-none'
            disabled={isLoading}
            required
          />
        </div>

        <button
          type='submit'
          disabled={isLoading || !error.trim()}
          className='btn-primary w-full flex items-center justify-center'
        >
          {isLoading ? (
            <>
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
              Analyzing...
            </>
          ) : (
            <>
              <Search className='h-4 w-4 mr-2' />
              Analyze Error
            </>
          )}
        </button>
      </div>
    </form>
  );
};
