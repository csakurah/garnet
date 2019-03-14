import axios from 'axios'
import qs from 'qs'
const API_URL = 'http://localhost:5001/garnet-d44e7/us-central1/'

export const state = () => ({
  status: null,
  plants: null,
  error: null
})

export const getters = {
  status: state => state.status,
  plants: state => state.plants,
  error: state => state.error
}

export const actions = {
  async getPlants({ commit }) {
    commit('setStatus', {
      action: 'getPlants',
      state: 'retrieving'
    })
    try {
      const res = await axios.get(API_URL + 'plants')
      if (res.data.status !== 'OK') {
        throw new Error('観葉植物一覧の取得に失敗しました。')
      }
      commit('setStatus', {
        action: 'getPlants',
        state: 'respond-with-succeed'
      })
      commit('setPlants', res.data.plants)
    } catch (error) {
      commit('setStatus', {
        action: 'getPlants',
        state: 'respond-with-error',
        error: error.message
      })
    }
  },
  async addPlant({ commit }, payload) {
    commit('setStatus', {
      action: 'addPlant',
      state: 'retrieving'
    })
    commit('setError', null)
    try {
      const res = await axios.post(
        API_URL + 'plants',
        qs.stringify({
          name: payload.name
        })
      )
      if (res.data.status !== 'OK') {
        throw new Error('観葉植物の追加に失敗しました。')
      }
      commit('setStatus', {
        action: 'addPlant',
        state: 'respond-with-succeed'
      })
    } catch (error) {
      commit('setStatus', {
        action: 'addPlant',
        state: 'respond-with-error',
        error: error.message
      })
    }
  },
  async editPlant({ commit }, payload) {
    commit('setStatus', {
      action: 'editPlant',
      state: 'retrieving'
    })
    try {
      const res = await axios.put(
        API_URL + 'plants',
        qs.stringify({
          id: payload.id,
          name: payload.name
        })
      )
      if (res.data.status !== 'OK') {
        throw new Error('観葉植物の更新に失敗しました。')
      }
      commit('setStatus', {
        action: 'editPlant',
        state: 'redpond-with-success'
      })
    } catch (error) {
      commit('setStatus', {
        action: 'editPlant',
        state: 'respond-with-error',
        error: error.message
      })
    }
  },
  async deletePlant({ commit }, payload) {
    commit('setStatus', {
      action: 'deletePlant',
      state: 'retrieving'
    })
    try {
      const res = await axios.delete(
        API_URL + 'plants',
        qs.stringify({
          id: payload.id
        })
      )
      if (res.status !== 'OK') {
        throw new Error('観葉植物の削除に失敗しました。')
      }
      commit('setStatus', {
        action: 'deletePlant',
        state: 'redpond-with-success'
      })
    } catch (error) {
      commit('setStatus', {
        action: 'deletePlant',
        state: 'redpond-with-error',
        error: error.message
      })
    }
  }
}

export const mutations = {
  setStatus(state, status) {
    state.status = status
  },
  setPlants(state, plants) {
    state.plants = plants
  },
  setError(state, error) {
    state.error = error
  }
}
