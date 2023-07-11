<script>
export default {
    data() {
    return {
      keyword:'',
    };
  },
  methods: {
    handleSearch() {
      //console.log(this.keyword);
      const query = { keyword: this.keyword };

      // 导航到新页面
      this.$router.push({ path: '/search', query });
    },
  },
}
</script>


<script setup>
import LayoutHeaderUl from './LayoutHeaderUl.vue'
import HeaderCart from './HeaderCart.vue'
</script>

<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/"></RouterLink>
      </h1>

      <LayoutHeaderUl />
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="淘宝网上商城" v-model="keyword">
      </div>
      <div>
        <button class="Search" @click="handleSearch">搜索</button>
      </div>
      <!-- 头部购物车 -->
      <HeaderCart />
    </div>
</header>
</template>


<style scoped lang='scss'>
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }


  .search {
    margin-left:30px;
    display: flex;
    width: 250px;
    height: 32px;
    position: relative;
    border: 1px solid red;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 240px;
      padding-left: 5px;
      color: #666;
    }
  }

  .Search {
    width:40px;
    height:31px;
    margin-right:30px;
    font-size: 13px;
    color:white;
    background-color: red;
    border: 1px solid red;
  }
  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>