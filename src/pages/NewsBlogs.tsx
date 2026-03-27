import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/layouts/Layout';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { insights, categories } from '@/data/insights';

export default function NewsBlogs() {
  return (
    <Layout>
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">News & <span className="text-gradient">Insights</span></h1>
            <p className="text-xl text-muted-foreground">Stay informed on certification standards, sustainability trends, and industry updates.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {insights.map((insight, index) => (
                <motion.div key={insight.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Link to={`/insights/${insight.slug}`} className="group flex flex-col md:flex-row gap-6 bg-card rounded-xl p-4 border border-border/50 hover-lift">
                    <OptimizedImage src={insight.coverImage} alt={insight.title} className="h-32 w-full rounded-lg md:w-48 md:flex-shrink-0" aspectRatio="3/2" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{insight.type}</span>
                        <span className="text-xs text-muted-foreground">{insight.date}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{insight.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{insight.excerpt}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <aside className="space-y-8">
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat}><span className="text-sm text-muted-foreground">{cat}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-secondary/50 rounded-xl p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">Sustainability isn't only compliance-it's progress, integrity, and accountability. Our insights cover certification updates, climate action, and global policy.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}

