<template>
  <div class="user">
    <!-- 头部 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 信息栏 -->
    <div class="message">
      <!-- 用户选择文件的表单 -->
      <!-- input type="file"的属性 -->
      <!-- accept：显示file选择的文件后缀名规定用户只能上传什么格式的图片，hidden：隐藏  input：file-->
      <!-- ref可以获取到这个按钮本身 -->
      <van-cell title="头像" is-link @click="$refs.file.click()">
        <van-image round width="0.8rem" height="0.8rem" :src="pic" />
        <!-- 当input框发现变化的时候 -->
        <input
          type="file"
          hidden
          accept=".png,.jfif,.webp,.jpeg"
          ref="file"
          @change="selectPhoto"
        />
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
          :default-index="sex"
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
    <!-- 头像弹出层 -->
    <van-popup
      v-model="showPopup"
      closeable
      :style="{ height: '100%', width: '100%' }"
      position="bottom"
      class="popup"
    >
      <userAvantor
        @updatePhoto="pic = $event"
        :imgUrl="imgUrl"
        v-if="showPopup"
      ></userAvantor>
    </van-popup>
  </div>
</template>

<script>
import userAvantor from './components/userAvantor.vue'
import { getUserMsgAPI, changeUserMsgAPI } from '@/api'
import { getPhotoBase64 } from '@/utils/photo'
export default {
  components: { userAvantor },
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
      showTime: false,
      mypicShow: false,
      showPopup: false,
      imgUrl: ''
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
      this.dateArr = this.birthday && this.birthday.split('-')
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
    },
    // 选择用户的图片对象
    async selectPhoto(e) {
      // 1.获取用户选择的图片的文件对象
      // e.target 触发事件的元素
      // HTMLInputElement.files[0] 伪元素，存储的用户选择的图片
      // console.dir(this.$refs.file)
      const file = e.target.files[0]
      // 把file文件对象处理成img标签可以识别的URl
      // window.URL.createObjectURL(file对象) 可以转换成img标签可识别格式
      // 这个方式会造成内存泄漏 是于document绑定一起 同生共死 你死我也死 你不死 我也不死
      // const url = window.URL.createObjectURL(file)
      // FileReader window身上的内置属性 用于处理成base64的格式 readAsDataURL()
      // // 先创建一个实例对象
      // const fr = new FileReader()
      // // 使用这个对象身上的方法读取文件中的内容
      // fr.readAsDataURL(file)
      // // 由于这个读取事件是异步的，所以需要用箭头函数去进行操作
      // fr.onload = (e) => {
      //   this.imgUrl = e.target.result
      // }
      // console.log(url)
      // 3.传递url
      // this.imgUrl = url
      // 清空value 可以让用户选择同一张图片 因为我们就是只绑定了change事件 如果没清空 选择同一张就没有改变
      const url = await getPhotoBase64(file)
      this.imgUrl = url
      e.target.value = ''
      // 头像弹出层显示
      this.showPopup = true
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
.popup {
  background-color: #000;
}
</style>
