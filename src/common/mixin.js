import { debounce } from './utils'
import BackTop from "components/content/backTop/BackTop.vue";
export const itemListenerMixin = {
  data() {
    return {
      itemListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemListener)
    // console.log('我是混入的内容');
  }
}

// 回到顶部按钮
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return{
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackClick(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  }
}