<template>
  <div id="app">
    <!-- 加上key保证每次渲染界面组件都会被重新创建，阻止复用 -->
    <!-- 当组件被放在<keep-alive>里面的话，可以把获取数据方法放在activated钩子函数，代替原来在created、mounted钩子获取数据 -->
    <keep-alive>
      <router-view :key="$route.fullpath + new Date().getTime()" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view :key="$route.fullpath + new Date().getTime()" v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
html,
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
