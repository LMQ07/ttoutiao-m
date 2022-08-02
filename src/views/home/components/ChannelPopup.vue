<template>
  <div class="popup">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <!-- 默认插槽 -->
      <van-button size="small" round class="edit" @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid gutter="0.15rem">
      <van-grid-item
        v-for="item in userChannelList"
        :key="item.id"
        :text="item.name"
        class="myChannel"
      >
        <template #icon>
          <van-icon
            name="cross"
            v-show="isEdit && item.id !== 0"
            @click="delectChannel(item.id)"
          />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.15rem">
      <van-grid-item
        v-for="item in otherChannelList"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend"
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getMyChannelAPI, getAllChannelAPI, removeChannelAPI } from '@/api'
export default {
  data() {
    return {
      userChannelList: [],
      otherChannelList: [],
      isEdit: false
    }
  },
  created() {
    this.getUserChannelList()
  },
  methods: {
    // 获取用户的频道列表
    async getUserChannelList() {
      try {
        const { data: res } = await getMyChannelAPI()
        console.log(res)
        this.userChannelList = res.data.channels
        this.getOtherChannel()
      } catch (error) {
        this.$toast.fail('获取数据失败！')
      }
    },
    // 获取所有的数据并且把数据处理一下
    async getOtherChannel() {
      const { data: res } = await getAllChannelAPI()
      // console.log(res)
      const allChannel = res.data.channels
      allChannel.filter((items) => {
        if (!this.userChannelList.find((item) => item.id === items.id)) {
          this.otherChannelList.push(items)
        }
        return this.otherChannelList
      })
      console.log(this.otherChannelList)
    },
    // 删除频道
    async delectChannel(id) {
      await removeChannelAPI(id)
      // console.log(response.status)
      this.getUserChannelList()
    }
  }
}
</script>

<style scoped lang="less">
.popup {
  padding-top: 1.33333rem;
  .edit {
    min-width: 1.38667rem;
    height: 0.64rem;
    border-color: red;
    color: red;
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .recommend {
    width: 2.33333rem;
    height: 1.14667rem;
    :deep(.van-grid-item__content) {
      flex-direction: row;
      .van-grid-item__icon {
        font-size: 36px;
      }
      .van-grid-item__icon + .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
  .myChannel {
    position: relative;
    width: 2.33333rem;
    height: 1.14667rem;
    &.van-grid-item:nth-child(1) :deep(.van-grid-item__text) {
      color: red;
    }
    :deep(.van-grid-item__content) {
      flex-direction: row;
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .van-icon-cross {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 30px;
        transform: translate(30%, -50%);
        border: 2px solid #000;
        border-radius: 50%;
        z-index: 300;
      }

      // .van-icon {
      //   font-size: 36px;
      //   position: absolute;
      //   top: 0;
      //   right: 0;
      //   transform: translate(20%, -35%);
      //   border-radius: 50%;
      //   text-align: center;
      //   line-height: 0.32rem;
      //   border: 0.02667rem solid #000;
      // }
      .van-grid-item__icon + .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
