<template>
  <div>文章列表</div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    id: {
      // 接受的类型可以直接用数组来表示
      typeof: [String, Number],
      require: true
    }
  }
}
</script>

<style></style>
