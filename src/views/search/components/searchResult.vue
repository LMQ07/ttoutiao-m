<template>
  <div class="box">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getMoreSearch"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(item, index) in resultList"
        :key="index"
        :title="item.title"
        @click="getPassageDetail(item.id)"
      />
    </van-list>
  </div>
</template>

<script>
// 搜索
import { getSearchResultAPI } from '@/api'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      resultList: [],
      page: 1,
      error: false
    }
  },
  props: {
    keyWords: {
      type: String,
      require: true
    }
  },
  created() {
    this.getFirsetPageSearchResult()
  },
  methods: {
    // 获取文章的详情
    getPassageDetail(id) {},
    // 获取第一页搜索结果
    async getFirsetPageSearchResult() {
      // 获取搜索结果
      try {
        const { data: res } = await getSearchResultAPI({ q: this.keyWords })
        this.resultList = res.data.results
        this.getMoreSearch()
      } catch {
        this.$toast.fail('获取数据失败！请重试')
      }
    },
    // 加载更多数据
    async getMoreSearch() {
      this.page++
      try {
        const { data: res } = await getSearchResultAPI({
          q: this.keyWords,
          page: this.page
        })
        if (res.data.results.length === 0) {
          return (this.finished = true)
        }
        this.resultList.push(...res.data.results)
      } catch {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-list {
  max-height: calc(100vh - 54px);
  overflow: auto;
}
</style>
