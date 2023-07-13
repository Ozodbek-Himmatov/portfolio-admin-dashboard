<script setup>
import { onMounted, ref } from 'vue'
import { navLinks } from '../constants/navLink'
import { useRouter } from 'vue-router'

const router = useRouter()
const path = ref(router.currentRoute.value.path)
const navlinks = ref(navLinks)
</script>

<template>
  <aside
    class="w-[23%] h-[100vh] overflow-auto border-r-2 border-slate-500 shadow shadow-green-400"
  >
    <a href="/" class="flex items-center border border-blue-800 justify-center shadow-inner shadow-blue-400">
      <span
        class="text-3xl p-3 text-white font-['sans'] shadow-lg rounded"
        >Ozodbek</span
      >
    </a>
    <div class="flex flex-col justify-center h-[80vh]">
      <div v-for="el in navlinks" class="flex flex-col gap-2 pl-6 py-1">
        <router-link
          :to="el.path"
          @click="() => (path = el.path)"
          class="flex flex-col gap-5 border border-[#334155eb] rounded cursor-pointer px-3 py-5 text-lg hover:bg-slate-950/50 hover:text-blue-800"
        >
          <div class="flex items-center justify-between">
            <div class="flex flex-row items-center gap-5">
              <i
                :class="
                  path == el.path || el.children?.map((i) => i.path).includes(path)
                    ? 'bxs-folder-open text-[27px]'
                    : 'bxs-folder text-2xl'
                "
                class="bx"
              ></i>
              <span>{{ el.name }}</span>
            </div>
            <i
              v-if="el.children"
              class="bx text-2xl"
              :class="
                path == el.path || el.children.map((i) => i.path).includes(path)
                  ? 'bx-chevron-down'
                  : 'bx-chevron-right'
              "
            ></i>
          </div>
        </router-link>
        <div
          v-for="child in el.children"
          :class="el.path == path || el.children.map((i) => i.path).includes(path) ? '' : 'hidden'"
        >
          <router-link
            :to="child.path"
            class="parent ml-5 bg-[#020617fc] text-gray-600 cursor-pointer px-10 rounded text-2xl h-[50px] flex items-center"
          >
            <div class="flex items-center gap-4">
              <i :class="child.icon" id="circle" class="text-2xl"></i>
              <span class="child">{{ child.name }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="css" scoped>
.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.685);
  color: black;
}

.parent:hover .child {
  color: #020617;
}
</style>
