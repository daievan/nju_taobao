

// import { defineStore } from 'pinia'
// import { computed, ref } from 'vue'
// export const useOrderStore = defineStore('order', () => {
//     const orderList =ref([])
//     const addOrder =  (order) => {
//         orderList.value.push(order)
//     }

//   return {
//     orderList,
//     addOrder,
//   }
// }, {
//   persist: true,
// })

// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useOrderStore = defineStore('Order', () => {
    const OrderList = ref([])
  const addOrder =  (goods) => {
      OrderList.value.push(goods)
  }

  const delOrder =  (skuId) => {
    const idx = OrderList.value.findIndex((item) => skuId === item.skuId)
    console.log(idx)
    console.log(skuId)
    //console.log(item.skuId)
    OrderList.value.splice(idx, 1)
  }

  // 清除购物车
  const clearOrder = () => {
    OrderList.value = []
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
    // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
    const item = OrderList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选功能
  const allCheck = (selected) => {
    // 把OrderList中的每一项的selected都设置为当前的全选框状态
    OrderList.value.forEach(item => item.selected = selected)
  }

  // 计算属性
  // 1. 总的数量 所有项的count之和
  const allCount = computed(() => OrderList.value.reduce((a, c) => a + c.count, 0))
  // 2. 总价 所有项的count*price之和
  const allPrice = computed(() => OrderList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 3. 已选择数量
  const selectedCount = computed(() => OrderList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 4. 已选择商品价钱合计
  const selectedPrice = computed(() => OrderList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  const isAll = computed(() => OrderList.value.every((item) => item.selected))

  return {
    OrderList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    clearOrder,
    addOrder,
    delOrder,
    singleCheck,
    allCheck,
  }
}, {
  persist: true,
})