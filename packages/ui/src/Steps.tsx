import React from 'react';

export interface Step {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StepsProps {
  steps: Step[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const Steps: React.FC<StepsProps> = ({
  steps,
  title = "¿Cómo funciona?",
  subtitle = "Proceso simple en 3 pasos",
  className = '',
}) => {
  return (
    <section className={`py-16 px-4 bg-gray-50 ${className}`}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="text-center relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-primary-200 z-0" />
              )}
              
              {/* Step Circle */}
              <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 bg-primary-500 text-white rounded-full text-3xl mb-6 mx-auto">
                {step.icon}
              </div>
              
              {/* Step Number */}
              <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-2 bg-secondary-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                {index + 1}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {step.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;