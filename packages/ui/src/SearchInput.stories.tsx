import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <SearchInput value={value} onChange={setValue} placeholder="Buscar artículos..." />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('hidratación');
    return <SearchInput value={value} onChange={setValue} placeholder="Buscar artículos..." />;
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SearchInput
        value={value}
        onChange={setValue}
        placeholder="Buscar por título, contenido o etiquetas..."
      />
    );
  },
};

export const InBlogLayout: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <SearchInput
              value={value}
              onChange={setValue}
              placeholder="Buscar por título, contenido o etiquetas..."
              className="w-full"
            />
            <div className="mt-4 text-sm text-gray-600">
              {value ? `Buscando: "${value}"` : 'Escribe para buscar artículos...'}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
