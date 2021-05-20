<template>
  <div style="display: flex;justify-items: center;flex-direction: column;align-items: center;">
    <img :src="img" style="width:450px;" />
    <div style="font-size: 18px;font-weight: bold;">抱歉...您没有当前页面访问权限</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: require('@/assets/403.png')
    }
  }
}
</script>
