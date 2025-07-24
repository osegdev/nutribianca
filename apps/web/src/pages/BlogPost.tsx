import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface BlogPostType {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  cover?: string;
  content: string;
  readingTime: number;
}

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('Artículo no encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Load blog index to find the post
        const indexResponse = await fetch('/blog-index.json');
        if (!indexResponse.ok) {
          throw new Error('Failed to load blog index');
        }

        const blogIndex = await indexResponse.json();
        const postMeta = blogIndex.posts.find((p: { slug: string }) => p.slug === slug);

        if (!postMeta) {
          setError('Artículo no encontrado');
          return;
        }

        // Use the pre-processed content from the blog index
        const postData: BlogPostType = {
          ...postMeta,
          content:
            postMeta.content ||
            `<div class="blog-content">
            <p>${postMeta.excerpt}</p>
            <p><em>Contenido completo del artículo estará disponible próximamente. 
            Por ahora puedes contactarnos vía WhatsApp para obtener información detallada sobre este tema.</em></p>
          </div>`,
        };

        setPost(postData);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Error al cargar el artículo. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const text = `Te comparto este artículo interesante sobre nutrición: "${post?.title}" - ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactNutritionist = () => {
    const message = `Hola! He leído el artículo "${post?.title}" y me gustaría una consulta nutricional personalizada.`;
    const whatsappUrl = `https://wa.me/50432177256?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-6">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.469.901-6.058 2.37l-.847-.847A6.969 6.969 0 0112 13.5c2.38 0 4.525.927 6.12 2.44l-.847.847-.847-.847z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {error || 'Artículo no encontrado'}
              </h1>
              <p className="text-gray-600 mb-6">
                Este artículo no existe o ha sido movido. Te invitamos a explorar otros artículos de
                nuestro blog.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate('/blog')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Ver todos los artículos
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="bg-white text-green-600 px-6 py-3 rounded-lg border-2 border-green-600 hover:bg-green-50 transition-colors font-medium"
                >
                  Ir al inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Blog NutriBianca</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Blog NutriBianca`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:tag" content={post.tags.join(', ')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Helmet>

      <article className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumbs */}
              <nav className="text-sm text-gray-600 mb-6">
                <button onClick={() => navigate('/')} className="hover:text-green-600">
                  Inicio
                </button>
                <span className="mx-2">›</span>
                <button onClick={() => navigate('/blog')} className="hover:text-green-600">
                  Blog
                </button>
                <span className="mx-2">›</span>
                <span className="text-gray-900">{post.title}</span>
              </nav>

              {/* Article Meta */}
              <div className="flex items-center text-sm text-gray-600 mb-6">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="mx-2">•</span>
                <span>{post.readingTime} min de lectura</span>
                <span className="mx-2">•</span>
                <span>Por {post.author}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="prose prose-lg max-w-none p-8 lg:p-12">
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* CTA Section */}
              <div className="border-t border-gray-200 p-8 lg:p-12">
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    ¿Te gustaría una consulta personalizada?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Obtén un plan nutricional específico para tus necesidades y objetivos de salud.
                    Disponible en Santa Rosa de Copán y modalidad online.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={contactNutritionist}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Consultar vía WhatsApp
                    </button>
                    <button
                      onClick={shareOnWhatsApp}
                      className="bg-white text-green-600 px-6 py-3 rounded-lg border-2 border-green-600 hover:bg-green-50 transition-colors font-medium"
                    >
                      Compartir artículo
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="border-t border-gray-200 p-8 lg:p-12">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigate('/blog')}
                    className="flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Ver todos los artículos
                  </button>

                  <button
                    onClick={shareOnWhatsApp}
                    className="flex items-center text-gray-600 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.516z" />
                    </svg>
                    Compartir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
