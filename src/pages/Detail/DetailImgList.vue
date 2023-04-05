<template>
  <div class="block">
    <el-carousel
      trigger="click"
      type="card"
      :autoplay="false"
      arrow="hover"
      indicator-position="outside"
      :loop="false"
      height="80px"
      @change="setCurImageId"
    >
      <el-carousel-item v-for="item in imgList" :key="item.id" class="slide">
        <img :src="item.imgUrl" :class="{ active: item.id === curImageId }" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "DetailImgList",

  props: {
    imgList: {
      default: () => [{}],
    },
  },

  data() {
    return {
      curImageId: this.imgList[0].id,
    };
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {
    setCurImageId(curIndex) {
      this.curImageId = this.imgList[curIndex].id;
      this.$bus.$emit("switchImg", this.imgList[curIndex].imgUrl);
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  height: 80px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .slide {
    img {
      border: 1px solid #ccc;
      padding: 2px;
      width: 74px;
      height: 74px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }
}
</style>