<template>
  <main>
    <section class="section">
      <div class="container">
        <div class="tabs">
          <ul>
            <li
              v-for="_plant in plants"
              :key="_plant.id"
              :class="plant && plant.id === _plant.id ? 'is-active' : ''"
            >
              <a @click.prevent="switchTab(_plant.id)">
                <font-awesome-icon icon="leaf" />&nbsp;
                <span>{{ _plant.name }}</span>
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
          <font-awesome-icon icon="warning" />
          <p>{{ error }}</p>
        </div>
        <div v-if="!error && plants && !plants.length">
          <!-- 観葉植物なし -->
          <p>
            <font-awesome-icon icon="info" />
            <span>観葉植物が登録されていません。</span>
          </p>
        </div>

        <plant-detail v-if="plant" />
      </div>
    </section>

    <plant-modal
      :show="shownModal"
      :mode="modalMode"
      :name="modalPlantName"
      :plant-id="modalPlantId"
      @change-name="modalChangeName"
      @close="closeModal"
    />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import PlantDetail from '../components/PlantDetail'
import PlantModal from '../components/PlantModal'

export default {
  components: {
    PlantDetail,
    PlantModal
  },
  data: () => ({
    shownModal: false,
    modalMode: null,
    modalPlantName: null,
    modalPlantId: null
  }),
  computed: {
    ...mapGetters(['status', 'plants', 'plant', 'error'])
  },
  watch: {
    plants(value) {
      if (value && value.length) {
        this.getPlant(value[0].id)
      }
    }
  },
  created() {
    this.getPlants()
  },
  methods: {
    showModal(mode) {
      this.shownModal = true
      this.modalMode = mode
    },
    closeModal() {
      this.shownModal = false
      this.modalMode = null
    },
    modalChangeName(name) {
      this.modalPlantName = name
    },
    switchTab(id) {
      this.$store.dispatch('getPlant', { id: id })
    },
    getPlants() {
      this.$store.dispatch('getPlants')
    },
    getPlant(id) {
      this.$store.dispatch('getPlant', { id: id })
    }
  }
}
</script>
