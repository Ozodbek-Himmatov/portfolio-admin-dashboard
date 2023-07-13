import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useDescription } from '../../service/description'

export const descriptionStore = defineStore('description', () => {
  const state = reactive({
    id: '',
    description: {},
    load: true
  })

  const GET_DESCRIPTION = async () => {
    try {
      state.description = (await useDescription.get()).data[0]
      state.id = state.description._id
      state.load = false
    } catch (error) {
      console.log(error)
    }
  }   

  const UPDATE_DESCRIPTION = async () => {
    try {
      state.description = (await useDescription.update(state.id, state.description)).data
      state.load = false
      console.log(state.description, 2)
    } catch (error) {
      console.log(error)
    }
  }

  const DESCRIPTION = computed(() => state.description)
  const LOAD = computed(() => state.load)

  return { GET_DESCRIPTION, DESCRIPTION, UPDATE_DESCRIPTION, LOAD }
})
