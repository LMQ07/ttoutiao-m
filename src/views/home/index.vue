<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          class="search-btn"
          round
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 文章 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in mychannels" :key="item.id" :title="item.name">
        <Articlelist :id="item.id"></Articlelist>
      </van-tab>
      <div class="icon" @click="show = true">
        <span class="toutiao toutiao-gengduo1"></span>
      </div>
    </van-tabs>

    <!-- 频道弹层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <!--   @close="show = false" 自定义事件 -->
      <ChannelPopup
        :userChannelList="mychannels"
        :allChannelList="allChannels"
        @close="changeActive"
        @add="addChannel"
        @remove="removeChannel"
      ></ChannelPopup>
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannelAPI,
  getAllChannelAPI,
  getMyChannelByLocal,
  removeChannelAPI,
  addChannelAPI,
  setMyChannelsToLocal
} from '@/api'
import Articlelist from './components/ArticleList.vue'
import ChannelPopup from './components/ChannelPopup.vue'
// $event 模板
// - 原生事件： 事件对象
// - 自定义事件当中 :子组件传递过来的第一个参数
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      mychannels: [],
      allChannels: [],
      show: false
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  components: {
    Articlelist,
    ChannelPopup
  },
  created() {
    // this.getMyChannel()
    this.initMyChannels()
    this.getAllChannel()
  },
  methods: {
    // initmychannels 判断用户是否登录了
    initMyChannels() {
      if (this.isLogin) {
        this.getMyChannel()
      } else {
        const localArr = getMyChannelByLocal()
        if (localArr) {
          this.mychannels = localArr
        } else {
          this.getMyChannel()
        }
      }
    },
    // 获得自己的频道
    async getMyChannel() {
      try {
        const { data: res } = await getMyChannelAPI()
        this.mychannels = res.data.channels
      } catch (error) {
        console.log(error)
        this.$toast.fail('数据请求失败，请刷新')
      }
    },
    // 获取所有的频道
    async getAllChannel() {
      try {
        const { data: res } = await getAllChannelAPI()
        this.allChannels = res.data.channels
      } catch (error) {
        this.$toast.fail('数据请求失败，请刷新')
      }
    },
    // 自定义的事件 给到弹框所需要的， 首先关闭弹出层 然后将active的值进行修改一下
    changeActive(index) {
      this.show = false
      this.active = index
    },
    // 添加频道
    async addChannel(item) {
      try {
        if (this.isLogin) {
          await addChannelAPI({
            id: item.id,
            seq: this.mychannels.length
          })
          this.mychannels.push(item)
        } else {
          setMyChannelsToLocal([...this.mychannels, item])
        }
      } catch {
        this.$toast.fail('添加频道失败！')
      }
    },
    // 删除频道
    async removeChannel(id, index) {
      this.$toast.loading({
        message: '删除频道ing...',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await removeChannelAPI(id)
        } else {
          this.mychannels.splice(index, 1)
          setMyChannelsToLocal(this.mychannels)
        }
        this.mychannels.splice(index, 1)
        this.$toast.success('删除频道成功')
      } catch (error) {
        // console.log(error)
        this.$toast.fail(error.response.data.message)
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  position: sticky;
  left: 0;
  top: 0;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  left: 0;
  top: 92px;
  z-index: 99;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.icon {
  position: fixed;
  top: 92px;
  right: 0;
  width: 66px;
  height: 87px;
  background-color: #fff;
  text-align: center;
  z-index: 222;
  .toutiao-gengduo1 {
    width: 66px;
    height: 82px;
    font-size: 40px;
    line-height: 82px;
    text-align: center;
    opacity: 0.6;
    border-bottom: 1px solid #eee;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 70%;
      width: 1px;
      background-image: url('~@/assets/img/gradient-gray-line.png');
    }
  }
}

// .van-tab__pane {
//   // 符号的两侧必须由空格
//   min-height: calc(100vh - 92px - 88px - 100px);
// }
// 滚动条的处理
:deep(.van-tabs__content) {
  // 符号的两侧必须由空格 给出的是最大的高度，这样就不会撑开body 这样body就不会有滚动条
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  // 内容超出的时候就显示滚动条 而且滚动条就是在文章区域
  overflow: auto;
}
</style>
