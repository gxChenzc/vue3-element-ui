<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div style="height: calc(100% - 80px)">
      <el-button @click="visible=true">打开</el-button>
      <company-structure
        v-if="visible"
        type="user;dept"
        :dialog-visible="visible"
        @on-close="close"
        @on-result="getResult"
      ></company-structure>
    </div>
  </div>
</template>
<script>
import CompanyStructure from '@/components/company-structure'
export default {
  data() {
    return { visible: false }
  },
  components: {
    CompanyStructure
  },
  methods: {
    close() {
      this.visible = false
    },
    getResult(arr) {
      console.log(arr)
      this.close()
    }
  }
}
</script>
