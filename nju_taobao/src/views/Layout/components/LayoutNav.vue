<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();

// 是否已登录的状态
const isLoggedIn = ref(false);
// 当前登录用户名
const currentUsername = ref('');
// 控制下拉菜单是否显示
const showDropdown = ref(false);

// 组件加载时，从 localStorage 读取登录信息
onMounted(() => {
  const storedUser = localStorage.getItem('loggedUser');
  if (storedUser) {
    isLoggedIn.value = true;
    currentUsername.value = storedUser;
  }
});

// 点击用户区域：
// 如果未登录则跳转登录页；如果已登录则切换下拉菜单显示状态
const toggleUserDropdown = () => {
  if (!isLoggedIn.value) {
    router.push('/login');
  } else {
    showDropdown.value = !showDropdown.value;
  }
};

// 退出登录：清除登录信息，更新状态，并跳转到登录页面
const confirmLogout = () => {
  localStorage.removeItem('loggedUser');
  isLoggedIn.value = false;
  currentUsername.value = '';
  showDropdown.value = false;
  router.push('/login');
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 用户区域 -->
        <li class="user" @click="toggleUserDropdown">
          <span>
            <i class="iconfont icon-user"></i>
            <!-- 已登录显示用户名，否则显示“注册/登录” -->
            {{ isLoggedIn && currentUsername ? currentUsername : '注册/登录' }}
          </span>
          <!-- 下拉菜单：仅当已登录且菜单开关开启时显示 -->
          <ul v-if="showDropdown && isLoggedIn" class="dropdown">
            <li @click.stop="confirmLogout">退出登录</li>
          </ul>
        </li>
        <!-- “我的订单” -->
        <li>
          <RouterLink to="/order">我的订单</RouterLink>
        </li>
        <!-- “会员中心” -->
        <li>
          <a href="javascript:;">会员中心</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
$xtxColor: #ff6600;     // 主题色
$appBg: #333;           // 导航背景色
$textColor: #cdcdcd;     // 导航文字颜色

.app-topnav {
  background: $appBg;
  .container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 53px;
    padding: 0 20px;
  }
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      position: relative;
      margin-left: 20px;
      // 为 a、span、router-link 设置统一样式
      a,
      span,
      router-link {
        color: $textColor;
        text-decoration: none;
        line-height: 53px;
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          color: $xtxColor;
        }
      }
      &.user {
        cursor: pointer;
        .dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: #fff;
          list-style: none;
          padding: 0;
          margin: 0;
          border: 1px solid #ddd;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 9999;
          li {
            display: block;
            padding: 15px 25px;  // 增大点击区域
            margin: 0;
            color: #333;
            white-space: nowrap;
            cursor: pointer;
            min-width: 120px;
            &:hover {
              background: #f5f5f5;
            }
          }
        }
      }
      &:not(:first-child) {
        a {
          border-left: 2px solid #666;
          padding-left: 15px;
        }
      }
    }
  }
}
</style>
