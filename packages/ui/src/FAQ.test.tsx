import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQ } from './FAQ';

describe('FAQ Component', () => {
  const defaultFaqs = [
    {
      id: 'faq1',
      question: 'Question 1?',
      answer: 'Answer 1'
    },
    {
      id: 'faq2',
      question: 'Question 2?', 
      answer: 'Answer 2'
    }
  ];

  it('renders default title and subtitle', () => {
    render(<FAQ faqs={defaultFaqs} />);
    expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument();
    expect(screen.getByText('Resuelve tus dudas sobre nuestros servicios')).toBeInTheDocument();
  });

  it('renders custom title and subtitle', () => {
    render(<FAQ faqs={defaultFaqs} title="Custom Title" subtitle="Custom Subtitle" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
  });

  it('renders all questions', () => {
    render(<FAQ faqs={defaultFaqs} />);
    expect(screen.getByText('Question 1?')).toBeInTheDocument();
    expect(screen.getByText('Question 2?')).toBeInTheDocument();
  });

  it('hides answers by default', () => {
    render(<FAQ faqs={defaultFaqs} />);
    expect(screen.queryByText('Answer 1')).not.toBeVisible();
    expect(screen.queryByText('Answer 2')).not.toBeVisible();
  });

  it('shows answer when question is clicked', () => {
    render(<FAQ faqs={defaultFaqs} />);
    const question1 = screen.getByText('Question 1?');
    fireEvent.click(question1);
    expect(screen.getByText('Answer 1')).toBeVisible();
  });

  it('hides answer when clicked again', () => {
    render(<FAQ faqs={defaultFaqs} />);
    const question1 = screen.getByText('Question 1?');
    
    fireEvent.click(question1);
    expect(screen.getByText('Answer 1')).toBeVisible();
    
    fireEvent.click(question1);
    expect(screen.queryByText('Answer 1')).not.toBeVisible();
  });

  it('allows multiple answers to be open simultaneously', () => {
    render(<FAQ faqs={defaultFaqs} />);
    const question1 = screen.getByText('Question 1?');
    const question2 = screen.getByText('Question 2?');
    
    fireEvent.click(question1);
    fireEvent.click(question2);
    
    expect(screen.getByText('Answer 1')).toBeVisible();
    expect(screen.getByText('Answer 2')).toBeVisible();
  });

  it('sets correct aria attributes', () => {
    render(<FAQ faqs={defaultFaqs} />);
    const button1 = screen.getByRole('button', { name: /Question 1/ });
    const button2 = screen.getByRole('button', { name: /Question 2/ });
    
    expect(button1).toHaveAttribute('aria-expanded', 'false');
    expect(button2).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(button1);
    expect(button1).toHaveAttribute('aria-expanded', 'true');
  });

  it('handles empty FAQ array', () => {
    render(<FAQ faqs={[]} />);
    expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument();
    expect(screen.queryByText('Question 1?')).not.toBeInTheDocument();
  });
});