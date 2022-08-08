<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    class="commentList"
  >
    <van-cell v-for="(item, index) in list" :key="index">
      <template #title>
        <span class="name">{{ item.aut_name }}</span>
        <p class="text">{{ item.content }}</p>
        <p class="replay">
          {{ item.pubdate | reaTime }}
          <van-button
            size="mini"
            type="default"
            round
            @click="getCommentReplay(item)"
          >
            回复{{ item.reply_count }}
          </van-button>
        </p>
      </template>
      <template>
        <van-icon name="good-job-o" />
        <span>赞</span>
      </template>
      <template #icon>
        <img :src="item.aut_photo" alt="" class="avantor" />
      </template>
    </van-cell>
  </van-list>
</template>

<script>
import { getCommentAPI } from '@/api'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      totalNumber: 0
    }
  },
  props: {
    type: {
      type: String,
      require: true
    },
    source: {
      type: String,
      require: true
    }
  },
  // created() {
  //   this.onLoad()
  // },
  methods: {
    async onLoad() {
      console.log(this.source)
      const { data: res } = await getCommentAPI({
        type: this.type,
        source: this.source,
        offset: this.offset,
        limit: 10
      })
      console.log(res)
      this.list.push(...res.data.results)
      this.totalNumber = res.data.total_count
      this.loading = false
      if (res.data.results.length) {
        this.offset = res.data.last_id // 更新获取下一页数据的页码
        this.onLoad()
      } else {
        this.finished = true // 没有数据了，关闭加载更多
      }
    },
    // 获取回复列表的弹出层
    getCommentReplay(item) {
      this.$parent.replayList = true
      this.$parent.create = true
      this.$parent.replayItem = item
      console.log(item)
    }
  }
}
</script>

<style scoped lang="less">
.commentList {
  :deep(.van-icon) {
    margin-left: 15px;
  }
  .avantor {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
  :deep(.van-cell__title) {
    display: flex;
    flex-direction: column;
    .name {
      color: rgb(70, 107, 157);
    }
    .text {
      margin-top: 0;
      margin-bottom: 0.42667rem;
    }
    .replay {
      color: #969799;
      font-size: 0.25rem;
      line-height: 0.48rem;
      display: flex;
      align-items: center;
    }
  }
  :deep(.van-button--round) {
    width: 2.2rem;
    height: 0.64rem;
    line-height: 0.64rem;
    font-size: 0.28rem;
    color: #222;
    margin: 0 15px;
  }
}
</style>
