import type { Meta, StoryObj } from '@storybook/react';
import { PlanCard } from './PlanCard';

const meta: Meta<typeof PlanCard> = {
  title: 'Components/PlanCard',
  component: PlanCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    ctaHref: 'https://wa.me/50432177256',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Essential: Story = {
  args: {
    title: 'Essential',
    subtitle: 'Básico',
    price: 'L. 2,500',
    description: 'Ideal para iniciar tu viaje epigenético',
    features: [
      'Análisis nutricional básico (30 marcadores)',
      'Identificación de intolerancias alimentarias',
      'Plan alimentario personalizado básico',
      'Guía de macronutrientes',
      'Reporte digital detallado',
    ],
    popular: false,
  },
};

export const Wellness: Story = {
  args: {
    title: 'Wellness',
    subtitle: 'Completo',
    price: 'L. 4,200',
    originalPrice: 'L. 5,000',
    description: 'Ideal para optimización integral de salud',
    features: [
      'Todo lo incluido en Essential',
      'Análisis metabólico completo (60 marcadores)',
      'Recomendaciones de suplementación',
      'Plan de actividad física personalizado',
      'Seguimiento nutricional mensual x3 meses',
      'Consulta de seguimiento incluida',
    ],
    popular: true,
  },
};

export const Beauty: Story = {
  args: {
    title: 'Beauty',
    subtitle: 'Piel y Cabello',
    price: 'L. 5,800',
    description: 'Ideal para belleza desde adentro',
    features: [
      'Todo lo incluido en Wellness',
      'Análisis específico piel y cabello (90 marcadores)',
      'Rutina de cuidado personalizada',
      'Protocolo nutricional antienvejecimiento',
      'Recomendaciones cosméticos biocompatibles',
      'Seguimiento especializado x6 meses',
    ],
    popular: false,
  },
};
