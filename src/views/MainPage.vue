<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <Login/> -->
    <TopBar/> 

    <div id="body">
      <!-- hi {{ users}} -->
      <div id="leftbar"> <LeftBar v-bind:curBusiness='this.curBusiness' @changeBusiness="curBusiness = $event"/> </div>
      <div id="maincontent"> <MainContent v-bind:curBusiness='this.curBusiness'/> </div>
    </div>
    
  </div>
</template>

<script>
  // import HelloWorld from './components/HelloWorld.vue'
  import LeftBar from '../components/LeftBar.vue'
  import TopBar from '../components/TopBar.vue'
  import MainContent from '../components/MainContent.vue'
  // import app from '../main.js'

  import Firebase from 'firebase'

  export default {
    name: 'App',
    components: {
      // HelloWorld,
      LeftBar,
      TopBar,
      MainContent
    },
    methods: {
      // changeBusiness(event) {
      //   console.log("hi", event);
      // }
    },
    data: function() {
      return {
        users: [],
        newCat: null,
        curBusiness: "Alta Ski Resort"
      }
    },

    created: function() {
      const db = Firebase.firestore()
      let authenticated = this.$cookie.get('safeskiii-auth');
      console.log(authenticated);
      if (!authenticated || authenticated === undefined || authenticated.length == 0){
        // If not authenticated, redirect to login page.
        this.$router.push({ name: 'Login' });
        console.log('not signed in :(');
      }

      // this unbinds any previously bound reference
      this.$bind('users', db.collection('users')).then(users => {
      this.users === users
      // todos are ready to be used
      // if it contained any reference to other document or collection, the
      // promise will wait for those references to be fetched as well

      // you can unbind a property anytime you want
      // this will be done automatically when the component is destroyed
      // this.$unbind('users')
      })
    }
  }
</script>

<style>
html {
  /* background-color: white;
  background-image: none; */
}

body {
  /* background-color: white; */
  /* margin: 1%; */
}

</style>

<style scoped>
@font-face {
  font-family: "Odibee Sans";
  src: local("Odibee Sans"),
   url(../../Odibee_Sans/OdibeeSans-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Red Hat Text";
  src: local("Red Hat Text"),
   url(../../Red_Hat_Text/RedHatText-Regular.ttf) format("truetype");
}

div {
  background-color: white;
  margin: 1%;
  position: relative;
}

#app {
  font-family: "Odibee Sans", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;

  display: flex;
  flex-direction: column;
}

#body {
  display: flex;
  justify-content: space-around;
}

#leftbar {
  font-family: "Red Hat Text";
  margin-top: -30px;
  width: 30%;
}

#maincontent{
  width: 70%;
  margin-top: -10px;
}

</style>
