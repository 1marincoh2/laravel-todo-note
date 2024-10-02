import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Notes from '../views/Notes.vue';
import NoteEdit from '../views/NoteEdit.vue';
import store from '../store';

const routes = [
  { path: '/',name:'home', component: Home },
  { path: '/login',name:'login', component: Login },
  { path: '/register',name:'register', component: Register },
  {
    path: '/notes',
    component: Notes,
    name: "notes",
    meta: { requiresAuth: true }
  },
  {
    path: '/notes/:id/edit',
    name:'edit-note',
    component: NoteEdit,
    meta: { requiresAuth: true }
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
