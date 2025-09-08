// API client for backend communication
const API_BASE_URL = 'https://kaspi-bot-backend.onrender.com';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('kaspi_bot_token');
};

// API request wrapper with auth
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'API request failed');
  }
  
  return response.json();
};

// Auth API
export const authApi = {
  register: async (email: string, password: string) => {
    return apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  login: async (email: string, password: string) => {
    const response = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Store JWT token for API authentication
    if (response.jwt_token) {
      localStorage.setItem('kaspi_bot_token', response.jwt_token);
    }
    
    return response;
  },
};

// Shop API
export const shopApi = {
  saveShop: async (shopData: any) => {
    return apiRequest('/api/shop', {
      method: 'POST',
      body: JSON.stringify(shopData),
    });
  },
};

// Products API
export const productsApi = {
  scrapeProducts: async () => {
    return apiRequest('/api/products/scrape', {
      method: 'POST',
    });
  },
  
  getProducts: async () => {
    return apiRequest('/api/products', {
      method: 'GET',
    });
  },
};

// Damping API
export const dampingApi = {
  startDamping: async () => {
    return apiRequest('/api/damping/start', {
      method: 'POST',
    });
  },
  
  getDampingStatus: async () => {
    return apiRequest('/api/damping/status', {
      method: 'GET',
    });
  },
};

// Competitor prices API
export const competitorApi = {
  getCompetitorPrices: async (productName: string, productUrl?: string) => {
    return apiRequest('/competitor-prices', {
      method: 'POST',
      body: JSON.stringify({ product_name: productName, product_url: productUrl }),
    });
  },
};

// Admin API (you may need to implement these endpoints in your backend)
export const adminApi = {
  getAllUsers: async () => {
    return apiRequest('/admin/users', {
      method: 'GET',
    });
  },
  
  updateUserPlan: async (userId: string, planId: string, expirationDate: string) => {
    return apiRequest('/admin/set-plan', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, plan_id: planId, expiration_date: expirationDate }),
    });
  },
};