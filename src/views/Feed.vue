<template>
  <div class="hello">
    <TopBar/>
    <div id="title"> My Feed </div>

    <div id="body">
      <div class="image"> <img alt="Home" src="../assets/user.png" width=150 height=150> </div>
      <div class="main"> 

        <div v-if='feed.length'>
          <p id="cmts" class="feed" v-for="a in feed" :key="a.message">
            <span style="font-weight: 800;">You {{ a.type }}ed:</span> {{ a.data }}
          </p> 
        </div>
        <div v-else class="feed">No actions yet! Check in or comment :)</div>

        <!-- Feed 1 <br> {{ this.feed }} -->

      </div>
    </div>
  </div>
</template>

<script>

import TopBar from '../components/TopBar.vue'
// import axios from 'axios'
import Firebase from 'firebase'

export default {
  name: 'Feed',
  props: {
    msg: String
  },
  components: {
    TopBar
  },
  data() {
    return {
      feed: [],
      db: []
    }
  },

  created: function() {
    this.db = Firebase.firestore()
    let authenticated = this.$cookie.get('safeskiii-auth');
    if(!authenticated) {
      console.log('not signed in :(');
    }

    console.log(this.$cookie.get('safeskiii-auth'));
    console.log(this.db.collection('users').doc( this.$cookie.get('safeskiii-auth') ).collection('actions') );

    this.$bind('feed', this.db.collection('users').doc(this.$cookie.get('safeskiii-auth')).collection('actions')).then(feed => {
    this.feed === feed
    });

    console.log(this.feed);
  },
}
</script>

<style scoped>
#title {
  font-size: 48px;
}
#body {
  display: flex;
  font-size: 30px;
  font-family: "Red Hat Text";
}

.main {
    text-align: left;
}

.image {
  padding: 70px 0;
  align-items: right;
  width: 30%;
}

#cmts {
  margin-left: 0;
  padding-left: 0;
  background-color: white;
  border-radius: 15px 50px 30px 5px;
  border: 2px solid black;
  padding: 10px;
}

div {
  background-color: white;
  margin: 1%;
  position: relative;
}
</style>