import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
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
