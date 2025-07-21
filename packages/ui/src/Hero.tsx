import React from 'react';
import { Button } from './Button';

export interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  ctaText = 'Chat en WhatsApp',
  ctaHref = 'https://wa.me/50432177256',
  backgroundImage,
  className = '',
}) => {
  return (
    <section 
      className={`relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20 px-4 ${className}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="container mx-auto max-w-7xl text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed">
            {subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              href={ctaHref}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              aria-label="Abrir chat de WhatsApp"
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;