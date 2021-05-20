<template>
  <div>
    <el-container>
      <el-header>
        <my-header @menu-handle="showLeftMenu"></my-header>
      </el-header>
      <el-aside
        class="sidebar-container"
        :style="`width:${variables.sideBarWidth};z-index:5000`"
        :class="[$store.state.app.left_nav_menu_show ? 'show' : 'hide']"
      >
        <Sidebar></Sidebar>
      </el-aside>
      <el-container>
        <div
          v-if="$store.state.app.left_nav_menu_show"
          class="v-modal"
          tabindex="0"
          :style="`z-index: 3000;top:${variables.navBarHeight}`"
          @click="hideLeftMenu"
        ></div>
        <!-- <div class="masker" @click="showLeftMenu()" v-if="$store.state.app.left_nav_menu_show"></div> -->
        <el-main
          class="main-container"
          :element-loading-text="$store.state.app.loadingText"
          v-loading="$store.state.app.isLoading"
        >
          <router-view class="router-box"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- <el-container>
        <div class="masker" @click="showLeftMenu()" v-if="$store.state.app.left_nav_menu_show"></div>
        <el-aside
          style="position: fixed;"
          width="180px"
          class="sidebar-container"
          v-show="$store.state.app.left_nav_menu_show"
        >
          <sidebar class="sidebar-container"></sidebar>
        </el-aside>
        <el-container>
          <el-main
            style="padding:0;"
            :element-loading-text="$store.state.app.loadingText"
            v-loading="$store.state.app.isLoading"
          >
            <div class="layout-container">
              <router-view></router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyHeader from './header'
// import LeftMenu from './left-menu'
import Sidebar from '@/views/layout/sidebar'
import variables from '@/styles/variables.scss'
export default {
  components: {
    MyHeader,
    Sidebar
    // LeftMenu
  },
  data() {
    return {
      isCollapse: false
    }
  },
  //   mixins: [ResizeMixin],
  computed: {
    ...mapGetters(['login_user']),
    variables() {
      return variables
    }
  },
  methods: {
    logout() {
      window.location.href = process.env.VUE_APP_LOGIN_PATH + window.location.href
    },
    showLeftMenu(flag) {
      this.$store.commit('TOGGLE_LEFTMENU', flag)
    },
    hideLeftMenu(flag) {
      this.$store.commit('TOGGLE_LEFTMENU', false)
    }
  }
}
</script>
