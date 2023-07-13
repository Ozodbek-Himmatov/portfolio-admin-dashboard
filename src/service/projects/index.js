import axios from '../axios.js'

export const useProject = {
  POST: async (state) => await axios.post(`projects`, { ...state }),
  GET: async () => await axios.get('projects'),
  UPDATE: async (id, state) => await axios.put(`projects/${id}`, { ...state }),
  DELETE: async (id) => await axios.delete(`projects/${id}`)
}