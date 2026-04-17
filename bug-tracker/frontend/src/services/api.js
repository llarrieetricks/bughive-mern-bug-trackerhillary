import axios from 'axios'

const envBaseUrl = import.meta.env.VITE_API_URL?.trim()
const isProdBuild = import.meta.env.PROD

export const backendSetupMessage =
  'Backend API is not configured yet. Frontend preview is live, and auth/bug features will be enabled after backend deployment.'
export const isBackendConfigured = !isProdBuild || Boolean(envBaseUrl)

const normalizedBaseUrl = envBaseUrl ? envBaseUrl.replace(/\/+$/, '') : '/api'
const apiBaseUrl = normalizedBaseUrl.endsWith('/api') ? normalizedBaseUrl : `${normalizedBaseUrl}/api`

const api = axios.create({
  baseURL: apiBaseUrl,
})

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  if (!isBackendConfigured) {
    const setupError = new Error(backendSetupMessage)
    setupError.response = { data: { message: backendSetupMessage } }
    return Promise.reject(setupError)
  }

  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const register = (data) => api.post('/auth/register', data)
export const login    = (data) => api.post('/auth/login', data)
export const getMe    = ()     => api.get('/auth/me')

// Bugs
export const getBugs    = (params) => api.get('/bugs', { params })
export const getBug     = (id)     => api.get(`/bugs/${id}`)
export const createBug  = (data)   => api.post('/bugs', data)
export const updateBug  = (id, data) => api.put(`/bugs/${id}`, data)
export const deleteBug  = (id)     => api.delete(`/bugs/${id}`)

// Comments
export const getComments   = (bugId)       => api.get(`/bugs/${bugId}/comments`)
export const addComment    = (bugId, data) => api.post(`/bugs/${bugId}/comments`, data)
export const deleteComment = (id)          => api.delete(`/comments/${id}`)

export default api
