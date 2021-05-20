<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="item.meta.noChildren">
      <app-link :to="resolvePath(item.path)">
        <el-menu-item :index="resolvePath(item.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="item.meta" :icon="item.meta.icon||item.meta.icon" :title="item.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
      <template v-for="child in item.children">
        <sidebar-item
          v-if="!child.hidden && child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />

        <app-link v-else-if="!child.hidden" :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    }
  }
}
</script>
