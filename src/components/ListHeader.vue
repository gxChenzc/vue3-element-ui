<template>
  <div>
    <el-row>
      <el-col align="center" :span="span">
        <h3 class="header-title">{{ title }}</h3>
      </el-col>
    </el-row>
    <div class="header-sub-row">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'list-header',
  props: {
    title: {
      type: String,
      required: true
    },
    span: {
      type: Number,
      default: () => 24
    }
  }
}
</script>
