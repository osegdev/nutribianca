import type { Meta, StoryObj } from '@storybook/react';
import { Benefits } from './Benefits';

const meta: Meta<typeof Benefits> = {
  title: 'UI/Benefits',
  component: Benefits,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultBenefits = [
  {
    id: 'clinical-plans',
    title: 'Planes clínicos adaptados',
    description: 'Nutrición basada en evidencia científica adaptada a tu condición específica',
    icon: '🎯',
  },
  {
    id: 'whatsapp-follow',
    title: 'Seguimiento cercano vía WhatsApp',
    description: 'Acompañamiento continuo y resolución de dudas en tiempo real',
    icon: '💬',
  },
  {
    id: 'science-education',
    title: 'Educación basada en ciencia',
    description: 'Aprende sobre alimentación con información respaldada por investigación',
    icon: '🔬',
  },
];

export const Default: Story = {
  args: {
    title: '¿Por qué elegir NutriBianca?',
    benefits: defaultBenefits,
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Nuestros Beneficios',
    benefits: defaultBenefits,
  },
};

export const TwoBenefits: Story = {
  args: {
    title: 'Beneficios principales',
    benefits: defaultBenefits.slice(0, 2),
  },
};
