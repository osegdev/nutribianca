import React from 'react';
import { Button } from './Button';

export interface HeroProps {
  headline: string;
  subheadline: string;
  tagline?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
  overlay?: boolean;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  tagline,
  ctaText = 'Chat en WhatsApp',
  ctaHref = 'https://wa.me/50432177256',
  backgroundImage,
  overlay = false,
  className = '',
}) => {
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : undefined;

  return (
    <section
      className={`relative py-20 px-4 ${backgroundImage ? 'bg-gray-900' : 'bg-gradient-to-br from-primary-50 to-secondary-50'} ${className}`}
      style={backgroundStyle}
    >
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-primary-600/20 backdrop-blur-sm"></div>
      )}
      <div className="container mx-auto max-w-7xl text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {tagline && (
            <div className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              {tagline}
            </div>
          )}
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${backgroundImage ? 'text-white' : 'text-neutral-900'}`}
          >
            {headline}
          </h1>
          <p
            className={`text-lg md:text-xl mb-8 leading-relaxed ${backgroundImage ? 'text-gray-100' : 'text-neutral-600'}`}
          >
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
