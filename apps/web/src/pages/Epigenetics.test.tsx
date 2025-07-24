import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import Epigenetics from './Epigenetics';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </HelmetProvider>
  );
};

describe('Epigenetics Page', () => {
  it('renders main headline', () => {
    renderWithProviders(<Epigenetics />);
    expect(screen.getByText('Descubre qué dice tu epigenética sobre tu salud')).toBeInTheDocument();
  });

  it('renders all three plan cards', () => {
    renderWithProviders(<Epigenetics />);
    expect(screen.getByText('Essential')).toBeInTheDocument();
    expect(screen.getByText('Wellness')).toBeInTheDocument();
    expect(screen.getByText('Beauty')).toBeInTheDocument();
  });

  it('renders plan prices correctly', () => {
    renderWithProviders(<Epigenetics />);
    expect(screen.getByText('L. 2,500')).toBeInTheDocument();
    expect(screen.getByText('L. 4,200')).toBeInTheDocument();
    expect(screen.getByText('L. 5,800')).toBeInTheDocument();
  });

  it('renders WhatsApp CTA buttons', () => {
    renderWithProviders(<Epigenetics />);
    const whatsappButtons = screen.getAllByText(/Consultar vía WhatsApp/);
    expect(whatsappButtons.length).toBeGreaterThan(0);

    whatsappButtons.forEach(button => {
      const link = button.closest('a');
      expect(link).toHaveAttribute('href', 'https://wa.me/50432177256');
    });
  });

  it('renders process steps section', () => {
    renderWithProviders(<Epigenetics />);
    expect(screen.getByText('¿Cómo funciona?')).toBeInTheDocument();
    expect(screen.getByText('Toma una muestra de cabello')).toBeInTheDocument();
    expect(screen.getByText('Análisis en laboratorio certificado')).toBeInTheDocument();
    expect(screen.getByText('Recibe tu reporte y plan nutricional')).toBeInTheDocument();
  });

  it('renders FAQ section', () => {
    renderWithProviders(<Epigenetics />);
    expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument();
    expect(screen.getByText('¿Qué es la epigenética?')).toBeInTheDocument();
    expect(screen.getByText('¿Cómo se toma la muestra de cabello?')).toBeInTheDocument();
  });

  it('renders testimonials section', () => {
    renderWithProviders(<Epigenetics />);
    expect(screen.getByText('Lo que dicen nuestros pacientes')).toBeInTheDocument();
    expect(screen.getByText('María José')).toBeInTheDocument();
    expect(screen.getByText('Carlos Andrade')).toBeInTheDocument();
    expect(screen.getByText('Andrea Soto')).toBeInTheDocument();
  });

  it('renders disclaimer section', () => {
    renderWithProviders(<Epigenetics />);
    expect(
      screen.getByText(/La prueba epigenética es un complemento nutricional/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Santa Rosa de Copán y modalidad online/)).toBeInTheDocument();
  });

  it('renders benefits section', () => {
    renderWithProviders(<Epigenetics />);
    expect(screen.getByText('Personalización Científica')).toBeInTheDocument();
    expect(screen.getByText('No Invasivo')).toBeInTheDocument();
    expect(screen.getByText('Resultados Rápidos')).toBeInTheDocument();
    expect(screen.getByText('Complemento Nutricional')).toBeInTheDocument();
  });

  it('marks Wellness plan as popular', () => {
    renderWithProviders(<Epigenetics />);
    expect(screen.getByText('Más Popular')).toBeInTheDocument();
  });
});
