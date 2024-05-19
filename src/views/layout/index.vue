<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<template>
  <div>
    <router-view></router-view>
    <van-tabbar route v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/imageHub" icon="apps-o">图片库</van-tabbar-item>
      <!--      <van-tabbar-item replace to="/cart" icon="shopping-cart-o">结果集合</van-tabbar-item>-->
      <!--      <van-tabbar-item replace to="/user" icon="contact-o">我的</van-tabbar-item>-->
    </van-tabbar>
  </div>
</template>

<style scoped lang="less">

</style>
