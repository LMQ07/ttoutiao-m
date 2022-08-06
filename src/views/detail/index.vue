<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.back()" />
    <!-- 文章部分 -->
    <div class="main">
      <!-- 标题 -->
      <van-cell :title="passageObj.title" class="title"> </van-cell>
      <!-- 作者信息 -->
      <van-cell>
        <template #icon>
          <van-image
            round
            width="35px"
            height="35px"
            :src="passageObj.aut_photo"
          />
        </template>
        <template #title>
          <div class="name">
            <span>{{ passageObj.aut_name }}</span>
            <span class="time">{{ passageObj.pubdate }}</span>
          </div>
        </template>
        <template #default>
          <van-button
            round
            type="default"
            size="small"
            v-if="passageObj.is_followed"
            @click="cancelFocus(passageObj.aut_id)"
          >
            已关注
          </van-button>
          <van-button
            round
            type="info"
            size="small"
            v-else
            icon="plus"
            @click="gotFocus(passageObj.aut_id)"
          >
            关注
          </van-button>
        </template>
      </van-cell>
      <!-- 文章信息 -->
      <div
        class="article-content markdown-body passageText"
        v-html="passageObj.content"
      ></div>
      <br />
      <br />
      <van-divider>正文结束</van-divider>
      <commentList class="list" :id="passageObj.art_id"></commentList>
      <!-- 底部导航 -->
      <van-tabbar class="bottomBar">
        <van-tabbar-item>
          <van-button
            round
            type="default"
            size="small"
            class="comment"
            style="margin-left: 15px"
            @click="showComment = true"
          >
            写评论
          </van-button>
        </van-tabbar-item>
        <van-tabbar-item icon="comment-o"></van-tabbar-item>
        <van-tabbar-item
          icon="star-o"
          v-if="!passageObj.is_collected"
          @click="collectPassage(passageObj.art_id)"
        ></van-tabbar-item>
        <van-tabbar-item
          icon="star"
          class="yellow"
          v-else
          @click="cancelCollect(passageObj.art_id)"
        ></van-tabbar-item>
        <van-tabbar-item icon="good-job-o"></van-tabbar-item>
        <van-tabbar-item icon="share"></van-tabbar-item>
      </van-tabbar>

      <!-- 评论弹框 -->
      <van-popup
        v-model="showComment"
        position="bottom"
        :style="{ height: '20%' }"
      >
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
            <van-button class="push" :class="{ deep: message.length === 0 }"
              >发布</van-button
            >
          </template></van-field
        >
      </van-popup>
    </div>
  </div>
</template>

<script>
import commentList from './components/commentList.vue'
import {
  getNewsDetailAPI,
  getFocusAPI,
  cancelFocusAPI,
  collectPassageAPI,
  cancelCollectAPI
} from '@/api'
import '@/assets/css/github-markdown.css'
export default {
  data() {
    return {
      passageObj: {},
      showComment: false,
      message: ''
    }
  },
  components: { commentList },
  created() {
    this.getDetail()
  },
  methods: {
    // 获取文章信息
    async getDetail() {
      this.$toast.loading('客官请稍后~ 正在加载中...')
      try {
        const id = this.$route.query.articleId
        const { data: res } = await getNewsDetailAPI(id)
        console.log(res)
        this.passageObj = res.data
        this.$toast.success('欢迎来到知识的海洋')
      } catch (error) {
        this.$toast.fail('获取文章数据失败！')
      }
    },
    // 关注作者
    async gotFocus(id) {
      try {
        const { data: res } = await getFocusAPI(id)
        console.log(res)
        this.passageObj.is_followed = true
      } catch (error) {
        this.$toast.fail('关注失败，请重试！')
      }
    },
    // 取消关注
    async cancelFocus(id) {
      try {
        await cancelFocusAPI(id)
        this.passageObj.is_followed = false
      } catch (error) {
        this.$toast.fail('取消关注失败，请重试！')
      }
    },
    // 收藏
    collectPassage(id) {
      try {
        collectPassageAPI(id)
        this.passageObj.is_collected = true
      } catch (error) {
        this.$toast.fail('收藏失败！')
      }
    },
    // 取消收藏
    cancelCollect(id) {
      try {
        cancelCollectAPI(id)
        this.passageObj.is_collected = false
      } catch (error) {
        this.$toast.fail('取消收藏失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.main {
  height: calc(100vh - 92px);
  overflow: auto;
  padding-bottom: 150px;
  .title {
    font-size: 0.53333rem;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
    border-bottom: 1px solid grey;
    font-weight: 600;
  }
  .name {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    font-size: 24px;
    .time {
      color: grey;
    }
  }
  :deep(.van-button--round) {
    width: 2.26667rem;
    height: 0.77333rem;
  }
  .comment {
    width: 3.76rem;
    height: 0.61333rem;
    border: 0.02667rem solid #eee;
    font-size: 0.4rem;
    line-height: 0.61333rem;
    color: #a7a7a7;
  }
  .bottomBar {
    display: flex;
    justify-content: space-evenly;
    :deep(.van-tabbar-item__icon) {
      margin-bottom: 0rem;
    }
    .yellow {
      color: #f29a4a;
    }
  }
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
  }
  .list {
    margin-bottom: 150px;
  }
}
</style>
