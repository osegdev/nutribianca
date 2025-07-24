import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Steps } from './Steps';

describe('Steps Component', () => {
  const defaultSteps = [
    {
      id: 'step1',
      title: 'Step 1',
      description: 'Description 1',
      icon: '🔥',
    },
    {
      id: 'step2',
      title: 'Step 2',
      description: 'Description 2',
      icon: '⚡',
    },
    {
      id: 'step3',
      title: 'Step 3',
      description: 'Description 3',
      icon: '🎯',
    },
  ];

  it('renders default title and subtitle', () => {
    render(<Steps steps={defaultSteps} />);
    expect(screen.getByText('¿Cómo funciona?')).toBeInTheDocument();
    expect(screen.getByText('Proceso simple en 3 pasos')).toBeInTheDocument();
  });

  it('renders custom title and subtitle', () => {
    render(<Steps steps={defaultSteps} title="Custom Title" subtitle="Custom Subtitle" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
  });

  it('renders all step titles and descriptions', () => {
    render(<Steps steps={defaultSteps} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
    expect(screen.getByText('Description 3')).toBeInTheDocument();
  });

  it('renders step icons', () => {
    render(<Steps steps={defaultSteps} />);
    expect(screen.getByText('🔥')).toBeInTheDocument();
    expect(screen.getByText('⚡')).toBeInTheDocument();
    expect(screen.getByText('🎯')).toBeInTheDocument();
  });

  it('renders step numbers', () => {
    render(<Steps steps={defaultSteps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders correct number of steps', () => {
    const twoSteps = defaultSteps.slice(0, 2);
    render(<Steps steps={twoSteps} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.queryByText('Step 3')).not.toBeInTheDocument();
  });

  it('handles empty steps array', () => {
    render(<Steps steps={[]} />);
    expect(screen.getByText('¿Cómo funciona?')).toBeInTheDocument();
    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
  });
});
