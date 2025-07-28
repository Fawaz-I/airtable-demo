import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Analyzing error...',
}) => {
  return (
    <div className='flex flex-col items-center justify-center py-8'>
      <Loader2 className='h-8 w-8 text-airtable-blue animate-spin' />
      <p className='mt-2 text-sm text-airtable-gray'>{message}</p>
    </div>
  );
};
