import axios from '../axios.js'

export const useSkills = {
  POST: async (state) => await axios.post(`skills`, { ...state }),
  GET: async () => await axios.get('skills'),
  UPDATE: async (id, state) => await axios.put(`skills/${id}`, { ...state }),
  DELETE: async (id) => await axios.delete(`skills/${id}`)
}