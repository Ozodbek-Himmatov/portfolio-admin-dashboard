<script setup>
import EmptyData from '../components/EmptyData.vue'
import Loading from '../components/Loading.vue'
import AboutFooter from '../components/AboutFooter.vue'
import { onMounted, ref, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import moment from 'moment'
import { experienceStore } from '../stores/experience/experienceStore'

const store = experienceStore()
const addModal = ref(false)
const updateId = ref(null)
const deleteModal = ref(false)
const deleteId = ref(null)

const updateContent = reactive({
  company_name: '',
  link: '',
  start_time: '',
  end_time: ''
})

const newExperience = reactive({
  company_name: '',
  link: '',
  start_time: '',
  end_time: ''
})

const toggleModal = () => (addModal.value = !addModal.value)
const toggleDelete = () => (deleteModal.value = !deleteModal.value)

const addExperience = async () => {
  try {
    store.ADD_EXPERIENCE(newExperience)
    for (let i in newExperience) newExperience[i] = ''
    toggleModal()
    toast.success('New experience added', { autoClose: 2000, theme: 'dark' })
  } catch (error) {
    toast.success(`Error ${error}`, { autoClose: 2000, theme: 'dark' })
  }
}
const deleteExperience = async () => {
  try {
    store.DELETE_EXPERIENCE(deleteId.value)
    toggleDelete()
    toast.success('The experience deleted', { autoClose: 2000, theme: 'dark' })
  } catch (error) {
    console.log(error)
    toast.success(`Error ${error}`, { autoClose: 2000, theme: 'dark' })
  }
}
const updateExperience = async () => {
  try {
    await store.UPDATE_EXPERIENCE(updateId.value, updateContent)
    for (let i in updateContent) updateContent[i] = ''
    updateId.value = null
    toast.success('The experience updated', { autoClose: 2000, theme: 'dark' })
  } catch (error) {
    console.log(error)
    toast.success(`Error ${error}`, { autoClose: 2000, theme: 'dark' })
  }
}
onMounted(() => {
  store.GET_EXPERIENCE()
})
</script>

<template>
  <div>
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
                @click="deleteExperience"
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ADD MODAL -->
    <div
      class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen flex items-center justify-center max-h-full bg-black/60"
      :class="addModal ? '' : 'hidden'"
    >
      <div class="relative w-full max-w-xl max-h-full">
        <div class="relative rounded-lg shadow bg-slate-800">
          <button
            @click="toggleModal"
            type="button"
            class="absolute top-3 right-2.5 text-slate-400 bg-transparent rounded-lg text-sm p-1 px-2 ml-auto inline-flex items-center hover:bg-slate-800 hover:text-white"
          >
            <i class="bx bx-x text-2xl"></i>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="py-6 px-8">
            <h3 class="mb-4 text-xl text-white">Add new experience</h3>
            <form @submit.prevent="addExperience" class="space-y-4 grid">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label>Company name</label>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-800 border-slate-500 outline-none focus:bg-slate-700 text-white"
                    placeholder="Unical"
                    required
                    v-model="newExperience.company_name"
                  />
                </div>
                <div>
                  <label>Address of company</label>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-800 border-slate-500 outline-none focus:bg-slate-700 text-white"
                    placeholder="https://www.microsoft.com/"
                    required
                    v-model="newExperience.link"
                  />
                </div>
                <div>
                  <label>Start time</label>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-800 border-slate-500 outline-none focus:bg-slate-700 text-white"
                    placeholder="13-12-2000"
                    required
                    v-model="newExperience.start_time"
                  />
                </div>
                <div>
                  <label>End time</label>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-800 border-slate-500 outline-none focus:bg-slate-700 text-white"
                    placeholder="13-12-2001"
                    required
                    v-model="newExperience.end_time"
                  />
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-white focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                Add Work
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <header class="w-full flex items-center justify-between px-5 mb-5 uppercase">
      <a href="/skills" class="text-2xl border-b-2 w-10 border-blue-500 pb-2">
        <span class="border-b-2 border-blue-500 text-white">experience</span>
      </a>
      <button
        @click="toggleModal"
        class="text-white-400 border-2 text-white hover:border-transparent hover:bg-white hover:shadow-blue-500 shadow-inner hover:text-black focus:outline-none rounded-lg text-base px-4 py-3 text-center mr-2 uppercase"
      >
        add experience
      </button>
    </header>
    <Loading v-if="store.LOAD" />
    <EmptyData v-else-if="!store.EXPERIENCE.length" />
    <section v-else class="grid lg:grid-cols-4 gap-7 p-5">
      <div
        v-for="el in store.EXPERIENCE"
        class="relative bg-blue-500/50 border-2 border-slate-700/50 rounded-md p-3"
      >
        <div class="px-2 flex flex-row justify-between">
          <div class="w-full py-3 px-0.5 border-r text-white border-blue-500/90">
            <input
              v-if="updateId == el._id"
              placeholder="Microsoft"
              type="text"
              class="w-full outline-none border border-blue-500 text-xl text-white text-center rounded-full mb-2 bg-slate-700/50"
              v-model="updateContent.company_name"
            />
            <h1 v-else class="text-xl text-center">{{ el.company_name }}</h1>
            <input
              v-if="updateId == el._id"
              placeholder="https://www.microsoft.com/"
              type="text"
              class="w-full outline-none border border-blue-500 text-sm text-white text-center rounded-full mb-2 py-1 bg-slate-700/50"
              v-model="updateContent.link"
            />
            <h1 v-else class="text-sm text-center text-blue-400">{{ el.link }}</h1>
          </div>
          <div class="w-fit flex items-center gap-3 px-3">
            <i
              v-if="updateId == el._id"
              class="bx bx-check text-black cursor-pointer hover:text-white shadow-inner hover:shadow-blue-400 hover:bg-blue-600 bg-blue-400 p-2 rounded-full"
              @click="updateExperience"
            ></i>
            <i
              v-else
              class="bx bx-pencil text-black cursor-pointer hover:text-white shadow-inner hover:shadow-blue-400 hover:bg-blue-600 bg-blue-400 p-2 rounded-full"
              @click="
                () => {
                  updateId = el._id
                  updateContent.company_name = el.company_name
                  updateContent.link = el.link
                  updateContent.start_time = el.start_time
                  updateContent.end_time = el.end_time
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
        <div class="flex items-center justify-between mt-3">
          <input
            v-if="updateId == el._id"
            type="text"
            placeholder="13-12-2000"
            class="w-full outline-none border border-blue-500 text-sm text-white text-center rounded-full mb-2 py-1 bg-slate-700/50"
            v-model="updateContent.start_time"
          />
          <h1 v-else class="text-sm text-center text-blue-400">{{ el.start_time }}</h1>
          <input
            v-if="updateId == el._id"
            placeholder="13-12-2001"
            type="text"
            class="w-full outline-none border border-blue-500 text-sm text-white text-center rounded-full mb-2 py-1 bg-slate-700/50"
            v-model="updateContent.end_time"
          />
          <h1 v-else class="text-sm text-center text-blue-400">{{ el.end_time }}</h1>
        </div>
      </div>
    </section>
    <AboutFooter />
  </div>
</template>

<style lang="scss" scoped></style>
