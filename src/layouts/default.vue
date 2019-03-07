<template>
  <div>
    <app-navbar />
    <nuxt />
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppNavbar from '../components/Navbar'
import AppFooter from '../components/Footer'

export default {
  components: {
    AppNavbar,
    AppFooter
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.$store.dispatch('getAuthState')
  },
  methods: {}
}
</script>
