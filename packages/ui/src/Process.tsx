import React from 'react';

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  stepNumber: number;
}

export interface ProcessProps {
  title?: string;
  steps: ProcessStep[];
  className?: string;
}

export const Process: React.FC<ProcessProps> = ({
  title = 'Nuestro Proceso',
  steps,
  className = '',
}) => {
  return (
    <section className={`py-16 px-4 bg-white ${className}`}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary-200 transform -translate-x-4 z-0" />
              )}

              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-primary-400 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.stepNumber}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{step.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
