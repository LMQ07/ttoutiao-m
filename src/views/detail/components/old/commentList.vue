<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <listItem
        v-for="item in resultList"
        :key="item.id"
        :item="item"
        @showPopUp="showPopUp"
      >
      </listItem>
      <!-- <van-cell v-for="item in resultList" :key="item.id">
        <template #title>
          <span class="name">{{ item.aut_name }}</span>
          <p class="text">{{ item.content }}</p>
          <p class="replay">
            {{ item.pubdate }}
            <van-button
              size="mini"
              type="default"
              round
              @click="getCommentReplay"
            >
              回复{{ item.replay_count }}
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
      </van-cell> -->
    </van-list>
    <van-popup
      v-model="showPopup"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <listItem :item="popItem"></listItem>
      <van-list
        v-model="commentloading"
        :finished="commentfinished"
        finished-text="没有更多了"
        @load="showPopUp"
      >
        <div v-if="commentList.length !== 0">
          <listItem
            v-for="(item, index) in commentList"
            :key="index"
            :item="item"
          ></listItem>
        </div>
      </van-list>
    </van-popup>
  </div>
</template>

<script>
import { getCommentAPI } from '@/api'
import listItem from '../listItem.vue'

export default {
  name: 'CommentList',
  data() {
    return {
      loading: false,
      finished: false,
      offset: null, // 请求下一页数据的页码
      totalCount: 0, // 总数据条数
      resultList: [],
      showPopup: false,
      popItem: '',
      commentoffset: null,
      commentList: [],
      commenttotalCount: 0,
      commentloading: false,
      commentfinished: false
    }
  },
  components: { listItem },
  props: {
    id: {
      type: String,
      require: true
    }
  },
  computed: {},
  mounted() {
    console.log(this.id)
    this.onLoad()
  },
  methods: {
    async onLoad() {
      const { data: res } = await getCommentAPI({
        type: 'a',
        source: this.id,
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })
      this.resultList.push(...res.data.results)
      this.totalCount = res.data.total_count
      // 3. 将加载更多的 loading 设置为 false
      this.loading = false
      // 4. 判断是否还有数据
      if (res.data.results.length) {
        this.offset = res.data.last_id // 更新获取下一页数据的页码
        this.onLoad()
      } else {
        this.finished = true // 没有数据了，关闭加载更多
      }
      console.log(this.resultList)
    },
    // 展示弹出层
    async showPopUp(item) {
      console.log(item)
      this.popItem = item
      this.showPopup = true
      try {
        //  同时获取当前评论的列表
        const { data: res } = await getCommentAPI({
          type: 'c',
          source: this.popItem.com_id,
          offset: this.commentoffset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 10 // 每页大小
        })
        console.log(res)
        this.commentList.push(...res.data.results)
        this.commenttotalCount = res.data.total_count
        // 3. 将加载更多的 loading 设置为 false
        this.commentloading = false
        // 4. 判断是否还有数据
        if (res.data.results.length) {
          this.commentoffset = res.data.last_id // 更新获取下一页数据的页码
          this.showPopUp()
        } else {
          this.commentfinished = true // 没有数据了，关闭加载更多
        }
      } catch {
        this.$toast.fail('获取数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
