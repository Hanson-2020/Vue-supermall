<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div
        class="menu-list-item"
        v-for="(item, index) in categorylist"
        :key="index"
        :class="{active: index===currentIndex}"
        @click="tabMenuClick(index)"
      >{{item.title}}</div>
    </div>
  </scroll>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    categorylist: Array
  },
  components: {
    Scroll
  },
  methods: {
    tabMenuClick(index){
      this.currentIndex = index;
      // console.log(index)
      // console.log(this.currentIndex)
      this.$emit('selectItem', index)
    }
  }
};
</script>
<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 110px;
    box-sizing: border-box;
    z-index: 99;
  }
  .menu-list-item {
    height: 45px;
    line-height:45px;
    text-align: center;
    font-size: 14px;
  }
  .active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>