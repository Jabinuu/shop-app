export default [
  // **************** 一级路由 ********************* //
  // 注意路由的路径不是 os的文件路径！不要用./
  {
    path: '/home',
    component: () => import('@/pages/Home/HomeIndex'),   // 路由懒加载，使得页面加载更高效
    meta: { showFooter: true }
  },

  {
    path: '/login',
    name: 'loginRouter',
    component: () => import('@/pages/Login/LoginIndex'),
    meta: { showFooter: false }
  },

  {
    path: '/Register',
    component: () => import('@/pages/Register/RegisterIndex'),
    meta: { showFooter: false }
  },

  {
    path: '/search/:keyword?',// 动态路由传递params参数的占位符。默认params必须传递，加上?设置params可传可不传
    name: 'searchRouter',           // 通过path和name都可所引到对应的路由
    component: () => import('@/pages/Search/SearchIndex'),
    meta: { showFooter: true },
    // 设置路由组件的props传递，而不是在组件中直接用$route.params.xxx，可实现解耦，建议使用
    // 这里是函数式写法，$route只是形参，可以改成别的。其他的方式还有布尔式（只能传params），对象式（只能额外加，不嫩恶搞穿params和query）
    props: ($route) => ({ searchWord: $route.params.searchWord, keyword: $route.query.searchWord })
  },

  {
    path: '/detail/:skuid?',
    name: 'detailRouter',
    component: () => import('@/pages/Detail/DetailIndex'),
    props: ($route) => ({ skuid: $route.params.skuid }),
    meta: { showFooter: true }
  },

  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/pages/ShopCart/ShopCartSuccess'),
    meta: { showFooter: true }
  },

  {
    path: '/shopcart',
    component: () => import('@/pages/ShopCart/ShopCartIndex.vue'),
    meta: { showFooter: true }
  },

  {
    path: '/trade',
    component: () => import('@/pages/Trade/TradeIndex'),
    meta: { showFooter: true },
    // 路由独享守卫：只能从购物车组件跳转到交易组件，其他的都不行。 仅针对单个路由跳转
    beforeEnter: (to, from, next) => {

      if (from.path.includes('/shopcart')) {
        next()
      } else if (from.path.includes('/login') && from.query.redirect) {
        next()
      } else {
        next(false);   // false意为从哪来回哪去
      }
    },
  },

  {
    path: '/pay',
    component: () => import('@/pages/Pay/PayIndex'),
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      if (from.path.includes('/trade')) {
        next();
      } else {
        next(false);
      }
    }
  },

  {
    path: '/paysuccess',
    component: () => import('@/pages/Pay/PaySuccess'),
    meta: { showFooter: true }
  },

  {
    path: '/center',
    component: () => import('@/pages/Center/CenterIndex'),
    meta: { showFooter: true },
    // ************* 二级路由 ************ //
    // 只有一级目录才能带/，二级路由的路径不能带/，如果执意要带/，那就必须从一级路由开始写 比如/center/individual
    children: [
      {
        path: 'individual',
        component: () => import('@/pages/Center/CenterIndividual')
      },
      {
        path: 'group',
        component: () => import('@/pages/Center/CenterGroup')
      },
      // 二级路由的重定向
      {
        path: '/center',
        redirect: '/center/individual'
      }
    ]
  },

  // 这里是路由重定向，打开域名直接跳转到首页
  {
    path: '/',
    redirect: '/home'
  },
]