<template>
  <div class="popup">
    <!-- 我的频道 -->
    <!-- 动态绑定类型 :class="{类名 ： 布尔值}" -->
    <van-cell title="我的频道">
      <!-- 默认插槽 -->
      <van-button size="small" round class="edit" @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid gutter="0.15rem">
      <van-grid-item
        v-for="(item, index) in userChannelList"
        :key="item.id"
        :text="item.name"
        class="myChannel"
        @click="changeTabActive(index, item.id)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.id !== 0" />
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
        class="recommend"
      >
        <template #icon>
          <van-icon name="plus" @click="addChannel(item)" />
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false
    }
  },
  props: {
    userChannelList: {
      type: Array,
      default: () => []
    },
    allChannelList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    otherChannelList() {
      // 首先就是先将所有的数据都遍历一遍 然后再根据查找我的频道中是否有 如果有就不需要 如果没有就需要
      // filter 就是筛选符合条件的项目 也就是true
      // some就是将拿到的每一项在我的数组里面去找 如果找到就是真 没找到就是假 这个时候就是需要将假的传输出去
      // 这个时候就需要用到取反 然后就可以拿到假数据的集合
      return this.allChannelList.filter(
        (item) => !this.userChannelList.some((my) => my.id === item.id)
      )
    }
  },
  methods: {
    // 由于是点击盒子的时候需要删除 所以不给icon加事件
    // 删除频道
    // // 添加频道
    async addChannel(item) {
      this.$emit('add', item)
    },
    //  根据是否处于编辑状态 然后再判断是删除 还是其他操作
    // 编辑状态： 删除频道的操作
    // 完成状态： 关闭弹出层 同时tab栏切换
    changeTabActive(index, id) {
      if (!this.isEdit) {
        // this.$parent.$parent.show = false
        // 触发自定义事件
        this.$emit('close', index)
      } else {
        // 但是需要注意如果是推荐的话就不能删除
        if (index === 0) {
          return
        }
        this.$emit('remove', id, index)
      }
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
        font-size: 30px;
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
