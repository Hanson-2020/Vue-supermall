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
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :show="show" :message="message"></toast> -->
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
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { mapActions } from 'vuex';
// import Toast from 'components/common/toast/Toast'
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";
// import BackTop from "components/content/backTop/BackTop.vue";
export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
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
      // isShowBackTop: false,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // show: false,
      // message: ""
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
    DetailBottomBar,
    // Toast
    // BackTop
  },
  created() {
    // 一.保存传入的iid
    this.iid = this.$route.params.iid;
    // 二.根据请求过来的iid获取数据
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
    });
    // 三.推荐的数据
    getRecommend().then(res => {
      this.recommend = res.data.list;
    });

    // 四.给getThiemeTopY赋值，获取位置
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    });
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.refresh();
      this.getThemeTopY();
    },
    //封装到mixin去了
    // backClick()

    //滚动相关操作
    scrollPosition(position) {
      // 1.获取y值
      const positoinY = -position.y;
      let lenght = this.themeTopYs.length;
      for (let i = 0; i < lenght - 1; i++) {
        if (
          this.currentIndex !== i &&
          positoinY >= this.themeTopYs[i] && positoinY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //按钮是否显示的判断,方法在mixin里
      this.listenShowBackClick(position);
      // this.isShowBackTop = -position.y > 1000;
    },
    //根据navbar点击的索引回到位置
    btnClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    addToCart() {
      // console.log('------')
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //将商品添加到购物车里边
      // this.$store.cartList.push(product);
      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res)
      // })
      this.addCart(product).then(res => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // },1500) 
        // console.log(res)
        // console.log('111')
        this.$toast.show(res, 2000)
      })
    }
  },
  mounted() {
    //封装到mixin去了
    // const refresh = debounce(this.$refs.scroll.refresh, 50);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemListener);
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
  bottom: 64px;
  overflow: hidden;
}
.detail-nv {
  position: relative;
  z-index: 9;
  background: #fff;
}
</style>