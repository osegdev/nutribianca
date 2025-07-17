import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders Hello NutriBianca message', () => {
    render(<App />)
    
    expect(screen.getByText('Hello NutriBianca 👋')).toBeInTheDocument()
    expect(screen.getByText('Clínica de nutrición personalizada')).toBeInTheDocument()
  })
  
  it('renders WhatsApp button with correct link', () => {
    render(<App />)
    
    const whatsappButton = screen.getByRole('link', { name: /chat en whatsapp/i })
    expect(whatsappButton).toBeInTheDocument()
    expect(whatsappButton).toHaveAttribute('href', 'https://wa.me/50432177256')
  })
})