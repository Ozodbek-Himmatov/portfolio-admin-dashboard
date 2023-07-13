<script setup>
import AboutFooter from '../components/AboutFooter.vue'
import Loading from '../components/Loading.vue'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { Uploader } from 'uploader'
import { descriptionStore } from '../stores/description/descriptionStore.js'

const file = ref('')
const store = descriptionStore()

const options = { multi: false }
const userImage = ref(null)

const setImg = (url) => {
  userImage.value = null
  userImage.value = url[0]
}

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

const update_description = () => {
  if (!userImage.value) {
    toast.error(`Your Image is required`, {
      autoClose: 2000,
      theme: 'dark'
    })
  } else {
    try {
      store.DESCRIPTION.user_photo = userImage.value
      store.UPDATE_DESCRIPTION()
      toast.success('Success!!', {
        autoClose: 2000,
        theme: 'dark'
      })
    } catch (error) {
      console.log(error)
      toast.error('Error!!', {
        autoClose: 2000,
        theme: 'dark'
      })
    }
  }
}

onMounted(() => {
  store.GET_DESCRIPTION()
})
</script>

<template>
  <section>
    <a href="/skills" class="flex text-2xl w-32 border-b border-blue-500 pb-1.5 mb-20">
      <span class="border-b border-blue-500 text-white">about me</span>
    </a>
    <Loading v-if="store.LOAD" />
    <form v-else @submit.prevent="update_description" class="text-center w-[70%] mx-auto">
      <div class="flex items-center justify-center">
        <div class="text-start w-[95%]">
          <label>Fullname</label>
          <input
            required
            type="text"
            id="fullname"
            class="mb-5 outline-none border text-base rounded-md block w-full px-2.5 py-5 bg-slate-900 border-slate-700 focus:bg-slate-800 placeholder-slate-500 text-white focus:ring-blue-900 focus:border-blue-500"
            placeholder="Fullname"
            v-model="store.DESCRIPTION.fullname"
          />
          <label>Email</label>
          <input
            required
            type="text"
            id="email"
            class="mb-5 outline-none border text-base rounded-md block w-full py-5 px-2.5 bg-slate-900 border-slate-700 focus:bg-slate-800 placeholder-slate-500 text-white focus:ring-blue-900 focus:border-blue-500"
            placeholder="Email"
            v-model="store.DESCRIPTION.email"
          />
        </div>
        <div class="w-[30%]">
          <div
            class="mx-auto relative mb-5 border-4 border-blue-500 h-[200px] w-[200px] rounded-full"
          >
            <img
              :src="userImage ? userImage : store.DESCRIPTION.user_photo"
              class="h-[192px] w-[192px] rounded-full object-cover"
            />
            <label
              class="bx bxs-cloud-upload absolute top-0 right-0 cursor-pointer hover:bg-white rounded-full px-3 py-2 text-3xl bg-black text-white border-4 border-blue-500 hover:text-black"
              for="avatar_upload"
            ></label>
            <button @click="onImageUpload" type="button" id="avatar_upload" class="hidden"></button>
          </div>
        </div>
      </div>
      <div class="text-start w-full">
        <label>Phone </label>
        <input
          required
          type="text"
          id="phone"
          class="mb-5 outline-none border text-base rounded-md block w-full py-5 px-2.5 bg-slate-900 border-slate-700 focus:bg-slate-800 placeholder-slate-500 text-white focus:ring-blue-900 focus:border-blue-500"
          placeholder="Phone"
          v-model="store.DESCRIPTION.phone"
        />
      </div>
      <div class="text-start mx-auto w-full">
        <label>About Me </label>
        <textarea
          id="message"
          rows="4"
          class="w-full text-base rounded-md block py-5 px-2.5 border bg-slate-900 border-slate-700 focus:bg-slate-800 placeholder-slate-500 text-white focus:ring-blue-900 focus:border-blue-500 mb-5 outline-none"
          placeholder="About Me"
          v-model="store.DESCRIPTION.description"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-md text-base p-3 text-center bg-blue-600 hover:bg-blue-700"
      >
        SAVE
      </button>
    </form>
  </section>
  <AboutFooter />
</template>

<style lang="scss" scoped></style>
