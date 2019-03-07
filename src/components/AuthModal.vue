<template>
  <div :class="tab === 'none' ? 'modal' : 'modal is-active'">
    <div class="modal-background" @click="$emit('close')" />

    <div class="modal-content">
      <div class="box">
        <div class="tabs">
          <ul>
            <li :class="tab === 'register' ? 'is-active' : ''">
              <a @click.prevent="$emit('change', 'register')">アカウント登録</a>
            </li>
            <li :class="tab === 'login' ? 'is-active' : ''">
              <a @click.prevent="$emit('change', 'login')">ログイン</a>
            </li>
          </ul>
        </div>

        <form v-if="tab === 'register'" @submit.prevent="register">
          <div class="field">
            <label class="label">メールアドレス</label>
            <div class="control">
              <input class="input" type="email" placeholder="xxxxx@example.com" :value="email" @change="changeEmail">
            </div>
          </div>

          <div class="field">
            <label class="label">表示名</label>
            <div class="control">
              <input class="input" type="text" placeholder="がーねっと" :value="displayName" @change="changeDisplayName">
            </div>
          </div>

          <div class="field">
            <label class="label">パスワード</label>
            <div class="control">
              <input class="input" type="password" :value="password" @change="changePassword">
            </div>
          </div>

          <button class="button is-primary">
            登録
          </button>
        </form>

        <form v-if="tab === 'login'" @submit.prevent="login">
          <div class="field">
            <label class="label">メールアドレス</label>
            <div class="control">
              <input class="input" type="email" placeholder="xxxxx@example.com" :value="email" @change="changeEmail">
            </div>
          </div>

          <div class="field">
            <label class="label">パスワード</label>
            <div class="control">
              <input class="input" type="password" :value="password" @change="changePassword">
            </div>
          </div>

          <button class="button is-primary">
            ログイン
          </button>
        </form>
      </div>
    </div>

    <button class="modal-close is-large" @click="$emit('close')" />  
  </div>
</template>

<script>
export default {
  props: {
    tab: {
      type: String,
      required: true
    }
  },
  data: () => ({
    email: '',
    password: '',
    displayname: ''
  }),
  methods: {
    changeEmail(event) {
      this.email = event.target.value
    },
    changePassword(event) {
      this.password = event.target.value
    },
    changeDisplayName(event) {
      this.displayname = event.target.value
    },
    register() {
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        displayName: this.displayname
      })
    },
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
