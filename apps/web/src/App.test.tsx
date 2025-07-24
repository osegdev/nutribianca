import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders nutrition clinic landing page', () => {
    render(<App />);

    expect(screen.getByText('Tu salud, guiada por la evidencia')).toBeInTheDocument();
    expect(screen.getByText(/Santa Rosa de Copán y online/)).toBeInTheDocument();
  });

  it('renders WhatsApp button with correct link', () => {
    render(<App />);

    const whatsappButton = screen.getByRole('link', { name: 'Chat en WhatsApp' });
    expect(whatsappButton).toBeInTheDocument();
    expect(whatsappButton).toHaveAttribute('href', 'https://wa.me/50432177256');
  });
});
