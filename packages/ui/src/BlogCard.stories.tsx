import type { Meta, StoryObj } from '@storybook/react';
import { BlogCard } from './BlogCard';

const meta: Meta<typeof BlogCard> = {
  title: 'Components/BlogCard',
  component: BlogCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Hidratación Básica: Fundamentos Científicos para una Salud Óptima',
    excerpt:
      'Descubre la ciencia detrás de la hidratación y cómo optimizar tu consumo de agua para mejorar tu rendimiento físico y mental.',
    date: '2025-08-15',
    author: 'Dra. Bianca Nutrióloga',
    tags: ['hidratación', 'salud', 'ciencia', 'nutrición básica'],
    readingTime: 3,
    slug: '2025-08-15-hidratacion-basica',
  },
};

export const LongTitle: Story = {
  args: {
    title:
      'Suplementos Epigenéticos: La Nueva Frontera de la Nutrición Personalizada y la Medicina de Precisión en el Siglo XXI',
    excerpt:
      'Descubre cómo los suplementos epigenéticos están revolucionando la nutrición personalizada y qué dice la ciencia sobre su efectividad en el tratamiento de diversas condiciones de salud.',
    date: '2025-08-27',
    author: 'Dra. Bianca Nutrióloga',
    tags: [
      'epigenética',
      'suplementos',
      'nutrición personalizada',
      'medicina de precisión',
      'biotecnología',
    ],
    readingTime: 12,
    slug: '2025-08-27-suplementos-epigeneticos',
  },
};

export const ManyTags: Story = {
  args: {
    title: 'Fibra Dietética: Tu Aliada Invisible para la Salud Digestiva',
    excerpt:
      'Explora los tipos de fibra, sus beneficios científicamente probados y estrategias prácticas para incorporar más fibra en tu dieta diaria.',
    date: '2025-08-20',
    author: 'Dra. Bianca Nutrióloga',
    tags: [
      'fibra',
      'digestión',
      'microbiota',
      'nutrición funcional',
      'prebióticos',
      'salud intestinal',
      'peso saludable',
    ],
    readingTime: 8,
    slug: '2025-08-20-fibra-dietetica',
  },
};

export const ShortContent: Story = {
  args: {
    title: 'Tips Rápidos de Hidratación',
    excerpt: 'Consejos básicos para mantenerte hidratado durante el día.',
    date: '2025-07-01',
    author: 'Dra. Bianca Nutrióloga',
    tags: ['hidratación', 'tips'],
    readingTime: 1,
    slug: '2025-07-01-tips-hidratacion',
  },
};

export const InGrid: Story = {
  args: {
    title: 'Hidratación Básica: Fundamentos Científicos',
    excerpt: 'Descubre la ciencia detrás de la hidratación y cómo optimizar tu consumo de agua.',
    date: '2025-08-15',
    author: 'Dra. Bianca Nutrióloga',
    tags: ['hidratación', 'salud', 'ciencia'],
    readingTime: 3,
    slug: '2025-08-15-hidratacion-basica',
  },
  decorators: [
    Story => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Story />
        <Story />
        <Story />
      </div>
    ),
  ],
};
