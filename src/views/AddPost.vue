<script setup>
import Editor from '@tinymce/tinymce-vue'
import { postsStore } from '../stores/posts/postsStore.js'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { ref, onMounted, reactive } from 'vue'

const router = useRouter()

const newPost = reactive({
  title: '',
  content: ''
})
const store = postsStore()

const addPost = () => {
  if (!newPost.title.length || !newPost.content.length) {
    toast.error(`All fields required`, {
      autoClose: 2000,
      theme: 'dark'
    })
  } else {
    try {
      store.ADD_POST(newPost)
      for (let i in newPost) newPost[i] = ''
      toast.success('New Post added', {
        autoClose: 2000,
        theme: 'dark'
      })
      router.push('/blog')
    } catch (error) {
      toast.error(`Error: ${error}`, {
        autoClose: 2000,
        theme: 'dark'
      })
    }
  }
}
</script>

<template>
  <section>
    <div>
      <div class="flex items-center justify-between mb-20 px-5">
        <input
          type="text"
          class="border text-sm rounded-lg block w-fit p-2.5 bg-black focus:bg-slate-900 border-slate-600 placeholder-slate-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Tell me the title of this post"
          required
          v-model="newPost.title"
        />
        <button
          @click="addPost"
          class="text-white-400 border-2 text-white hover:border-transparent hover:bg-white hover:shadow-blue-500 shadow-inner hover:text-black focus:outline-none rounded-lg text-base px-4 py-3 text-center mr-2 uppercase"
        >
          publish
        </button>
      </div>
      <editor
        api-key="t8qlpw6q6ttt2fogox4z2xz2wg7pn3d807clhp5w8uipd7fn"
        v-model="newPost.content"
        :init="{
          menubar: true,
          plugins: 'lists link image emoticons',
          toolbar:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
          toolbar:
            'undo redo | blocks fontsize | emoticons bold italic underline strikethrough  | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight checklist numlist bullist  | charmap | removeformat'
        }"
      />
    </div>
    <h1 class="text-2xl text-slate-600 text-start px-5 pt-20">Post Preview Below</h1>
    <span v-html="newPost.content"></span>
  </section>
</template>

<style lang="scss" scoped></style>
