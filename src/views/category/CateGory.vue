<template>
  <div class="wrapper">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categorylist="categorylist" @selectItem="selectItem"></tab-menu>
    </div>
    <scroll class="srcoll-item">
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
    </scroll>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";
import { getCategory, getSubcategory } from "network/category";
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "CateGory",
  data() {
    return {
      categorylist: [],
      currentIndex: -1,
      categoryData: {}
    };
  },
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    Scroll
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        this.categorylist = res.data.category.list;
        for (var i = 0; i < this.categorylist.length; i++) {
          this.categoryData[i] = {
            subcategories: {}
            // categoryDetail: {
            //   'pop': [],
            //   'new': [],
            //   'sell': []
            // }
          };
        }
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categorylist[index].maitKey;
      getSubcategory(mailKey).then(res => {
        console.log(res)
        // http://152.136.185.210:8000/api/z8/subcategory?maitKey=582
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        // this._getCategoryDetail(POP);
        // this._getCategoryDetail(SELL);
        // this._getCategoryDetail(NEW);
      });
    },
    selectItem(index) {
      this._getSubcategories(index);
    }
  },
  created() {
    this._getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    }
  }
};
</script>
<style scoped>
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
  /* border: 1px black solid; */
}
.srcoll-item {
  width: 60%;
  height: 85vh;
  margin-left: 120px;
  overflow: hidden;
  /* border: 1px solid red; */
}
</style>