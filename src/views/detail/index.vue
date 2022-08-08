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
      <div class="article-content markdown-body passageText" v-if="passageObj">
        <div v-html="passageObj.content"></div>
        <van-divider>正文结束</van-divider>
        <list
          class="list"
          :source="passageObj.art_id"
          :type="'a'"
          v-if="show"
        ></list>
      </div>
      <div v-else>资源不存在，或者已经被删除了</div>

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
        class="topPop"
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
            <van-button
              class="push"
              :disabled="!message.trim().length"
              @click="submitComment(passageObj.art_id)"
              >发布</van-button
            >
          </template></van-field
        >
      </van-popup>
      <!-- <commentPopup v-show="showComment" :id="passageObj.art_id"></commentPopup> -->
      <!-- 回复列表的弹框 -->
      <van-popup
        v-model="replayList"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <!-- 返回 -->
        <van-nav-bar title="暂无回复" left-arrow @click-left="back" />
        <!-- 首部内容 -->
        <van-cell class="top">
          <template #title>
            <span class="name">{{ replayItem.aut_name }}</span>
            <p class="text">{{ replayItem.content }}</p>
            <p class="replay">
              {{ replayItem.pubdate | reaTime }}
              <van-button size="mini" type="default" round>
                回复{{ replayItem.replay_count }}
              </van-button>
            </p>
          </template>
          <template>
            <van-icon name="good-job-o" />
            <span>赞</span>
          </template>
          <template #icon>
            <img :src="replayItem.aut_photo" alt="" class="avantor" />
          </template>
        </van-cell>
        <!-- 对于该评论的回复列表 -->
        <list :type="'c'" :source="replayItem.com_id" v-if="create"></list>
        <!-- 最下面的发布 -->
        <van-tabbar>
          <van-tabbar-item @click="commentReplayShow = true">
            发布评论
          </van-tabbar-item>
        </van-tabbar>
      </van-popup>
      <!-- 发表评论的评论弹框 -->
      <van-popup
        v-model="commentReplayShow"
        position="bottom"
        :style="{ height: '20%' }"
        class="topPop"
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
            <van-button
              class="push"
              :disabled="!message.trim().length"
              @click="submitCommentReply(replayItem.com_id)"
              >发布</van-button
            >
          </template></van-field
        >
      </van-popup>
    </div>
  </div>
</template>

<script>
import list from './components/list.vue'

import {
  getNewsDetailAPI,
  getFocusAPI,
  cancelFocusAPI,
  collectPassageAPI,
  cancelCollectAPI,
  writeCommentAPI
} from '@/api'
import '@/assets/css/github-markdown.css'
export default {
  data() {
    return {
      passageObj: {},
      showComment: false,
      message: '',
      show: false,
      replayList: false,
      replayItem: {},
      commentReplayShow: false,
      create: false
    }
  },
  components: { list },
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
        console.log(this.passageObj.art_id)
        // 子组件控制
        this.show = true
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
    },
    // 发布对文章评论
    async submitComment(ID) {
      this.show = false
      try {
        await writeCommentAPI({
          target: ID,
          content: this.message
        })
        this.$toast.success('发布成功')
        this.show = true
        this.showComment = false
        this.message = ''
      } catch {
        this.$toast.fail('发布失败')
      }
    },
    // 发布对评论的评论
    async submitCommentReply(ID) {
      this.showComment = false
      this.create = false
      try {
        await writeCommentAPI({
          target: ID,
          content: this.message,
          art_id: this.passageObj.art_id
        })
        this.$toast.success('发布成功')
        this.commentReplayShow = false
        this.message = ''
        this.$nextTick(() => {
          this.create = true
        })
      } catch (error) {
        this.$toast.fail('发布失败')
      }
    },
    // 返回
    back() {
      this.replayList = false
      this.create = false
    }
  }
}
</script>

<style scoped lang="less">
.main {
  height: calc(100vh - 92px);
  overflow: auto;

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
    padding-bottom: 150px !important;
  }
  .top {
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
    :deep(.van-tabbar-item--active) {
      color: #666;
      font-size: 0.37333rem;
    }
    .topPop {
      z-index: 999;
    }
  }
}
</style>
