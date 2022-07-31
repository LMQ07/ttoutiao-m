<template>
  <div class="top">
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <!-- route 开启路由模式 -->
    <!-- 拿到path 和每一个 tabbaritem的to属性对比 一致就高亮-->
    <van-tabbar route>
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="item.to"
      >
        <template>
          <span :class="`toutiao ${item.icon}`"></span>
          <span>{{ item.text }}</span>
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/video">
        <template>
          <span class="toutiao toutiao-shipin"></span>
          <span>视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template>
          <span class="toutiao toutiao-wenda"></span>
          <span>问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template>
          <span class="toutiao toutiao-wode"></span>
          <span>我的</span>
        </template>
      </van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 底部导航的数据
      tabbarData: [
        {
          to: '/ ',
          icon: 'toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/video',
          icon: 'toutiao-shipin',
          text: '视频'
        },
        {
          to: '/qa',
          icon: 'toutiao-wenda',
          text: '问答'
        },
        {
          to: '/my',
          icon: 'toutiao-wode',
          text: '我的'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
.top {
  height: 100%;
}
:deep(.van-tabbar-item__text) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  font-size: 30px;
  .toutiao {
    font-size: 40px;
  }
}
</style>
