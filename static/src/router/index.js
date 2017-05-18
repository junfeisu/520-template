import Vue from 'vue'
import Router from 'vue-router'
import guide from '@/components/guide'
import start from '@/components/start'
import add from '@/components/add'
import template from '@/components/template'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'guide',
    component: guide
  }, {
    path: '/start',
    name: 'start',
    component: start
  }, {
    path: '/add',
    name: 'add',
    component: add
  }, {
    path: '/template',
    name: 'template',
    component: template
  }]
})
