import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import epp from './epp.vue'
import favo from './favo.vue'
import open from './open.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/epp', component: epp },
    { path: '/favo', component: favo },
    { path: '/open/:id', name: 'post', component: open },
  ]
})

var app = new Vue({
  router
}).$mount('#app')

