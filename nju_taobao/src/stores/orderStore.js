// src/stores/orderStore.js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useOrderStore = defineStore('Order', () => {
  const OrderList = ref([])

  // 添加订单
  const addOrder = (goods) => {
    OrderList.value.push(goods)
  }

  // 删除指定订单
  const delOrder = (skuId) => {
    const idx = OrderList.value.findIndex((item) => skuId === item.skuId)
    if (idx !== -1) {
      OrderList.value.splice(idx, 1)
    }
  }

  // 清空订单
  const clearOrder = () => {
    OrderList.value = []
  }

  // 单选
  const singleCheck = (skuId, selected) => {
    const item = OrderList.value.find((item) => item.skuId === skuId)
    if (item) item.selected = selected
  }

  // 全选
  const allCheck = (selected) => {
    OrderList.value.forEach(item => item.selected = selected)
  }

  const allCount = computed(() =>
    OrderList.value.reduce((a, c) => {
      const count = parseInt(c.count)
      return a + (isNaN(count) ? 0 : count)
    }, 0)
  )

  // 总价
  const allPrice = computed(() =>
    OrderList.value.reduce((a, c) => a + c.count * c.price, 0)
  )

  // 已选择商品数量
  const selectedCount = computed(() =>
    OrderList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0)
  )

  // 已选择商品总价
  const selectedPrice = computed(() =>
    OrderList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0)
  )

  // 是否全选
  const isAll = computed(() => OrderList.value.every(item => item.selected))

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
    allCheck
  }
}, {
  persist: true // pinia-plugin-persistedstate 支持持久化
})
