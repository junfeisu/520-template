import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'guide',
    component: resolve => {
      require.ensure(['@/components/guide.vue'], () => {
        resolve(require('@/components/guide.vue'))
      })
    }
  }, {
    path: '/start',
    name: 'start',
    component: resolve => {
      require.ensure(['@/components/start.vue'], () => {
        resolve(require('@/components/start.vue'))
      })
    }
  }, {
    path: '/add',
    name: 'add',
    component: resolve => {
      require.ensure(['@/components/add.vue'], () => {
        resolve(require('@/components/add.vue'))
      })
    }
  }, {
    path: '/template',
    name: 'template',
    component: resolve => {
      require.ensure(['@/components/template.vue'], () => {
        resolve(require('@/components/template.vue'))
      })
    }
  }]
})
