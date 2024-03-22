<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBabyCarriage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faBabyCarriage);
</script>

<template>
  <header class="p-20 d-flex flex-row align-items-center">
    <nav class="d-flex flex-fill">
      <RouterLink to="/" class="d-flex flex-row align-items-center mr-20 flex-fill">
        <font-awesome-icon icon="baby-carriage" class="logo mr-15" />
        <h1 class="name">Another Baby Bets App</h1>
      </RouterLink>
      <ul class="d-flex flex-row">
        <li class="mr-20">
          <RouterLink to="/pronos" class="link link-underline">Voir les pronos</RouterLink>
        </li>
        <li class="mr-20">
          <RouterLink to="/faq" class="link link-underline">FAQ</RouterLink>
        </li>
        <li class="mr-20">
          <RouterLink to="/login" class="link link-underline">Admin</RouterLink>
        </li>
        <li>
          <RouterLink to="/logout" class="link link-underline">Déconnexion</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  background-color: var(--primary-1);
  a {
    color: var(--text-primary-color);
    .logo {
      font-size: 36px;
      color: var(--primary-2);
    }
    .name {
      font-weight: 700;
      font-size: 36px;
      color: var(--primary-2);
      font-family: var(--font-family-secondary);
    }
  }

  .link {
    position: relative;
    white-space: nowrap;
  }

  .link::before,
  .link::after {
    position: absolute;
    width: 100%;
    height: 2px;
    background: var(--primary-2);
    top: 140%;
    left: 0;
    pointer-events: none;
  }

  .link::before {
    content: '';
  }

  .link-underline::before {
    transform-origin: 100% 50%;
    transform: scale3d(0, 1, 1);
    transition: transform 0.3s;
  }

  .link-underline:hover::before {
    transform-origin: 0% 50%;
    transform: scale3d(1, 1, 1);
  }
}
</style>
