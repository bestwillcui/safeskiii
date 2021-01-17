<template>
  <div class="settings">
    <h1 class="info">My Info</h1>
    <form v-on:submit.prevent="changeUsername" method="post">
      <input id='username' v-model.trim='newUsername' type='text' name='username' placeholder="New Username">
      <br/>
      <input type='submit' value='Update Username' class="change">
    </form>
    <form v-on:submit.prevent="changePassword" method="post">
      <input id='password' v-model.trim='newPassword' type='password' name='password' placeholder="New Password">
      <br/>
      <input type='submit' value='Update Password' class="change">
    </form>
    <div class="buttons">
      <button v-on:click="deleteAccount" class="change">Delete Account</button>
      <button v-on:click="signOut" class="change">Sign Out</button>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "Settings",
  
  data() {
    return {
      errors: [],
      newUsername: "",
      newPassword: ""
    }
  },

  methods: {
    changeUsername: function() {
      const bodyContent = { username: this.newUsername }
      axios
        .put(`/api/users/username`, bodyContent)
        .then(() => {
          // handle success
          eventBus.$emit('username-change-success', bodyContent);
        })
        .catch(err => {
          // handle error
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          // always executed
          this.resetUsernameForm();
        });
    },

    changePassword: function() {
      const bodyContent = { password: this.newPassword };
      axios
        .put("/api/users/password", bodyContent)
        .then(() => {
          // handle success
          eventBus.$emit('password-change-success', bodyContent);
        })
        .catch(err => {
          // handle error
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          // always executed
          this.resetPasswordForm();
        });
    },

    signOut: function() {
      axios.delete('/api/users/session')
        .then(() => {
          // handle success
          eventBus.$emit('signout-success', true);
        })
        .catch(() => {
          // Still sign User out so they have to sign in again.
          eventBus.$emit('signout-success', true);
        })
    },

    deleteAccount: function() {
      axios.delete('/api/users')
        .then(() => {
          // handle success
          eventBus.$emit('delete-success', true);
        })
        .catch(() => {
          // Sign User out so they have to sign in again.
          eventBus.$emit('signout-success', true);
        })
    },

    resetUsernameForm: function() {
      this.newUsername = "";
    },

    resetPasswordForm: function() {
      this.newPassword = "";
    },
  }
}
</script>

<style scoped>
#username, #password {
  width: 300px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 18px;
  font-family: "Red Hat Text";
}

#password {
  margin-top: 2rem;
}

.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* position: relative; */
  /* background-color: white; */
}

.info {
  font-size: 64px;
  margin: 2rem 0;
}

.buttons {
  display: flex;
  margin: 4rem;
}

.change {
  color: white;
  margin: 1rem 2rem;
  font-size: 16px;
  font-weight: 700;
  
  cursor: pointer;
  background-color: #006494;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: transparent;
  border-radius: 15px;
  padding: 12px 32px;
  width: 200px;
  text-align: center;
  font-family: "Red Hat Text";
}

.change:hover {
    opacity: 0.8;
    color: white;
}
</style>
