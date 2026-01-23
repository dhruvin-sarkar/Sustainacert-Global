import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { getInsightBySlug, getRelatedInsights, categories } from '@/data/insights';

export default function InsightDetail() {
  const { slug } = useParams();
  const insight = getInsightBySlug(slug || '');
  const related = insight ? getRelatedInsights(insight.id) : [];

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
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{insight.type}</span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">{insight.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                  <span className="flex items-center gap-1"><Calendar size={14} />{insight.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} />{insight.readTime}</span>
                </div>
                <img src={insight.coverImage} alt={insight.title} className="w-full aspect-video object-cover rounded-2xl mb-8" />
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: insight.content.replace(/\n/g, '<br/>') }} />
                <div className="flex flex-wrap gap-2 mt-8">
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
