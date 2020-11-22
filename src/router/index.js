import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/articleDetail',
    component: () => import(/* webpackChunkName: "articleDetail" */ '../views/ArticleDetail.vue'),
    meta: { title: '文章详情' }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
    meta: { title: '404' }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
