<template>
  <div>
    <!-- 由于该组件被注册为全局组件，故无须注册即可使用  -->
    <HomeTypeNav></HomeTypeNav>
    <HomeListContainer></HomeListContainer>
    <HomeRecommend></HomeRecommend>
  </div>
</template>
<script>
import HomeListContainer from "@/pages/Home/HomeListContainer";
import HomeRecommend from "@/pages/Home/HomeRecommend";
export default {
  name: "IndexHome",
  data() {
    return {};
  },
  components: {
    HomeListContainer,
    HomeRecommend,
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>
