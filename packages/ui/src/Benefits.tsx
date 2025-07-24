import React from 'react';

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or icon class
}

export interface BenefitsProps {
  title?: string;
  benefits: Benefit[];
  className?: string;
}

export const Benefits: React.FC<BenefitsProps> = ({
  title = 'Beneficios',
  benefits,
  className = '',
}) => {
  return (
    <section className={`py-16 px-4 bg-neutral-50 ${className}`}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map(benefit => (
            <div
              key={benefit.id}
              className="bg-white rounded-brand p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4 text-center">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3 text-center">
                {benefit.title}
              </h3>
              <p className="text-neutral-600 text-center leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
