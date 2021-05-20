import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'

const TableMixin = {
  data() {
    return {
      tableHeight: null,
      mergeField: [], // 要合并的字段 ['name','id']
      keyField: [], // 合并关键字段['id']
      mergeData: [] // 合并值
    }
  },
  watch: {
    // 解决当路由使用同一组件不触发数据更新的问题
    $route: {
      handler: 'renderPage',
      immediate: true // 代表声明了之后，立刻执行handler方法
    }
    // 当同一路由query参数不一样
    // '$route.query.id':{
    //   immediate: true,
    //   handle(_new, _old){
    //     // do something ...
    //   }
    // }
  },
  computed: {
    ...mapGetters(['login_user']),
    variables() {
      return variables
    }
  },
  methods: {
    renderPage(_new, _old) {
      // 规定每个页面初始化页面数据方法必须为initPageData
      this.initPageData && this.initPageData()
      this.getTableHeight()
    },
    getTableHeight() {
      this.tableHeight = this.$getTableHeight(90 + parseInt(variables.navBarHeight))
    },
    // 纵向合并单元格
    mergeSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.mergeField.indexOf(column.property) > -1) {
        return this.mergeData[rowIndex][column.property + 'Span']
      }
    }
  },
  mounted() {
    this.getTableHeight()
    window.addEventListener('resize', this.getTableHeight)
  },
  beforeMount() {
    window.removeEventListener('resize', this.getTableHeight)
  }
}
export default TableMixin
