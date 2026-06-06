import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5107'
})

export const register = (data) => API.post('/users/register', data)

export const login = (data) => API.post('/users/login', data)

export const getMyMembership = (token) => API.get('/memberships/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
  
  export const createMembership = (data, token) => API.post('/memberships', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  
  export const getAllMemberships = (token) => API.get('/memberships', {
    headers: { Authorization: `Bearer ${token}` }
  })
  
  export const activateMembership = (id, token) => API.put(`/memberships/${id}/activate`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })