<template>
  <div class="scroll-container">
    <van-row type="flex" justify="start" gutter="10">
      <van-col v-for="(image, index) in originalImages" :key="image" span="8">
        <div class="image-container">
          <van-image :src="image" width="100%" height="100%"  @click="checkWaitingImages(index)" />
          <van-checkbox :value="selectedImages.includes(image)" @click="toggleSelectImage(index)" />
        </div>
      </van-col>
    </van-row>
    <div class="button-container">
      <van-button type="primary" @click="saveSelection">清空</van-button>
      <van-button type="info" @click="prePage">上一页</van-button>
      <van-button type="warning" @click="nextPage">下一页</van-button>
      <van-button type="danger" @click="triggerFileInput">添加图片</van-button>

      <van-button type="info" plain @click="jumpToFirstPage">第一页</van-button>
      <van-button type="warning" plain @click="jumpToLastPage">最后一页</van-button>
      <van-button type="primary" @click="uploadImages">上传图片</van-button>
      <van-tag type="primary">{{ page }} 页</van-tag>
      <input type="file" ref="fileInput" @change="handleFileChange" multiple accept="image/*" style="display: none;" />
      <van-progress :percentage="(this.$store.state.images.page / this.$store.state.images.maxPage * 100).toFixed(2)"></van-progress>
    </div>

    <div class="preview-container" v-if="previewImages.length > 0">
      <van-row type="flex" justify="start" gutter="10">
        <van-col v-for="(image, index) in previewImages" :key="index" span="8">
          <div class="image-container" @click="checkUploadingImages(index)">
            <van-image :src="image" width="100%" height="100%" />
          </div>
        </van-col>
      </van-row>

      <div class="bottom-padding"></div> <!-- 增加占位的空白区域，确保按钮与底部有足够的距离 -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getImages, refresh, uploadFiles } from '@/api/home'
import { ImagePreview, Toast } from 'vant'

export default {
  name: 'ImageList',
  data () {
    return {
      // boolList: [false, false, false, false, false, false, false, false, false, false],
      previewImages: [] // 用于存储预览图片的URL
    }
  },
  computed: {
    ...mapGetters('images', ['originalImages', 'selectedImages', 'page', 'selectedFiles', 'maxPage'])
  },
  methods: {
    ...mapActions('images', ['fetchImages', 'selectImage', 'setPage', 'deselectImage', 'pageUp', 'pageDown', 'clearSelectedImages', 'clearRes', 'setSelectedFiles', 'setMaxPage', 'fetchImagesAt', 'setOriginalImages']),
    isSelected (index) {
      return this.selectedImages.includes(this.originalImages[index])
    },
    checkUploadingImages (index) {
      ImagePreview({ images: this.previewImages, startPosition: index })
    },
    checkWaitingImages (index) {
      ImagePreview({ images: this.originalImages, startPosition: index })
    },
    jumpToFirstPage () {
      this.fetchImagesAt(0)
      // this.reRender()
    },
    jumpToLastPage () {
      this.fetchImagesAt(this.maxPage)
      // this.reRender()
    },
    async nextPage () {
      try {
        const response = await getImages(this.page + 1)
        if (response.data.status === 'yes') {
          this.setOriginalImages(response.data.images)
          this.setMaxPage(response.data.maxPage)
          this.setPage(this.page + 1)
          // await this.reRender()
        } else {
          Toast('已经是最后一页')
        }
      } catch (e) {
        Toast('已经是最后一页')
      }
    },
    async prePage () {
      if (this.page === 0) {
        Toast('已经是第一页')
        return
      }
      const response = await getImages(this.page - 1)
      this.setPage(this.page - 1)
      this.setOriginalImages(response.data.images)
      this.setMaxPage(response.data.maxPage)
      // await this.reRender()
    },
    toggleSelectImage (index) {
      if (this.isSelected(index)) {
        this.deselectImage(this.originalImages[index])
      } else {
        this.selectImage(this.originalImages[index])
      }
    },
    saveSelection () {
      this.clearSelectedImages()
      // this.reRender()
    },
    async reRender () {
      const temp = []
      for (let i = 0; i < 9; i++) {
        if (this.selectedImages.includes(this.originalImages[i])) {
          temp.push(true)
        } else {
          temp.push(false)
        }
      }
      this.boolList = temp
      const updateChildren = (vm) => {
        vm.$forceUpdate()
        vm.$children.forEach(updateChildren)
      }
      updateChildren(this)
    },
    triggerFileInput () {
      this.$refs.fileInput.click()
    },
    handleFileChange (event) {
      const files = Array.from(event.target.files)
      this.previewImages = files.map(file => URL.createObjectURL(file))
      this.setSelectedFiles(files)
      // console.log('this.selectedFilesStart')
      // console.log(this.selectedFiles)
      // console.log('this.selectedFilesEnd')
    },
    async uploadImages () {
      const formData = new FormData()
      this.selectedFiles.forEach((file, i) => {
        formData.append('files[]', file)
      })
      try {
        const response = await uploadFiles(formData)
        if (response.data.status === 'yes') {
          console.log('上传成功', response)
          this.setMaxPage(response.data.maxPage)
          Toast('上传图片成功')
          this.clearSelectedImages()
          this.jumpToFirstPage()
          this.setSelectedFiles([])
          this.previewImages = []
        } else {
          console.log('上传失败', response)
        }
      } catch (error) {
        console.error('上传失败', error)
      }
    }
  },
  async created () {
    const status = await this.fetchImagesAt(this.page)
    console.log(status)
    if (status === undefined || status !== 'yes') {
      console.log('refresh at created')
      refresh()
      await this.fetchImagesAt(this.page)
    }
    // this.reRender()
  }
}

</script>

<!--<style scoped>-->
<!--.scroll-container {-->
<!--  overflow-y: auto;-->
<!--  height: 100vh; /* 确保容器高度适应屏幕高度 */-->
<!--  padding-bottom: 150px; /* 确保底部有足够的空间 */-->
<!--}-->

<!--.image-container {-->
<!--  position: relative;-->
<!--}-->

<!--.button-container {-->
<!--  display: flex;-->
<!--  flex-wrap: wrap;-->
<!--  justify-content: space-around;-->
<!--  margin-top: 10px;-->
<!--}-->

<!--.bottom-padding {-->
<!--  height: 150px; /* 确保按钮与底部有足够的距离 */-->
<!--}-->

<!--.preview-container {-->
<!--  margin-top: 20px;-->
<!--}-->
<!--</style>-->
<style scoped>
.scroll-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  padding: 10px;
}

.button-container {
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.preview-container {
  padding: 10px;
  background-color: #fff;
  margin-top: 10px;
}

.image-container {
  position: relative;
}

.van-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.van-col {
  padding-right: 5px;
  padding-left: 5px;
}

.bottom-padding {
  height: 20rch; /* 设置占位区域的高度 */
}
</style>
