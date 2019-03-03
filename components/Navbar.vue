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
            <a class="button is-primary" @click.prevent="showRegisterModal">
              <strong>アカウント登録</strong>
            </a>
            
            <a class="button is-light" @click.prevent="showLoginModal">
              ログイン
            </a>
          </div>
        </div>
      </div>
    </div>

    <auth-modal
      :tab="authModalTab"
      @change="changeAuthModalTab"
      @close="closeAuthModal"
    />
  </header>
</template>

<script>
import AuthModal from './AuthModal'

export default {
  components: {
    AuthModal
  },
  data() {
    return {
      showMenu: false,
      authModalTab: 'none'
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
    },
    showLoginModal() {
      this.authModalTab = 'login'
    },
    showRegisterModal() {
      this.authModalTab = 'register'
    },
    changeAuthModalTab(tab) {
      this.authModalTab = tab
    },
    closeAuthModal() {
      this.authModalTab = 'none'
    }
  }
}
</script>
