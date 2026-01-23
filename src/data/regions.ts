export interface RegionData {
  id: string;
  name: string;
  color: string;
  countries: string[];
  mainHub: string;  // Main city for the map
  hubCoordinates: string;  // Lat/Long of main hub
  detailedInfo: {
    description: string;
    offices: string[];
    services: string[];
    contact: {
      email: string;
      phone: string;
    };
  };
}

export const HIGHLIGHTED_REGIONS: RegionData[] = [
  {
    id: 'middle-east',
    name: 'Middle East',
    color: '#10b981',
    countries: ['ARE', 'SAU', 'QAT', 'KWT', 'BHR', 'OMN', 'JOR', 'LBN', 'ISR', 'PSE', 'SYR', 'IRQ', 'YEM'],
    mainHub: 'Dubai, UAE',
    hubCoordinates: '25.2048° N, 55.2708° E',
    detailedInfo: {
      description:
        'SUSTAINACERT Middle East serves as our global headquarters, offering comprehensive sustainability certification and auditing services across the Gulf Cooperation Council.',
      offices: ['Dubai', 'Abu Dhabi', 'Riyadh', 'Doha'],
      services: ['ISO Certification', 'Sustainability Audits', 'ESG Consulting', 'Carbon Footprint Assessment'],
      contact: {
        email: 'middleeast@sustainacert.com',
        phone: '+971 4 XXX XXXX',
      },
    },
  },
  {
    id: 'south-asia',
    name: 'South Asia',
    color: '#22c55e',
    countries: ['IND', 'PAK', 'BGD', 'LKA', 'NPL', 'BTN', 'MDV', 'AFG'],
    mainHub: 'Mumbai, India',
    hubCoordinates: '19.0760° N, 72.8777° E',
    detailedInfo: {
      description: 'Our South Asian operations provide world-class certification services across India, Pakistan, Bangladesh, and Sri Lanka.',
      offices: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata'],
      services: ['Quality Management', 'Environmental Certification', 'Supply Chain Audits', 'Social Compliance'],
      contact: {
        email: 'southasia@sustainacert.com',
        phone: '+91 XXX XXX XXXX',
      },
    },
  },
  {
    id: 'southeast-asia',
    name: 'Southeast Asia',
    color: '#84cc16',
    countries: ['SGP', 'THA', 'IDN', 'MYS', 'PHL', 'VNM', 'MMR', 'KHM', 'LAO', 'BRN', 'TLS'],
    mainHub: 'Singapore',
    hubCoordinates: '1.3521° N, 103.8198° E',
    detailedInfo: {
      description: 'SUSTAINACERT Southeast Asia delivers certification excellence across ASEAN member states.',
      offices: ['Singapore', 'Bangkok', 'Jakarta', 'Manila'],
      services: ['Food Safety Certification', 'Occupational Health & Safety', 'Energy Management', 'Forest Certification'],
      contact: {
        email: 'sea@sustainacert.com',
        phone: '+65 XXXX XXXX',
      },
    },
  },
  {
    id: 'europe',
    name: 'Europe',
    color: '#14b8a6',
    countries: [
      'GBR',
      'FRA',
      'DEU',
      'ITA',
      'ESP',
      'POL',
      'NLD',
      'BEL',
      'GRC',
      'PRT',
      'SWE',
      'NOR',
      'FIN',
      'DNK',
      'AUT',
      'CHE',
      'IRL',
      'CZE',
      'ROU',
      'HUN',
      'BGR',
      'HRV',
      'SVK',
      'SVN',
      'LTU',
      'LVA',
      'EST',
      'LUX',
      'MLT',
      'CYP',
      'ISL',
    ],
    mainHub: 'London, UK',
    hubCoordinates: '51.5074° N, 0.1278° W',
    detailedInfo: {
      description: 'Our European division brings together certified auditors and inspectors who understand EU regulations and standards.',
      offices: ['London', 'Frankfurt', 'Paris', 'Amsterdam'],
      services: ['EU Regulatory Compliance', 'GHG Verification', 'Circular Economy', 'Biodiversity Assessment'],
      contact: {
        email: 'europe@sustainacert.com',
        phone: '+44 XXX XXX XXXX',
      },
    },
  },
  {
    id: 'africa',
    name: 'Africa',
    color: '#059669',
    countries: [
      'EGY',
      'ZAF',
      'NGA',
      'KEN',
      'ETH',
      'GHA',
      'TZA',
      'UGA',
      'DZA',
      'MAR',
      'TUN',
      'LBY',
      'SDN',
      'AGO',
      'MOZ',
      'MDG',
      'CMR',
      'CIV',
      'NER',
      'MLI',
      'BFA',
      'MWI',
      'ZMB',
      'ZWE',
      'SOM',
      'SEN',
      'TCD',
      'GIN',
      'RWA',
      'BEN',
      'BDI',
      'TGO',
      'SLE',
      'LBR',
      'MRT',
      'NAM',
      'BWA',
      'GAB',
      'LSO',
      'GNB',
      'GNQ',
      'MUS',
      'SWZ',
      'DJI',
      'COM',
      'CPV',
      'STP',
      'SYC',
    ],
    mainHub: 'Cairo, Egypt',
    hubCoordinates: '30.0444° N, 31.2357° E',
    detailedInfo: {
      description: 'SUSTAINACERT Africa is committed to supporting sustainable development across the continent.',
      offices: ['Cairo', 'Nairobi', 'Lagos', 'Johannesburg'],
      services: ['Agricultural Certification', 'Mining Standards', 'Community Development', 'Water Management'],
      contact: {
        email: 'africa@sustainacert.com',
        phone: '+254 XXX XXX XXX',
      },
    },
  },
];

export const getRegionForCountry = (countryCode: string): RegionData | null => {
  return HIGHLIGHTED_REGIONS.find((region) => region.countries.includes(countryCode)) || null;
};
