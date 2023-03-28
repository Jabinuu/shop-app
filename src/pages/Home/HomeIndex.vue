<template>
  <div>
    <!-- 由于该组件被注册为全局组件，故无须注册即可使用  -->
    <TypeNav></TypeNav>
    <HomeListContainer></HomeListContainer>
    <HomeRecommend></HomeRecommend>
    <HomeRank></HomeRank>
    <HomeLike></HomeLike>
    <HomeFloor></HomeFloor>
    <HomeFloor></HomeFloor>
    <HomeBrand></HomeBrand>
  </div>
</template>
<script>
import HomeListContainer from "@/pages/Home/HomeListContainer";
import HomeRecommend from "@/pages/Home/HomeRecommend";
import HomeRank from "@/pages/Home/HomeRank";
import HomeLike from "@/pages/Home/HomeLike";
import HomeFloor from "@/pages/Home/HomeFloor";
import HomeBrand from "@/pages/Home/HomeBrand";
export default {
  name: "IndexHome",
  data() {
    return {};
  },
  components: {
    HomeListContainer,
    HomeRecommend,
    HomeRank,
    HomeLike,
    HomeFloor,
    HomeBrand,
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>
