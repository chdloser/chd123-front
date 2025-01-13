import Login from '@/views/login.vue'
import Game from '@/views/game.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component:Welcome
    },
    {
      path: '/home',
      component:Home
    },
    {
      path: '/game',
      name:'game',
      component:Game
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    }
  ],
})

export default router
