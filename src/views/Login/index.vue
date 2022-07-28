<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!-- 表单//提交用户信息 -->
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRule"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRule"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
      </van-field>
      <div style="margin: 0.2rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRule, codeRule } from './rules'
import { loginAPI } from '@/api'
export default {
  name: 'login',
  data() {
    return {
      mobile: '18720982024',
      code: '246810',
      mobileRule,
      codeRule
    }
  },
  methods: {
    async onSubmit() {
      // 登入的时候捕捉错误的时候可以用try{}catch(){}
      // promise中是有一个回调函数，函数里面有resolve以及reject 成功走resolve 失败走reject
      // axios是基于promise封装的一个请求方式 所以返回的就是一个promise对象
      // res 其实就是 axios封装的对象 也就是promise的resolve的值 把服务器返回的数据放在了res.data里面
      // err 其实就是reject的结果 axios封装的error  error.response.data是服务器返回的数据
      // err.response.status就是服务器返回的状态码
      try {
        const res = await loginAPI(this.mobile, this.code)
        console.log(res)
        // toast轻提示
        this.$toast.success('登入成功')
      } catch (err) {
        // 细分一下错误
        // this.$toast.fail('登入失败')
        const status = err.response.status
        const message = err.response.data.message
        let message2 = '请重新登入'
        if (status === 400) {
          message2 = message
        }
        this.$toast.fail(message2)
      }
    }
  }
}
</script>

<style scoped lang="less">
// 穿透样式 :deep(穿透类名)
.van-nav-bar {
  background-color: #3296fa;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
.van-button--info {
  border: 0;
  margin: auto;
  margin-top: 53px;
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
}
:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}
.toutiao {
  font-size: 40px;
  color: #666;
}
</style>
