<script setup>
import Loading from '../components/Loading.vue'
import EmptyData from '../components/EmptyData.vue'
import AboutFooter from '../components/AboutFooter.vue'
import moment from 'moment'
import { toast } from 'vue3-toastify'
import { Uploader } from 'uploader'
import { onMounted, ref, reactive } from 'vue'
import { projectStore } from '../stores/projects/projectStore.js'

const store = projectStore()
const addModal = ref(false)
const deleteModal = ref(false)
const updateModal = ref(false)
const deleteId = ref(null)
const updateId = ref(null)

const options = { multi: false }
const projectImg = ref(null)

const setImg = (url) => {
  projectImg.value = null
  projectImg.value = url[0]
}

const newProject = reactive({
  title: '',
  demo: '',
  preview: '',
  img: '',
  description: ''
})

const updateContent = reactive({
  title: '',
  demo: '',
  preview: '',
  img: '',
  description: ''
})

const toggleModal = () => {
  addModal.value = !addModal.value
}
const toggleUpdate = () => (updateModal.value = !updateModal.value)
const toggleDelete = () => (deleteModal.value = !deleteModal.value)

const uploader = Uploader({
  apiKey: 'free'
})

const onImageUpload = async () => {
  uploader
    .open(options)
    .then((files) => {
      if (files.length === 0) {
        console.log('No files selected.')
      } else {
        console.log('Files uploaded')
        setImg(files.map((f) => f.fileUrl))
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

const addProject = async () => {
  if (!projectImg.value) {
    toast.error(`All fields required`, {
      autoClose: 2000,
      theme: 'dark'
    })
  } else {
    try {
      newProject.img = projectImg.value
      store.ADD_PROJECT(newProject)
      for (let i in newProject) newProject[i] = ''
      toggleModal()
      toast.success('New project added', { autoClose: 2000, theme: 'dark' })
    } catch (error) {
      toast.success(`Error ${error}`, { autoClose: 2000, theme: 'dark' })
    }
  }
}

const updateProject = async () => {
  try {
    if (projectImg.value) updateContent.img = projectImg.value
    store.UPDATE_PROJECT(updateId.value, updateContent)
    for (let i in updateContent) updateContent[i] = ''
    updateId.value = null
    toggleUpdate()
    toast.success('The project updated', { autoClose: 2000, theme: 'dark' })
  } catch (error) {
    toast.success(`Error ${error}`, { autoClose: 2000, theme: 'dark' })
  }
}

const deleteProject = async () => {
  try {
    store.DELETE_PROJECT(deleteId.value)
    toggleDelete()
    toast.success('The project deleted', { autoClose: 2000, theme: 'dark' })
  } catch (error) {
    console.log(error)
    toast.success(`Error ${error}`, { autoClose: 2000, theme: 'dark' })
  }
}

onMounted(() => {
  store.GET_PROJECT()
})
</script>

<template>
  <section>
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
              Are you sure you want to delete this Project?
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
                @click="deleteProject"
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
            <h3 class="mb-4 text-xl text-white">Add New Project</h3>
            <form @submit.prevent="addProject" class="space-y-4 grid" action="#">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-700 border-slate-500 outline-none focus:bg-slate-800 text-white"
                    placeholder="Project title"
                    required
                    v-model="newProject.title"
                  />
                </div>
                <button
                  @click="onImageUpload"
                  type="button"
                  id="dropzone-file"
                  class="flex items-center justify-start gap-5 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-800 w-full p-3 bg-slate-700 border-slate-500 outline-none focus:bg-slate-800 text-white"
                >
                  <span class="text">Upload</span><i class="bx bx-camera"></i>
                </button>
                <div>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-700 border-slate-500 outline-none focus:bg-slate-800 text-white"
                    placeholder="Website link"
                    required
                    v-model="newProject.preview"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-700 border-slate-500 outline-none focus:bg-slate-800 text-white"
                    placeholder="Github demo"
                    required
                    v-model="newProject.demo"
                  />
                </div>
              </div>
              <div>
                <textarea
                  id="message"
                  rows="3"
                  class="outline-none block p-2.5 w-full text-sm rounded-lg border bg-slate-700 border-slate-500 text-white focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-800"
                  placeholder="Write description for project..."
                  v-model="newProject.description"
                ></textarea>
              </div>

              <button
                class="w-full text-white focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                Add Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT MODAL -->
    <div
      class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen flex items-center justify-center max-h-full bg-black/60"
      :class="updateId ? '' : 'hidden'"
    >
      <div class="relative w-full max-w-xl max-h-full">
        <div class="relative rounded-lg shadow bg-slate-700">
          <button
            @click="() => (updateId = null)"
            type="button"
            class="absolute top-3 right-2.5 text-slate-400 bg-transparent rounded-lg text-sm p-1 px-2 ml-auto inline-flex items-center hover:bg-slate-800 hover:text-white"
          >
            <i class="bx bx-x text-2xl"></i>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl text-white">Update The Project</h3>
            <form @submit.prevent="updateProject" class="space-y-4 grid" action="#">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-700 border-slate-500 outline-none focus:bg-slate-800 text-white"
                    placeholder="Project title"
                    required
                    v-model="updateContent.title"
                  />
                </div>
                <button
                  @click="onImageUpload"
                  type="button"
                  id="dropzone-file"
                  class="flex items-center justify-start gap-5 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-800 w-full p-3 bg-slate-700 border-slate-500 outline-none focus:bg-slate-800 text-white"
                >
                  <span class="text">Upload</span><i class="bx bx-camera"></i>
                </button>
                <div>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-700 border-slate-500 outline-none focus:bg-slate-800 text-white"
                    placeholder="Website link"
                    required
                    v-model="updateContent.preview"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-slate-700 border-slate-500 outline-none focus:bg-slate-800 text-white"
                    placeholder="Github demo"
                    required
                    v-model="updateContent.demo"
                  />
                </div>
              </div>
              <div>
                <textarea
                  id="message"
                  rows="3"
                  class="outline-none block p-2.5 w-full text-sm rounded-lg border bg-slate-700 border-slate-500 text-wh7te focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-800 text-white"
                  placeholder="Write description for project..."
                  v-model="updateContent.description"
                ></textarea>
              </div>
              <button
                class="w-full text-white focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                Update Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <header class="w-full flex items-center justify-between px-5 mb-5 uppercase">
      <a
        href="/projects"
        class="text-2xl border-b-2 hover:w-fit transition-all duration-2000 w-10 border-blue-500 pb-2"
      >
        <span class="border-b-2 border-blue-500 text-white">projects</span>
      </a>
      <button
        @click="toggleModal"
        class="text-white-400 border-2 text-white hover:border-transparent hover:bg-white hover:shadow-blue-500 shadow-inner hover:text-black focus:outline-none rounded-lg text-base px-4 py-3 text-center mr-2 uppercase"
      >
        add projects
      </button>
    </header>
    <Loading v-if="store.LOAD" />
    <EmptyData v-else-if="!store.PROJECT.length" />
    <section v-else class="grid grid-cols-3 gap-4 p-5">
      <div v-for="el in store.PROJECT" class="bg-slate-700/50 rounded-md p-4">
        <img :src="el.img" class="h-[250px] w-full object-cover rounded-md" />
        <div class="px-2">
          <h1 class="mt-4 text-xl text-center mb-4">{{ el.title }}</h1>
          <h3 class="mb-5 px-5 text-lg text-justify overflow-y-auto line-clamp-4">
            {{ el.description }}
          </h3>
          <div class="flex items-center justify-between mb-4">
            <a
              target="_blank"
              :href="el.preview"
              class="text-sm flex items-center gap-1 bg-blue-900 hover:bg-blue-800 px-2 rounded"
            >
              <i class="bx bxl-netlify text-xl bg-"></i>
              VIEW
            </a>
            <a
              target="_blank"
              :href="el.demo"
              class="text-sm flex items-center gap-1 bg-slate-900 hover:bg-slate-950 px-2 rounded"
            >
              <i class="bx bxl-github text-xl text-white"></i>
              DEMO
            </a>
          </div>
          <div class="border-b border-blue-500/90 mb-5"></div>
        </div>
        <div class="flex items-center justify-between">
          <i
            class="bx bx-pencil cursor-pointer hover:bg-green-600 bg-green-500 p-2 rounded-full"
            @click="
              () => {
                updateId = el._id
                updateContent.title = el.title
                updateContent.preview = el.preview
                updateContent.demo = el.demo
                updateContent.img = el.img
                updateContent.description = el.description
              }
            "
          ></i>
          <span class="text-md text-slate-500">{{
            moment(el.createdAt).format('MMMM Do YYYY, h:mm:ss a')
          }}</span>
          <i
            class="bx bx-trash cursor-pointer hover:bg-red-600 bg-red-500 p-2 rounded-full"
            @click="
              () => {
                deleteId = el._id
                toggleDelete()
              }
            "
          ></i>
        </div>
      </div>
    </section>
  </section>
  <AboutFooter />
</template>

<style lang="scss" scoped></style>
