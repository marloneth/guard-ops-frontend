export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  environment: import.meta.env.MODE || 'development',
};

export const isDevelopment = config.environment === 'development';
export const isProduction = config.environment === 'production';
export const isTest = config.environment === 'test';
