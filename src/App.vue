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
import Header from "./components/Header/comHeader";
import Footer from "@/components/Footer/comFooter";
export default {
  name: "App",
  // 注册组件
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
</style>
