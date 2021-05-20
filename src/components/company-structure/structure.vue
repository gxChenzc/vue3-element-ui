<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="1100px"
    height="550px"
    top="5%"
    :before-close="handleClose"
  >
    <div class="company-structure-container">
      <aside class="structure-tree">
        <el-tree
          ref="tree"
          :node-key="nodeKey"
          :default-expanded-keys="expanedKeys"
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </aside>
      <main class="structure-main" v-loading="tableLoading">
        <el-table
          ref="multipleShowTable"
          :data="tableData"
          border
          height="500px"
          class="show-table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="150"></el-table-column>
          <el-table-column align="center" prop="remark" label="职位"></el-table-column>
        </el-table>
        <div class="actions-box">
          <el-button type="primary" @click="add">添加</el-button>
          <el-button type="primary" @click="remove">删除</el-button>
        </div>
        <el-table
          ref="multipleSeletedTable"
          :data="selectedData"
          border
          height="500px"
          class="selected-table"
          @selection-change="handleRemoveChange"
        >
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        </el-table>
      </main>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Api from '@/api'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      defaultValue: false
    },
    defaultKeyword: {
      type: String,
      default: () => ''
    },
    customizeProps: {
      type: Object,
      default: () => null
    },
    defaultSelected: {
      type: Array,
      default: () => []
    },
    defaultCurrentTarget: {
      type: Object,
      default: () => null
    },
    nodeKey: {
      type: String,
      default: () => 'code'
    }
  },
  created() {
    // 关键字
    if (this.defaultKeyword) {
      this.keyword = this.defaultKeyword
    }
    // 默认属性对象属性
    if (this.customizeProps) {
      this.defaultProps = this.customizeProps
    }
    // 默认选中的数组数据
    if (this.defaultSelected) {
      this.selectedData = this.defaultSelected
    }
    // 默认展开的树节点
    if (this.defaultCurrentTarget) {
      this.currentTreeTarget = this.defaultCurrentTarget
      this.expanedKeys = [this.currentTreeTarget.code]
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeData: [],
      tableData: [],
      keyword: '',
      tableLoading: false,
      currentTreeTarget: null,
      multipleSelection: [],
      removeSelection: [],
      selectedData: [],
      selectedIds: [],
      expanedKeys: []
    }
  },
  methods: {
    close() {
      this.$emit('on-close')
    },
    confirm() {
      this.$emit('on-result', this.selectedData)
    },
    handleClose() { },
    handleRemoveChange(val) {
      this.removeSelection = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    add() {
      if (this.multipleSelection.length === 0) {
        return false
      }
      this.multipleSelection.forEach(item => {
        let result = this.selectedData.find(selected => {
          return selected.code === item.code
        })
        if (!result) {
          this.selectedData.push(item)
        }
        let unChecked = this.removeSelection.find(selection => {
          return selection.code === item.code
        })
        if (!unChecked) {
          this.removeSelection.push(item)
        }
      })
      this.$refs.multipleShowTable.clearSelection()
      this.$nextTick(() => {
        this.$refs.multipleSeletedTable.clearSelection()
        this.removeSelection.forEach(row => {
          this.$refs.multipleSeletedTable.toggleRowSelection(row)
        })
      })
    },
    remove() {
      if (this.removeSelection.length === 0) {
        return false
      }
      this.removeSelection.forEach(item => {
        this.selectedData = this.selectedData.filter(selected => {
          return selected.code !== item.code
        })
        this.multipleSelection = this.multipleSelection.filter(select => {
          return select.code !== item.code
        })
        this.$nextTick(() => {
          this.$refs.multipleShowTable.clearSelection()
          this.multipleSelection.forEach(row => {
            this.$refs.multipleShowTable.toggleRowSelection(row)
          })
        })
      })
    },
    initStructure() {
      this.$loadingState(true, '正在查询数据')
      this.$http.get(Api.structureApi.findDeptTree).then(res => {
        this.$loadingState(false)
        this.treeData = res.data || []
      })
    },
    findChildrenData(data) {
      let params = {
        type: 'user',
        deptCode: data.code,
        keyword: this.keyword
      }
      this.tableLoading = true
      this.$http.get(Api.structureApi.findChildren, { params }).then((res) => {
        this.tableLoading = false
        this.tableData = res.data || []
      })
    },
    handleNodeClick(data) {
      this.currentTreeTarget = data || {}
      this.findChildrenData(data)
    }
  },
  mounted() {
    this.initStructure()
  }
}
</script>
<style lang="scss">
.company-structure-container {
  .el-table__header-wrapper {
    // th {
    //   background: #ececec;
    // }
    td,
    th {
      padding: 3px 0 !important;
    }
  }
  // .show-table.el-table--border,
  // .show-table.el-table--group {
  //   border: none;
  // }
  // .el-table--border::after,
  // .el-table--group::after,
  // .el-table::before {
  //   content: '';
  //   position: absolute;
  //   background-color: #fff;
  //   z-index: 1;
  // }
}
</style>
<style lang="scss" scoped>
.company-structure-container {
  width: 100%;
  min-width: 1000px;
  height: 500px;
  background: #fff;
  .structure-tree {
    width: 240px;
    height: 500px;
    border: 1px solid #ebeef5;
    float: left;
    overflow: auto;
  }
  .structure-main {
    float: left;
    width: calc(100% - 240px - 15px);
    // border: 1px solid #ebeef5;
    height: 100%;
    margin-left: 15px;
    & > * {
      float: left;
      height: 100%;
    }
    .actions-box {
      height: 500px;
      width: 15%;
      min-width: 120px;
      margin: 0 15px;
      display: flex;
      justify-items: center;
      justify-content: center;
      align-items: center;
      align-content: center;
      flex-direction: column;
      button {
        margin: 10px 0;
      }
    }
    .show-table {
      width: 55%;
    }
    .selected-table {
      width: calc(30% - 30px);
    }
  }
}
</style>
