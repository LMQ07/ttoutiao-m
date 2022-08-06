<template>
  <div class="update-avator">
    <!-- src可以识别的数据： 路径， 外部链接，base64，图片对象 -->
    <img :src="imgUrl" class="img" ref="image" />

    <footer>
      <span @click="$parent.$parent.showPopup = false">取消</span>
      <span @click="uploadAvantor">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvantorAPI } from '@/api'
export default {
  props: {
    imgUrl: {
      type: String,
      require: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    uploadAvantor() {
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '图片加载中...',
          forbidClick: true
        })
        try {
          const { data: res } = await uploadAvantorAPI(blob)
          console.log(res)
          this.$emit('updatePhoto', res.data.photo)
          this.$parent.$parent.showPopup = false
          this.$toast.success('图片更新成功！')
        } catch (error) {
          this.$toast.fail('图片更新失败！')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avator {
  height: 100%;
  position: relative;

  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 50%;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 20px;
  }
}
</style>
