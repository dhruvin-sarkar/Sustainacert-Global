import { API_CONFIG } from '@/constants/config';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }

    return response;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Network error occurred');
  }
};

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await apiRequest(endpoint);
    return response.json();
  },
  
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await apiRequest(endpoint, {
      method: 'DELETE',
    });
    return response.json();
  },
};
