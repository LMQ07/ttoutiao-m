<template>
  <div>
    <!-- 头部区域 -->
    <header>
      <!-- 登录的盒子 -->
      <div class="login" v-if="isLogin">111</div>
      <!-- 未登录的盒子 -->
      <div class="logout" v-else>222</div>
    </header>
    <!-- 中间 -->
    <main>
      <!-- 历史收藏消息通知 -->
      中间区域
    </main>
    <!-- 底部 -->
    <footer>
      <!-- 退出按钮 -->
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     isLogin: !!this.$store.state.tokenObj.token
  //   }
  // }
  computed: {
    isLogin() {
      // 一个！是取反 两个！！ 是转换成布尔值
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      // this.$store.commit('SET_TOKEN', {})
      this.$store.commit('REMOVE_TOKEN')
    }
  }
}
</script>

<style></style>
