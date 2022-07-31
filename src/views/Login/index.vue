<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!-- 表单//提交用户信息 -->
    <van-form @submit="onSubmit" class="form" ref="form">
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
        class="code"
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRule"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            size="mini"
            round
            native-type="button"
            v-if="isShowCode"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="60 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCode = true"
          />
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
import { loginAPI, getCodeAPI } from '@/api'
// 结构赋值
// 数组 [a,b]= ["hello", "hi"] 拥有命名权
// 对象 {name, age:num} = { name :"ls", age :18} 没有命名权，如果想要换名字 直接:再加上新名字
// 对象的连续结构赋值  {friend:{name}} = {name :"ls", friend:{name:"hai"}} 特点就是一层一层的来
export default {
  name: 'login',
  data() {
    return {
      mobile: '18720982024',
      code: '246810',
      mobileRule,
      codeRule,
      isShowCode: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      // 登入的时候捕捉错误的时候可以用try{}catch(){}
      // promise中是有一个回调函数，函数里面有resolve以及reject 成功走resolve 失败走reject
      // axios是基于promise封装的一个请求方式 所以返回的就是一个promise对象
      // res 其实就是 axios封装的对象 也就是promise的resolve的值 把服务器返回的数据放在了res.data里面
      // err 其实就是reject的结果 axios封装的error  error.response.data是服务器返回的数据
      // err.response.status就是服务器返回的状态码
      try {
        this.loading()
        const {
          data: { data }
        } = await loginAPI(this.mobile, this.code)
        // console.log(data)
        // toast轻提示
        this.$store.commit('SET_TOKEN', data)
        // 路由跳转
        this.$router.push('/my')
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
    },
    sendCode() {
      // 1.手机验证 返回的是一个promise对象 .then是成功之后的回调函数
      this.$refs.form.validate('mobile').then(async () => {
        // 显示加载中
        this.loading()
        try {
          // 2.调用接口发送验证码
          // console.log(this.$refs.form)
          const res = await getCodeAPI(this.mobile)
          console.log(res)
          this.$toast.success('验证码已发送')
          // 3. 倒计时显示
          this.isShowCode = false
        } catch (error) {
          console.log(error)
          let message = '手机号码不正确'
          if (error.response.status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
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

.code {
  .van-button--mini {
    padding: 0 0.2rem;
  }
  .van-button--default {
    background: #eee;
    color: #a9929b;
  }
}
</style>
