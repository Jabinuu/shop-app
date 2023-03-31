<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="leavCategory" @mouseenter="isShow = true">
          <h2 class="all">全部商品分类</h2>
          <!-- 过渡动画 -->
          <transition name="sort">
            <div class="sort" v-show="isShow">
              <div class="all-sort-list2" @click.prevent="goSearch">
                <!-- 1. 使用声明式导航，把a标签都换成router-link并不好，因为后者是一个组件实例，
              需要new出来的，创建大量的router-link十分耗时-->
                <!-- 2. 使用编程式导航，把每个a标签都绑定一个负责跳转的回调函数。但因为a标签很多，每一个a标签都要绑定一个回调，
              这同样导致性能不佳所以比较好的方法是，利用事件委派，只在父元素上绑定 1 个回调函数 -->
                <!-- 3. 如果使用事件委派，那么如何确定哪些DOM元素才能触发跳转？又如何确定触发跳转的元素的categoryName和categoryId？
              方法是使用html的自定义属性，data-xxxxx，然后用event.target.dataset 获取地定义属性的值 -->
                <!-- 一级分类 -->
                <div
                  v-for="item in categoryList"
                  :key="item.categoryId"
                  class="item"
                  :class="{
                    curCategory: item.categoryId - 1 === curCategoryIndex,
                  }"
                  @mouseenter="setCurCategory(item.categoryId - 1)"
                >
                  <h3>
                    <a
                      href=""
                      :data-categoryName="item.categoryName"
                      :data-category1Id="item.categoryId"
                      >{{ item.categoryName }}</a
                    >
                  </h3>
                  <!-- 二、三级分类 -->
                  <transition name="item-list">
                    <div
                      class="item-list clearfix"
                      v-show="item.categoryId - 1 === curCategoryIndex"
                    >
                      <div
                        class="subitem"
                        v-for="item2 in item.categoryChild"
                        :key="item2.categoryId"
                      >
                        <dl class="fore">
                          <dt>
                            <a
                              href=""
                              :data-categoryName="item2.categoryName"
                              :data-category2Id="item2.categoryId"
                              >{{ item2.categoryName }}</a
                            >
                          </dt>
                          <dd>
                            <em
                              v-for="item3 in item2.categoryChild"
                              :key="item3.categoryId"
                            >
                              <a
                                href=""
                                :data-categoryName="item3.categoryName"
                                :data-category3Id="item3.categoryId"
                                >{{ item3.categoryName }}</a
                              >
                            </em>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </transition>
        </div>
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
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",

  data() {
    return {
      curCategoryIndex: -1,
      categoryTimer: null,
      isShow: true,
    };
  },

  created() {},

  // 组件挂载DOM节点(Vue接管此DOM节点)(渲染)完毕,可以向服务器发送请求
  mounted() {
    // 通知Vuex发请求,获取数据,存储于仓库中
    this.$store.dispatch("categoryList");
    this.setIsShow();
  },

  computed: {
    // mapState返回的是一个对象，computed也只是接收一个对象，使用对象展开运算符将此对象混入到外部对象中（ES9之后...展开运算符支持展开对象）
    ...mapState({
      // 函数名是小仓库中的数据名; 当使用这个计算属性的时候,这个计算属性函数会自动调用一次,且传入的形参为大仓库对象
      categoryList(state) {
        return state.home.categoryList.slice(0, 15);
      },
    }),
  },

  methods: {
    /* mouseenter事件的频率过高，那么频繁触发回调会产生昂贵的计算开销，甚至发生卡顿，所以要做一下节流优化 */
    // setCurCategory(index) {
    //   if (this.categoryTimer) return;
    //   // 箭头函数的this指向其父级程序的this
    //   this.categoryTimer = setTimeout(() => {
    //     this.curCategoryIndex = index;
    //     this.categoryTimer = undefined;
    //   }, 20);
    // },
    setCurCategory: throttle(function (index) {
      this.curCategoryIndex = index;
    }, 50),

    leavCategory() {
      this.curCategoryIndex = -1;
      if (this.$route.path === "/search") {
        this.isShow = false;
      }
    },

    goSearch(event) {
      // 解构赋值的妙用
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset; // .target是事件发生所在的DOM元素，.dataset是DOM元素的自定义属性对象
      if (categoryname) {
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        this.$router.push({
          path: "/search",
          query,
        });
      }
    },

    setIsShow() {
      if (this.$route.path === "/search") {
        this.isShow = false;
      }
    },
  },
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
      cursor: pointer;
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
        .curCategory {
          background-color: skyblue;
        }
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
            // display: none;
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
        }
      }
    }
    // 过渡动画开始状态（进入）
    .sort-enter {
      // height: 0px;
      opacity: 0;
      // overflow: hidden;
    }
    // 过渡动画的结束状态（进入）
    .sort-enter-to {
      // height: 1;
      opacity: 1;
      // overflow: hidden;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.3s linear;
    }
    .sort-leave {
      opacity: 1;
    }
    .sort-leave-to {
      opacity: 0;
    }
    .sort-leave-active {
      transition: all 0.1s linear;
    }

    .item-list-leave {
      opacity: 1;
    }
    .item-list-leave-to {
      opacity: 0;
    }
    .item-list-leave-active {
      transition: all 0.1s linear;
    }
  }
}
</style>
