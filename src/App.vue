<script setup lang="ts">
import ABBAHeader from './components/ABBAHeader.vue';
import ABBAForm from './components/ABBAForm.vue';
</script>

<template>
  <ABBAHeader />
  <ABBAForm />
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
