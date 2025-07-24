import type { Meta, StoryObj } from '@storybook/react';
import { FAQ } from './FAQ';

const meta: Meta<typeof FAQ> = {
  title: 'Components/FAQ',
  component: FAQ,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EpigeneticsFAQ: Story = {
  args: {
    title: 'Preguntas Frecuentes',
    subtitle: 'Resuelve tus dudas sobre las pruebas epigenéticas',
    faqs: [
      {
        id: 'what-is-epigenetics',
        question: '¿Qué es la epigenética?',
        answer:
          'La epigenética estudia cómo tu ambiente y estilo de vida influyen en la expresión de tus genes. A diferencia de la genética tradicional, la epigenética puede cambiar y es modificable a través de la nutrición, ejercicio y hábitos de vida.',
      },
      {
        id: 'hair-sample',
        question: '¿Cómo se toma la muestra de cabello?',
        answer:
          'Es muy simple: cortas aproximadamente 100 cabellos desde la raíz (zona occipital) usando las tijeras incluidas en el kit. El cabello debe tener mínimo 3cm de largo y haber crecido en los últimos 3 meses. Te enviamos instrucciones detalladas paso a paso.',
      },
      {
        id: 'results-time',
        question: '¿Cuánto demoran los resultados?',
        answer:
          'El análisis completo toma 7 días hábiles desde que recibimos tu muestra en el laboratorio certificado. Recibes tu reporte detallado por email y programamos una consulta de explicación personalizada sin costo adicional.',
      },
      {
        id: 'vs-genetic-test',
        question: '¿Es lo mismo que un test genético tradicional?',
        answer:
          'No. Los tests genéticos analizan tu ADN (que no cambia durante tu vida), mientras que la epigenética analiza cómo tus genes se expresan actualmente según tu estilo de vida, nutrición y ambiente. Es información más práctica y modificable.',
      },
      {
        id: 'includes-followup',
        question: '¿Incluye seguimiento nutricional?',
        answer:
          'Los planes Wellness y Beauty incluyen seguimiento mensual durante 3-6 meses respectivamente con la nutricionista Bianca. El plan Essential puede agregar seguimiento por separado. Todos los planes incluyen una consulta inicial de explicación.',
      },
    ],
  },
};

export const NutritionFAQ: Story = {
  args: {
    title: 'Preguntas Frecuentes',
    subtitle: 'Todo lo que necesitas saber sobre nuestros servicios',
    faqs: [
      {
        id: 'consultation-duration',
        question: '¿Cuánto dura una consulta nutricional?',
        answer:
          'La consulta inicial dura aproximadamente 60-90 minutos, mientras que las consultas de seguimiento duran entre 30-45 minutos. Esto nos permite hacer una evaluación completa y personalizada.',
      },
      {
        id: 'online-vs-presential',
        question: '¿Cuál es la diferencia entre consulta online y presencial?',
        answer:
          'Ambas modalidades ofrecen la misma calidad de atención. La consulta presencial incluye mediciones antropométricas con equipos especializados, mientras que la online te permite acceder desde cualquier lugar con flexibilidad de horarios.',
      },
      {
        id: 'meal-plans',
        question: '¿Incluye plan de comidas específico?',
        answer:
          'Sí, todos nuestros planes incluyen menús personalizados adaptados a tus preferencias, restricciones alimentarias, presupuesto y estilo de vida. También incluye lista de compras y recetas prácticas.',
      },
    ],
  },
};
