<template>
  <div>
    <!-- 评论弹框 -->
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    >
      <template #extra>
        <van-button
          class="push"
          :disabled="!message.trim().length"
          @click="submitComment"
        >
          发布
        </van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
import { writeCommentAPI } from '@/api'
export default {
  data() {
    return {
      message: ''
    }
  },
  props: {
    id: {
      type: String,
      require: true
    }
  },
  methods: {
    async submitComment() {
      try {
        await writeCommentAPI({
          target: this.id,
          content: this.message
        })
        this.$toast.success('发布成功')
        this.message = ''
      } catch {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.push {
  color: #6ba3d8;
  border: 0.02667rem solid #fff;
}
:deep(.van-field__value) {
  height: 2.5rem;
  background-color: #f5f7f9;
}
:deep(.van-field__word-limit) {
  margin-top: 0.6rem;
}
.deep {
  opacity: 0.5;
}
.passageText {
  padding: 0 30px;
  padding-bottom: 150px !important;
}
</style>
