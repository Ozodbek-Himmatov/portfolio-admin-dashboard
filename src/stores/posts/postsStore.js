import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePosts } from '../../service/posts'

export const postsStore = defineStore('posts', () => {
  const state = reactive({
    post: {},
    load: true
  })

  const ADD_POST = async (data) => {
    try {
      await usePosts.POST(data)
    } catch (error) {
      console.log(error)
    }
  }

  const GET_POST = async () => {
    try {
      state.post = (await usePosts.GET()).data
      state.load = false
      console.log(state.post)
    } catch (error) {
      console.log(error)
    }
  }

  const GET_ONE = async (id) => {
    await GET_POST()
    for (let i in state.post) {
      if (state.post[i]._id == id) {
        return state.post[i]
      }
    }
  }

  const UPDATE_POST = async (id, post) => {
    try {
      state.post = (await usePosts.UPDATE(id, post)).data
    } catch (error) {
      console.log(error)
    }
  }

  const DELETE_POST = async (id) => {
    try {
      await usePosts.DELETE(id)
      await GET_POST()
      console.log('DELETED')
    } catch (error) {
      console.log(error)
    }
  }

  const POST = computed(() => state.post)
  const LOAD = computed(() => state.load)

  return { ADD_POST, GET_POST, POST, UPDATE_POST, GET_ONE, LOAD, DELETE_POST }
})
