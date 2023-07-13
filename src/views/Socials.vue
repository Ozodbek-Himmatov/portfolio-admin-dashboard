<script setup>
import EmptyData from '../components/EmptyData.vue'
import Loading from '../components/Loading.vue'
import AboutFooter from '../components/AboutFooter.vue'
import moment from 'moment'
import { toast } from 'vue3-toastify'
import { onMounted, ref, reactive } from 'vue'
import { addressesStore } from '../stores/addresses/addressStore.js'

const store = addressesStore()
const addModal = ref(false)
const updateId = ref(null)
const deleteId = ref(null)
const deleteModal = ref(false)

const updateContent = reactive({
  name: '',
  icon: '',
  address: ''
})

const newSocials = reactive({
  name: '',
  icon: '',
  address: ''
})

const toggleModal = () => (addModal.value = !addModal.value)
const toggleDelete = () => (deleteModal.value = !deleteModal.value)

const addSocial = async () => {
  try {
    store.ADD_ADDRESSES(newSocials)
    for (let i in newSocials) newSocials[i] = ''
    toggleModal()
    toast.success('New social address added', { autoClose: 2000, theme: 'dark' })
  } catch (error) {
    toast.success(`Error ${error}`, { autoClose: 2000, theme: 'dark' })
  }
}
const deleteSocial = async () => {
  try {
    store.DELETE_ADDRESSES(deleteId.value)
    toggleDelete()
    toast.success('The social address deleted', { autoClose: 2000, theme: 'dark' })
  } catch (error) {
    console.log(error)
    toast.success(`Error ${error}`, { autoClose: 2000, theme: 'dark' })
  }
}
const updateSocial = async () => {
  try {
    await store.UPDATE_ADDRESSES(updateId.value, updateContent)
    for (let i in updateContent) updateContent[i] = ''
    updateId.value = null
    toast.success('The social address updated', { autoClose: 2000, theme: 'dark' })
  } catch (error) {
    console.log(error)
    toast.success(`Error ${error}`, { autoClose: 2000, theme: 'dark' })
  }
}
onMounted(() => {
  store.GET_ADDRESSES()
})
</script>

<template>
  <div>
    <!-- ADD MODAL -->
    <div
      class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen flex items-center justify-center max-h-full bg-black/60"
      :class="addModal ? '' : 'hidden'"
    >
      <div class="relative w-full max-w-xl max-h-full">
        <div class="relative rounded-lg shadow bg-slate-700">
          <button
            @click="toggleModal"
            type="button"
            class="absolute top-3 right-2.5 text-slate-400 bg-transparent rounded-lg text-sm p-1 px-2 ml-auto inline-flex items-center hover:bg-slate-800 hover:text-white"
          >
            <i class="bx bx-x text-2xl"></i>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl text-white">Add new skill</h3>
            <form @submit.prevent="addSocial" class="space-y-4 grid" action="#">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-800 border-slate-500 outline-none focus:bg-slate-700 text-white"
                    placeholder="Telegram"
                    required
                    v-model="newSocials.name"
                  />
                </div>
                <div>
                  <label>Icon</label>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-800 border-slate-500 outline-none focus:bg-slate-700 text-white"
                    placeholder="bx bxl-telegram"
                    required
                    v-model="newSocials.icon"
                  />
                </div>
              </div>
              <div>
                <label>Social Address</label>
                <input
                  type="text"
                  class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-800 border-slate-500 outline-none focus:bg-slate-700 text-white"
                  placeholder="https://t.me/telegram_username"
                  required
                  v-model="newSocials.address"
                />
              </div>
              <button
                type="submit"
                class="w-full text-white focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                Add Skill
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- DELETE MODAL -->
    <div
      class="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center bg-black/50"
      :class="deleteModal ? '' : 'hidden'"
    >
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative rounded-lg shadow bg-slate-700">
          <button
            class="absolute top-3 right-2.5 text-slate-400 bg-transparent rounded-lg text-sm p-1 ml-auto inline-flex items-center hover:bg-slate-800 hover:text-white"
            @click="toggleDelete"
          >
            <i class="bx bx-x text-2xl px-1"></i>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-6 text-center">
            <i class="bx bx-trash bx-rotate-180 bx-tada text-5xl p-5" style="color: #ff0404"></i>
            <h3 class="mb-5 text-lg font-normal text-slate-400">
              Are you sure you want to delete this Experience?
            </h3>
            <div class="flex justify-center mx-auto gap-7 w-[70%]">
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-slate-700 text-slate-300 border-slate-500 hover:text-white w-full hover:bg-slate-600 focus:ring-slate-600"
                @click="toggleDelete"
              >
                No, cancel
              </button>
              <button
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center w-full"
                @click="deleteSocial"
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <header class="w-full flex items-center justify-between px-5 mb-5 uppercase">
      <a href="/socials" class="text-2xl border-b-2 w-10 border-blue-500 pb-2">
        <span class="border-b-2 border-blue-500 text-white">socials</span>
      </a>
      <button
        @click="toggleModal"
        class="text-white-400 border-2 text-white hover:border-transparent hover:bg-white hover:shadow-blue-500 shadow-inner hover:text-black focus:outline-none rounded-lg text-base px-4 py-3 text-center mr-2 uppercase"
      >
        add socials
      </button>
    </header>
    <Loading v-if="store.LOAD" />
    <EmptyData v-else-if="!store.ADDRESSES.length" />
    <section v-else class="grid lg:grid-cols-3 gap-7 p-5">
      <div
        v-for="el in store.ADDRESSES"
        class="relative bg-blue-500/50 border-2 border-slate-700/50 rounded-md p-3"
      >
        <div class="px-2 flex flex-row justify-between">
          <div class="w-full py-3 px-0.5 border-r text-white border-blue-500/90">
            <input
              v-if="updateId == el._id"
              placeholder="Telegram"
              type="text"
              class="w-full outline-none border border-blue-500 text-xl text-center rounded-full mb-2 bg-slate-700/50"
              v-model="updateContent.name"
            />
            <h1 v-else class="text-xl text-center">{{ el.name }}</h1>
            <input
              v-if="updateId == el._id"
              placeholder="bx bxl-telegram"
              type="text"
              class="w-full outline-none border border-blue-500 text-sm text-center rounded-full mb-2 py-1 bg-slate-700/50"
              v-model="updateContent.icon"
            />
            <h1 v-else class="text-sm text-center text-blue-400">{{ el.icon }}</h1>
            <input
              v-if="updateId == el._id"
              placeholder="https://t.me/telegram_username"
              type="text"
              class="w-full outline-none border border-blue-500 text-sm text-center rounded-full mb-2 py-1 bg-slate-700/50"
              v-model="updateContent.address"
            />
            <h1 v-else class="text-sm text-center text-blue-400">{{ el.address }}</h1>
          </div>
          <div class="w-fit flex items-center gap-3 px-3">
            <i
              v-if="updateId == el._id"
              class="bx bx-check text-black cursor-pointer hover:text-white shadow-inner hover:shadow-blue-400 hover:bg-blue-600 bg-blue-400 p-2 rounded-full"
              @click="updateSocial"
            ></i>
            <i
              v-else
              class="bx bx-pencil text-black cursor-pointer hover:text-white shadow-inner hover:shadow-blue-400 hover:bg-blue-600 bg-blue-400 p-2 rounded-full"
              @click="
                () => {
                  updateId = el._id
                  updateContent.name = el.name
                  updateContent.icon = el.icon
                  updateContent.address = el.address
                }
              "
            ></i>
            <i
              class="bx bx-trash text-black cursor-pointer hover:text-white shadow-inner hover:shadow-red-400 hover:bg-red-600 bg-red-400 p-2 rounded-full"
              @click="
                () => {
                  deleteId = el._id
                  toggleDelete()
                }
              "
            ></i>
          </div>
        </div>
        <div class="border-b w-full border-blue-500/90"></div>
      </div>
    </section>
    <AboutFooter />
  </div>
</template>

<style lang="scss" scoped></style>
