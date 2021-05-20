<template>
  <div>
    <div class="left-nav_menu">
      <el-menu
        :show-timeout="100"
        :default-active="$route.path"
        :collapse="false"
        mode="vertical"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        collapse-transition
      >
        <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  data() {
    return {
      current_parent_path: '',
      current_routers: [],
      permission_routers: []
    }
  },
  computed: {
    ...mapGetters([
      // 'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    variables() {
      return variables
    }
  },
  watch: {
    current_parent_path(val) {
      let routers = this.permission_routers.filter(item => item.path === val)
      if (routers) {
        if (routers[0].children.length === 1) {
          let router = routers[0].children[0]
          router.children = router.children || []
          this.current_routers = [router]
        } else {
          let router = routers[0].children
          this.current_routers = router
        }
      }
    }
  },
  methods: {
    handleOpen(key) {
      this.current_parent_path = key
    }
  },
  created() {
    this.current_parent_path = this.$route.matched[0].path
    this.permission_routers = this.$router.options.routes[0].children
  }
}
</script>
