<template>
  <!-- 没有图片的时候渲染的结构 -->
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
  />
  <!-- 一张图片的时候渲染的结构 -->
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    :label="label"
  >
    <template #default>
      <van-image
        width="150px"
        height="75px"
        :src="articleInfo.cover.images[0]"
      />
    </template>
  </van-cell>
  <!-- 三张图片的时候渲染的结构 -->
  <van-cell v-else :title="articleInfo.title" class="pic">
    <template #default>
      <div>
        <div class="img">
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            width="105px"
            height="75px"
            :src="item"
          />
        </div>
        <p class="discribe">{{ label }}</p>
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'articleItem',
  props: {
    articleInfo: {
      type: Object,
      // 首先这边的数据是请求来的数据 如果说请求失败 那么我们这边获得的就是undefined 这样就会报错
      // 如果是对象和数组的默认值，就需要用函数的返回
      default: () => ({})
    }
  },
  computed: {
    label() {
      const a = this.articleInfo
      // 获取的时间间隔
      const b = +new Date() - +new Date(a.pubdate)
      // 将获取的时间间隔变成年份
      const year = Math.floor(b / 1000 / 60 / 60 / 24 / 365)
      return `${a.aut_name} ${a.comm_count}评论  ${year}年前`
    }
  }
}
</script>

<style lang="less" scoped>
.img {
  display: flex;
  justify-content: space-around;
  .van-image__img {
    flex: 1;
  }
}
.pic {
  flex-direction: column;
  .van-cell__value {
    text-align: left;
  }
  .van-cell__value {
    margin-top: 0.10667rem;
  }
}
.van-cell__title {
  span {
    font-size: 0.42667rem;
  }
  .van-cell__label {
    font-size: 0.37333rem;
  }
}
</style>
