<template>
  <el-dialog
    :title="dialogTitle || '未设置选择框名称'"
    :visible.sync="dialogVisible"
    width="1020px"
    height="550px"
    top="5%"
    append-to-body
    :before-close="handleClose"
  >
    <div class="company-structure-container">
      <aside class="structure-tree">
        <!-- <h3>组织架构</h3> -->
        <el-tree
          ref="tree"
          highlight-current
          :node-key="nodeKey"
          :default-expanded-keys="expanedKeys"
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </aside>
      <div class="structure-main">
        <el-row class="search-row">
          <el-col>
            <el-input v-model="keyword" style="width:235px;margin-right:20px;" />
            <el-button type="primary" @click="searchHandle">搜索</el-button>
          </el-col>
        </el-row>
        <main v-loading="tableLoading">
          <el-table
            :row-class-name="tableRowClassName"
            ref="multipleShowTable"
            :data="tableData"
            border
            height="460px"
            width="100%"
            class="show-table"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection" width="40"></el-table-column>
            <el-table-column align="center" label="姓名" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>
                  <span class="name-text">{{ scope.row.name }}</span>
                  <sub class="remark-text">{{ scope.row.remark }}</sub>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="actions-box">
            <el-button type="primary" @click="add">添加</el-button>
            <el-button type="primary" @click="remove">删除</el-button>
          </div>
          <el-table
            ref="multipleSeletedTable"
            :data="selectedData"
            border
            height="460px"
            width="100%"
            class="selected-table"
            @selection-change="handleRemoveChange"
          >
            <el-table-column align="center" type="selection" width="40"></el-table-column>
            <el-table-column align="center" label="姓名" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>
                  <span class="name-text">{{ scope.row.name }}</span>
                  <sub class="remark-text">{{ scope.row.remark }}</sub>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </main>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Api from '@/api'
export default {
  props: {
    // 显示/隐藏dialog
    dialogVisible: {
      type: Boolean,
      default: () => false
    },
    // 用于传入搜索条件
    defaultKeyword: {
      type: String,
      default: () => ''
    },
    // 用于覆盖默认的defaultProps
    customizeProps: {
      type: Object,
      default: () => null
    },
    // 默认选中的数据集
    defaultSelected: {
      type: Array,
      default: () => []
    },
    // 设置默认展开tree的对象
    defaultCurrentTarget: {
      type: Object,
      default: () => null
    },
    // 设置数据的唯一属性，例如id，code，默认为code
    nodeKey: {
      type: String,
      default: () => 'code'
    },
    // user:只查人，position:只查职位，dept:只查子部门，user;dept:查询人员和子部门
    type: {
      type: String,
      default: () => 'user'
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 组织树数据
      treeData: [],
      // 内容左边显示table数据
      tableData: [],
      // 关键字
      keyword: '',
      // 加载表格数据loading状态
      tableLoading: false,
      // 当前点击组织对象，初始化默认为tree的root级对象
      currentTreeTarget: null,
      // 左侧表格多选数组
      multipleSelection: [],
      // 右侧内容选数组
      removeSelection: [],
      // 以选中的数据
      selectedData: [],
      // 以选中数据的code数组，用于回显已选中的数据，这里用数组保存，可省去需要做的循环对比操作
      selectedIds: [],
      // 用于初始化展开tree额某一级或多级
      expanedKeys: []
    }
  },
  watch: {
    defaultKeyword(val) {
      this.keyword = this.defaultKeyword
    },
    // 默认属性对象属性
    customizeProps(val) {
      this.defaultProps = val
    },
    defaultCurrentTarget(val) {
      // 默认展开的树节点
      this.currentTreeTarget = this.val
      this.expanedKeys = [this.currentTreeTarget[this.nodeKey]]
      this.findChildrenData(this.currentTreeTarget)
    },
    defaultSelected(val) {
      this.selectedData = val
    },
    // 得到选中数据的唯一属性
    selectedData(val) {
      this.selectedIds = val.map(item => item[this.nodeKey])
    }
  },
  computed: {
    dialogTitle() {
      let title = process.env.VUE_APP_STRUCTURE_USER_DIALOG_NAME
      if (this.type === 'user') {
        title = process.env.VUE_APP_STRUCTURE_USER_DIALOG_NAME
      } else if (this.type === 'dept') {
        title = process.env.VUE_APP_STRUCTURE_DEPT_DIALOG_NAME
      } else if (this.type === 'position') {
        title = process.env.VUE_APP_STRUCTURE_POSITION_DIALOG_NAME
      } else if (this.type === 'user;dept') {
        title = process.env.VUE_APP_STRUCTURE_USER_DEPT_DIALOG_NAME
      }
      return title
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.type === 'dept') {
        return 'dept-row'
      }
      return ''
    },
    // 按关键字搜索显示数据
    searchHandle() {
      this.findChildrenData()
    },
    // 点击确认返回选中结果，关闭dialog
    confirm() {
      this.$emit('on-result', this.selectedData, () => {
        this.handleClose()
      })
    },
    // 点击关闭dialog
    handleClose() {
      this.$emit('on-close')
    },
    // 右侧以选中表格的多选框事件
    handleRemoveChange(val) {
      this.removeSelection = val
    },
    // 左侧侧以选中表格的多选框事件
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 增加左侧选中数据到右侧表格
    add() {
      // 当左侧选中为空时不做操作
      if (this.multipleSelection.length === 0) {
        return false
      }
      this.multipleSelection.forEach(item => {
        let result = this.selectedData.find(selected => {
          return selected[this.nodeKey] === item[this.nodeKey]
        })
        // 判断添加未添加过则加入到右侧表格
        if (!result) {
          this.selectedData.push(item)
        }
        // 得到刚刚以选中的对象，用于显示选中状态(本次选中的数据多选框会显示选中以区别之前选中的数据)
        let unChecked = this.removeSelection.find(selection => {
          return selection[this.nodeKey] === item[this.nodeKey]
        })
        if (!unChecked) {
          this.removeSelection.push(item)
        }
      })
      // 清空左侧多选框选中状态
      this.$refs.multipleShowTable.clearSelection()
      this.$nextTick(() => {
        // 循环设置刚刚添加的数据为选中状态
        this.removeSelection.forEach(row => {
          this.$refs.multipleSeletedTable.toggleRowSelection(row)
        })
      })
    },
    // 删除
    remove() {
      // 为空时不操作
      if (this.removeSelection.length === 0) {
        return false
      }
      this.removeSelection.forEach(item => {
        // 清除删除的selectData数据(表格数据)
        this.selectedData = this.selectedData.filter(selected => {
          return selected[this.nodeKey] !== item[this.nodeKey]
        })
        // 清除删除的multipleSelection数据(表格多选框状态数据)
        this.multipleSelection = this.multipleSelection.filter(select => {
          return select[this.nodeKey] !== item[this.nodeKey]
        })
        this.$nextTick(() => {
          // 重新置空右侧表格已选状态
          this.$refs.multipleShowTable.clearSelection()
          // 重新设置右侧表格已选状态
          this.multipleSelection.forEach(row => {
            this.$refs.multipleShowTable.toggleRowSelection(row)
          })
        })
      })
    },
    // 请求获取tree数据
    initStructure() {
      this.$loadingState(true, '正在查询数据')
      this.$http.get(Api.structureApi.findDeptTree).then(res => {
        this.$loadingState(false)
        this.treeData = res.data || []
        // 当未主动设置展开哪一级时，默认展开第一级(通过expanedKeys展开tree)
        if (!this.currentTreeTarget && this.treeData.length > 0) {
          this.expanedKeys = [this.treeData[0][this.nodeKey] || '']
          // this.currentTreeTarget = this.treeData[0]
        }
      })
    },
    // 获取组织下人员或职位
    findChildrenData(data = {}) {
      let params = {
        type: this.type,
        deptCode: data[this.nodeKey] || '',
        keyword: this.keyword
      }
      this.tableLoading = true
      this.$http.get(Api.structureApi.findChildren, { params }).then(res => {
        this.tableLoading = false
        this.tableData = res.data || []
        this.$nextTick(() => {
          // 得到当前数据中已选中的数据
          this.multipleSelection = this.tableData.filter(item => {
            return this.selectedIds.indexOf(item[this.nodeKey]) !== -1
          })
          // 显示当前数据以选中状态
          this.multipleSelection.forEach(row => {
            this.$refs.multipleShowTable.toggleRowSelection(row)
          })
        })
      })
    },
    // tree点击事件
    handleNodeClick(data) {
      // 每次点击清空所有表格状态
      this.$refs.multipleSeletedTable.clearSelection()
      this.$refs.multipleShowTable.clearSelection()
      // 每次点击需要清空所搜条件吗？？？暂时不清空
      // this.keyword = ''
      // 保存当前点击对象
      this.currentTreeTarget = data || {}
      this.findChildrenData(data)
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
      this.expanedKeys = [this.currentTreeTarget[this.nodeKey]]
      this.findChildrenData(this.currentTreeTarget)
    }
  },
  mounted() {
    this.initStructure()
  }
}
</script>
<style lang="scss">
.company-structure-container {
  .dept-row {
    color: #333;
    font-weight: bold;
  }
  .name-text,
  .remark-text {
    display: block;
    text-align: left;
  }
  .remark-text {
    color: #999;
  }
  .el-table--mini td {
    padding: 3px 0 !important;
  }
  .el-table__header-wrapper {
    // th {
    //   background: #ececec;
    // }

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
  width: 970px;
  height: 500px;
  display: inline-block;
  background: #fff;
  .structure-tree {
    width: 240px;
    height: 100%;
    max-height: 500px;
    border: 1px solid #ebeef5;
    float: left;
    overflow: auto;
  }
  .structure-main {
    float: left;
    width: calc(1020px - 240px - 65px);
    height: 100%;
    margin-left: 15px;
    .search-row {
      margin-bottom: 10px;
    }
    & > main > * {
      float: left;
      height: 100%;
    }
    .actions-box {
      height: 100%;
      min-height: 500px;
      min-width: 80px;
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
      width: calc(310px - 10px);
    }
    .selected-table {
      width: 300px;
    }
  }
}
</style>
