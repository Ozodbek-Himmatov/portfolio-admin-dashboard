<script setup>
import { ref } from 'vue'
import { navLinks } from '../constants/navLink'

const navlink = ref(navLinks)
</script>

<template>
  
</template>

<style lang="css" scoped>
.router-link-active {
  border: 1px dashed rgba(128, 128, 128, 0.586);
}
</style>
