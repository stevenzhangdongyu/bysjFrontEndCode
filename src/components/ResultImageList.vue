<template>
  <div class="image-list-container">
    <van-row type="flex" justify="start" gutter="10">
      <van-col v-for="(image, index) in this.$store.state['images/resultImages']" :key="index" span="6">
        <div class="image-container" @click="checkImage(index)">
            <van-image :src="image || require('@/assets/failed.jpeg')" width="100%" height="100%">
            </van-image>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { ImagePreview } from 'vant'

export default {
  name: 'ResultImageList',
  computed: {
    ...mapGetters('images', ['resultImages'])
  },
  methods: {
    checkImage (index) {
      ImagePreview({
        images: this.$store.state['images/resultImages'],
        startPosition: index
      })
    }
  },
  updated () {
    console.log('in the update hook')
    console.log(this.$store.state['images/resultImages'])
  }
}
</script>
<style scoped lang="less">
.image-list-container {
  padding: 10px;
}
.image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%; /* 1:1 Aspect Ratio */
}
.image-container .van-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.button-container {
  margin-top: 20px;
  text-align: center;
}
</style>
