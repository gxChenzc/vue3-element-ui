import { getCookie, UserKey } from '@/utils/Cookie'

const getters = {
  sidebar: state => state.app.sidebar,
  login_user: () => getCookie(UserKey)
  // permission_routers: state => state.permission.routers,
}
export default getters
