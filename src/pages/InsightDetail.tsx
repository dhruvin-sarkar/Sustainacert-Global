import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from '@/layouts/Layout';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { getInsightBySlug, getRelatedInsights, categories } from '@/data/insights';

const normalizeInsightMarkdown = (content: string) =>
  content
    .replace(/\r\n/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-white md:text-[2rem]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-white md:text-[2rem]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight text-white md:text-[1.5rem]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-6 text-[1rem] leading-8 text-foreground/82 md:text-[1.0625rem] [&:last-child]:mb-0">
      {children}
    </p>
  ),
  ol: ({ children }) => (
    <ol className="my-7 ml-5 list-decimal space-y-3 pl-4 text-[1rem] leading-8 text-foreground/82 marker:font-semibold marker:text-primary md:text-[1.0625rem]">
      {children}
    </ol>
  ),
  ul: ({ children }) => (
    <ul className="my-7 ml-5 list-disc space-y-3 pl-4 text-[1rem] leading-8 text-foreground/82 marker:text-primary md:text-[1.0625rem]">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="pl-1.5 [&>p]:mb-0">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 rounded-r-2xl border-l-4 border-primary/45 bg-secondary/35 px-6 py-5 text-[1rem] leading-8 text-foreground/90 md:text-[1.0625rem] [&>p]:mb-0">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white">
      {children}
    </strong>
  ),
};

export default function InsightDetail() {
  const { slug } = useParams();
  const insight = getInsightBySlug(slug || '');
  const related = insight ? getRelatedInsights(insight.id) : [];
  const markdown = normalizeInsightMarkdown(insight?.content ?? '');

  if (!insight) {
    return <Layout><div className="py-40 text-center"><h1 className="text-2xl">Article not found</h1></div></Layout>;
  }

  return (
    <Layout>
      <article className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/news-blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft size={16} /> Back to Insights
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="max-w-3xl">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{insight.type}</span>
                  <h1 className="mt-4 mb-4 text-3xl font-bold md:text-4xl">{insight.title}</h1>
                  <div className="mb-8 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={14} />{insight.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} />{insight.readTime}</span>
                  </div>
                </div>
                <OptimizedImage src={insight.coverImage} alt={insight.title} className="mb-8 w-full rounded-2xl" aspectRatio="16/9" />
                <div className="mt-10 max-w-3xl">
                  <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                    {markdown}
                  </ReactMarkdown>
                </div>
                <div className="mt-8 flex max-w-3xl flex-wrap gap-2">
                  {insight.tags.map((tag) => <span key={tag} className="bg-secondary px-3 py-1 rounded-full text-sm">{tag}</span>)}
                </div>
              </motion.div>
            </div>

            <aside className="space-y-8">
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">{categories.map((cat) => <li key={cat} className="text-sm text-muted-foreground">{cat}</li>)}</ul>
              </div>
              {related.length > 0 && (
                <div className="bg-card rounded-xl p-6 border border-border/50">
                  <h3 className="font-semibold mb-4">Related Articles</h3>
                  <ul className="space-y-4">
                    {related.map((r) => (
                      <li key={r.id}>
                        <Link to={`/insights/${r.slug}`} className="text-sm hover:text-primary">{r.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
}
