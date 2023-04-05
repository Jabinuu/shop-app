<template>
  <div>
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li v-show="searchQuery.categoryName" class="with-x">
              {{ searchQuery.categoryName
              }}<i @click="removeCategoryBread()">×</i>
            </li>
            <!-- 搜索关键字面包屑 -->
            <li v-show="searchQuery.keyword" class="with-x">
              {{ searchQuery.keyword }}<i @click="removeKeywordBread()">×</i>
            </li>
            <!-- 品牌面包屑 ,这里只能用v-if 因为v-show为false仍然会计算innerHtml，而这时候trademark就是undefined了，所以报错-->
            <li v-if="searchQuery.trademark" class="with-x">
              {{ searchQuery.trademark.split(":")[1]
              }}<i @click="removeTrademarkBread()">×</i>
            </li>
            <!-- 商品属性面包屑 -->
            <li
              v-for="(item, index) in searchQuery.props"
              :key="item.tmId"
              class="with-x"
            >
              {{ item.split(":")[1] }}<i @click="removeAttrBread(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 根据参数来决定哪个参数有active类名，这就需要动态类名 -->
                <li :class="{ active: isComplex }" @click="switchSort('1')">
                  <a href="javascript:;"
                    >综合
                    <span v-show="isComplex">{{ isAsc ? "⬆" : "⬇" }}</span>
                  </a>
                </li>
                <li :class="{ active: isPrice }" @click="switchSort('2')">
                  <a href="javascript:;"
                    >销量
                    <span v-show="isPrice">{{ isAsc ? "⬆" : "⬇" }}</span></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li v-for="item in goodsList" :key="item.id" class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img" @click="goDetail(item.id)">
                    <a href="javascript:void(0);"
                      ><img :src="item.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;&nbsp;</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      href="javascript:void(0);"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="javascript:void(0);"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 开发新功能需要传数据的时候,推荐自己写假数据,而不是直接用接口数据,因为假数据方便测试各种特殊情况 -->
          <GoodsPagination
            :pageNo="searchQuery.pageNo"
            :pageSize="searchQuery.pageSize"
            :total="total"
            :continues="5"
            @pageClick="onPageClick"
          ></GoodsPagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchSelector from "@/pages/Search/SearchSelector";
import { mapGetters } from "vuex";
export default {
  name: "SearchIndex",

  components: {
    SearchSelector,
  },

  props: ["searchWord", "keyword"],

  data() {
    return {
      searchQuery: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:asc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },

  computed: {
    // mapGetters里面的写法：传递的数组，因为getters计算是没有划分子模块[home | search]的
    ...mapGetters(["goodsList", "total"]),

    isComplex() {
      return this.searchQuery.order.includes("1");
    },

    isPrice() {
      return this.searchQuery.order.includes("2");
    },

    isAsc() {
      return this.searchQuery.order.includes("asc");
    },
  },

  watch: {
    // 监听路由变化。。解决不同的路由参数，而组件不渲染的问题
    $route() {
      this.getSearchResult();
    },
  },

  created() {},

  beforeMount() {},

  mounted() {
    this.getSearchResult(); //仅执行一次
  },

  methods: {
    // 向服务器发送请求，得到搜索数据
    getSearchResult() {
      // Object.assign() 合并对象
      this.searchQuery = Object.assign(
        this.searchQuery,
        this.$route.params,
        this.$route.query
      );
      this.$store.dispatch("getSearchResList", this.searchQuery); // 参数2：载荷 就是传递的参数
      // 处理小bug
      this.searchQuery.category1Id = undefined;
      this.searchQuery.category2Id = undefined;
      this.searchQuery.category3Id = undefined;
    },

    removeCategoryBread() {
      this.searchQuery.categoryName = undefined;
      // 删除后, 按删除后剩下的信息再次搜索
      this.$router.push({ name: "searchRouter", params: this.$route.params });
    },

    removeKeywordBread() {
      // 给请求参数只undefined 而不是置空的原因是：置空，此数据名仍存在，发送http请求还是会发送该数据名，
      // 而置undefined，此数据名就不存在了，下次发送http请求就少发一个数据名，从而做到网络优化
      this.searchQuery.keyword = undefined;
      this.$bus.$emit("removeKeyword");
      this.$router.push({ name: "searchRouter", query: this.$route.query });
    },

    removeTrademarkBread() {
      this.searchQuery.trademark = undefined;
      this.getSearchResult(); //再次发起请求
    },

    removeAttrBread(index) {
      this.searchQuery.props.splice(index, 1);
      this.getSearchResult(); //再次发起请求
    },

    tradeMarkInfo(target) {
      this.searchQuery.trademark = `${target.tmId}:${target.tmName}`;
      this.getSearchResult(); //再次发起请求
    },

    attrInfo(attr, attrValue) {
      const info = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if (!this.searchQuery.props.includes(info)) {
        this.searchQuery.props.push(info);
        this.getSearchResult(); // 再次发起请求
      }
    },

    switchSort(flag) {
      const arr = this.searchQuery.order.split(":");
      if (arr[0] === flag) {
        arr[1] = this.isAsc ? "desc" : "asc";
      } else {
        arr[0] = flag;
        arr[1] = "desc";
      }
      this.searchQuery.order = arr.join(":");
      this.getSearchResult();
    },

    onPageClick(pageNo) {
      this.searchQuery.pageNo = pageNo;
      this.getSearchResult();
    },

    goDetail(id) {
      this.$router.push({ name: "detailRouter", params: { skuid: id } });
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                span {
                  font-size: 20px;
                  vertical-align: middle;
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
