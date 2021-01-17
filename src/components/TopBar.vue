<template>
  <div class="hello">

    <span id="title"> SAFESKIII </span>

    <div id="icons">
      <div class="icon"> 
        <div> home </div>
        <router-link to="/">
          <img alt="Home" src="../assets/home.png" v-on:click="clicked('home')" width=35 height=35> 
        </router-link>
      </div>

      <div class="icon"> 
        <div> feed </div>
        <router-link to="/feed">
          <img alt="Home" src="../assets/user.png" v-on:click="clicked('user')" width=35 height=35> 
        </router-link>
      </div>

      <!-- <div class="icon"> 
        <div> info </div>
        <router-link to="/settings">
          <img alt="Home" src="../assets/settings.png" v-on:click="clicked('settings')" width=35 height=35> 
        </router-link>
      </div> -->

      <div class="icon"> 
        <div> links </div>
        <router-link to="/links">
          <img alt="Home" src="../assets/link.png" v-on:click="clicked('links')" width=35 height=35> 
        </router-link>
      </div>

      <!-- <div class="icon"> 
        <div> alerts </div>
        <router-link to="/">
          <img alt="Home" src="../assets/bell.png" v-on:click="clicked('alerts')" width=35 height=35> 
        </router-link>
      </div> -->

      <div class="icon"> 
        <div> settings </div>
        <router-link to="/login">
          <img alt="Home" src="../assets/settings.png" v-on:click="clicked('settings')" width=35 height=35> 
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import { eventBus } from "../main";

export default {
  name: 'TopBar',
  props: {
    msg: String
  },
  methods: {
    clicked: function(event) {
      // alert(event);
      console.log(event);
    }
  }
}
</script>

<style scoped>
.hello {
  /* background-color: cyan; */
  display: flex;
  justify-content: space-between;
  margin-bottom: 0%;
  position: relative;
  /* background-color: white; */
}
#title {
  font-size: 60px;
  margin-left: 30px;
  text-align: center;
}

#icons {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 10px 0;
  margin-left: 40px;
}

.icon {
  margin-right: 30px;
}

</style>