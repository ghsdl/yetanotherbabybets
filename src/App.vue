<script setup lang="ts">
import { RouterView } from 'vue-router';
import ABBAHeader from './components/ABBAHeader.vue';
</script>

<template>
  <ABBAHeader />
  <RouterView />
</template>

<style lang="scss">
@use './assets/base.scss';

.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
