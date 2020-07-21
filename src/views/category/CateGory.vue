<template>
  <div class="wrapper">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu 
      :categorylist="categorylist"
      @selectItem="selectItem"
      ></tab-menu>
    </div>
    <!-- <scroll class="content" ref="scroll" :probe-type="3"></scroll> -->
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import TabMenu from './childComps/TabMenu'
// import Scroll from "components/common/scroll/Scroll";

import {getCategory} from 'network/category'
export default {
  name: "CateGory",
  data() {
    return {
      categorylist: [],
      currentIndex: -1
    };
  },
  components: {
    NavBar,
    TabMenu,
    // Scroll
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        this.categorylist = res.data.category.list;
      }) 
    },
    selectItem(index){
      // this.currentIndex === index;
      // console.log(index)
      // console.log('--'+this.currentIndex)
    }
  },
  created() {
    this._getCategory()
  }
};
</script>
<style scoped>
.wrapper {
  /* background: yellow; */
  /* overflow: hidden;
  position: relative; */
  height: 100vh;
  /* overflow-y: scroll;  */
  /* 设置这个属性的时候会自动给你隐藏，所以hidden就没必要了。 */
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 64px;
  overflow: hidden;
}
</style>