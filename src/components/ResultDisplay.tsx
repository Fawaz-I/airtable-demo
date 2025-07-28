import { AnalysisResult } from '../types';
import { useClipboard } from '../hooks/useClipboard';
import {
  Copy,
  CheckCircle,
  Lightbulb,
  AlertCircle,
  Wrench,
} from 'lucide-react';

interface ResultDisplayProps {
  result: AnalysisResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const { copied, copyToClipboard } = useClipboard();

  const handleCopyFix = () => {
    copyToClipboard(result.fix);
  };

  return (
    <div className='card'>
      <div className='space-y-6'>
        {/* Explanation Section */}
        <div className='flex items-start space-x-3'>
          <div className='flex-shrink-0'>
            <AlertCircle className='h-5 w-5 text-airtable-blue mt-0.5' />
          </div>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-airtable-gray-dark mb-2'>
              What's happening?
            </h3>
            <p className='text-airtable-gray leading-relaxed'>
              {result.explanation}
            </p>
          </div>
        </div>

        {/* Fix Section */}
        <div className='flex items-start space-x-3'>
          <div className='flex-shrink-0'>
            <Wrench className='h-5 w-5 text-green-600 mt-0.5' />
          </div>
          <div className='flex-1'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-lg font-semibold text-airtable-gray-dark'>
                How to fix it
              </h3>
              <button
                onClick={handleCopyFix}
                className='btn-secondary text-sm flex items-center'
                title='Copy fix to clipboard'
              >
                {copied ? (
                  <>
                    <CheckCircle className='h-4 w-4 mr-1 text-green-600' />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className='h-4 w-4 mr-1' />
                    Copy Fix
                  </>
                )}
              </button>
            </div>
            <div className='bg-airtable-gray-light p-4 rounded-lg'>
              <p className='text-airtable-gray-dark font-mono text-sm leading-relaxed whitespace-pre-wrap'>
                {result.fix}
              </p>
            </div>
          </div>
        </div>

        {/* Optimization Tip Section */}
        {result.optimization && (
          <div className='flex items-start space-x-3'>
            <div className='flex-shrink-0'>
              <Lightbulb className='h-5 w-5 text-yellow-500 mt-0.5' />
            </div>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-airtable-gray-dark mb-2'>
                Pro tip
              </h3>
              <div className='bg-yellow-50 border border-yellow-200 p-4 rounded-lg'>
                <p className='text-yellow-800 leading-relaxed'>
                  {result.optimization}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
