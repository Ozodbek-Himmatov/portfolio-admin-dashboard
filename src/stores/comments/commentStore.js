import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useComments } from '@/service/comments'

export const commentStore = defineStore('comment', () => {
  const state = reactive({
    list: [],
    load: true,
    oneElement: []
  })

  const SET_LIST = async () => {
    state.list = (await useComments.list()).data
    state.load = false
  }

  const ADD_LIST = async (data) => {
    await useComments.create(data)
    SET_LIST()
  }

  const SET_ONE = (el) => {
    state.oneElement = el
  }

  const LIST = computed(() => state.list)
  const LOAD = computed(() => state.load)
  const ELEMENT = computed(() => state.oneElement)

  return { LIST, LOAD, ELEMENT, SET_LIST, ADD_LIST, SET_ONE }
})
