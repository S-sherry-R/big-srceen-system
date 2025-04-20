import { createStore } from 'vuex'

export default createStore({
  state: {
    year: '2025',
    month: '01',
    company: ''
  },
  mutations: {
    setYear(state,val){
      state.year = val
    },
    setMonth(state,val){
      state.month = val
    },
    setCompany(state,val){
      state.company = val
    }
  },
  actions: {
  },
  modules: {
  }
})
