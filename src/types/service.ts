export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  detailedDescription: string;
  process: string[];
  benefits: string[];
  certificationTypes: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
}
