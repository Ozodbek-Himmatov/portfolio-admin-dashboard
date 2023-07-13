import axios from '../axios.js'

export const useAuth = {
  LOGIN_ADMIN: async (data) => await axios.post('admins/login', { ...data }),
}
