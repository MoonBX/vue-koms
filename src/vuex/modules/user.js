const state = {
  count: 0
}

const actions = {
  increment (context) {
    context.commit('increment')
  }
}

const mutations = {
  increment (state) {
    state.count++
  }
}

export default {
  state,
  actions,
  mutations
}
