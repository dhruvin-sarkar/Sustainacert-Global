export interface Insight {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  imageUrl?: string;
}

export interface InsightCategory {
  id: string;
  name: string;
  description: string;
  count: number;
}
