import { Settings, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className='bg-white border-b border-gray-200 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 flex items-center'>
              <Zap className='h-8 w-8 text-airtable-blue' />
              <h1 className='ml-3 text-xl font-semibold text-airtable-gray-dark'>
                AI-Powered Airtable Support Assistant
              </h1>
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='flex items-center'>
              <span className='text-sm font-medium text-airtable-blue bg-blue-50 px-3 py-1 rounded-full'>
                Demo Mode
              </span>
            </div>

            <div className='flex items-center'>
              <Settings className='h-5 w-5 text-airtable-gray' />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
