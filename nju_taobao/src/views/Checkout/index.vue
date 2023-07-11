<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore'
const cartStore = useCartStore()
const orderStore = useOrderStore()
const router = useRouter()
// 获取结算信息
const curAddress = ref({}) // 默认地址
const AAddress = [
  {
    receiver: "戴攀瞩",
    contact: "181xxxxxxxx",
    fullLocation:"江苏省南京市",
    address:"南京大学仙林校区",
    isDefault:"1"
  },
  {
    receiver: "孙悟空",
    contact: "123xxxxxxxx",
    fullLocation:"江苏省连云港",
    address:"花果山",
    isDefault:"0"
  },
  {
    receiver: "猪八戒",
    contact: "123xxxxxxxx",
    fullLocation:"云南省保山市",
    address:"高老庄",
    isDefault:"0"
  },
  {
    receiver: "林冲",
    contact: "123xxxxxxxx",
    fullLocation:"山东省济宁市",
    address:"梁山",
    isDefault:"0"
  }
]
const activeAddress = ref({})
const getInformation =  () => {
  const item = AAddress.find(item => item.isDefault === "1")
  console.log(item)
  curAddress.value = item

}

onMounted(() => getInformation())
// 控制弹框打开
const showDialog = ref(false)


// 切换地址


const switchAddress = (item) => {
  activeAddress.value = item
}
const confirm = () => {
  curAddress.value = activeAddress.value
  showDialog.value = false
  activeAddress.value = {}
}
const createOrder = () => {
  router.push({
    path: '/',
  })
  //orderStore.clearOrder()
  ElMessage({ type: 'success', message: '支付成功' })
  orderStore.OrderList.push(cartStore.cartList)
  for (let i = 0; i < cartStore.cartList.length; i++) {
    orderStore.OrderList.push(cartStore.cartList[i]);
  }
  console.log(orderStore.OrderList)
  cartStore.clearCart()
}


</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切换地址</el-button>
              <!-- <el-button size="large">添加地址</el-button> -->
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in cartStore.cartList" :key="i">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ (i.price * i.count).toFixed(2) }}</td>
                <td>&yen;{{ (i.price * i.count).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 支付方式 -->
        <!-- <div class="box-body">
          <a class="my-btn active" href="javascript:;">朋友代付</a>
          <a class="my-btn" href="javascript:;">匿名购买</a>
          <span style="color:#999">(隐藏收件人真实手机号，保护隐私)</span>
        </div> -->
        <div>
          <el-checkbox v-model="checked1" label="朋友代付" size="large" />
          <el-checkbox v-model="checked2" label="匿名购买" size="large" />
          <el-checkbox v-model="checked3" label="号码保护" size="large" />
          <span style="color:#999">(隐藏收件人真实手机号，保护隐私)</span>
        </div>
        <!-- 金额明细 -->
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>实付款</dt>
              <dd class="price">￥{{cartStore.allPrice}}</dd>
            </dl>
            <dl>
              <dt>寄送至</dt>
              <dd>{{ curAddress.fullLocation }} {{ curAddress.address }}</dd>
            </dl>
            <dl>
              <dt>收货人</dt>
              <dd>{{ curAddress.receiver }} {{ curAddress.contact }}</dd>
            </dl>

          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="text item"  @click="switchAddress(item)"
        v-for="item in AAddress" :key="item.id">
        <ul>
          <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
<!-- 添加地址 --></template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 220px;
    text-align: center;
    .btn {

      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 24px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 300px;
      text-align: right;
      padding-right: 50px;

      &.price {
        font-size: 30px;
        color: $priceColor;
        padding-bottom: 7px;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>