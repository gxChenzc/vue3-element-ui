<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="primary" @click="show = !show">按钮</el-button>
    <div v-show="show">{{ $store.state.msg }}</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      show: false
    }
  }
}
</script>
