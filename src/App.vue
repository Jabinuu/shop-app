<template>
  <div id="app">
    <Header></Header>
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
