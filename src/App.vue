<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件应该出现的地方 -->
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
// 引入组件
import Header from "./components/Header/indexHeader";
import Footer from "@/components/Footer/indexFooter";
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
