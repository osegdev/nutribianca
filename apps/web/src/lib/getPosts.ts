import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export interface BlogPost {
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

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  cover?: string;
  readingTime: number;
}

const postsDirectory = path.join(process.cwd(), '../../content/blog');

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, slug, 'index.md');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content: rawContent } = matter(fileContents);

    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkHtml)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
      .process(rawContent);

    const content = processedContent.toString();
    const readingTime = calculateReadingTime(rawContent);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags || [],
      author: data.author,
      cover: data.cover,
      content,
      readingTime,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export function getAllPostsMeta(): BlogPostMeta[] {
  try {
    const slugs = fs.readdirSync(postsDirectory);
    const posts: BlogPostMeta[] = [];

    for (const slug of slugs) {
      const fullPath = path.join(postsDirectory, slug, 'index.md');

      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const readingTime = calculateReadingTime(content);

        posts.push({
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          tags: data.tags || [],
          author: data.author,
          cover: data.cover,
          readingTime,
        });
      }
    }

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllPostsMeta();
  return allPosts.filter(post =>
    post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
  );
}

export function getAllTags(): string[] {
  const allPosts = getAllPostsMeta();
  const tagSet = new Set<string>();

  allPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}
