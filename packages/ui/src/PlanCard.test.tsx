import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlanCard } from './PlanCard';

describe('PlanCard Component', () => {
  const defaultProps = {
    title: 'Test Plan',
    subtitle: 'Test Subtitle',
    price: 'L. 1,000',
    description: 'Test description',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  };

  it('renders plan title and subtitle', () => {
    render(<PlanCard {...defaultProps} />);
    expect(screen.getByText('Test Plan')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders plan price', () => {
    render(<PlanCard {...defaultProps} />);
    expect(screen.getByText('L. 1,000')).toBeInTheDocument();
  });

  it('renders original price with strikethrough when provided', () => {
    render(<PlanCard {...defaultProps} originalPrice="L. 1,500" />);
    expect(screen.getByText('L. 1,500')).toBeInTheDocument();
    expect(screen.getByText('L. 1,500')).toHaveClass('line-through');
  });

  it('renders description', () => {
    render(<PlanCard {...defaultProps} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders all features with checkmarks', () => {
    render(<PlanCard {...defaultProps} />);
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();

    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks).toHaveLength(3);
  });

  it('renders CTA button with correct href', () => {
    render(<PlanCard {...defaultProps} ctaHref="https://example.com" />);
    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('href', 'https://example.com');
  });

  it('shows popular badge when popular prop is true', () => {
    render(<PlanCard {...defaultProps} popular={true} />);
    expect(screen.getByText('Más Popular')).toBeInTheDocument();
  });

  it('does not show popular badge when popular prop is false', () => {
    render(<PlanCard {...defaultProps} popular={false} />);
    expect(screen.queryByText('Más Popular')).not.toBeInTheDocument();
  });

  it('uses primary variant for popular plans', () => {
    render(<PlanCard {...defaultProps} popular={true} />);
    const button = screen.getByRole('link');
    expect(button).toHaveClass('bg-primary-600');
  });

  it('uses outline variant for non-popular plans', () => {
    render(<PlanCard {...defaultProps} popular={false} />);
    const button = screen.getByRole('link');
    expect(button).toHaveClass('border-primary-600');
  });

  it('renders custom CTA text', () => {
    render(<PlanCard {...defaultProps} ctaText="Custom CTA" />);
    expect(screen.getByText('Custom CTA')).toBeInTheDocument();
  });
});
