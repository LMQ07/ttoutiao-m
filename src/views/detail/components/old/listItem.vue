<template>
  <div class="commentList">
    <van-cell>
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
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'listItem',
  props: {
    item: {
      type: Object,
      default: () => ({}),
      require: true
    }
  },
  created() {
    console.log(this.item)
  },
  methods: {
    getCommentReplay(item) {
      this.$emit('showPopUp', item)
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
