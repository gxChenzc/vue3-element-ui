<template>
  <el-row class="nav-header">
    <el-col :span="12">
      <div class="grid-content left">
        <h3>{{ projectName }}</h3>
        <!-- <span class="nav-toggle-bar" @click="$emit('menu-handle')">
          <i
            class="toggle-icon"
            :class="[!$store.state.app.left_nav_menu_show ? 'el-icon-s-fold' : 'el-icon-s-unfold']"
          ></i>
        </span>-->
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content right">
        <ul class="nav-menus">
          <!-- <li @click="$emit('menu-handle')">{{!$store.state.app.left_nav_menu_show?'返回':'关闭'}}菜单</li> -->
          <li @click="$emit('menu-handle')">
            <i class="fa fa-user-circle-o"></i>
            <span>返回目录</span>
          </li>
          <li>
            <i class="el-icon-s-custom"></i>
            <span>{{ login_user.name || '' }},您好!</span>
          </li>
          <li @click="logout()">
            <i class="el-icon-unlock"></i>
            <span>退出</span>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    projectName() {
      return process.env.VUE_APP_PROJECT_NAME
    },
    ...mapGetters(['login_user'])
  },
  methods: {
    logout() {
      window.location.href = process.env.VUE_APP_LOGIN_PATH + window.location.origin + window.location.pathname
    }
  }
}
</script>
<style lang="scss"></style>
