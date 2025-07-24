#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const matter = require('gray-matter');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import our blog utilities
const rootDir = path.join(__dirname, '..');
const webAppDir = path.join(rootDir, 'apps/web');

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

async function getAllPostsWithContent() {
  const postsDirectory = path.join(rootDir, 'content/blog');
  const { remark } = await import('remark');
  const remarkHtml = await import('remark-html');

  try {
    const slugs = fs.readdirSync(postsDirectory);
    const posts = [];

    for (const slug of slugs) {
      const fullPath = path.join(postsDirectory, slug, 'index.md');

      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content: rawContent } = matter(fileContents);
        const readingTime = calculateReadingTime(rawContent);

        // Process markdown to HTML
        const processedContent = await remark().use(remarkHtml.default).process(rawContent);

        const content = processedContent.toString();

        posts.push({
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          tags: data.tags || [],
          author: data.author,
          cover: data.cover,
          readingTime,
          content, // Include processed HTML content
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

async function generateBlogIndex() {
  try {
    console.log('🔄 Generating blog index...');

    // Get all posts with content
    const posts = await getAllPostsWithContent();

    // Create the blog index
    const blogIndex = {
      posts,
      generatedAt: new Date().toISOString(),
      totalPosts: posts.length,
      tags: [...new Set(posts.flatMap(post => post.tags))].sort(),
    };

    // Ensure public directory exists
    const publicDir = path.join(webAppDir, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write the blog index
    const outputPath = path.join(publicDir, 'blog-index.json');
    fs.writeFileSync(outputPath, JSON.stringify(blogIndex, null, 2));

    console.log(`✅ Blog index generated with ${posts.length} posts`);
    console.log(`📄 Output: ${outputPath}`);

    // Log post summaries
    posts.forEach(post => {
      console.log(`   - ${post.title} (${post.date}) - ${post.readingTime}min read`);
    });
  } catch (error) {
    console.error('❌ Error generating blog index:', error);
    process.exit(1);
  }
}

// Run the generator if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateBlogIndex();
}

export { generateBlogIndex };
