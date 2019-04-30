import axios from 'axios'
import config from './config'

let singleton = null

export default async () => {
    if (!singleton) {
        const tokenURL = config.drupal_url + '/rest/session/token';
        try {
            const response = await axios.get(tokenURL, {
                withCredentials: true
            })
            const csrf_token = response.data
            singleton = axios.create({
                baseURL: config.drupal_url,
                withCredentials: true,
                headers: { 'X-CSRF-Token': csrf_token },
                params: { _format: 'json' },
            })
            console.log('Created new axios instance', singleton)
        } catch (error) {
            console.error(error)
        }
    }
    return singleton
}
