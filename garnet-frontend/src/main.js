import Vue from 'vue'
import App from './App.vue'

import Amplify from 'aws-amplify'
Amplify.configure({
  Auth: {
      region: 'us-east-2',
      userPoolId: 'us-east-2_w4g8a6Nrd',
      userPoolWebClientId: '2cumbbluh12hmlelet3gm03kda',
      identityPoolId: 'us-east-2:e5ca79ef-8a9b-4e16-84c5-7a9f0dc845d7',
  },
  API: {
    endpoints: [
      {
          name: 'garnet-api',
          endpoint: 'https://gu0i8v4kjk.execute-api.us-east-2.amazonaws.com/dev',
          region: 'us-east-2'
      },
    ],
  },
});


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
