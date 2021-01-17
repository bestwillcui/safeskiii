<template>
  <div class="hello">
    <div id="title">Reserve</div>

    <!-- <div class="icon"> <img alt="Home" src="../../assets/worldwide.png" width=20 height=20> </div> -->

    <!-- <ul class="bargraph"> -->
      <!-- <div> <p v-for="time in checkin" :key="time.count">
        <span style="font-weight: 800;">{{ time.ctime }}:</span> {{ time.count }}
      </p> </div> -->
    <!-- </ul> -->

    <div id="chart"></div>

    <!-- <input type="text" id="fname" name="fname"><br> --> <!-- check-in comment? -->

    <select name="times" id="times" v-model="curTime">
      <option value="09:00">9am</option>
      <option value="09:30">9:30am</option>
      <option value="10:00">10am</option>
      <option value="10:30">10:30am</option>
      <option value="11:00">11am</option>
      <option value="11:30">11:30am</option>
      <option value="12:00">12pm</option>
      <option value="12:30">12:30pm</option>
      <option value="13:00">1pm</option>
      <option value="13:30">1:30pm</option>
      <option value="14:00">2pm</option>
      <option value="14:30">2:30pm</option>
      <option value="15:00">3pm</option>
      <option value="15:30">3:30pm</option>
      <option value="16:00">4pm</option>
      <option value="16:30">4:30pm</option>
    </select>

    <button class="checkin" type="button" v-on:click="checkIn()">Reserve!</button>
  </div>
  
</template>

<script>
import axios from "axios";
import ApexCharts from 'apexcharts';
import Firebase from 'firebase';

export default {
  name: 'CheckinW',
  props: {
    msg: String,
    busi: String
  },
  watch: {
    busi() {
      this.location = this.busi.replace(/\s/g, '');
      this.db = Firebase.firestore()
      let authenticated = this.$cookie.get('safeskiii-auth');
      if(!authenticated) {
        console.log('not signed in :(');
      }
      this.$bind('users', this.db.collection('users')).then(users => {
      this.users === users
      });

      this.$bind('checkins', this.db.collection('businesses').doc(this.busi).collection('checkins')).then(checkins => {
        this.checkin === checkins
      });
    }
  },
  data() {
    return {
      checkin: [],
      curTime: "09:00",
      location: "SkiLines",
      options: [],
      chart: [],
      users: [],
      db: []
    }
  },
  created: function() {
    this.location = this.busi.replace(/\s/g, '');
    this.db = Firebase.firestore()
    let authenticated = this.$cookie.get('safeskiii-auth');
    if(!authenticated) {
      console.log('not signed in :(');
    }
    this.$bind('users', this.db.collection('users')).then(users => {
    this.users === users
    });

    this.$bind('checkins', this.db.collection('businesses').doc(this.busi).collection('checkins')).then(checkins => {
      this.checkin === checkins
    });
  },
  mounted() {
    this.location = this.busi.replace(/\s/g, '');

    let timeslots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', 
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

    let readTimes = ['9am', '9:30am', '10am', '10:30am', '11am', '11:30am', '12pm', 
    '12:30pm', '1pm', '1:30pm', '2pm', '2:30pm', '3pm', '3:30pm', '4pm', '4:30pm'];

    //bar chart for check-ins

    this.options = {
      series: [{
        data: []
      }],
      chart: {
        type: 'bar',
        height: 'auto'
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: readTimes,
        tickAmount: 5,
        max: 5
      }
    };

    
    timeslots.forEach((time) => {
      //console.log(time);
      axios.get(`/api/checkins/${this.location}/${time}`)
        .then((res) => {
            const fullResponse = res.response === undefined ? res : res.response;
            let people = fullResponse.data.count;
            // this.checkin.push({
            //   ctime: time, 
            //   count: people
            // });
            this.options.series[0].data.push(people);
        })
        .catch((err) => {
            this.errors.push(err);
        });
    })

    console.log(this.options.series[0].data);

    this.chart = new ApexCharts(document.querySelector("#chart"), this.options);
    this.chart.render();
  },
  
  methods: {
      checkIn() {
        this.location = this.busi.replace(/\s/g, '');
        // alert('checkin');
        // this.bubble3 = !this.bubble3;
        //console.log(this.checkin)
        let bodyContent = {location: this.location, timeslot:this.curTime};
        // console.log(this.CheckinW)
        console.log(bodyContent);
        axios.post('/api/checkins/', bodyContent)
        .then(() => {
          //console.log(response)
          alert("Successfully reserved for " + this.curTime);

          this.db.collection('businesses').doc(this.busi).collection('checkins').add({
              username: this.$cookie.get('safeskiii-auth'),
              checkin: this.curTime
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });

          this.db.collection('users').doc( this.$cookie.get('safeskiii-auth') ).collection('actions').add({
              type: 'reserv',
              data: this.curTime + ' at ' + this.location
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });

        })
        .catch((err) =>{
          let authenticated = this.$cookie.get('safeskiii-auth');
          console.log(authenticated);
          if (!authenticated || authenticated === undefined || authenticated.length == 0){
            alert("Please login to reserve a time");
          } else {
            console.log(err);
            alert("Failed to reserve! Slot is most likely full.");
          }
        })
        this.checkin = [];
        // this.options.series[0].data = [];
        let new_data = [];
        let timeslots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
                        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

        timeslots.forEach((time) => {
          //console.log(time);
          axios.get(`/api/checkins/${this.location}/${time}`)
            .then((res) => {
                const fullResponse = res.response === undefined ? res : res.response;
                let people = fullResponse.data.count;
                // this.checkin.push({
                //   ctime: time, 
                //   count: people
                // });
                new_data.push(people);
            })
            .catch((err) => {
                this.errors.push(err);
            });
        })

        this.chart.updateSeries([{data: new_data}]);
        // this.chart.render();
      },
      
      getCount(thistimeslot) {
        this.location = this.busi.replace(/\s/g, '');
        // let bodyContent = {timeslot: thistimeslot}
        // axios.get('/api/checkins/', bodyContent)
        let count = 0;
        axios.get(`/api/checkins/${this.location}/${thistimeslot}`)
        .then((res) => {
          // count = res.body.count;
          const fullResponse = res.response === undefined ? res : res.response;
          count = fullResponse.data.count;
          //this.checkin = []

          console.log(count);
        }).catch(() => {
          console.log("Error getting count for " + thistimeslot);
        });
      }

  }
}
</script>

<style scoped>
#title {
  font-size: 30px;
}

#times {
  padding: 6px 10px;
  margin: 1rem 0.5rem;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  font-family: "Red Hat Text";
  font-size: 16px;
}

.hello {
    margin-left: 5px;
    border-style: solid;
    border-width: 2px;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 2px 2px;

    height: 85%;

    position: relative;
}

.hello:hover{
    box-shadow: 0 5px 5px;
    transform: scale(1.001);
}

.checkin {
  padding: 7px 20px;
  margin: 0 0.5rem;
  display: inline-block;
  background-color: rgba(0, 100, 148, 0.5);;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  font-family: "Red Hat Text";
  font-size: 16px;
}

.checkin:hover {
  opacity: 0.8;
}

h3 {
  margin: 40px 0 0;
}

ul {
  /* list-style-type: none;
  padding: 0; */
}

li {
  /* display: inline-block;
  margin: 0 10px; */
}

a {
  color: #42b983;
}

p {
  padding: 0;
  margin: 0;
  text-align: left;
  border: 1px solid black
}
</style>