import { Settings, Zap } from 'lucide-react';

interface HeaderProps {
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDemoMode,
  onToggleDemoMode,
}) => {
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
              <label className='flex items-center cursor-pointer'>
                <span className='mr-3 text-sm font-medium text-airtable-gray-dark'>
                  Demo Mode
                </span>
                <div className='relative'>
                  <input
                    type='checkbox'
                    checked={isDemoMode}
                    onChange={onToggleDemoMode}
                    className='sr-only'
                  />
                  <div
                    className={`block w-14 h-8 rounded-full transition-colors duration-200 ${
                      isDemoMode ? 'bg-airtable-blue' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ${
                        isDemoMode ? 'transform translate-x-6' : ''
                      }`}
                    />
                  </div>
                </div>
              </label>
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
