<template>
  <header class="navbar">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item">
        <font-awesome-icon icon="leaf" />
        <span>Garnet</span>
      </nuxt-link>

      <a class="navbar-burger burger" :class="{'is-active': showMenu}" @click="toggleMenu">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="main-menu" class="navbar-menu" :class="{'is-active': showMenu}">
      <div class="navbar-start">
        <nuxt-link to="/" class="navbar-item">
          ホーム
        </nuxt-link>

        <nuxt-link to="/plants" class="navbar-item">
          みんなの植物
        </nuxt-link>

        <nuxt-link to="/plants/mine" class="navbar-item">
          私の植物
        </nuxt-link>

        <nuxt-link to="/plants/register" class="navbar-item">
          機器登録
        </nuxt-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <nuxt-link to="/register" class="button is-primary">
              <strong>登録</strong>
            </nuxt-link>
            
            <nuxt-link to="/login" class="button is-light">
              ログイン
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  watch: {
    $route() {
      this.showMenu = false
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>
