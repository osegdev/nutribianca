import React, { useState } from 'react';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

interface AccordionItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-lg"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span className="font-medium text-neutral-900 pr-4">{faq.question}</span>
        <span className={`flex-shrink-0 text-primary-500 transform transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <div
        id={`faq-answer-${faq.id}`}
        className={`px-6 transition-all duration-200 ease-in-out overflow-hidden ${
          isOpen ? 'pb-4 max-h-96' : 'max-h-0'
        }`}
      >
        <div className="text-neutral-600 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC<FAQProps> = ({
  faqs,
  title = "Preguntas Frecuentes",
  subtitle = "Resuelve tus dudas sobre nuestros servicios",
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className={`py-16 px-4 bg-white ${className}`}>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-600">
            {subtitle}
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;