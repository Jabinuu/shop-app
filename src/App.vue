<template>
  <div id="app">
    <Header></Header>
    <!-- 路由出口 应该出现的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
// 引入组件
import Header from "./components/Header/HeaderIndex";
import Footer from "@/components/Footer/FooterIndex";
export default {
  name: "App",

  // 注册组件
  components: {
    Header,
    Footer,
  },

  props: {},

  data() {
    return {};
  },

  mounted() {
    /* 由于多次发这个请求的结果都是一样的，如果把这个请求放在TypeNav组件，那么每进行一次该组件渲染，都要发一次请求，这明显是没有必要的
       所以把这个请求放在App根组件，仅请求一次，优化了不少网络性能 */
    // 通知Vuex发请求,获取数据,存储于仓库中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
