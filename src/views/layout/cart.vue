<template>
  <div class="cart">
    <van-nav-bar title="结果集合" fixed />

  </div>
</template>

<script>
// import CountBox from '@/components/CountBox.vue'
import { mapState } from 'vuex'

export default {
  name: 'CartPage',
  data () {
  },
  computed: {
    ...mapState('images', ['resultImages'])
  },
  created () {
    console.log('cart')
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
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
  margin-bottom: 10rch;
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
