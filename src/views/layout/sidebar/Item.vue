<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<i class={['fa', icon]} aria-hidden="true" />)
    }

    if (title) {
      vnodes.push(<span slot='title' style={{ paddingLeft: '5px' }}> {(title)}</span>)
    }
    return vnodes
  }
}
</script>
