import { ErrorTicket } from '../types';
import demoData from '../data/demo-data.json';

interface DemoModeSelectorProps {
  onSelectDemo: (ticket: ErrorTicket) => void;
  disabled?: boolean;
}

export const DemoModeSelector: React.FC<DemoModeSelectorProps> = ({
  onSelectDemo,
  disabled = false,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    if (selectedId) {
      const selectedTicket = demoData.find(
        (ticket) => ticket.id === selectedId
      );
      if (selectedTicket) {
        onSelectDemo(selectedTicket as ErrorTicket);
      }
    }
  };

  return (
    <div className='mb-6'>
      <label
        htmlFor='demo-selector'
        className='block text-sm font-medium text-airtable-gray-dark mb-2'
      >
        Try a Demo Example
      </label>
      <select
        id='demo-selector'
        onChange={handleSelectChange}
        disabled={disabled}
        className='select-field'
        defaultValue=''
      >
        <option value='' disabled>
          Select a demo error to analyze...
        </option>
        {demoData.map((ticket) => (
          <option key={ticket.id} value={ticket.id}>
            [{ticket.type}] {ticket.error.substring(0, 60)}
            {ticket.error.length > 60 ? '...' : ''}
          </option>
        ))}
      </select>
    </div>
  );
};
