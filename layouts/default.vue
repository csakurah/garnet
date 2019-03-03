<template>
  <div>
    <app-navbar />
    <nuxt />
    <app-footer />
  </div>
</template>

<script>
import AppNavbar from '../components/Navbar'
import AppFooter from '../components/Footer'

export default {
  components: {
    AppNavbar,
    AppFooter
  }
}
</script>
