<script setup>


const bannerList = [
        {
          id: 1,
          imageUrl: "https://img.alicdn.com/imgextra/i4/6000000002691/O1CN019xx87z1VkWekL3EA4_!!6000000002691-0-octopus.jpg"
        },
        {
          id: 2,
          imageUrl: "https://img.alicdn.com/imgextra/i2/6000000001603/O1CN01691BNZ1NiDjeNyNvM_!!6000000001603-0-octopus.jpg"
        },
        {
          id: 3,
          imageUrl: "https://img.alicdn.com/imgextra/i4/6000000001861/O1CN014DmJWY1PcNv9q5wfF_!!6000000001861-0-octopus.jpg"
        },
        {
          id: 4,
          imageUrl: "https://img.alicdn.com/imgextra/i3/6000000003871/O1CN012WhYrx1eSy0u7uCX0_!!6000000003871-0-octopus.jpg"
        },
        {
          id: 5,
          imageUrl: "https://img.alicdn.com/imgextra/i3/6000000003258/O1CN01g1b7it1ZwDE2blqCJ_!!6000000003258-0-octopus.jpg"
        }
      ]



</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.index">
        <img :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  img {
    width: 100%;
    height: 500px;
  }
}
</style>