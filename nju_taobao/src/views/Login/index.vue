<template>
  <div class="auth-container">
    <h2>{{ isRegister ? "用户注册" : "用户登录" }}</h2>

    <div class="field">
      <label>用户名：</label>
      <input v-model.trim="username" type="text" placeholder="输入用户名" />
    </div>

    <div class="field">
      <label>密码：</label>
      <input v-model="password" type="password" placeholder="输入密码" />
    </div>

    <div class="field" v-if="isRegister">
      <label>确认密码：</label>
      <input v-model="confirmPassword" type="password" placeholder="再次输入密码" />
    </div>

    <p class="error" v-if="errorMsg">{{ errorMsg }}</p>

    <button class="submit-btn" @click="isRegister ? handleRegister() : handleLogin()">
      {{ isRegister ? "注册" : "登录" }}
    </button>

    <p class="toggle">
      <span v-if="isRegister">
        已有账号？
        <a @click="toggleMode">去登录</a>
      </span>
      <span v-else>
        没有账号？
        <a @click="toggleMode">去注册</a>
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isRegister = ref(false)
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')

const router = useRouter()

// 切换“登录/注册”模式
const toggleMode = () => {
  isRegister.value = !isRegister.value
  errorMsg.value = ''
}

// 注册逻辑
const handleRegister = () => {
  if (!username.value || !password.value || !confirmPassword.value) {
    errorMsg.value = '请填写完整信息'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = '两次密码不一致'
    return
  }
  // 简单密码规则：≥6位 + 含字母 + 含数字
  const hasLetter = /[a-zA-Z]/.test(password.value)
  const hasDigit = /\d/.test(password.value)
  if (password.value.length < 6 || !hasLetter || !hasDigit) {
    errorMsg.value = '密码需 ≥6位，并包含字母数字'
    return
  }

  const userDB = JSON.parse(localStorage.getItem('userDB') || '[]')
  const isExist = userDB.find(u => u.username === username.value)
  if (isExist) {
    errorMsg.value = '该用户名已注册'
    return
  }

  userDB.push({
    username: username.value,
    password: password.value
  })
  localStorage.setItem('userDB', JSON.stringify(userDB))
  alert('注册成功，请登录！')
  // 切回登录模式并清空输入
  isRegister.value = false
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
  errorMsg.value = ''
}

// 登录逻辑
const handleLogin = () => {
  if (!username.value || !password.value) {
    errorMsg.value = '请填写用户名和密码'
    return
  }
  const userDB = JSON.parse(localStorage.getItem('userDB') || '[]')
  const user = userDB.find(u => u.username === username.value)
  if (!user) {
    errorMsg.value = '该用户不存在，请先注册'
    return
  }
  if (user.password !== password.value) {
    errorMsg.value = '密码错误'
    return
  }
  // 登录成功：本地记录
  localStorage.setItem('loggedUser', user.username)
  alert('登录成功')
  router.push('/')  // 跳转首页
}
</script>

<style scoped lang="scss">
.auth-container {
  width: 400px;
  margin: 60px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.field {
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  label {
    width: 100px;
    color: #666;
    text-align: right;
    margin-right: 10px;
  }

  input {
    flex: 1;
    padding: 8px;
    font-size: 14px;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 4px;

    &::placeholder {
      color: rgba(0,0,0,0.3);
    }
  }
}

.error {
  color: red;
  margin: 10px 0;
}

.submit-btn {
  padding: 10px 30px;
  background-color: #ff6600;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #ff8533;
  }
}

.toggle {
  margin-top: 20px;
  a {
    color: #ff6600;
    margin-left: 5px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
