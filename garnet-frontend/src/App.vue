<template>
  <div id="app">
    <form>
      <template v-if="!loggedIn">
        <!-- ログイン前 -->
        <template v-if="!verifying">
          <label for="email">メールアドレス</label>
          <input type="text" id="email" name="email" v-model="email">
          <label for="password">パスワード</label>
          <input type="password" id="password" name="password" v-model="password">
          <button @click.prevent="register">登録</button>
          <button @click.prevent="login">ログイン</button>
        </template>

        <template v-else>
          <label for="email">メールアドレス</label>
          <input type="text" id="email" name="email" v-model="email" readonly>
          <label for="verifyCode">認証キー</label>
          <input type="text" id="verifyCode" name="verifyCode" v-model="verifyCode">
          <button @click.prevent="verify">認証</button>
        </template>
      </template>

      <template v-else>
        <!-- ログイン後 -->
        <button @click="logout">ログアウト</button>
      </template>
    </form>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'app',
  data() {
    return {
      loggedIn: false,
      email: '',
      password: '',
      verifying: false,
      verifyCode: '',
    };
  },
  methods: {
    register() {
      Auth.signUp(this.email, this.password)
      .then(() => { 
        alert('登録メールアドレスに検証コードを送信しました。');
        this.verifying = true;
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
        alert('エラーが発生しました');
        return;
      });
    },
    verify() {
      Auth.confirmSignUp(this.email, this.verifyCode)
      .then(() => { 
        alert('ユーザ登録が完了しました。');
        this.verifying = false;
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
        alert('検証に失敗しました');
        return;
      });
    },
    login() {

    },
    logout() {

    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
