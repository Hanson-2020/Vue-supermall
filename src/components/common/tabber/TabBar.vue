<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style scoped>
#tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.3);
  /* box-shadow后边的参数 第一个对应的是x轴，第二个是对应Y轴，第三个参数是模糊程度，最后一个是透明度 */
}
</style>