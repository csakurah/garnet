import axios from 'axios'
import qs from 'qs'
const API_URL = 'http://localhost:5001/garnet-d44e7/us-central1/'

export const state = () => ({
  status: null,
  plants: null,
  plant: null,
  error: null
})

export const getters = {
  status: state => state.status,
  plants: state => state.plants,
  plant: state => state.plant,
  error: state => state.error
}

export const actions = {
  async getPlants({ commit }) {
    commit('setStatus', 'retrieving')
    commit('setError', null)
    try {
      const res = await axios.get(API_URL + 'plants')
      if (res.data.status !== 'OK') {
        throw new Error('観葉植物一覧の取得に失敗しました。')
      }
      commit('setStatus', 'respond-with-success')
      commit('setPlants', res.data.plants)
    } catch (error) {
      commit('setStatus', 'respond-with-error')
      commit('setError', error.message)
    }
  },
  async getPlant({ commit }, payload) {
    commit('setStatus', 'retrieving')
    commit('setError', null)
    try {
      const res = await axios.get(API_URL + 'plants?id=' + payload.id)
      if (res.data.status !== 'OK') {
        throw new Error('観葉植物一覧の取得に失敗しました。')
      }
      commit('setStatus', 'respond-with-success')
      commit('setPlant', res.data)
    } catch (error) {
      commit('setStatus', 'respond-with-error')
      commit('setError', error.message)
    }
  },
  async addPlant({ commit }, payload) {
    commit('setStatus', 'retrieving')
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
      commit('setStatus', 'respond-with-success')
    } catch (error) {
      commit('setStatus', 'respond-with-error')
      commit('setError', error.message)
    }
  },
  async editPlant({ commit }, payload) {
    commit('setStatus', 'retrieving')
    commit('setError', null)
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
      commit('setStatus', 'respond-with-success')
    } catch (error) {
      commit('setStatus', 'respond-with-error')
      commit('setError', error.message)
    }
  },
  async deletePlant({ commit }, payload) {
    commit('setStatus', 'retrieving')
    commit('setError', null)
    try {
      const res = await axios.get(
        API_URL + 'plants',
        qs.stringify({
          id: payload.id
        })
      )
      if (res.status !== 'OK') {
        throw new Error('観葉植物の削除に失敗しました。')
      }
      commit('setStatus', 'respond-with-success')
    } catch (error) {
      commit('setStatus', 'respond-with-error')
      commit('setError', error.message)
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
  setPlant(state, plant) {
    state.plant = plant
  },
  setError(state, error) {
    state.error = error
  }
}
