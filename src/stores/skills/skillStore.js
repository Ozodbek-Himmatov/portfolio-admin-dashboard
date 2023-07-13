import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useSkills } from '../../service/skills'

export const skillsStore = defineStore('skills', () => {
  const state = reactive({
    id: '',
    skills: {},
    load: true
  })

  const ADD_SKILLS = async (newData) => {
    try {
      await useSkills.POST(newData)
      GET_SKILLS()
    } catch (error) {
      console.log(error)
    }
  }

  const GET_SKILLS = async () => {
    try {
      state.skills = (await useSkills.GET()).data
      state.id = state.skills._id
      state.load = false
    } catch (error) {
      console.log(error)
    }
  }

  const UPDATE_SKILLS = async (id, data) => {
    try {
      await useSkills.UPDATE(id, data)
      GET_SKILLS()
    } catch (error) {
      console.log(error)
    }
  }

  const DELETE_SKILLS = async (id) => {
    try {
      await useSkills.DELETE(id)
      GET_SKILLS()
    } catch (error) {
      console.log(error)
    }
  }

  const SKILLS = computed(() => state.skills)
  const LOAD = computed(() => state.load)

  return { DELETE_SKILLS, GET_SKILLS, SKILLS, UPDATE_SKILLS, LOAD, ADD_SKILLS }
})