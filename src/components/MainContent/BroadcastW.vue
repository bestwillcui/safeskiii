<template>
  <div class="hello">
    <div class="title" v-if='announcements.length'>
          <p id="cmts" class="announcements" v-for="a in announcements" :key="a.message">
            {{ a.message }}
          </p> 
        </div>
    <div v-else class="title">No broadcasts yet! </div>

    <!-- <button type = "button" v-on:click="getAnnouncement()"> See Announcement </button> -->

    <input type="text" id="broadcast" name="broadcast" v-model='broadcastContent' v-if='business'>
    <button type="button" v-on:click="postBroadcast()" v-if='business'>Post!</button>

  </div>
</template>

<script>

import axios from "axios"
import Firebase from 'firebase'

export default {
  name: 'Login',
  props: {
    msg: String,
    busi: String
  },
  data(){
    return{
      business : false,
      announcements : [],
      broadcastContent: "",
      db: []
    }
  },
  watch: { 
    busi: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.db = Firebase.firestore()
      let authenticated = this.$cookie.get('safeskiii-auth');
      if(!authenticated) {
        console.log('not signed in :(');
      }
      this.$bind('users', this.db.collection('users')).then(users => {
      this.users === users
      });

      this.$bind('announcements', this.db.collection('businesses').doc(this.busi).collection('broadcast')).then(announcements => {
      console.log(this.busi);
      // this.$bind('announcements', this.db.collection('businesses').doc('alta ski resort').collection('broadcast')).then(announcements => {
      this.announcements === announcements
      });
    }
  },

  created: function() {
    this.db = Firebase.firestore()
    let authenticated = this.$cookie.get('safeskiii-auth');
    if(!authenticated) {
      console.log('not signed in :(');
    }
    this.$bind('users', this.db.collection('users')).then(users => {
    this.users === users
    });

    this.$bind('announcements', this.db.collection('businesses').doc(this.busi).collection('broadcast')).then(announcements => {
    console.log(this.busi);
    // this.$bind('announcements', this.db.collection('businesses').doc('alta ski resort').collection('broadcast')).then(announcements => {
    this.announcements === announcements
    });
  },

  mounted(){
    //Is it a business logged in now?
    axios.get("api/users")
    .then( (response) => {
      //console.log(response.data.isBusiness)
      this.business = response.data.isBusiness;
    })
    .catch()
  },
  computed:{
  },

  methods: {
    postBroadcast(){
      const bodyContent = {message: this.broadcastContent };  // TODO: Make location a prop
      axios.post("/api/users/broadcast/", bodyContent)
        .then((res) => {
          // const fullResponse = res.response === undefined ? res : res.response;
          console.log(res);
          console.log('hi broad update');

          this.db.collection('businesses').doc(this.busi).collection('broadcast').doc('main').set({
            message: this.broadcastContent
          })
          .then(function() {
              console.log("Document successfully written!");
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });

          this.broadcastContent = "";
          console.log('done?');
        })
        .catch((err) => {
          this.errors.push(this.showResponse(err));
          this.clearMessages();
        });
    },

    getAnnouncement(){
      let username = "b";
      // let body = {username: "b"}
      //console.log(bodyContent);
      // console.log(body.username);
      axios.get(`/api/users/announcements/${username}`)
      .then((response) => {
        this.announcements = response[0];
      })
      .catch();
    }

    // isBusiness(){
    //   let business = false;
    //   axios.get("api/users/")
    //   .then( (response) => {
    //     business = response.data.isBusiness;
    //     console.log(business);
    //   })
    //   .catch();
    //   return business;
    // }
  }

}
</script>

<style scoped>
.hello {
  font-family: "Red Hat Text";
  background-color: #FF9C9C;
  margin-top: 10px;
  margin-bottom: 10px;
  border-style: solid;
  border-width: 2px;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 2px 2px;
}

.hello:hover{
    box-shadow: 0 5px 5px;
    transform: scale(1.001);
}

.title {
  font-size: 24px;
}

#broadcast {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: "Red Hat Text";
}

button {
  margin: 0.5rem 1rem;
  cursor: pointer;
  background: rgba(0, 100, 148, 0.5);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  /* border-radius: 5px; */
  padding: 6px 0px;
  width: 150px;
  text-align: center;
  font-family: "Red Hat Text";
}
</style>