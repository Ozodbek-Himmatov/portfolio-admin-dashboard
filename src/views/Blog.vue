<script setup>
import EmptyData from '../components/EmptyData.vue'
import Loading from '../components/Loading.vue'
import moment from 'moment'
import Editor from '@tinymce/tinymce-vue'
import { toast } from 'vue3-toastify'
import { ref, onMounted, reactive } from 'vue'
import { postsStore } from '../stores/posts/postsStore.js'

const store = postsStore()

const deleteModal = ref(false)
const deleteId = ref('')
const updateId = ref(null)

const toggleDelete = () => (deleteModal.value = !deleteModal.value)

const updateContent = reactive({
  title: '',
  content: ''
})

const newPost = reactive({
  title: '',
  content: ''
})

const updatePost = () => {
  if (!updateContent.title.length || !updateContent.content.length) {
    toast.error(`All fields are required`, {
      autoClose: 2000,
      theme: 'dark'
    })
  } else {
    try {
      store.UPDATE_POST(updateId.value, updateContent)
      updateId.value = null
      toast.success('The Post updated', {
        autoClose: 2000,
        theme: 'dark'
      })
    } catch (error) {
      console.log(error)
      toast.error(`Error: ${error}`, {
        autoClose: 2000,
        theme: 'dark'
      })
    }
  }
}

const deletePost = () => {
  try {
    store.DELETE_POST(deleteId.value)
    toast.success('The post deleted', {
      autoClose: 2000,
      theme: 'dark'
    })
    toggleDelete()
  } catch (error) {
    toast.error(`Error: ${error}`, {
      autoClose: 2000,
      theme: 'dark'
    })
  }
}

onMounted(async () => {
  store.GET_POST()
})
</script>

<template>
  <div>
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
                @click="deletePost"
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <header class="flex items-center justify-between px-5 mb-5 uppercase">
      <a href="/blog" class="text-2xl border-b-2 w-10 border-blue-500 pb-2">
        <span class="border-b-2 border-blue-500 text-white">blog</span>
      </a>
      <a
        href="/add-post"
        class="text-white-400 border-2 text-white hover:border-transparent hover:bg-white hover:shadow-blue-500 shadow-inner hover:text-black focus:outline-none rounded-lg text-base px-4 py-3 text-center mr-2 uppercase"
      >
        edit new post
      </a>
    </header>
    <Loading v-if="store.LOAD" />
    <EmptyData v-else-if="!store.POST.length" />
    <section v-else class="grid grid-cols-1 gap-3 px-5">
      <div v-for="el in store.POST" class="p-3 bg-slate-950 rounded-lg pt-5 mb-14 relative">
        <div class="flex items-center border-b py-2 mb-20">
          <i
            v-if="updateId == el._id"
            class="bx bx-check px-2 text-black cursor-pointer hover:text-white shadow-inner hover:shadow-green-400 hover:bg-green-700 bg-green-600 p-2 rounded-md"
            @click="updatePost"
          ></i>
          <i
            v-else
            class="bx bx-pencil px-2 text-black cursor-pointer hover:text-white shadow-inner hover:shadow-blue-400 hover:bg-blue-700 bg-blue-600 p-2 rounded-md"
            @click="
              () => {
                updateId = el._id
                updateContent.title = el.title
                updateContent.content = el.content
              }
            "
          ></i>
          <h2 class="w-full overflow-x-auto px-3 text-white text-xl text-center">
            {{ el?.title }}
          </h2>
          <i
            class="bx bx-trash px-2 text-black cursor-pointer hover:text-white shadow-inner hover:shadow-red-400 hover:bg-red-700 bg-red-600 p-2 rounded-md"
            @click="
              () => {
                toggleDelete()
                deleteId = el._id
              }
            "
          ></i>
        </div>
        <editor
          v-if="updateId == el._id"
          api-key="t8qlpw6q6ttt2fogox4z2xz2wg7pn3d807clhp5w8uipd7fn"
          v-model="updateContent.content"
          :init="{
            menubar: true,
            plugins: 'lists link image emoticons',
            toolbar:
              'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
            toolbar:
              'undo redo | blocks fontsize | emoticons bold italic underline strikethrough  | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight checklist numlist bullist  | charmap | removeformat'
          }"
        />
        <span v-else v-html="el.content"></span>
        <div class="flex items-center justify-between mt-20 mb-2">
          <span class="text-[13px] text-slate-500">{{
            moment(el?.createdAt).format('dddd, Do MMMM YYYY')
          }}</span>
          <input
            v-if="updateId == el._id"
            type="text"
            placeholder="Tell me the new title of this post"
            class="border text-sm rounded-lg block w-fit p-2.5 bg-black focus:bg-slate-900 border-slate-600 placeholder-slate-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            v-model="updateContent.title"
          />
          <span class="text-[13px] text-slate-500">{{ moment(el?.createdAt).format('LT') }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
