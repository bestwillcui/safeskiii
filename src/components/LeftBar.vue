<template>
  <div class="hello">

    <div class="business" v-on:click="clicked('Alta Ski Resort')">
      <div class="icon" > <img alt="Home" src="../assets/cable-car.png" width=50 height=50> </div>
      <span class="name"> Alta Ski Resort </span>
    </div>

    <hr>

    <div class="business" v-on:click="clicked('Goldminer\'s Lodge')">
      <div class="icon"> <img alt="Home" src="../assets/house.png" width=50 height=50> </div>
      <span class="name"> Goldminer's Lodge </span>
    </div>

    <hr>

    <div class="business" id="skiline" v-on:click="clicked('Ski Lines')">
      <div class="icon"> <img alt="Home" src="../assets/ski.png" width=50 height=50> </div>
      <span class="name"> Ski Lines </span>
    </div>

    <hr>

    <div class="business" v-on:click="clicked('Employee Housing')">
      <div class="icon"> <img alt="Home" src="../assets/hunting.png" width=50 height=50> </div>
      <span class="name"> Employee Housing </span>
    </div>
    
        <hr>

    <div class="business" v-on:click="clicked('Alta Rustler\'s Lodge')">
      <div class="icon"> <img alt="Home" src="../assets/house.png" width=50 height=50> </div>
      <span class="name"> Alta Rustler's Lodge </span>
    </div>

    <hr>

    <div class="business" v-on:click="clicked('Watson Shelter')">
      <div class="icon"> <img alt="Home" src="../assets/dish.png" width=50 height=50> </div>
      <span class="name"> Watson Shelter </span>
    </div>

    <hr>

    <div class="business" v-on:click="clicked('Powder House Rental')">
      <div class="icon"> <img alt="Home" src="../assets/skis.png" width=50 height=50> </div>
      <span class="name"> Powder House Rental </span>
    </div>

    <hr>

    <div class="business" v-on:click="clicked('Alta Peruvian Lodge')">
      <div class="icon"> <img alt="Home" src="../assets/house.png" width=50 height=50> </div>
      <span class="name"> Alta Peruvian Lodge </span>
    </div>


    
  </div>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'LeftBar',
  props: {
    msg: String,
    curBusiness: String
  },
  data: function() {
      return {
        users: [],
      }
  },
  methods: {
    clicked: function(event) {
      // alert(event);
      console.log(event);
      this.$emit('changeBusiness', event);
      console.log('??');
      // location.reload();
    }
  },
  created: function() {
    const db = Firebase.firestore()
    let authenticated = this.$cookie.get('safeskiii-auth');
    if(!authenticated) {
      // If not authenticated, redirect to login page.
      // this.$router.push({ name: 'Login' });
      console.log('not signed in :(');
    }

    // this unbinds any previously bound reference
    this.$bind('users', db.collection('users')).then(users => {
    this.users === users
    })
  }
}
</script>

<style scoped>

.hello {
  /* background-color: red; */
  margin-top: 30px;
  
}

.business {
  display: flex;
  font-size: 25px;
  margin-top: 0px;

  border-style: solid;
  border-width: 2px;
  border-radius: 15px;
  padding: 10px;

  background-color: #d9d9d9;
}

.name {
  padding: 10px 0;
}

.icon {
  margin-right: 40px;
}

#skiline {
  /* background-color: #A6C9FF; */
}
</style>