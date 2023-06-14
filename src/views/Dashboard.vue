<template>
  <main>
    <Sidebar/>
    <div class="p-4 sm:ml-64">
      <router-view></router-view>
    </div>
  </main>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
</script>

<style lang="scss" scoped></style>
