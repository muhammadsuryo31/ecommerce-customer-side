import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registerError: '',
    loginError: '',
    addError: '',
    editError: '',
    products: [],
    carts: []
  },
  mutations: {
    setProduct (state, payload) {
      state.products = payload
    },
    setCart (state, payload) {
      state.carts = payload
    },
    loginError (state, payload) {
      if (Array.isArray(payload)) {
        state.loginError = ''
        for (let a = 0; a < payload.length; a++) {
          state.loginError += payload[a]
          if ((a + 1) !== payload.length) {
            state.loginError += ', '
          } else {
            state.loginError += '.'
          }
        }
      } else {
        state.loginError = payload
      }
    },
    registerError (state, payload) {
      if (Array.isArray(payload)) {
        state.registerError = ''
        for (let a = 0; a < payload.length; a++) {
          state.registerError += payload[a]
          if ((a + 1) !== payload.length) {
            state.registerError += ', '
          } else {
            state.registerError += '.'
          }
        }
      } else {
        state.registerError = payload
      }
    },
    addError (state, payload) {
      if (Array.isArray(payload)) {
        state.addError = ''
        for (let a = 0; a < payload.length; a++) {
          state.addError += payload[a]
          if ((a + 1) !== payload.length) {
            state.addError += ', '
          } else {
            state.addError += '.'
          }
        }
      } else {
        state.addError = payload
      }
    },
    editError (state, payload) {
      if (Array.isArray(payload)) {
        state.editError = ''
        for (let a = 0; a < payload.length; a++) {
          state.editError += payload[a]
          if ((a + 1) !== payload.length) {
            state.editError += ', '
          } else {
            state.editError += '.'
          }
        }
      } else {
        state.editError = payload
      }
    }
  },
  actions: {
    fetchProduct (context, payload) {
      axios({
        url: '/carts/products',
        method: 'GET'
      })
        .then(response => {
          context.commit('setProduct', response.data)
        })
        .catch((error) => {
          context.commit('loginError', error.response.data.message)
        })
    },
    fetchCart (context, payload) {
      axios({
        url: '/carts',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          // console.log(response)
          context.commit('setCart', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addCart (context, payload) {
      axios({
        url: `/carts/${payload}`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ammount: 1
        }
      })
        .then(response => {
          context.commit('addError', '')
          router.push('/')
        })
        .catch((error) => {
          console.log(error.response)
          context.commit('addError', error.response.data.message)
        })
    },
    addEditCart (context, payload) {
      axios({
        url: `/carts/${payload}`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ammount: 1
        }
      })
        .then(response => {
          context.commit('editError', '')
          context.dispatch('fetchCart')
          router.push('/cartlist').catch(err => { console.log(err) })
        })
        .catch((error) => {
          console.log(error.response)
          context.commit('editError', error.response.data.message)
        })
    },
    minusEditCart (context, payload) {
      axios({
        url: `/carts/${payload}`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ammount: -1
        }
      })
        .then(response => {
          context.commit('editError', '')
          context.dispatch('fetchCart')
          router.push('/cartlist').catch(err => { console.log(err) })
        })
        .catch((error) => {
          console.log(error.response)
          context.commit('editError', error.response.data.message)
        })
    },
    deleteCart (context, payload) {
      axios({
        url: `/carts/${payload}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.dispatch('fetchCart')
          router.push('/cartlist').catch(err => { console.log(err) })
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    login (context, payload) {
      axios({
        url: '/users/login',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          context.commit('loginError', '')
          router.push('/')
        })
        .catch((error) => {
          context.commit('loginError', error.response.data.message)
        })
    },
    register (context, payload) {
      axios({
        url: '/users/register',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          context.commit('registerError', '')
          router.push('/login')
        })
        .catch((error) => {
          context.commit('registerError', error.response.data.message)
        })
    },
    resetAllError (context, payload) {
      context.commit('registerError', '')
      context.commit('loginError', '')
      context.commit('addError', '')
    }
  },
  modules: {
  }
})
