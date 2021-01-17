<template>
  <div class="main">
    <hr> 
    <!-- {{ this.curBusiness}} -->
    <Header v-bind:title='this.curBusiness'/>
    <div id='broadcast' v-on:click="broadcast()"> <BroadcastW v-bind:busi='this.curBusiness'/> </div>
    <div id="body">
      <div id='comments' v-on:click="comments()"> <CommentsW v-bind:busi='this.curBusiness'/> </div>
      <div id='checkin' v-on:click="checkin()" > <CheckinW v-bind:busi='this.curBusiness'/> </div>
    </div>

    <!-- <div class='bubble' id='bubble1' v-if = bubble1>more broadcasts
    </div>

    <div class='bubble' id='bubble2' v-if = bubble2>more comments
    </div>

    <div class='bubble' id='bubble3' v-if = bubble3>more check ins
    </div> -->

  </div>
</template>

<script>

import Header from './MainContent/Header.vue'
import BroadcastW from './MainContent/BroadcastW.vue'
import CheckinW from './MainContent/CheckinW.vue'
import CommentsW from './MainContent/CommentsW.vue'
// import axios from "axios";
//import { response } from 'express'

export default {
  name: 'MainContent',
  components: {
    Header,
    BroadcastW,
    CheckinW,
    CommentsW
  },

  data() {
    return {
      bubble1: false,
      bubble2: false,
      bubble3: false,
      curTime : "",
      // curBusiness: "Alta Ski Resort"
    };
  },

  props: {
    msg: String,
    curBusiness: String
  },
  methods: {
    broadcast() {
      // alert('additional broadcasts');
      this.bubble1 = !this.bubble1;
    },
    comments() {
      // alert('additional comments');
      this.bubble2 = !this.bubble2;
    },
    checkin() {
      // alert('checkin');
      this.bubble3 = !this.bubble3;
      //console.log(this.checkin)
      // let bodyContent = {timeSlot:this.curTime};
      // console.log(this.CheckinW)
      // axios.post('api/checkins', bodyContent)
      // .then((response) => {
      //   console.log(response)
      // })
      // .catch(() =>{
      //   alert("Something went wrong with check in");
      // })
    }
  }
}
</script>

<style scoped>
.hello {
  /* background-color: purple; */
}
#body {
  display: flex;
  justify-content: space-between;
}

.main {
  margin-top: 0px;
  margin-left: 30px;
}

#comments {
  width: 50%;
}

#checkin {
  width: 50%;
}

.bubble {
  position: absolute;
}

</style>