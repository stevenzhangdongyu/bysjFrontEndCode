<template>
  <div class="image-list-container">
    <div class="image-list">
      <van-row type="flex" justify="start" gutter="10">
        <van-col v-for="(image,index) in originalImages" :key="image" span="8">
          <div class="image-container">
            <van-image :src="image" width="100%" height="100%" />
            <van-checkbox v-model=boolList[index] @click="toggleSelectImage(index)" />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="button-container">
      <van-button type="primary" @click="saveSelection">清空</van-button>
      <van-button type="info" @click= "prePage" >上一页</van-button>
      <van-button type="warning" @click= "nextPage" > 下一页</van-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getImages } from '@/api/home'

export default {
  name: 'ImageList',
  data () {
    return {
      boolList: [false, false, false, false, false, false, false, false, false, false]
    }
  },
  computed: {
    ...mapGetters('images', ['originalImages', 'selectedImages', 'page'])
  },
  methods: {
    ...mapActions('images', ['fetchImages', 'selectImage', 'deselectImage', 'pageUp', 'pageDown', 'clearSelectedImages']),
    isSelected (index) {
      return this.selectedImages.includes(this.originalImages[index])
    },
    nextPage () {
      this.pageUp()
      this.fetchImages()
      this.reRender()
    },
    prePage () {
      this.pageDown()
      this.fetchImages()
      this.reRender()
    },
    toggleSelectImage (index) {
      // console.log(this.boolList)
      if (this.isSelected(index)) {
        this.deselectImage(this.originalImages[index])
      } else {
        this.selectImage(this.originalImages[index])
      }
    },
    saveSelection () {
      // 保存选择的图片，可以在这里进行更多操作
      this.clearSelectedImages()
      this.reRender()
    },
    async reRender () {
      const temp = []
      this.originalImages = await getImages(this.page)
      for (let i = 0; i < 10; i++) {
        if (this.selectedImages.includes(this.originalImages[i])) {
          temp.push(true)
        } else {
          temp.push(false)
        }
      }
      this.boolList = temp
    }
  },
  created () {
    this.fetchImages()
    this.reRender()
  }
}
</script>

<style scoped>
.image-list-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.image-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.button-container {
  padding: 10px;
  background-color: #fff;
  margin-bottom: 15rch;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
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
</style>
