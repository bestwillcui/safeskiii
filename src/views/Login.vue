<template>
  <div class="login">
    <div v-if="isSignedIn" class="settings">
      <TopBar/> 
      <Settings/>
    </div>
    <div v-else class="form-container">
      <div id="heading">
        <div id='title'> Safeskiii </div> 
        <div id='subtitle'> The Alta Experience, 2020 </div>
      </div>
      <SignIn/>
      <SignUp/>
    </div>
    <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import Settings from '../components/Settings.vue';
import { eventBus } from "../main";

export default {
  name: 'Login',

  components: {
    TopBar,
    SignIn,
    SignUp,
    Settings
  },

  data() {
    return {
      isSignedIn: false,
      messages: []
    }
  },

  created: function() {
    let authenticated = this.$cookie.get('safeskiii-auth');
    if (authenticated) {
      this.isSignedIn = true;
    }

    eventBus.$on("signin-success", (bodyContent) => {
      this.$cookie.set('safeskiii-auth', bodyContent.username);
      this.isSignedIn = true;
      this.messages.push("You have been signed in!");
      this.clearMessages();
      this.$router.push({ name: 'Home' });
    });
    
    eventBus.$on("signout-success", () => {
      this.$cookie.set('safeskiii-auth', '');
      this.isSignedIn = false;
      this.messages.push("You have been signed out!");
      this.clearMessages();
    });

    eventBus.$on("delete-success", () => {
      this.$cookie.set('safeskiii-auth', '');
      this.isSignedIn = false;
      this.messages.push("You have deleted your account :(");
      this.clearMessages();
    });

    eventBus.$on("signup-success", () => {
      this.messages.push("You have been signed up! Sign in to continue.");
      this.clearMessages();
    });

    eventBus.$on("username-change-success", (bodyContent) => {
      this.$cookie.set('safeskiii-auth', bodyContent.username);
      this.messages.push("You have changed your username!");
      this.clearMessages();
    });

    eventBus.$on("password-change-success", (bodyContent) => {
      this.$cookie.set('safeskiii-auth', bodyContent.password);
      this.messages.push("You have changed your password!");
      this.clearMessages();
    });
  },
  methods: {
    clearMessages: function() {
      setInterval(() => {
        this.messages = [];
      }, 5000);
    }
  }
}
</script>

<style>
html {
  /* height: 100%; */
  /* width: 100% */
  background-image: url('../assets/alta.png');
  background-repeat: no-repeat;
  background-size: cover;
}

html::before {
  /* content: "";
  background-image: url('../assets/alta.png');
  background-repeat: no-repeat; */

  /* display: block; */
  margin-left: auto;
  margin-right: auto;
  /* width: 60%;  */

  /* background-size: cover;
  opacity: 0.75;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  
  height: 1000px; */
}

</style>

<style scoped>

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 6rem;
}

.login {
  /* background-color: white; */
}

.settings {
  margin: 1%;
  background-color: white;
  height: 800px;
}

#title {
  color: black;
  font-size: 100px;
}

#subtitle {
  color: black;
  margin-bottom: 100px;
  font-size: 30px;
}

#heading {
  /* background-color: white;
  border: 1px solid black;
  display: inline-block; */
  position: relative;
  margin-top: 4rem;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>