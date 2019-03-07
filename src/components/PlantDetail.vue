<template>
  <div>
    <section class="hero is-small is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            さんぷる植物
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-two-thirds">
            <chart :height="100" />
          </div>
          <div class="column is-one-third">
            <p>植物の詳細(ID: {{ detailId }})</p>
            <a @click.prevent="$emit('close-detail')">一覧に戻る</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Chart from './Chart'
export default {
  components: {
    Chart
  },
  props: {
    detailId: {
      type: String,
      default: null
    }
  }
}
</script>
