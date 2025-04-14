<template>
  <div class="search-box">
    <input
      type="text"
      v-model="keyword"
      @input="handleInput"
      @keydown.enter="handleEnter"
      placeholder="请输入商品关键词..."
    />
    <ul v-if="suggestions.length">
      <li
        v-for="item in suggestions"
        :key="item.id"
        @click="selectSuggestion(item)"
      >
        {{ item.char1 }}{{ item.char2 }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { goodlist } from '@/data/goodlist.js'; 

const keyword = ref('');
const suggestions = ref([]);
const router = useRouter();

// 防抖函数（简单实现）
let timer = null;
const debounce = (fn, delay) => {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

// 搜索匹配联想建议
const fetchSuggestions = () => {
  const query = keyword.value.trim().toLowerCase();
  if (!query) {
    suggestions.value = [];
    return;
  }
  suggestions.value = goodlist.filter(item =>
    (item.char1 + item.char2).toLowerCase().includes(query)
  );
};

// 处理输入（加防抖）
const handleInput = debounce(fetchSuggestions, 300);

// 选择某项联想词后跳转
const selectSuggestion = (item) => {
  keyword.value = item.char1 + item.char2;
  suggestions.value = [];
  router.push({ path: '/search', query: { keyword: keyword.value } });
};

// 回车直接跳转（不依赖建议）
const handleEnter = () => {
  if (!keyword.value.trim()) return;
  suggestions.value = [];
  router.push({ path: '/search', query: { keyword: keyword.value } });
};
</script>

<style scoped>
.search-box {
  position: relative;
  width: 300px;
}
.search-box input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.search-box ul {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 10;
}
.search-box li {
  padding: 8px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.search-box li:hover {
  background: #f5f5f5;
}
</style>
