<template>
  <div>
    <van-cell title="单元格" value="内容" />
  </div>
</template>

<script>
import { getCommentAPI } from '@/api'
export default {
  props: {
    id: {
      type: String,
      require: true
    }
  },
  mounted() {
    console.log(this.id)
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      const { data: res } = await getCommentAPI({
        type: 'a',
        source: this.id
      })
      console.log(res)
    }
  }
}
</script>

<style></style>
