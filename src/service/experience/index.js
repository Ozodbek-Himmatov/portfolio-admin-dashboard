import axios from '../axios.js'

export const useExperience = {
  POST: async (state) => await axios.post('Experience', { ...state }),
  GET: async () => await axios.get('Experience'),
  UPDATE: async (id, state) => await axios.put(`Experience/${id}`, { ...state }),
  DELETE: async (id) => await axios.delete(`Experience/${id}`)
}