import { useState, useEffect, useMemo } from 'react';
import Fuse, { type FuseResult, type IFuseOptions } from 'fuse.js';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  readingTime: number;
}

export interface BlogSearchResult extends BlogPost {
  score?: number;
  matches?: FuseResult<BlogPost>['matches'];
}

export interface UseBlogSearchProps {
  posts: BlogPost[];
  searchTerm: string;
  options?: IFuseOptions<BlogPost>;
}

const defaultFuseOptions: IFuseOptions<BlogPost> = {
  keys: [
    { name: 'title', weight: 0.6 },
    { name: 'excerpt', weight: 0.3 },
    { name: 'tags', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

export const useBlogSearch = ({
  posts,
  searchTerm,
  options = defaultFuseOptions,
}: UseBlogSearchProps) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce search term with 150ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Initialize Fuse instance
  const fuse = useMemo(() => {
    if (!posts || posts.length === 0) return null;
    return new Fuse(posts, options);
  }, [posts, options]);

  // Perform search
  const searchResults = useMemo(() => {
    if (!fuse || !debouncedSearchTerm.trim()) {
      return posts;
    }

    const results = fuse.search(debouncedSearchTerm.trim());
    return results.map(result => ({
      ...result.item,
      score: result.score,
      matches: result.matches,
    }));
  }, [fuse, debouncedSearchTerm, posts]);

  // Filter by tag
  const filterByTag = (tag: string): BlogPost[] => {
    return posts.filter(post =>
      post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
    );
  };

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  return {
    results: searchResults as BlogSearchResult[],
    isSearching: debouncedSearchTerm.length > 0,
    searchTerm: debouncedSearchTerm,
    filterByTag,
    allTags,
    totalResults: searchResults.length,
  };
};
