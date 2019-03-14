import axios from 'axios'
import moment from 'moment'
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
      const res = await axios.get(API_URL + 'getPlants')
      if (res.data.status !== 'OK') {
        throw new Error(res.data.error)
      }

      // 時差補正
      let plants = []
      if (res.data.plants) {
        plants = res.data.plants.map(plant => {
          let records = []
          if (plant.records) {
            records = plant.records.map(record => {
              const newRecord = Object.assign({}, record)
              const recordedAt = record.recorded_at // UTC-3
              const calibratedRecordedAt = moment(recordedAt) // UTC+9
                .add(12, 'hours')
                .format('YYYY-MM-DD HH:mm:ss')
              newRecord.recorded_at = calibratedRecordedAt

              return newRecord
            })
          }
          const newPlant = Object.assign({}, plant)
          newPlant.records = records
          return newPlant
        })
      }

      commit('setStatus', {
        action: 'getPlants',
        state: 'respond-with-success'
      })
      commit('setPlants', plants)
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
        API_URL + 'createPlant',
        qs.stringify({
          name: payload.name
        })
      )
      if (res.data.status !== 'OK') {
        throw new Error(res.data.error)
      }
      commit('setStatus', {
        action: 'addPlant',
        state: 'respond-with-success'
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
      const res = await axios.post(
        API_URL + 'updatePlant',
        qs.stringify({
          id: payload.id,
          name: payload.name
        })
      )
      if (res.data.status !== 'OK') {
        throw new Error(res.data.error)
      }
      commit('setStatus', {
        action: 'editPlant',
        state: 'respond-with-success'
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
      const res = await axios.post(
        API_URL + 'deletePlant',
        qs.stringify({
          id: payload.id
        })
      )
      if (res.data.status !== 'OK') {
        throw new Error(res.data.error)
      }
      commit('setStatus', {
        action: 'deletePlant',
        state: 'respond-with-success'
      })
    } catch (error) {
      commit('setStatus', {
        action: 'deletePlant',
        state: 'respond-with-error',
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
