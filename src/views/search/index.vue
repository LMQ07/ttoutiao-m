<template>
  <div>
    <!-- 搜索框 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model.trim="keyWords"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
        class="search"
        @search="onSearch"
        @focus="onFocus"
      ></van-search>
    </form>

    <!-- 搜索结果/联想/历史 -->
    <!-- <searchSuggestion></searchSuggestion>
    <searchResult></searchResult>
    <searchHistory></searchHistory> -->
    <!-- 动态渲染组件 根据is里面的内容 然后动态选择组件进行渲染-->
    <component :is="componentName" :keyWords="keyWords"></component>
  </div>
</template>

<script>
// 引入三个组件
import searchResult from './components/searchResult.vue'
import searchHistory from './components/searchHistory.vue'
import searchSuggestion from './components/searchSuggestion.vue'

export default {
  name: 'Search',
  data() {
    return {
      keyWords: '',
      // 判断用户是否在搜索
      isSearch: false
    }
  },
  computed: {
    // 当任何其中一个依赖性进行修改的时候，都会重新开始计算，所以只需要在聚焦的时候
    // 修改一下this.isSearch的值
    componentName() {
      if (this.keyWords === '') {
        // 当用户刚进入页面并且搜索词为空的时候
        return 'searchHistory'
      }
      if (this.isSearch) {
        // 当用户已经处于搜索状态的时候
        return 'searchResult'
      }
      // 当用户已经只是输入 但是没有搜索
      return 'searchSuggestion'
    }
  },
  components: { searchResult, searchHistory, searchSuggestion },
  methods: {
    // 取消按钮的事件
    onCancel() {
      this.$router.back()
    },
    // 搜索功能
    onSearch() {
      this.isSearch = true
      console.log('qqq')
    },
    // 搜索框进行聚焦的时候，然后进行展示的是搜索建议
    onFocus() {
      this.isSearch = false
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
    background-color: transparent;
  }
}
</style>
