<script setup>
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore'
const cartStore = useCartStore()
const orderStore = useOrderStore()

// 单选回调
const singleCheck = (i, selected) => {
  console.log(i, selected)
  cartStore.singleCheck(i.skuId, selected)
}

const allCheck = (selected) => {
  cartStore.allCheck(selected)
}

const handleClear = () => {
  orderStore.clearOrder()
}
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
                <th width="500">商品信息</th>
                <th width="220">单价</th>
                <th width="220">数量</th>
                <th width="180">小计</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in orderStore.OrderList.filter(i => i.name && i.picture && i.price && i.count)" :key="i.skuId">
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="i.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ i.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ parseFloat(i.price).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>{{ parseInt(i.count) }}</p>
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (parseFloat(i.price) * parseInt(i.count)).toFixed(2) }}</p>
              </td>
            </tr>
            <tr v-if="orderStore.OrderList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="订单列表为空">
                    <el-button type="primary">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ orderStore.allCount }} 件商品，商品合计：
          <span class="red">¥ {{ orderStore.selectedPrice.toFixed(2) }} </span>
        </div>
        <el-button type="danger" @click="handleClear">清空订单</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
  margin-top: 20px;

  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;

    a {
      color: $xtxColor;
    }

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: $priceColor;
  }

  .green {
    color: $xtxColor;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 60px;
      height: 60px;
    }

    >div {
      width: 350px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }
}
</style>
