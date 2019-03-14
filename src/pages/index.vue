<template>
  <main>
    <section class="section">
      <div class="container">
        <chart :height="100" class="chart" />

        <div class="tabs">
          <ul>
            <li
              v-for="plant in plants"
              :key="plant.id"
              :class="selectedPlant && plant.id === selectedPlant.id ? 'is-active' : ''"
            >
              <a @click.prevent="switchTab(plant)">
                <font-awesome-icon icon="leaf" class="has-text-primary" />&nbsp;
                <span>{{ plant.name }}</span>
              </a>
            </li>
            <li :class="(!plants || !plants.length) ? 'is-active' : ''">
              <a @click.prevent="showModal('add')">
                <font-awesome-icon icon="plus" />&nbsp;
                <span>観葉植物を登録する</span>
              </a>
            </li>
          </ul>
        </div>
        <div v-if="!error && plants === null">
          <!-- 読み込み中 -->
          <font-awesome-icon icon="spinner" spin />
          <span>読み込み中</span>
        </div>
        <div v-if="error">
          <!-- エラー発生 -->
          <p>
            <font-awesome-icon icon="exclamation-triangle" />&nbsp;{{ error }}
          </p>
        </div>
        <div v-if="!error && plants && !plants.length">
          <!-- 観葉植物なし -->
          <p>
            <font-awesome-icon icon="info" />&nbsp;観葉植物が登録されていません。
          </p>
        </div>

        <plant-detail
          v-if="selectedPlant"
          :plant="selectedPlant"
          @edit-plant="editSelectedPlant"
          @delete-plant="deleteSelectedPlant"
        />
      </div>
    </section>

    <plant-modal
      v-if="modal.show"
      :show="modal.show"
      :mode="modal.mode"
      :plant-id="modal.plantId"
      :name="modal.input.name"
      @change-name="modalChangeName"
      @close="closeModal"
    />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Chart from '../components/Chart'
import PlantDetail from '../components/PlantDetail'
import PlantModal from '../components/PlantModal'

export default {
  components: {
    PlantDetail,
    PlantModal,
    Chart
  },
  data: () => ({
    modal: {
      show: false,
      mode: null,
      plantId: null,
      input: {
        name: null
      }
    },
    selectedPlant: null
  }),
  computed: {
    ...mapGetters(['status', 'plants', 'error'])
  },
  watch: {
    plants(value) {
      if (value && value.length) {
        this.switchTab(value[0])
      }
    }
  },
  created() {
    this.getPlants()
  },
  methods: {
    showModal(mode, plant) {
      this.modal = {
        show: true,
        mode: mode,
        plantId: plant ? plant.id : null,
        input: { name: plant ? plant.name : null }
      }
    },
    editSelectedPlant(plant) {
      this.showModal('edit', plant)
    },
    deleteSelectedPlant(plant) {
      this.showModal('delete', plant)
    },
    closeModal(autoClose) {
      if (autoClose) {
        this.getPlants()
      }
      this.modal = {
        show: false,
        mode: null
      }
    },
    modalChangeName(name) {
      this.modal.input.name = name
    },
    switchTab(plant) {
      this.selectedPlant = plant
    },
    getPlants() {
      this.$store.dispatch('getPlants')
    }
  }
}
</script>
