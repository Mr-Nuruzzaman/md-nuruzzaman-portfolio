import { defineConfig, defineCollection, s } from 'velite';

// Case studies live in content/projects/*.mdx. Frontmatter carries the metadata rail;
// the body is plain (GitHub-flavored) markdown rendered to an HTML string via s.markdown()
// — no MDX runtime, so it renders with dangerouslySetInnerHTML in a hand-styled article.
const caseStudies = defineCollection({
  name: 'CaseStudy',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      // File path (relative to content root, no extension) → last segment is the project slug.
      slug: s.path(),
      title: s.string(),
      summary: s.string(),
      role: s.string(),
      period: s.string().optional(),
      stack: s.array(s.string()),
      live: s.string().url().optional(),
      repo: s.string().url().optional(),
      body: s.markdown(),
    })
    .transform((data) => ({ ...data, slug: data.slug.split('/').pop()! })),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { caseStudies },
});
