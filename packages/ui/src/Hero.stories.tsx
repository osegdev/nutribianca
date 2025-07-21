import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'UI/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
    ctaText: { control: 'text' },
    ctaHref: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: 'Tu salud, guiada por la evidencia',
    subheadline: 'Consultas nutricionales en Santa Rosa de Copán y online, personalizadas a tus necesidades',
    ctaText: 'Chat en WhatsApp',
    ctaHref: 'https://wa.me/50432177256',
  },
};

export const WithCustomCTA: Story = {
  args: {
    headline: 'Headline personalizado',
    subheadline: 'Subheadline de ejemplo para mostrar el componente Hero',
    ctaText: 'Contactar ahora',
    ctaHref: '#',
  },
};

export const ShortContent: Story = {
  args: {
    headline: 'Título corto',
    subheadline: 'Descripción breve',
    ctaText: 'Acción',
    ctaHref: '#',
  },
};