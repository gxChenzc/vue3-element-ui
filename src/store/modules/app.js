// import Cookies from 'js-cookie'

const app = {
  state: {
    left_nav_menu_show: false,
    isLoading: false,
    loadingText: ''
    // size: Cookies.get('size') || 'medium'
  },
  mutations: {
    LOADING_TOGGLE: (state, data) => {
      state.isLoading = !!data.isLoading
      state.loadingText = data.message || ''
    },
    TOGGLE_LEFTMENU: (state, flag) => {
      if (flag === undefined) {
        state.left_nav_menu_show = !state.left_nav_menu_show
      } else {
        state.left_nav_menu_show = flag
      }
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    LoadingState({ commit }, payload) {
      commit('LOADING_TOGGLE', payload)
    }
  }
}

export default app
