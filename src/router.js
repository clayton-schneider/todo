import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Projects from './views/Projects.vue'
import Create from './views/Create.vue'
import SupplierChangeRequest from './views/SupplierChangeRequest'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashbaord',
      component: Dashboard
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects

    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/create/supplier-change-request',
      name: 'supplier-change-request',
      component: SupplierChangeRequest
    }

  ]
})
