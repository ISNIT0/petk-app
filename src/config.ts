const configs = {
  development: {
    apiUrl: 'http://localhost:3000',
    origin: 'http://localhost:3001/api',
  },
  test: {
    apiUrl: 'http://localhost:3000',
    origin: 'http://localhost:3001/api',
  },
  production: {
    apiUrl: process.env.API_HOST || 'https://api.alphaiota.io',
    origin: process.env.HOST || 'https://alphaiota.io/api',
  },
}

const environment = process.env.NODE_ENV || 'development'
export const config = configs[environment]
