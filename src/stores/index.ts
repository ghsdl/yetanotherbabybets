import { reactive } from 'vue';

const state = reactive({
  user: null
});

const methods = {
  setUser(user: any) {
    state.user = user ? user.data.user : null;
  }
};

export default {
  state,
  methods
};
