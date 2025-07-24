import React from 'react';
import { Button } from './Button';

export interface PlanCardProps {
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string | null;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  title,
  subtitle,
  price,
  originalPrice,
  description,
  features,
  popular = false,
  ctaText = 'Consultar vía WhatsApp',
  ctaHref = 'https://wa.me/50432177256',
  className = '',
}) => {
  return (
    <div
      className={`relative bg-white rounded-lg shadow-lg border-2 p-6 h-full flex flex-col ${
        popular ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'
      } ${className}`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Más Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-neutral-900 mb-1">{title}</h3>
        <p className="text-primary-600 font-medium mb-3">{subtitle}</p>

        <div className="mb-4">
          {originalPrice && (
            <span className="text-gray-400 line-through text-lg mr-2">{originalPrice}</span>
          )}
          <span className="text-4xl font-bold text-secondary-600">{price}</span>
        </div>

        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      <div className="flex-1 mb-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                ✓
              </span>
              <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <Button
          href={ctaHref}
          variant={popular ? 'primary' : 'outline'}
          size="lg"
          className="w-full"
          aria-label={`Consultar plan ${title} por WhatsApp`}
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
