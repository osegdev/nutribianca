import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import NutritionClinic from './NutritionClinic';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </HelmetProvider>
  );
};

describe('NutritionClinic Landing Page', () => {
  it('renders hero section with correct headline', () => {
    renderWithProviders(<NutritionClinic />);

    expect(screen.getByText('Tu salud, guiada por la evidencia')).toBeInTheDocument();
    expect(screen.getByText(/Santa Rosa de Copán y online/)).toBeInTheDocument();
  });

  it('renders WhatsApp CTA button with correct link', () => {
    renderWithProviders(<NutritionClinic />);

    const whatsappButton = screen.getByRole('link', { name: 'Chat en WhatsApp' });
    expect(whatsappButton).toBeInTheDocument();
    expect(whatsappButton).toHaveAttribute('href', 'https://wa.me/50432177256');
    expect(whatsappButton).toHaveTextContent('Chat en WhatsApp');
  });

  it('renders benefits section with all three benefits', () => {
    renderWithProviders(<NutritionClinic />);

    expect(screen.getByText('Planes clínicos adaptados')).toBeInTheDocument();
    expect(screen.getByText('Seguimiento cercano vía WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('Educación basada en ciencia')).toBeInTheDocument();
  });

  it('renders process section with three steps', () => {
    renderWithProviders(<NutritionClinic />);

    expect(screen.getByText('Evaluación inicial')).toBeInTheDocument();
    expect(screen.getByText('Plan personalizado')).toBeInTheDocument();
    expect(screen.getByText('Seguimiento continuo')).toBeInTheDocument();
  });

  it('renders testimonials section with placeholder content', () => {
    renderWithProviders(<NutritionClinic />);

    expect(screen.getByText('Lo que dicen nuestros pacientes')).toBeInTheDocument();
    expect(screen.getByText('María González')).toBeInTheDocument();
    expect(screen.getByText('Carlos Rivera')).toBeInTheDocument();
    expect(screen.getByText('Ana Martínez')).toBeInTheDocument();
  });

  it('renders all main sections', () => {
    renderWithProviders(<NutritionClinic />);

    // Check all main sections are present
    expect(screen.getByText('¿Por qué elegir NutriBianca?')).toBeInTheDocument();
    expect(screen.getByText('Nuestro proceso de consulta')).toBeInTheDocument();
    expect(screen.getByText('Lo que dicen nuestros pacientes')).toBeInTheDocument();
  });
});
