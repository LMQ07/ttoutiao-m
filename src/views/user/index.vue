<template>
  <div class="user">
    <!-- 头部 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 信息栏 -->
    <div class="message">
      <van-cell title="头像" is-link>
        <template #default>
          <span class="img">
            <img :src="pic" alt="" />
          </span>
        </template>
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :value="nickname"
        @click="nameShow = true"
      />
      <van-cell
        title="性别"
        is-link
        :value="sex == 1 ? '女' : '男'"
        @click="sexShow = true"
      />
      <van-cell
        title="生日"
        is-link
        :value="birthday"
        @click="showTime = true"
      />
    </div>
    <!-- 更新昵称 -->
    <div class="name">
      <van-popup
        v-model="nameShow"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <!-- 导航栏 -->
        <van-nav-bar
          title="更新昵称"
          left-text="取消"
          right-text="保存"
          left-arrow
          @click-left="nameShow = false"
          @click-right="changeUserMsg"
        />
        <!-- 修改名字区域 -->
        <van-field
          v-model="nickname"
          rows="2"
          autosize
          type="textarea"
          maxlength="11"
          placeholder="请输入新的昵称"
          show-word-limit
        />
      </van-popup>
      <!-- 性别 -->
      <!-- 更新性别 -->
      <van-popup v-model="sexShow" position="bottom" :style="{ height: '50%' }">
        <van-picker
          title="更新性别"
          show-toolbar
          :columns="columns"
          @confirm="changeUserSex"
          @cancel="sexShow = false"
      /></van-popup>
      <!-- 时间选择器 -->
      <van-datetime-picker
        v-if="showTime"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="changeDate"
        @cancel="showTime = false"
      />
    </div>
  </div>
</template>

<script>
import { getUserMsgAPI, changeUserMsgAPI } from '@/api'
export default {
  data() {
    return {
      pic: '',
      nickname: '',
      sex: 1,
      birthday: '2022-07-31',
      columns: ['男', '女'],
      minDate: new Date(1990, 1, 1),
      maxDate: new Date(2025, 1, 17),
      currentDate: new Date(2021, 0, 17),
      dateArr: [],
      nameShow: false,
      sexShow: false,
      showTime: false
    }
  },
  created() {
    this.getUserMsg()
    this.getDate()
  },
  methods: {
    async getUserMsg() {
      if (!this.$store.state.tokenObj.token) {
        return this.$toast.fail('获取用户信息失败！')
      }
      const { data: res } = await getUserMsgAPI()
      // console.log(res.data)
      this.pic = res.data.photo
      this.nickname = res.data.name
      this.sex = res.data.gender
      this.birthday = res.data.birthday
      this.dateArr = this.birthday.split('-')
      const [a, b, c] = this.dateArr
      this.currentDate = new Date(a, b - 1, c)
    },
    // 封装一个修改信息的函数
    async changeMsg(obj) {
      const res = await changeUserMsgAPI(obj)
      if (res.status !== 200) {
        return this.$toast.fail('修改信息失败！')
      }
      this.$toast.success('修改信息成功！')
      this.getUserMsg()
    },
    changeUserMsg() {
      this.nameShow = false
      this.changeMsg({ name: this.nickname })
    },
    changeUserSex(_, index) {
      this.sexShow = false
      this.gender = index
      this.changeMsg({ gender: this.gender })
    },
    getDate() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      // console.log(year, month, day)
      this.maxDate = new Date(year, month, day)
    },
    changeDate(value) {
      console.log(value)
      this.showTime = false
      const now = new Date(value)
      const y = now.getFullYear()
      const m = now.getMonth() + 1
      const d = now.getDate()
      this.changeMsg({
        birthday: `${y}-${m}-${d}`
      })
    }
  }
}
</script>

<style scoped lang="less">
.user {
  :deep(.van-nav-bar) {
    background-color: #3296fa;
  }
  :deep(.van-icon) {
    color: white;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .message {
    :deep(.van-icon) {
      color: #969799;
    }
  }
  .img {
    display: inline-block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #dcdee0;
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
.name {
  :deep(.van-nav-bar__title) {
    color: black;
  }
  :deep(.van-nav-bar) {
    background-color: #fff;
  }
  :deep(.van-icon) {
    color: #1989fa;
  }
}
</style>
