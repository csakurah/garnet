import firebase from '~/plugins/firebase'
// import { firebaseMutations, firebaseAction } from 'vuexfire'

export const state = () => ({
  authStatus: 'loading',
  user: null,
  error: null,
  plants: [],
  plantlog: []
})

export const getters = {
  user: state => state.user,
  authStatus: state => state.authStatus
}

export const actions = {
  async login({ commit }, payload) {
    try {
      const userCredential = await firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(
          payload.email,
          payload.password
        )

      commit('setUser', userCredential.user)
      commit('setError', null)
    } catch (error) {
      commit('setError', error)
    }
  },
  async register({ commit }, payload) {
    try {
      const userCredential = await firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(
          payload.email,
          payload.password
        )

      commit('setUser', userCredential.user)
      commit('setError', null)
    } catch (error) {
      commit('setError', error)
    }
  },
  async logout({ commit }) {
    await firebase.auth().signOut()
    commit('setUser', null)
  },
  getAuthState({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      commit('setUser', user || null)
    })
  }
}

export const mutations = {
  setUser(state, _user) {
    if (_user) {
      const user = {
        displayName: _user.displayName,
        email: _user.email,
        emailVerified: _user.emailVerified,
        photoURL: _user.photoURL
      }
      state.user = user
      state.authStatus = 'loggedIn'
    } else {
      state.user = null
      state.authStatus = 'notLoggedIn'
    }
  },
  setError(state, error) {
    state.error = error
  }
}
