import wretch from 'wretch'
import { config } from '../config'

function getToken() {
  return localStorage['alphaiota:jwt']
}

export const api = wretch()
  .defer((w) => w.auth(`Bearer ${getToken()}`))
  .url(config.origin)
