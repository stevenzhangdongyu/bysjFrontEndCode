<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="DETR道路交通标志牌检测系统" fixed />
    <van-uploader v-model="choosedImages" :after-read="afterRead"  multiple />
    <van-button type="danger" @click="startAnalyse">开始检测</van-button>
    <van-loading v-if="load" type="spinner"></van-loading>
    <result-image-list></result-image-list>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { predictImages } from '@/api/home'
import ResultImageList from '@/components/ResultImageList.vue'
import { Toast } from 'vant'

export default {
  name: 'HomePage',
  data () {
    return {
      load: false
    }
  },
  computed: {
    ...mapGetters('images', ['selectedImages', 'resultImages']),
    choosedImages () {
      const data = []
      for (let i = 0; i < this.selectedImages.length; i++) {
        data.push({ url: this.selectedImages[i] })
      }
      return data
    }
  },
  components: {
    ResultImageList
  },
  async created () {
  },
  methods: {
    forceUpdateAll () {
      const updateChildren = (vm) => {
        vm.$forceUpdate()
        vm.$children.forEach(updateChildren)
      }
      updateChildren(this)
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    async startAnalyse (e) {
      this.load = true
      this.$store.state['images/resultImages'] = []
      const response = await predictImages(this.selectedImages)
      // console.log(response.data)
      this.$store.state['images/resultImages'] = response.data.data
      console.log(this.$store.state['images/resultImages'])
      Toast('检测完成')
      this.load = false
      this.forceUpdateAll()
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
  background-color: #c21401;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}

// 分类导航部分
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

// 主会场
.main img {
  display: block;
  width: 100%;
}

// 猜你喜欢
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
