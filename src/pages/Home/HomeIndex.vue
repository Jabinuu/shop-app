<template>
  <div>
    <!-- 由于该组件被注册为全局组件，故无须注册即可使用  -->
    <TypeNav></TypeNav>
    <HomeListContainer></HomeListContainer>
    <HomeRecommend></HomeRecommend>
    <HomeRank></HomeRank>
    <HomeLike></HomeLike>
    <!-- v-for还有一个隐藏的用途：只有当获取到异步的遍历数组时才进行渲染，这样就会避免因异步操作的数组还没有获取到，产生空值的情况 -->
    <HomeFloor
      :list="item"
      v-for="item in floorList"
      :key="item.id"
    ></HomeFloor>
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
import { mapState } from "vuex";
export default {
  name: "HomeIndex",

  components: {
    HomeListContainer,
    HomeRecommend,
    HomeRank,
    HomeLike,
    HomeFloor,
    HomeBrand,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState({
      floorList(state) {
        return state.home.floorList;
      },
    }),
  },

  created() {},
  mounted() {
    // 派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
  },
  methods: {},
};
</script>
<style lang="less" scoped>
</style>
