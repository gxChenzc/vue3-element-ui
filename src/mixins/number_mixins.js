const NumberMixin = {
  methods: {
    inputNum(e, obj, key, fixLength) {
      let val = e.target.value.toString()
      if (!/^\d(\.[0-9])?$/.test(val)) {
        let valArr = val.split('.')
        if ((valArr[1] || '').length > 2) {
          obj[key] = valArr[0] + '.' + valArr[1].substr(0, fixLength || 1)
        } else {
          let _val = Number.parseFloat(val)
          obj[key] = _val + '' !== 'NaN' ? _val : ''
        }
      }
    }
  }
}
export default NumberMixin
