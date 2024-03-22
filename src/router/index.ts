import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../supabase/supabase';
import HomeView from '../views/HomeView.vue';
import FAQView from '../views/FAQView.vue';
import PronosView from '../views/PronosView.vue';
import LoginView from '../views/LoginView.vue';
// import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQView
    },
    {
      path: '/pronos',
      name: 'pronos',
      component: PronosView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    }
    // using once to avoid multiple registration
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: RegisterView
    // }
  ]
});

const getUser = async (next: any) => {
  const user = await supabase.auth.getUser();
  if (user.data.user == null) {
    next('/login');
  } else {
    next();
  }
};

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    getUser(next);
  } else {
    next();
  }
});

export default router;
