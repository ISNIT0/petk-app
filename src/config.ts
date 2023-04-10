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
    apiUrl: 'https://api.alphaiota.io',
    origin: 'https://alphaiota.io/api',
  },
}

const environment = process.env.NODE_ENV || 'development'
export const config = configs[environment]
