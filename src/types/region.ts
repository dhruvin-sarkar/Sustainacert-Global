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

export interface DotData {
  x: number;
  y: number;
  regionId?: string;
  isHighlighted: boolean;
}

export interface GlobeInteraction {
  x: number;
  y: number;
  region?: RegionData;
  timestamp: number;
}
