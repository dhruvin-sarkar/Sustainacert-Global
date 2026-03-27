import { api } from './api';
import type { Certificate, CertificateVerification, CreateCertificateDto } from '@/types';

export const certificatesService = {
  verify: async (id: string): Promise<CertificateVerification> => {
    return api.get<CertificateVerification>(`/certificates/verify?id=${id}`);
  },
  
  create: async (data: CreateCertificateDto): Promise<Certificate> => {
    return api.post<Certificate>('/certificates', data);
  },
  
  getById: async (id: string): Promise<Certificate> => {
    return api.get<Certificate>(`/certificates/${id}`);
  },
  
  getAll: async (params?: { page?: number; limit?: number }): Promise<Certificate[]> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return api.get<Certificate[]>(`/certificates${query ? `?${query}` : ''}`);
  },
};
