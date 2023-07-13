import axios from '../axios.js'

export const usePosts = {
  POST: async (state) => await axios.post('posts', { ...state }),
  GET: async () => await axios.get('posts'),
  UPDATE: async (id, state) => await axios.put(`posts/${id}`, { ...state }),
  DELETE: async (id) => await axios.delete(`posts/${id}`)
} 