<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">MainPage</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/feed">Feed</router-link> |
      <router-link to="/links">Links</router-link> |
      <router-link to="/settings">Settings</router-link>

    </div> -->
    <router-view/>
  </div>
</template>

<style>

@font-face {
  font-family: "Odibee Sans";
  src: local("Odibee Sans"),
   url(../Odibee_Sans/OdibeeSans-Regular.ttf) format("truetype");
}

#app {
  font-family: "Odibee Sans", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.success-message {
  color: green;
  font-family: "Red Hat Text";
  font-size: 20px;
  font-weight: 800;
  margin: 1rem auto;
}

.error-message {
  color: red;
  font-family: "Red Hat Text";
  font-size: 20px;
  font-weight: 800;
  margin: 1rem auto;
}
</style>
