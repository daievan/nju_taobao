
<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li class="home">
      <a href="#">天猫</a>
    </li>
    <li class="home">
      <a href="#">聚划算</a>
    </li>
    <li class="home">
      <a href="#">天猫超市</a>
    </li>
    <li class="home">
      <a href="#">飞猪旅行</a>
    </li>
    <li class="home">
      <a href="#">天天热卖</a>
    </li>

    <li class="home">
      <a href="#">淘宝直播</a>
    </li> 
    
  </ul>
</template>


<style lang="scss">
.app-header-nav {
  //width: 760px;
  display: flex;
  padding-left: 20px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 30px;
    //width: 65px;
    text-align: center;

    a {
      font-size: 15px;
      //line-height: 32px;
      //height: 32px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>