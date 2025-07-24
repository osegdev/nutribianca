import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BlogCard, SearchInput } from '@nutribianca/ui';
import { useBlogSearch, type BlogPost } from '../hooks/useBlogSearch';

export const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const navigate = useNavigate();

  const { results, isSearching, filterByTag, allTags, totalResults } = useBlogSearch({
    posts,
    searchTerm,
  });

  // Load blog posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/blog-index.json');

        if (!response.ok) {
          throw new Error('Failed to load blog posts');
        }

        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('No pudimos cargar los artículos del blog. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Handle tag filtering
  const displayedPosts = selectedTag ? filterByTag(selectedTag) : results;

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setSearchTerm(''); // Clear search when filtering by tag
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando artículos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog de Nutrición | NutriBianca</title>
        <meta
          name="description"
          content="Artículos científicos sobre nutrición, hidratación, fibra dietética y suplementos epigenéticos. Información basada en evidencia para optimizar tu salud."
        />
        <meta property="og:title" content="Blog de Nutrición | NutriBianca" />
        <meta
          property="og:description"
          content="Artículos científicos sobre nutrición, hidratación, fibra dietética y suplementos epigenéticos. Información basada en evidencia para optimizar tu salud."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <nav className="text-sm text-gray-600 mb-4">
              <a href="/" className="hover:text-green-600">
                Inicio
              </a>
              <span className="mx-2">›</span>
              <span className="text-gray-900">Blog</span>
            </nav>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Blog de Nutrición</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Artículos científicos y prácticos sobre nutrición, basados en evidencia para ayudarte
              a optimizar tu salud y bienestar.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Input */}
              <div className="flex-1">
                <SearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Buscar por título, contenido o etiquetas..."
                  className="w-full"
                />
              </div>

              {/* Results Counter */}
              <div className="flex items-center text-sm text-gray-600">
                {isSearching && (
                  <span>
                    {totalResults} resultado{totalResults !== 1 ? 's' : ''}
                    {searchTerm && ` para "${searchTerm}"`}
                  </span>
                )}
                {selectedTag && (
                  <span>
                    Filtrando por etiqueta: <strong>{selectedTag}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Filtrar por etiqueta:</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-green-100 text-green-800 border-2 border-green-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-800 border-2 border-transparent'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {(searchTerm || selectedTag) && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          {displayedPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.469.901-6.058 2.37l-.847-.847A6.969 6.969 0 0112 13.5c2.38 0 4.525.927 6.12 2.44l-.847.847-.847-.847z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron artículos
                </h3>
                <p className="text-gray-600 mb-4">
                  {isSearching
                    ? `No hay resultados para "${searchTerm}". Intenta con otros términos de búsqueda.`
                    : selectedTag
                      ? `No hay artículos con la etiqueta "${selectedTag}".`
                      : 'No hay artículos disponibles en este momento.'}
                </p>
                {(searchTerm || selectedTag) && (
                  <button
                    onClick={clearFilters}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Ver todos los artículos
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPosts.map(post => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  author={post.author}
                  tags={post.tags}
                  readingTime={post.readingTime}
                  slug={post.slug}
                  onClick={() => handlePostClick(post.slug)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
