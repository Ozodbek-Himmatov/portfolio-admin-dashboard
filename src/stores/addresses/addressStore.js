import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAddresses } from '../../service/addresses'

export const addressesStore = defineStore('addresses', () => {
  const state = reactive({
    id: '',
    addresses: {},
    load: true
  })

  const ADD_ADDRESSES = async (newData) => {
    try {
      await useAddresses.POST(newData)
      GET_ADDRESSES()
    } catch (error) {
      console.log(error)
    }
  }

  const GET_ADDRESSES = async () => {
    try {
      state.addresses = (await useAddresses.GET()).data
      state.id = state.addresses._id
      state.load = false
    } catch (error) {
      console.log(error)
    }
  }

  const UPDATE_ADDRESSES = async (id, data) => {
    try {
      await useAddresses.UPDATE(id, data)
      GET_ADDRESSES()
    } catch (error) {
      console.log(error)
    }
  }

  const DELETE_ADDRESSES = async (id) => {
    try {
      await useAddresses.DELETE(id)
      GET_ADDRESSES()
    } catch (error) {
      console.log(error)
    }
  }

  const ADDRESSES = computed(() => state.addresses)
  const LOAD = computed(() => state.load)

  return { DELETE_ADDRESSES, GET_ADDRESSES, ADDRESSES, UPDATE_ADDRESSES, LOAD, ADD_ADDRESSES }
})