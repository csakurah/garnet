<template>
  <div>
    <template v-if="status === 'retrieving'">
      <font-awesome-icon icon="spinner" spin />
      <span>読み込み中</span>
    </template>
    <template v-if="status === 'respond-with-success'">
      <ul>
        <li>ID: {{ plant.id }}</li>
        <li>名前: {{ plant.name }}</li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['status', 'plant'])
  }
}
</script>
