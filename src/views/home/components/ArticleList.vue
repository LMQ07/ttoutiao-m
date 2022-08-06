<template>
  <!-- loading 可以解决触底的时候多次触发事件 当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true -->
  <!--数据更新完毕后，将 loading 设置成 false 即可  -->
  <van-pull-refresh
    v-model="refreshLoading"
    @refresh="loadNextPageList"
    success-text="刷新成功"
  >
    <van-list
      v-model="loading"
      @load="loadNextPageList"
      :immediate-check="false"
      offset="0"
      :finished="finished"
      finished-text="没有更多文章了~"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <articleItem
        v-for="item in articleList"
        :key="item.art_id"
        :articleInfo="item"
        @click.native="
          $router.push({ path: '/detail', query: { articleId: item.art_id } })
        "
      ></articleItem>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { getArticleListAPI, getNewsDetailAPI } from '@/api'
import articleItem from '@/components/articleItem.vue'
export default {
  name: 'ArticleList',
  components: {
    articleItem
  },
  props: {
    id: {
      // 接受的类型可以直接用数组来表示
      typeof: [String, Number],
      require: true
    }
  },
  data() {
    return {
      loading: false,
      articleList: [],
      timeStamp: '',
      finished: false,
      error: false,
      refreshLoading: false,
      passageObj: {}
    }
  },
  created() {
    this.getFirstPageDate()
  },
  methods: {
    // 加载第一页数据
    async getFirstPageDate() {
      try {
        const { data: res } = await getArticleListAPI(this.id, +new Date())
        // console.log(res)
        this.articleList = res.data.results
        this.timeStamp = res.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('获取数据失败，请刷新！')
      }
    },
    // 加载后面的数据
    async loadNextPageList() {
      // 数据加载的操作： 首先先加载数据 然后找一个可以判断数据加载完毕的条件 其次 如果出现错误的时候需要在
      // catch部分捕捉到错误，并且进行相应的操作
      // finally 中的就是不论成功还是失败后都会执行的一步操作
      try {
        // console.log(a)
        const { data: res } = await getArticleListAPI(this.id, this.timeStamp)
        // 判断数据是否加载完毕
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
        // 判断一下是下拉刷新 还是上拉刷线
        if (this.refreshLoading) {
          this.articleList.unshift(...res.data.results)
        } else {
          this.articleList.push(...res.data.results)
        }
        // this.articleList = [...this.articleList, ...res.data.results]
        // this.loading = false
        this.timeStamp = res.data.pre_timestamp
      } catch {
        this.error = true
        // this.loading = false
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    },
    // 获取文章信息
    async getDetail(id) {
      try {
        const { data: res } = await getNewsDetailAPI(id)
        // console.log(res)
        this.passageObj = res.data
      } catch (error) {
        this.$toast.fail('获取文章数据失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-list {
  .van-cell::after {
    border-bottom: none;
  }
}
</style>
