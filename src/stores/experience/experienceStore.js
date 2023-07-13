import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useExperience } from '../../service/experience'

export const experienceStore = defineStore('experience', () => {
  const state = reactive({
    id: '',
    experience: {},
    load: true
  })

  const ADD_EXPERIENCE = async (newData) => {
    try {
      await useExperience.POST(newData)
      GET_EXPERIENCE()
    } catch (error) {
      console.log(error)
    }
  }

  const GET_EXPERIENCE = async () => {
    try {
      state.experience = (await useExperience.GET()).data
      state.id = state.experience._id
      state.load = false
    } catch (error) {
      console.log(error)
    }
  }

  const UPDATE_EXPERIENCE = async (id, data) => {
    try {
      await useExperience.UPDATE(id, data)
      GET_EXPERIENCE()
    } catch (error) {
      console.log(error)
    }
  }

  const DELETE_EXPERIENCE = async (id) => {
    try {
      await useExperience.DELETE(id)
      GET_EXPERIENCE()
    } catch (error) {
      console.log(error)
    }
  }

  const EXPERIENCE = computed(() => state.experience)
  const LOAD = computed(() => state.load)

  return { DELETE_EXPERIENCE, GET_EXPERIENCE, EXPERIENCE, UPDATE_EXPERIENCE, LOAD, ADD_EXPERIENCE }
})
