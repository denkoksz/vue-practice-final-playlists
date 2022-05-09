import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from "@/views/auth/Login";
import Signup from "@/views/auth/Signup";
import CreatePlaylist from "@/views/playlists/CreatePlaylist";
import PlaylistDetails from "@/views/playlists/PlaylistDetails";
import { projectAuth } from "@/firebase/config";

// route guard

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: 'Login'});
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/playlists/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requireAuth
  },
  {
    path: '/playlists/:id',
    name: 'PlaylistDetails',
    component: PlaylistDetails,
    props: true,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
