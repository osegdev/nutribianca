import React from 'react';

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialsProps {
  title?: string;
  testimonials: Testimonial[];
  className?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  title = 'Lo que dicen nuestros pacientes',
  testimonials,
  className = '',
}) => {
  return (
    <section className={`py-16 px-4 bg-neutral-50 ${className}`}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white rounded-brand p-6 shadow-sm">
              <div className="mb-4">
                {testimonial.rating && (
                  <div className="flex mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-secondary-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-neutral-600 italic leading-relaxed">"{testimonial.content}"</p>
              </div>

              <div className="flex items-center">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                  {testimonial.role && (
                    <p className="text-sm text-neutral-500">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
