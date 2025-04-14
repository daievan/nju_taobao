import { createRouter, createWebHistory } from 'vue-router'

// 主布局以及各个页面采用懒加载方式
const Layout = () => import('@/views/Layout/index.vue')
const Home = () => import('@/views/Home/index.vue')
const Detail = () => import('@/views/Detail/index.vue')
const CartList = () => import('@/views/CartList/index.vue')
const Search = () => import('@/views/Search/index.vue')
const Checkout = () => import('@/views/Checkout/index.vue')
const Order = () => import('@/views/Order/index.vue')

// 新增：登录/注册页面
const Login = () => import('@/views/Login/index.vue')

// 可选：404 页面（你可以自建一个 NotFound.vue，如果不需要可以移除）
const NotFound = () => import('@/views/NotFound.vue')

const routes = [
  // 登录页面路由（独立于主布局）
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '登录/注册' }
  },
  // 主布局下的其他页面
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: { title: '首页' }
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: Detail,
        meta: { title: '商品详情' }
      },
      {
        path: 'cartlist',
        name: 'cartlist',
        component: CartList,
        meta: { title: '购物车' }
      },
      {
        path: 'search',
        name: 'search',
        component: Search,
        meta: { title: '搜索' }
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: Checkout,
        meta: { title: '结算' }
      },
      {
        path: 'order',
        name: 'order',
        component: Order,
        meta: { title: '订单' }
      }
    ]
  },
  // 捕获所有未匹配的路径，显示 404 页面（可选）
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404 - 页面不存在' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 每次路由跳转后滚动至顶部
  scrollBehavior() {
    return { top: 0 }
  }
})

// 全局导航守卫：设置页面标题或其它权限检查
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
