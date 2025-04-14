<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">首页</RouterLink>
      </h1>

      <LayoutHeaderUl />
      
      <!-- 替换搜索框：使用单独的组件 -->
      <SearchBox @search="handleSearch" />

      <!-- 原先的搜索按钮可以省略，或者用于手动触发搜索 -->
      <!-- <button class="Search" @click="handleSearch">搜索</button> -->
      
      <!-- 头部购物车 -->
      <HeaderCart />
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import LayoutHeaderUl from './LayoutHeaderUl.vue';
import HeaderCart from './HeaderCart.vue';
import SearchBox from './SearchBox.vue';

const router = useRouter();
const keyword = ref('');

// 搜索处理函数：作为 SearchBox 组件的事件处理器
const handleSearch = (searchKey) => {
  if (!searchKey.trim()) return;
  // 更新全局搜索关键词状态（如果使用 Vuex/Pinia，可以在这里设置）
  router.push({ path: '/search', query: { keyword: searchKey } });
};
</script>

<style scoped lang="scss">
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

  /* 原有的 .search 部分不用了，SearchBox 组件内部处理样式 */

  .Search {
    width: 40px;
    height: 31px;
    margin-right: 30px;
    font-size: 13px;
    color: white;
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
