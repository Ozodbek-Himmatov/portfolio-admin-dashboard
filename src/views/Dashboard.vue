<template>
  <main class="flex bg-black selection:text-white selection:bg-fuchsia-500">
    <Sidebar />
    <section class="w-full p-3 overflow-auto h-screen">
      <router-view></router-view>
    </section>
  </main>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
</script>

<style lang="scss" scoped></style>
