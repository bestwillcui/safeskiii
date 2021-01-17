<template>
  <div>
    <form id="sign-up" class='component' v-on:submit.prevent="signUp" method="post">
      <input id='username' v-model.trim='username' type='text' name='username' placeholder="Username">
      <input id='password' v-model.trim='password' type='password' name='password' placeholder="Password">
      <br/>
      <input id='code' v-model.trim='code' type='text' name='code' placeholder="Code">
      <br/>
      <input type='submit' value='Create Account' class="button">
    </form>
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
  name: "SignUp",

  data() {
    return {
      errors: [],
      username: "",
      password: "",
      code: ""
    }
  },

  methods: {
    signUp: function() {
      const bodyContent = { username: this.username, password: this.password, code: this.code };
        axios
          .post("/api/users/", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('signup-success', true);
          })
          .catch(err => {
            // handle error
            this.errors.push(err.response.data.message);
          })
          .then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
          });
    },

    resetForm: function() {
      this.username = "";
      this.password = "";
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    },
  }
}
</script>

<style scoped>
form {
  width: fit-content;
  position: relative;
}

input[type="text"],
input[type="password"],
input[type="url"] {
  width: 20rem;
  font-size: 20px;
  padding: 6px 12px;
  margin: 2px 0;
  box-sizing: border-box;
  font-family: "Red Hat Text";
}

.component {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  color: white;
  font-size: 18px;
  font-weight: 700;
  
  cursor: pointer;
  background-color: #006494;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: transparent;
  border-radius: 15px;
  padding: 16px 32px;
  width: 256px;
  text-align: center;
  font-family: "Red Hat Text";
}

.button:hover {
  opacity: 0.8;
  color: white;
}
</style>