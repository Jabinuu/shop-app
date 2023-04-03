<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('pageClick', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="startAndEnd.start > 1"
      @click="$emit('pageClick', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-show="startAndEnd.start > 2">···</button>
    <!-- 连续的页数得是奇数，因为对称 好看 -->
    <button
      v-for="o in acitvedButton"
      :key="o"
      @click="$emit('pageClick', o)"
      :class="{ active: pageNo === o }"
    >
      {{ o }}
    </button>
    <button v-show="startAndEnd.end < totalPageNum - 1">···</button>
    <button
      v-show="startAndEnd.end < totalPageNum"
      @click="$emit('pageClick', totalPageNum)"
      :class="{ active: pageNo === totalPageNum }"
    >
      {{ totalPageNum }}
    </button>
    <button
      :disabled="pageNo === totalPageNum"
      @click="$emit('pageClick', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
<script>
export default {
  name: "GoodsPagination",

  props: ["pageNo", "pageSize", "total", "continues"],

  data() {
    return {};
  },

  computed: {
    totalPageNum() {
      return Math.ceil(this.total / this.pageSize);
    },

    startAndEnd() {
      // 小技巧:这里用解构赋值,直接得到数据,可以少些很多this.
      const { pageNo, continues, totalPageNum } = this;
      let start, end; // 连续页按钮的起始和结束页数
      if (continues > totalPageNum) {
        start = 1;
        end = totalPageNum;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        } else if (end > totalPageNum) {
          end = totalPageNum;
          start = totalPageNum - continues + 1;
        }
      }
      return {
        start,
        end,
      };
    },

    // 筛选需要展示的连续按钮的序号
    acitvedButton() {
      let arr = Array(this.startAndEnd.end - this.startAndEnd.start + 1);
      arr.fill(0);
      return arr.map((_, index) => index + this.startAndEnd.start);
    },
  },

  created() {},

  mounted() {},

  methods: {},
};
</script>
<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

