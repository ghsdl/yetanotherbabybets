<script>
import { supabase } from '../supabase/supabase';
import store from '../stores/index';

const getUser = async () => {
  const user = await supabase.auth.getUser();
  if (user) {
    store.methods.setUser(user);
  }
};

getUser();
</script>

<template>
  <div class="faq">
    <h1>This is a dashboard page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .faq {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
