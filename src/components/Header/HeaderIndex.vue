<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a href="javascript:">{{ userName }} | </a>
            <a href="javascript:" @click="userLogout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/individual">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link
          :to="{ path: '/home' }"
          class="logo"
          title="尚品汇"
          href="###"
          target="_self"
        >
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderIndex",

  data() {
    return {
      keyword: "",
    };
  },

  computed: {
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },

  mounted() {
    // 响应全局事件总线的事件
    this.$bus.$on("removeKeyword", () => {
      this.keyword = ""; //搜索框清空
    });
  },

  methods: {
    goSearch() {
      // this.$router.push( `/search/${this.keyword}?keyword=${this.keyword.toUpperCase()}`// );
      // 纯字符串路径写法，可以但是麻烦。
      // 一般采用对象传参，当路由中有占位符时，要用到命名路由，以实现动态路由
      this.$router.push({
        /* 如果提供的是path，那么params会被忽略，只能通过自己手写带参数的路径 或者 用name来进行路由匹配（推荐） */
        // path: `/search/${this.keyword}`,
        name: "searchRouter",
        params: {
          // 虽然设置了params可传可不传，但当传了空串''时，还是会出现url缺失的现象，这时候加一个条件判断
          // 如果为''则传一个undefined
          keyword: this.keyword || undefined,
        },
        query: this.$route.query,
      });
    },

    async userLogout() {
      try {
        await this.$store.dispatch("userLogout");
        this.$router.push({ path: "/home" });
      } catch (error) {
        this.$message.error(error.message);
      }
    },
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>