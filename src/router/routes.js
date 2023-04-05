import Home from '@/pages/Home/HomeIndex'
import Login from '@/pages/Login/LoginIndex'
import Register from '@/pages/Register/RegisterIndex'
import Search from '@/pages/Search/SearchIndex'
import Detail from '@/pages/Detail/DetailIndex'
import ShopCartSuccess from '@/pages/ShopCart/ShopCartSuccess'
import ShopCartIndex from '@/pages/ShopCart/ShopCartIndex.vue'
export default [
  // 注意路由的路径不是 os的文件路径！不要用./
  {
    path: '/home',
    component: Home,
    meta: { showFooter: true }
  },

  {
    path: '/login',
    name: 'loginRouter',
    component: Login,
    meta: { showFooter: false }
  },

  {
    path: '/Register',
    component: Register,
    meta: { showFooter: false }
  },

  {
    path: '/search/:keyword?',// 动态路由传递params参数的占位符。默认params必须传递，加上?设置params可传可不传
    name: 'searchRouter',           // 通过path和name都可所引到对应的路由
    component: Search,
    meta: { showFooter: true },
    // 设置路由组件的props传递，而不是在组件中直接用$route.params.xxx，可实现解耦，建议使用
    // 这里是函数式写法，$route只是形参，可以改成别的。其他的方式还有布尔式（只能传params），对象式（只能额外加，不嫩恶搞穿params和query）
    props: ($route) => ({ searchWord: $route.params.searchWord, keyword: $route.query.searchWord })
  },

  {
    path: '/detail/:skuid?',
    name: 'detailRouter',
    component: Detail,
    props: ($route) => ({ skuid: $route.params.skuid }),
    meta: { showFooter: true }
  },

  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: ShopCartSuccess,
    meta: { showFooter: true }
  },

  {
    path: '/shopcart',
    component: ShopCartIndex,
    meta: { showFooter: true }
  },

  {
    path: '/',
    redirect: '/home'
  }   // 这里是路由重定向，打开域名直接跳转到首页
]