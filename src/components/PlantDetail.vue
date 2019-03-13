<template>
  <div>
    <div class="columns">
      <div class="column">
        <h2 class="title is-5">
          情報
        </h2>
        <table class="table is-fullwidth">
          <tr>
            <th>ID</th>
            <td>{{ plant.id }}</td>
          </tr>
          <tr>
            <th>名前</th>
            <td>{{ plant.name }}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <h2 class="title is-5">
          記録
        </h2>
        <template v-if="plant.records.length">
          <table class="table">
            <tr>
              <th>時刻</th>
              <th>湿度</th>
            </tr>
            <tr
              v-for="record in plant.records"
              :key="record.id"
            >
              <td>{{ record.recorded_at }}</td>
              <td>{{ record.humidity }}%</td>
            </tr>
          </table>
        </template>
        <template v-else>
          <tr>
            <td colspan="2">
              まだ記録がありません。
            </td>
          </tr>
        </template>
      </div>
    </div>

    <div class="buttons">
      <button class="button" @click.prevent="editPlant">
        編集
      </button>
      <button class="button is-danger" @click.prevent="deletePlant">
        削除
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    plant: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['status'])
  },
  methods: {
    editPlant() {
      this.$emit('edit-plant', this.plant)
    },
    deletePlant() {
      this.$emit('delete-plant', this.plant)
    }
  }
}
</script>
