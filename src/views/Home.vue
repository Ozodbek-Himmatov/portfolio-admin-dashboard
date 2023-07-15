<script setup>
import Chart from '../components/Chart.vue'
import { onMounted } from 'vue'
import { postsStore } from '../stores/posts/postsStore'
const store = postsStore()

onMounted(() => {
  store.GET_POST()
})
</script>

<template>
  <section>
    <div class="grid grid-cols-3 gap-5 mb-5" data-aos="fade-down" data-aos-delay="500">
      <div
        class="flex items-center justify-between p-5 h-auto w-full rounded-lg bg-transparent text-white border border-white shadow-xl"
      >
        <div class="grid grid-cols-1 gap-1">
          <h1 class="text-xl font-bold">Today's Visits</h1>
          <h1 class="text-2xl font-extrabold">24</h1>
        </div>
        <div
          class="w-20 h-20 rounded-full shadow-inner shadow-white flex items-center justify-center"
        >
          <i class="bx bx-line-chart text-3xl"></i>
        </div>
      </div>
      <div
        class="flex items-center justify-between p-5 h-auto w-full rounded-lg bg-transparent text-white border border-white shadow-xl"
      >
        <div class="grid grid-cols-1 gap-1">
          <h1 class="text-xl font-bold">All Time Visits</h1>
          <h1 class="text-2xl font-extrabold">224</h1>
        </div>
        <div
          class="w-20 h-20 rounded-full shadow-inner shadow-white flex items-center justify-center"
        >
          <i class="bx bxs-pie-chart-alt-2 text-3xl" style="color: #ffffff"></i>
        </div>
      </div>
      <router-link
        to="/blog"
        class="flex items-center justify-between p-5 h-auto w-full rounded-lg bg-transparent text-white border border-white shadow-xl"
      >
        <div class="grid grid-cols-1 gap-1">
          <h1 class="text-xl font-bold">Posts</h1>
          <h1 class="text-2xl font-extrabold">{{ store.POST.length }}</h1>
        </div>
        <div
          class="w-20 h-20 rounded-full shadow-inner shadow-white flex items-center justify-center"
        >
          <i class="bx bx-spreadsheet text-3xl"></i></div
      ></router-link>
    </div>
    <Chart />
  </section>
</template>

<style lang="scss" scoped></style>
