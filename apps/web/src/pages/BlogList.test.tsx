import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BlogList } from './BlogList';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock router navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockBlogData = {
  posts: [
    {
      slug: '2025-08-15-hidratacion-basica',
      title: 'Hidratación Básica: Fundamentos Científicos',
      date: '2025-08-15',
      excerpt: 'Descubre la ciencia detrás de la hidratación y cómo optimizar tu consumo de agua.',
      tags: ['hidratación', 'salud', 'ciencia'],
      author: 'Dra. Bianca Nutrióloga',
      readingTime: 3,
    },
    {
      slug: '2025-08-20-fibra-dietetica',
      title: 'Fibra Dietética: Tu Aliada Invisible',
      date: '2025-08-20',
      excerpt: 'Explora los tipos de fibra y sus beneficios científicamente probados.',
      tags: ['fibra', 'digestión', 'microbiota'],
      author: 'Dra. Bianca Nutrióloga',
      readingTime: 4,
    },
  ],
  totalPosts: 2,
  tags: ['hidratación', 'salud', 'ciencia', 'fibra', 'digestión', 'microbiota'],
};

const renderBlogList = () => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <BlogList />
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe('BlogList', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockNavigate.mockClear();
  });

  it('renders loading state initially', () => {
    mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderBlogList();

    expect(screen.getByText('Cargando artículos...')).toBeInTheDocument();
  });

  it('renders blog posts after loading', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBlogData,
    });

    renderBlogList();

    await waitFor(() => {
      expect(screen.getByText('Hidratación Básica: Fundamentos Científicos')).toBeInTheDocument();
      expect(screen.getByText('Fibra Dietética: Tu Aliada Invisible')).toBeInTheDocument();
    });
  });

  it('renders error state when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    renderBlogList();

    await waitFor(() => {
      expect(screen.getByText(/No pudimos cargar los artículos del blog/)).toBeInTheDocument();
    });
  });

  it('filters posts by search term', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBlogData,
    });

    renderBlogList();

    await waitFor(() => {
      expect(screen.getByText('Hidratación Básica: Fundamentos Científicos')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Buscar artículos del blog');
    fireEvent.change(searchInput, { target: { value: 'fibra' } });

    await waitFor(() => {
      expect(screen.getByText('Fibra Dietética: Tu Aliada Invisible')).toBeInTheDocument();
      expect(
        screen.queryByText('Hidratación Básica: Fundamentos Científicos')
      ).not.toBeInTheDocument();
    });
  });

  it('filters posts by tag', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBlogData,
    });

    renderBlogList();

    await waitFor(() => {
      expect(screen.getByText('Hidratación Básica: Fundamentos Científicos')).toBeInTheDocument();
    });

    const hidratacionTag = screen.getByText('hidratación');
    fireEvent.click(hidratacionTag);

    await waitFor(() => {
      expect(screen.getByText('Hidratación Básica: Fundamentos Científicos')).toBeInTheDocument();
      expect(screen.queryByText('Fibra Dietética: Tu Aliada Invisible')).not.toBeInTheDocument();
    });
  });

  it('navigates to blog post when card is clicked', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBlogData,
    });

    renderBlogList();

    await waitFor(() => {
      expect(screen.getByText('Hidratación Básica: Fundamentos Científicos')).toBeInTheDocument();
    });

    const blogCard = screen
      .getByText('Hidratación Básica: Fundamentos Científicos')
      .closest('article');
    fireEvent.click(blogCard!);

    expect(mockNavigate).toHaveBeenCalledWith('/blog/2025-08-15-hidratacion-basica');
  });

  it('shows no results message when search yields no results', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBlogData,
    });

    renderBlogList();

    await waitFor(() => {
      expect(screen.getByText('Hidratación Básica: Fundamentos Científicos')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Buscar artículos del blog');
    fireEvent.change(searchInput, { target: { value: 'xyz123notfound' } });

    await waitFor(() => {
      expect(screen.getByText('No se encontraron artículos')).toBeInTheDocument();
    });
  });

  it('clears filters when clear button is clicked', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBlogData,
    });

    renderBlogList();

    await waitFor(() => {
      expect(screen.getByText('Hidratación Básica: Fundamentos Científicos')).toBeInTheDocument();
    });

    // Apply a filter
    const searchInput = screen.getByLabelText('Buscar artículos del blog');
    fireEvent.change(searchInput, { target: { value: 'fibra' } });

    await waitFor(() => {
      expect(screen.getByText('Limpiar filtros')).toBeInTheDocument();
    });

    // Clear filters
    const clearButton = screen.getByText('Limpiar filtros');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText('Hidratación Básica: Fundamentos Científicos')).toBeInTheDocument();
      expect(screen.getByText('Fibra Dietética: Tu Aliada Invisible')).toBeInTheDocument();
    });
  });

  it('displays correct SEO meta tags', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBlogData,
    });

    renderBlogList();

    await waitFor(() => {
      expect(document.title).toBe('Blog de Nutrición | NutriBianca');
    });

    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    expect(metaDescription?.content).toContain('Artículos científicos sobre nutrición');
  });
});
