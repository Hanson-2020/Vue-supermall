import { debounce } from './utils'
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