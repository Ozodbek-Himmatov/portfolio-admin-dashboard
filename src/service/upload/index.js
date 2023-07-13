import axios from '../upload.js'

export const useUpload = {
  UPLOAD: async (data) => {
    console.log(data) 
    await axios.post(`${data}&format=json`, { ...data })
  }
}
