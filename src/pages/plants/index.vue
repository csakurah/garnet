<template>
  <main>
    <plant-list
      v-if="!hasShownDetail"
      @show-detail="showDetail"
    />
    <plant-detail
      v-if="hasShownDetail"
      :detail-id="detailId"
      @close-detail="closeDetail"
    />
  </main>
</template>

<script>
import PlantList from '~/components/PlantList'
import PlantDetail from '~/components/PlantDetail'

export default {
  components: {
    PlantList,
    PlantDetail
  },
  data: () => ({
    hasShownDetail: false,
    detailId: null
  }),
  methods: {
    showDetail(id) {
      this.hasShownDetail = true
      this.detailId = id
    },
    closeDetail(id) {
      this.hasShownDetail = false
      this.detailId = null
    }
  }
}
</script>
