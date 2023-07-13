import axios from '../axios.js'

export const useDescription = {
  get: async () => await axios.get('/About'),
  update: async (id, state) => await axios.put(`/About/${id}`, { ...state })
}