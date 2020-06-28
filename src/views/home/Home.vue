<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabcontrol1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scrollPosition="scrollPosition"
      :pull-up-load="true"
      @pullingup="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <featureview />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabcontrol2" />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import { getHomeMultiadata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import {itemListenerMixin } from 'common/mixin'
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import Featureview from "./childComps/Featureview.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

export default {
  name: "Home",
  mixins: [itemListenerMixin],
  components: {
    HomeSwiper,
    HomeRecommendView,
    Featureview,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 622,
      isTabFixed: false,
      saveY: 0,
      itemListener: null
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultiadata();
    // 2.请求商品数据
    this.getHomeGoodsI("pop");
    this.getHomeGoodsI("new");
    this.getHomeGoodsI("sell");
  },
  mounted() {
    // 1.事件总线的监听：item中图片加载完成  //封装到mixinjs去了。
    // const refresh = debounce(this.$refs.scroll.refresh, 50);
    // this.itemListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemListener);
    // 2.获取tabControl的offsetTop
    //所有组件都有一个属性$el：用于获取组件中的元素
    // console.log(this.$refs.tabcontrol.$el.offsetTop);
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed() {
    console.log("我被销毁了!");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 10);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);

    // 2.取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.homeItemListener);
  },
  methods: {
    //事件监听相关的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //让两个tabControll的currentIndex保持一致
      if (this.$refs.tabcontrol1 != undefined) {
        this.$refs.tabcontrol2.currentType = index;
        this.$refs.tabcontrol1.currentType = index;
      }
    },
    //回到顶部按钮事件
    backClick() {
      // console.log("---");
      this.$refs.scroll.scrollTo(0, 0);
    },
    //判断返回图标的显示
    scrollPosition(position) {
      // console.log(position);
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //下拉加载更多
    loadMore() {
      console.log("下拉加载更多");
      this.getHomeGoodsI(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      // console.log(this.$refs.tabcontrol2.$el.offsetTop);
    },

    // 网络请求相关的方法
    getHomeMultiadata() {
      getHomeMultiadata().then(res => {
        // console.log(res);
        //函数变量会被释放，所以要保存起来
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // tab-control数据请求并且显示
    getHomeGoodsI(type) {
      const page = this.goods[type].page + 1;
      // console.log(this.goods[type].page);
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // console.log(this.goods[type].page);
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
        // setTimeout(() => {
        //   this.$refs.homeScroll.finishPullUp();
        // }, 2000);
      });
    }
  }
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 19;
  top: -2px;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 43px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>