import type { Meta, StoryObj } from '@storybook/react';
import { Steps } from './Steps';

const meta: Meta<typeof Steps> = {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EpigeneticsProcess: Story = {
  args: {
    title: '¿Cómo funciona?',
    subtitle: 'Proceso simple en 3 pasos',
    steps: [
      {
        id: 'sample',
        title: 'Toma una muestra de cabello',
        description:
          'Kit de recolección enviado a tu domicilio con instrucciones detalladas. Proceso simple de 5 minutos.',
        icon: '✂️',
      },
      {
        id: 'analysis',
        title: 'Análisis en laboratorio certificado',
        description:
          'Tecnología de última generación analiza más de 90 marcadores epigenéticos relacionados con nutrición y metabolismo.',
        icon: '🔬',
      },
      {
        id: 'results',
        title: 'Recibe tu reporte y plan nutricional',
        description:
          'Reporte personalizado con recomendaciones específicas de alimentación, suplementación y estilo de vida.',
        icon: '📊',
      },
    ],
  },
};

export const GenericProcess: Story = {
  args: {
    title: 'Nuestro Proceso',
    subtitle: 'Cómo trabajamos contigo',
    steps: [
      {
        id: 'consultation',
        title: 'Consulta Inicial',
        description: 'Evaluamos tu historial médico, objetivos y estilo de vida actual.',
        icon: '👥',
      },
      {
        id: 'plan',
        title: 'Plan Personalizado',
        description: 'Creamos un plan nutricional específico para tus necesidades y metas.',
        icon: '📋',
      },
      {
        id: 'followup',
        title: 'Seguimiento Continuo',
        description: 'Monitoreamos tu progreso y ajustamos el plan según sea necesario.',
        icon: '📈',
      },
    ],
  },
};
