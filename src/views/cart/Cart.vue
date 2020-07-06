<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-button-bar></cart-button-bar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartButtonBar from './childComps/CartButtonBar'
export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartButtonBar
  },
  computed: {
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>
<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  box-shadow: 0px 1px 1px rgba(100,100,100,.1);
  /* box-shadow:  */
  /* overflow: hidden; */
}
.cart{
  height: 100vh;
}
</style>