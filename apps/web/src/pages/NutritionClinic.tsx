import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero, Benefits, Process, Testimonials } from '@nutribianca/ui';
import type { Benefit, ProcessStep, Testimonial } from '@nutribianca/ui';

const benefits: Benefit[] = [
  {
    id: 'clinical-plans',
    title: 'Planes clínicos adaptados',
    description: 'Nutrición basada en evidencia científica adaptada a tu condición específica',
    icon: '🎯'
  },
  {
    id: 'whatsapp-follow',
    title: 'Seguimiento cercano vía WhatsApp',
    description: 'Acompañamiento continuo y resolución de dudas en tiempo real',
    icon: '💬'
  },
  {
    id: 'science-education',
    title: 'Educación basada en ciencia',
    description: 'Aprende sobre alimentación con información respaldada por investigación',
    icon: '🔬'
  }
];

const processSteps: ProcessStep[] = [
  {
    id: 'evaluation',
    title: 'Evaluación inicial',
    description: 'Análisis completo de tu historial médico y hábitos alimentarios',
    stepNumber: 1
  },
  {
    id: 'plan',
    title: 'Plan personalizado',
    description: 'Diseño de estrategia nutricional específica para tus objetivos',
    stepNumber: 2
  },
  {
    id: 'follow-up',
    title: 'Seguimiento continuo',
    description: 'Ajustes y acompañamiento para garantizar resultados',
    stepNumber: 3
  }
];

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'María González',
    role: 'Paciente',
    content: 'Testimonial placeholder - La atención personalizada y el seguimiento constante me ayudaron a mejorar mi salud.',
    rating: 5
  },
  {
    id: 'testimonial-2',
    name: 'Carlos Rivera',
    role: 'Paciente',
    content: 'Testimonial placeholder - Excelente profesional, muy recomendada para consultas nutricionales.',
    rating: 5
  },
  {
    id: 'testimonial-3',
    name: 'Ana Martínez',
    role: 'Paciente',
    content: 'Testimonial placeholder - Consultas online muy efectivas, me encanta el seguimiento por WhatsApp.',
    rating: 5
  }
];

export const NutritionClinic: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Nutrición Clínica | NutriBianca</title>
        <meta 
          name="description" 
          content="Consultas nutricionales en Santa Rosa de Copán y online. Planes clínicos personalizados basados en evidencia científica." 
        />
        <meta name="keywords" content="nutrición clínica, Santa Rosa de Copán, consultas online, nutricionista Honduras" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Nutrición Clínica | NutriBianca" />
        <meta property="og:description" content="Consultas nutricionales en Santa Rosa de Copán y online. Planes clínicos personalizados basados en evidencia científica." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nutribianca.vercel.app" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nutrición Clínica | NutriBianca" />
        <meta name="twitter:description" content="Consultas nutricionales en Santa Rosa de Copán y online." />
      </Helmet>

      <main>
        <Hero
          headline="Tu salud, guiada por la evidencia"
          subheadline="Consultas nutricionales en Santa Rosa de Copán y online, personalizadas a tus necesidades"
          ctaText="Chat en WhatsApp"
          ctaHref="https://wa.me/50432177256"
        />
        
        <Benefits
          title="¿Por qué elegir NutriBianca?"
          benefits={benefits}
        />
        
        <Process
          title="Nuestro proceso de consulta"
          steps={processSteps}
        />
        
        <Testimonials
          title="Lo que dicen nuestros pacientes"
          testimonials={testimonials}
        />
      </main>
    </>
  );
};

export default NutritionClinic;