<template>
  <div>
    <!-- 搜索列表 -->
    <van-cell
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
// 首先正则表达式的创建方式
// 第一种： 字面量的形式/abc/
// 第二种：动态正则 new RegExp(变量，'ig')
// 2.字符串的replace
// 'Auglar'.replace(/a/ig,function(match){
//   return `<span>${match}</span>`
// })
// 1.第一个参数可以是正则
// 2.第二个参数可以是函数，函数的返回值是要替换的字符串
// 3.match:正则匹配上的字符
export default {
  props: {
    keyWords: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      searchSuggestionList: []
    }
  },
  methods: {
    // 获取相关数据 发送请求的防抖操作 第一步延迟发送 第二步清空前面的定时器
    getSuggestion: debounce(async function () {
      try {
        const { data: res } = await getSearchSuggestionAPI(this.keyWords)
        // 第一种
        // this.searchSuggestionList = res.data.options.filter(
        //   (item) => item !== null
        // )
        // 第二种
        // this.searchSuggestionList = res.data.options.filter((item) =>
        //   // Boolean 是window下的一个方法 根据输入的值去返回布尔值 例如 Boolean(1) True
        //   Boolean(item)
        // )
        // 第三种
        this.searchSuggestionList = res.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('数据未获取！')
      }
    }, 300)
  },
  watch: {
    // 这边不能简写的原因是当开启监听的时候 keyWords已经发生了变化，然后就导致于第一次输入的时候就不会开启
    // 所以就需要刚进来的话直接调用一次
    // 数据监听事件是发生在created前面 beforecreat 后面
    // created时，可用data和prop中的数据。
    // computed的属性，当在mounted或者dom中使用到时，才会属性的执行代码。
    // 最后是mouted，可使用前面的数据，并且此时才可以操作dom。
    // watch不会再创建阶段自动执行，除了添加立即执行这个配置项。
    keyWords: {
      immediate: true,
      handler() {
        this.getSuggestion()
      }
    }
  },
  computed: {
    highLightSuggestions() {
      // map： 映射 原数组的长度和新数组的长度保持一致 没有return 就是undefined
      // 这边要注意 如果搜索来的数组是空数组的话 就不能使用replace 就会报错
      const reg = new RegExp(this.keyWords, 'ig')
      return this.searchSuggestionList.map((item) =>
        item.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style></style>
