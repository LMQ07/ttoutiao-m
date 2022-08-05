<template>
  <div>
    <!-- 搜索 -->
    <van-cell title="搜索历史">
      <template #right-icon>
        <div v-if="isDelet" @click="isDelet = false">
          <van-icon name="delete-o" class="icon" />
        </div>
      </template>
      <template #default>
        <div v-if="!isDelet">
          <span @click="deletAll">全部删除</span>
          <span @click="isDelet = true">完成</span>
        </div>
      </template>
    </van-cell>
    <!-- 搜索结果的集合 -->
    <!-- {{ keyWordsList }} -->
    <van-cell
      v-for="(item, index) in keyWordsList"
      :key="index"
      :title="item"
      @click="search(item)"
    >
      <div v-if="!isDelet">
        <van-icon name="close" class="icon" @click="delectOne(index)" />
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyWordsList: this.$store.state.searchList,
      isDelet: true
    }
  },
  methods: {
    // 单个删除的
    delectOne(index) {
      this.keyWordsList.splice(index, 1)
      console.log(this.keyWordsList)
      this.$store.commit('SET_SEARCHLIST', this.keyWordsList)
    },
    // 全部删除的
    deletAll() {
      this.keyWordsList = []
      this.$store.commit('SET_SEARCHLIST', [])
    },
    // 点击单个搜索的
    search(keyWords) {
      this.$parent.keyWords = keyWords
      this.$emit('search')
      // console.log(this.$parent.keyWords)
    }
  }
}
</script>

<style scoped lang="less">
.icon {
  color: gray;
}
:deep(.van-cell__value) {
  span {
    margin-left: 10px;
  }
}
</style>
