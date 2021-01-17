import Vue from 'vue'
import VueCookie from 'vue-cookie'
import App from './App.vue'
import router from './router'
import Firebase from 'firebase'
import { firestorePlugin } from 'vuefire'

Vue.use(Firebase);
Vue.use(firestorePlugin);
Vue.use(VueCookie);

export const eventBus = new Vue();

var firebaseConfig = {
  apiKey: "AIzaSyBS5qxoqB7Z7kLovCwuMMEcgdfItWt-c-I",
  authDomain: "safeskiii.firebaseapp.com",
  projectId: "safeskiii",
  storageBucket: "safeskiii.appspot.com",
  messagingSenderId: "673812457617",
  appId: "1:673812457617:web:f57fc91cac0704a9b83730",
  measurementId: "G-CQN9FWRGMK"
};

Firebase.initializeApp(firebaseConfig); 

Vue.config.productionTip = false

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// var firebaseConfig = {
//     apiKey: "AIzaSyBS5qxoqB7Z7kLovCwuMMEcgdfItWt-c-I",
//     authDomain: "safeskiii.firebaseapp.com",
//     projectId: "safeskiii",
//     storageBucket: "safeskiii.appspot.com",
//     messagingSenderId: "673812457617",
//     appId: "1:673812457617:web:f57fc91cac0704a9b83730",
//     measurementId: "G-CQN9FWRGMK"
// };
// // Initialize Firebase

// // export const app = Firebase.initializeApp(firebaseConfig);
// Firebase.initializeApp(firebaseConfig);
Firebase.analytics();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
