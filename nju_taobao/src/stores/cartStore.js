// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
  const addCart = async (goods) => {
    
    const { skuId, count } = goods
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
        // 找到了
      console.log(item.count)
      console.log(goods.count)
      item.count+=goods.count
    } else {
        // 没找到
      cartList.value.push(goods)
    }
  }

  // 删除购物车
  const delCart = async (skuId) => {
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    console.log(idx)
    console.log(skuId)
    //console.log(item.skuId)
    cartList.value.splice(idx, 1)
  }

  // 清除购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
    // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选功能
  const allCheck = (selected) => {
    // 把cartList中的每一项的selected都设置为当前的全选框状态
    cartList.value.forEach(item => item.selected = selected)
  }

  // 计算属性
  // 1. 总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2. 总价 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 3. 已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 4. 已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    clearCart,
    addCart,
    delCart,
    singleCheck,
    allCheck,
  }
}, {
  persist: true,
})