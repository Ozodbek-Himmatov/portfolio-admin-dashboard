import axios from '../axios.js'

export const useAddresses = {
  POST: async (data) => await axios.post(`addresses`, { ...data }),
  GET: async () => await axios.get('addresses'),
  UPDATE: async (id, data) => await axios.put(`addresses/${id}`, { ...data }),
  DELETE: async (id) => await axios.delete(`addresses/${id}`)
}