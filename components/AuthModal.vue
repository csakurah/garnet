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

        <form v-if="tab === 'register'">
          <div class="field">
            <label class="label">メールアドレス</label>
            <div class="control">
              <input class="input" type="email" placeholder="xxxxx@example.com">
            </div>
          </div>

          <div class="field">
            <label class="label">パスワード</label>
            <div class="control">
              <input class="input" type="password">
            </div>
          </div>

          <a class="button is-primary">登録</a>
        </form>

        <form v-if="tab === 'login'">
          <div class="field">
            <label class="label">メールアドレス</label>
            <div class="control">
              <input class="input" type="email" placeholder="xxxxx@example.com">
            </div>
          </div>

          <div class="field">
            <label class="label">パスワード</label>
            <div class="control">
              <input class="input" type="password">
            </div>
          </div>

          <a class="button is-primary">ログイン</a>
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
  }
}
</script>
