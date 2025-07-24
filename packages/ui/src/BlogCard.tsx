import React from 'react';

export interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: number;
  slug: string;
  onClick?: () => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  date,
  author,
  tags,
  readingTime,
  onClick,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Leer artículo: ${title}`}
    >
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <time dateTime={date}>{formatDate(date)}</time>
          <span className="mx-2">•</span>
          <span>{readingTime} min de lectura</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif leading-tight">{title}</h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500">+{tags.length - 3} más</span>
            )}
          </div>

          <div className="text-sm text-gray-500">Por {author}</div>
        </div>
      </div>
    </article>
  );
};
