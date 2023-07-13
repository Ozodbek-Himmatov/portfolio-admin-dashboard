import axios from "../axios"

export const useComments = {
    list: async () => await axios.get("/Comments"),
    get_one: async (id) => await axios.get(`/Comments/${id}`),
    create: async (state) => await axios.post("/Comments", state),
    update: async (id, state) => await axios.put(`/Comments.${id}`, state),
    delete: async (id) => await axios.put(`/Comments/${id}`, { is_active: false })
}