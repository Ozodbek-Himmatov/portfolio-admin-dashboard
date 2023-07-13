import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/Home.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/About.vue')
        },
        {
          path: '/skills',
          name: 'skills',
          component: () => import('../views/Skills.vue')
        },
        {
          path: '/projects',
          name: 'projects',
          component: () => import('../views/Projects.vue')
        },
        {
          path: '/experience',
          name: 'experience',
          component: () => import('../views/Experience.vue')
        },
        {
          path: '/socials',
          name: 'socials',
          component: () => import('../views/Socials.vue')
        },

        {
          path: '/blog',
          name: 'blog',
          component: () => import('../views/Blog.vue')
        },
        {
          path: '/add-post',
          name: 'Editor',
          component: () => import('../views/AddPost.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../views/Error.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token')

//   if (to.name !== 'login' && !token) {
//     next({ name: 'login' })
//   } else {
//     next()
//   }
// })

export default router
