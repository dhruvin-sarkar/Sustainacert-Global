export interface Insight {
  id: string;
  slug: string;
  title: string;
  type: 'News' | 'Blog';
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  content: string;
  tags: string[];
  readTime: string;
}

export const categories = [
  'Sustainable Standards & Certifications',
  'Climate & Environmental Impact',
  'Global Policy & SDG Initiatives',
  'Corporate Sustainability & Leadership',
  'Circular Economy & Innovation',
];

export const insights: Insight[] = [
  {
    id: '1',
    slug: 'sustainacert-launches-carbon-footprint-verification',
    title: 'Sustainacert Launches Global Carbon Footprint Verification Services',
    type: 'News',
    date: '2024-12-15',
    category: 'Climate & Environmental Impact',
    excerpt: 'Expanding our climate services portfolio to help organizations measure, report, and verify their greenhouse gas emissions across all scopes.',
    coverImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
    content: `
As the global business community increasingly recognizes the urgency of climate action, SUSTAINACERT International is proud to announce the launch of our comprehensive Carbon Footprint Verification Services.

> "Accurate emissions measurement is the foundation of meaningful climate action. Our new verification services provide organizations with the credibility they need to demonstrate genuine environmental commitment." — SUSTAINACERT Leadership

## What This Means for Organizations

Our new service offering covers:

- **Scope 1 Emissions**: Direct emissions from owned or controlled sources
- **Scope 2 Emissions**: Indirect emissions from purchased electricity, steam, heating, and cooling
- **Scope 3 Emissions**: All other indirect emissions in the value chain

We follow internationally recognized frameworks including ISO 14064-1, the GHG Protocol, and Science Based Targets initiative (SBTi) methodologies.

## Getting Started

Organizations interested in carbon footprint verification can apply through our online portal or contact our climate services team directly.
    `,
    tags: ['Carbon Footprint', 'GHG Verification', 'Climate Action', 'ISO 14064'],
    readTime: '4 min read',
  },
  {
    id: '2',
    slug: 'sdg-summit-outcomes-reflection',
    title: 'Reflecting on the Outcomes of the SDG Summit: Implications for Certification Bodies',
    type: 'News',
    date: '2024-11-28',
    category: 'Global Policy & SDG Initiatives',
    excerpt: 'The recent SDG Summit reinforced the critical role of verification and assurance in achieving sustainable development goals by 2030.',
    coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
    content: `
The United Nations Sustainable Development Goals Summit has concluded with renewed commitments and a clearer roadmap for achieving the 2030 Agenda. For certification bodies like SUSTAINACERT, this signals both opportunity and responsibility.

## Key Takeaways

The summit emphasized:

1. **Accelerated Action**: Halfway to 2030, progress must be significantly accelerated
2. **Data and Verification**: Reliable data and third-party verification are essential for tracking progress
3. **Private Sector Engagement**: Businesses play a crucial role in SDG achievement

> "Certification and verification services are no longer optional—they're essential infrastructure for sustainable development."

## Our Commitment

SUSTAINACERT remains committed to supporting organizations in their sustainability journeys, providing the verification services that build trust and demonstrate genuine progress.
    `,
    tags: ['SDG', 'Sustainability', 'United Nations', 'Policy'],
    readTime: '5 min read',
  },
  {
    id: '3',
    slug: 'global-sustainability-csr-forum-unified-action',
    title: '13th Global Sustainability and CSR Forum Calls for Unified Action Across Industries',
    type: 'Blog',
    date: '2024-11-15',
    category: 'Corporate Sustainability & Leadership',
    excerpt: 'Industry leaders convened to discuss collaborative approaches to sustainability challenges, emphasizing the need for standardized frameworks and verified commitments.',
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    content: `
The 13th Global Sustainability and CSR Forum brought together thought leaders, corporate executives, and sustainability professionals from around the world. The central theme: unified action is no longer aspirational—it's essential.

## Forum Highlights

### Cross-Industry Collaboration

Speakers emphasized that sustainability challenges—climate change, supply chain transparency, human rights—transcend industry boundaries and require collaborative solutions.

> "No single company can solve these challenges alone. Unified standards and verified commitments create the foundation for collective progress." — Forum Keynote

### The Role of Certification

Multiple sessions highlighted how independent certification provides:

- **Credibility**: Third-party verification builds stakeholder trust
- **Comparability**: Standardized frameworks enable benchmarking
- **Accountability**: Regular audits ensure ongoing compliance

## Looking Forward

SUSTAINACERT was proud to participate and contribute to discussions on strengthening verification frameworks for corporate sustainability claims.
    `,
    tags: ['CSR', 'Corporate Sustainability', 'Leadership', 'Forum'],
    readTime: '6 min read',
  },
  {
    id: '4',
    slug: 'global-recycled-standard-advantages-application',
    title: 'Global Recycled Standard: Advantages and a Practical Application Example',
    type: 'News',
    date: '2024-10-30',
    category: 'Sustainable Standards & Certifications',
    excerpt: 'Understanding how GRS certification drives circular economy practices and provides competitive advantages in global markets.',
    coverImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
    content: `
The Global Recycled Standard (GRS) has emerged as a leading certification for companies committed to circular economy principles. Here's what you need to know about its advantages and practical implementation.

## What is GRS?

The Global Recycled Standard is an international, voluntary product standard that sets requirements for third-party certification of recycled content, chain of custody, social and environmental practices, and chemical restrictions.

## Key Benefits

### Market Access
- Increasing retailer requirements for certified recycled content
- Consumer demand for verified sustainability claims
- Competitive differentiation in crowded markets

### Operational Improvements
- Enhanced traceability systems
- Improved supply chain visibility
- Stronger supplier relationships

> "GRS certification transformed our approach to materials sourcing and opened doors to new B2B partnerships." — SUSTAINACERT Client

## Case Study: Textile Manufacturer

A recent client, a medium-sized textile manufacturer, achieved GRS certification through SUSTAINACERT. Within 12 months, they reported:

- 35% increase in orders from sustainability-focused brands
- Improved supplier quality through enhanced auditing
- Stronger employee engagement in sustainability initiatives
    `,
    tags: ['GRS', 'Recycled Content', 'Circular Economy', 'Textiles'],
    readTime: '5 min read',
  },
  {
    id: '5',
    slug: 'organic-certification-trust-sustainability-market-access',
    title: 'Organic Certification: Building Trust, Sustainability, and Global Market Access',
    type: 'Blog',
    date: '2024-10-15',
    category: 'Sustainable Standards & Certifications',
    excerpt: 'How organic certification empowers producers to access premium markets while demonstrating commitment to environmental and social responsibility.',
    coverImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    content: `
Organic certification represents more than a label—it's a comprehensive commitment to sustainable agricultural practices, environmental stewardship, and consumer trust.

## The Value of Organic Certification

### For Producers
- Access to premium pricing
- Entry to regulated markets (EU, US, Japan)
- Demonstrated commitment to sustainability
- Improved soil health and biodiversity

### For Consumers
- Confidence in product claims
- Support for sustainable farming
- Reduced exposure to synthetic chemicals

## Certification Pathways

SUSTAINACERT offers certification to multiple organic standards:

- **EU Organic Regulation**: Required for organic products sold in the European Union
- **USDA NOP**: National Organic Program for the US market
- **JAS**: Japanese Agricultural Standard for organic products
- **IFOAM**: International Federation of Organic Agriculture Movements

> "Our organic certification journey with SUSTAINACERT was seamless. The team understood our operation and guided us through every step."

## Getting Started

The organic certification process typically involves:

1. Application and document review
2. On-site inspection
3. Compliance evaluation
4. Certification decision
5. Ongoing surveillance
    `,
    tags: ['Organic', 'Agriculture', 'Food Safety', 'Market Access'],
    readTime: '7 min read',
  },
  {
    id: '6',
    slug: 'circular-economy-verified-claims-better-materials',
    title: 'Circular Economy & Innovation: Verified Claims and Better Materials Choices',
    type: 'News',
    date: '2024-09-28',
    category: 'Circular Economy & Innovation',
    excerpt: 'The transition to circular business models requires robust verification frameworks to ensure claims are credible and materials are genuinely sustainable.',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    content: `
The circular economy is no longer a fringe concept—it's becoming central to business strategy across industries. But as more companies make circular economy claims, the need for verification has never been greater.

## Why Verification Matters

### Preventing Greenwashing
Without independent verification, circular economy claims can be vague, misleading, or outright false. Certification provides:

- Third-party validation of recycled content percentages
- Chain of custody verification
- Environmental impact assessment

### Building Market Confidence
Verified claims enable:

- Consumer trust in product sustainability
- B2B confidence in supplier claims
- Regulatory compliance

## Innovation in Materials

> "The most exciting innovations are happening at the intersection of material science and circular design—but innovation without verification risks undermining the entire movement."

### Emerging Standards
- Ocean Bound Plastic certification
- Recycled Claim Standard (RCS)
- Global Recycled Standard (GRS)
- Biodegradability verification

## SUSTAINACERT's Role

We help organizations navigate the complex landscape of circular economy certifications, ensuring their claims are credible, their processes are robust, and their materials are genuinely sustainable.
    `,
    tags: ['Circular Economy', 'Innovation', 'Materials', 'Verification'],
    readTime: '6 min read',
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find(insight => insight.slug === slug);
}

export function getInsightsByType(type: 'News' | 'Blog'): Insight[] {
  return insights.filter(insight => insight.type === type);
}

export function getInsightsByCategory(category: string): Insight[] {
  return insights.filter(insight => insight.category === category);
}

export function getRelatedInsights(currentId: string, limit: number = 3): Insight[] {
  const current = insights.find(i => i.id === currentId);
  if (!current) return insights.slice(0, limit);
  
  return insights
    .filter(i => i.id !== currentId && i.category === current.category)
    .slice(0, limit);
}

export function getPopularInsights(limit: number = 5): Insight[] {
  return insights.slice(0, limit);
}
