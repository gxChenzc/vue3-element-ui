/**
 *
 * 用于数据行行合并
 * @author shijy
 *
 */
export default {
  dataConvertToMerge: function (
    list,
    mergeField, // 要合并的字段名称  ['id','name']
    keyField // ['name'] 唯一值(增加改字段的判断，防止返回的数据没有按关键字段排序出现错位的情况)
  ) {
    // let mList = new Array(list.length) // 要返回的列表
    // // 给mList空集合数组，与list行数相同
    // mList.fill({}, 0, list.length - 1)
    let mList = []
    list.forEach(p => {
      mList.push({})
    })
    // 逐一字段计算
    for (var field of mergeField) {
      var k = 0
      while (k < list.length) {
        // 根据要合并的字段
        list[k][field + 'RowSpan'] = 1
        list[k][field + 'Span'] = [list[k][field + 'RowSpan'], 1]
        for (var i = k + 1; i <= list.length - 1; i++) {
          let flag = true
          for (let kf of keyField) {
            if (list[k][kf] !== list[i][kf]) {
              flag = false
              break
            }
          }
          if (!flag) break // 遇到key值不相同的跳出
          if (list[k][field] === list[i][field] && list[k][field] !== '') {
            list[k][field + 'RowSpan']++
            list[k][field + 'Span'] = [list[k][field + 'RowSpan'], 1]
            list[i][field + 'RowSpan'] = 1
            list[i][field + 'Span'] = [0, 0]
          } else {
            break
          }
        }
        k = i
      }
    }
    return list
  }
}
