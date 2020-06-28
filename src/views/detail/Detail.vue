<template>
  <div id="detail">
    <detail-nav-bar class="detail-nv" @btnClick="btnClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scrollPosition="scrollPosition">
      <detail-swiper :top-img="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commer-info="commerInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommend" ref="recomment"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop.vue";
export default {
  name: "Detail",
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commerInfo: {},
      recommend: [],
      isShowBackTop: false,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据请求过来的iid获取数据
    getDetail(this.iid).then(res => {
      console.log(res);
      // 1.获取轮播图的数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品的数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.获取店铺的信息
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.取出评论的信息
      if (data.rate.cRate != null) {
        this.commerInfo = data.rate.list[0];
      }
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);
      //   // console.log(this.themeTopYs);
      // });
    });
    // 3.推荐的数据
    getRecommend().then(res => {
      this.recommend = res.data.list;
    });

    // 4.给getThiemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);
      console.log(this.themeTopYs);
    });
  },
  methods: {
    imageLoad() {
      // console.log('--');
      this.refresh();
      // this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    backClick() {
      // console.log("---");
      this.$refs.scroll.scrollTo(0, 0);
    },
    scrollPosition(position) {
      // 1.获取y值
      const positoinY = -position.y;
      // 2.postitionY和主题中的值进行对比
      // for(let i in this.themeTopYs) {
      //   if(positoinY > this.themeTopYs[parseInt(i)] && positoinY < this.themeTopYs[i+1]){
      //     console.log(i);
      //   } 
      // }
      let lenght = this.themeTopYs.length
      for(let i = 0; i< this.themeTopYs.length;i++){
        // if(positoinY > this.themeTopYs[i] && positoinY < this.themeTopYs[i+1]){
        //   console.log(i);
        // } 
        if(this.currentIndex !== i && ((i < lenght - 1 && positoinY >= this.themeTopYs[i] && positoinY < this.themeTopYs[i+1]) ||
         (i === lenght -1 && positoinY >= this.themeTopYs[i]))){
          //  console.log(i);
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
         }
      }
      this.isShowBackTop = -position.y > 1000;
    },
    btnClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    }
  },
  mounted() {
    //封装到mixin去了
    // const refresh = debounce(this.$refs.scroll.refresh, 50);
    // this.itemListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemListener);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemListener);
    // console.log("deac");
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 10px;
  overflow: hidden;
}
.detail-nv {
  position: relative;
  z-index: 9;
  background: #fff;
}
</style>