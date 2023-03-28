<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <h2 class="all">全部商品分类</h2>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
        <div class="sort">
          <div class="all-sort-list2">
            <div
              class="item bo"
              v-for="item in categoryList"
              :key="item.categoryId"
            >
              <h3>
                <a href="">{{ item.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="item2 in item.categoryChild"
                  :key="item2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a href="">{{ item2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em
                        v-for="item3 in item2.categoryChild"
                        :key="item3.categoryId"
                      >
                        <a href="">{{ item3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "TypeNav",
  data() {
    return {};
  },
  created() {},
  // 组件挂载DOM节点(Vue接管此DOM节点)(渲染)完毕,可以向服务器发送请求
  mounted() {
    // 通知Vuex发请求,获取数据,存储于仓库中
    this.$store.dispatch("categoryList");
  },
  computed: {
    ...mapState({
      // 函数名是小仓库中的数据名; 当使用这个计算属性的时候,这个计算属性函数会自动调用一次,且传入的形参为大仓库对象
      categoryList(state) {
        return state.home.categoryList;
      },
    }),
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
