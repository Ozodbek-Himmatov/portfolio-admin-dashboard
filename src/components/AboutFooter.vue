<template>
  <footer class="grid grid-cols-4 my-20 gap-5 px-5 fixed w-[167vh] bottom-0">
    <a
      href="/about"
      v-show="router.currentRoute.value.path != '/about'"
      class="border border-slate-900 hover:bg-slate-900 bg-black cursor-pointer px-5 py-2 rounded text-white shadow-inner shadow-blue-500"
      >About</a
    >
    <a
      href="/skills"
      v-show="router.currentRoute.value.path != '/skills'"
      class="border border-slate-900 hover:bg-slate-900 bg-black cursor-pointer px-5 py-2 rounded text-white shadow-inner shadow-blue-500"
      >Skills</a
    >
    <a
      href="/projects"
      v-show="router.currentRoute.value.path != '/projects'"
      class="border border-slate-900 hover:bg-slate-900 bg-black cursor-pointer px-5 py-2 rounded text-white shadow-inner shadow-blue-500"
      >Projects</a
    >
    <a
      href="/experience"
      v-show="router.currentRoute.value.path != '/experience'"
      class="border border-slate-900 hover:bg-slate-900 bg-black cursor-pointer px-5 py-2 rounded text-white shadow-inner shadow-blue-500"
      >Experience</a
    >
    <a
      href="/socials"
      v-show="router.currentRoute.value.path != '/socials'"
      class="border border-slate-900 hover:bg-slate-900 bg-black cursor-pointer px-5 py-2 rounded text-white shadow-inner shadow-blue-500"
      >Social Media</a
    >
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped></style>
