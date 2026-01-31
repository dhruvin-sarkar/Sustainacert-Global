import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { insights } from '@/data/insights';

export default function LatestInsights() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const latestInsights = useMemo(() => insights.slice(0, 5), []);

  return (
    <section ref={ref} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={
            shouldReduceMotion
              ? undefined
              : isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Insights
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Latest News & Articles</h2>
          </div>
          <Link
            to="/news-blogs"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View all insights
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Article */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={
              shouldReduceMotion
                ? undefined
                : isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <Link
              to={`/insights/${latestInsights[0].slug}`}
              className="group block h-full"
            >
              <div className="relative h-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card hover-lift">
                <div className="aspect-[4/3] lg:aspect-auto lg:h-48 overflow-hidden">
                  <img
                    src={latestInsights[0].coverImage}
                    alt={latestInsights[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {latestInsights[0].type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {latestInsights[0].readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {latestInsights[0].title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {latestInsights[0].excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other Articles */}
          {latestInsights.slice(1, 5).map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: (index + 1) * 0.1, duration: 0.5 }
              }
            >
              <Link
                to={`/insights/${insight.slug}`}
                className="group block"
              >
                <div className="bg-card rounded-xl overflow-hidden border border-border/50 shadow-soft hover-lift h-full">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={insight.coverImage}
                      alt={insight.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-primary">
                        {insight.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {insight.readTime}
                      </span>
                    </div>
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {insight.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
