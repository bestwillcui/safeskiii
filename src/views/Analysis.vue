<template>
  <div class="hello">
    <TopBar/>
    <div id="title"> COVID-19 Risk Analysis </div>

    <div id="body">
      <div class="image"> <img alt="Home" src="../assets/analysis.png" width=150 height=150> </div>
      <div class="main"> 
        <div>
          <div class="subtitle"> Room characteristics </div>
 
          <div class="item">
            Primary use: 1 = quiet, 2 = talking, 3 = loud talking, singing, exercising, 5 = symptomatic (sneezing, coughing)
            <input class="userinput" v-model="primary" @change=update>
          </div>

          <div class="item">
          Square footage (sq ft) 
          <input class="userinput" v-model="sqft" @change=update>
          </div>
        
          <div class="item">
          Room height (ft)
          <input class="userinput" v-model="height" @change=update>
          </div>

          <div class="item">
          Outside Air Intake (cfm)
          <input class="userinput" v-model="outside_intake" @change=update>
          </div>

          <div class="item">
          Area of windows (ft^2)
          <input class="userinput" v-model="window_area" @change=update>
          </div>

          <div class="item">
          Speed of air in/out of windows (ft/s)
          <input class="userinput" v-model="speed_windows" @change=update>
          </div>

          <div class="item">
          Number of open windows
          <input class="userinput" v-model="num_open_windows" @change=update>
          </div>

          <!-- <div class="item">
          Prevalence (??)
          </div> -->

          <div class="subtitle"> Policies </div>

          <div class="item">
          Occupancy
          <input class="userinput" v-model="occupancy" @change=update>
          </div>

          <div class="item">
          Mask efficiency (between 0 and 1)
          <input class="userinput" v-model="mask_efficiency" @change=update>
          </div>

          <div class="item">
          Fraction of population wearing masks
          <input class="userinput" v-model="frac_masks" @change=update>
          </div>

          <div class="item">
          Duration (minutes)
          <input class="userinput" v-model="duration" @change=update>
          </div>

          <div class="item">
          Add a filter (cfm)
          <input class="userinput" v-model="add_filter" @change=update>
          </div>

          <div class="subtitle"> Results </div>

          <div>
          Distance between people: <span class="answer"> {{ disp_dist_people }} meters </span>
          </div>

          <div>
          Number of virions inhaled: <span class="answer"> {{ virions_inhaled }} </span>
          </div>

          <div>
          Probability of getting infected if there's a contagious person in the room: <span class="answer"> {{ disp_prob_given_contagious}} </span>
          </div>

          <div>
          Probability of a particular individual becoming infected (keep below 0.01!): <span class="answer"> {{ disp_prob_indiv_infected }} </span>
          </div>

          <div>
          Expected number of people in the room who become infected: <span class="answer"> {{ disp_expected_infections }} </span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TopBar from '../components/TopBar.vue'

export default {
  name: 'Analysis',
  props: {
    msg: String // change all of this
  },
  components: {
    TopBar
  },
  methods: {
    update() {
      this.dist_people = Math.sqrt(this.sqft / this.occupancy)*.3048;
      this.virions_inhaled = 137 * 20 * .5 * this.duration * .001; // edit this, shouldn't be 137 but rather intermediate calcs

      this.prob_given_contagious = 1 - Math.pow(Math.E, -(Math.pow((1-this.frac_masks * this.mask_efficiency), 2)*this.virions_inhaled / 1000 ));
      this.prob_indiv_infected = this.prob_given_contagious * this.occupancy * 0.01;

      this.expected_infections = this.occupancy * this.occupancy * 0.01 * this.prob_given_contagious;

      this.disp_dist_people = Math.round(this.dist_people * 100) / 100
      this.disp_prob_given_contagious = Math.round(this.prob_given_contagious * 1000) / 1000
      this.disp_prob_indiv_infected = Math.round(this.prob_indiv_infected * 100000) / 100000
      this.disp_expected_infections = Math.round(this.expected_infections * 1000) / 1000
    }
  },
  created: function() {
    this.update();
  },
  data() {
    return {
      // message: 10,
      primary: 2,
      sqft: 2000,
      height: 10,
      outside_intake: 10000,
      window_area: 6,
      speed_windows: 5,
      num_open_windows: 5,

      occupancy: 51,
      mask_efficiency: .4,
      frac_masks: .8,
      duration: 100,
      add_filter: 0,

      dist_people: 0,
      virions_inhaled: 0,
      prob_given_contagious: 0,
      prob_indiv_infected: 0,
      expected_infections: 0,

      disp_dist_people: 0,
      disp_prob_given_contagious: 0,
      disp_prob_indiv_infected: 0,
      disp_expected_infections: 0,
    }
  },
}
</script>

<style scoped>
#title {
  font-size: 48px;
}
#body {
  display: flex;
  font-size: 20px;
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

.userinput {
  width: 50%;
  padding: 10px 20px;
  align-items: right;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: "Red Hat Text";
}

div {
  background-color: white;
  margin: 1%;
  position: relative;
}

.subtitle {
  font-size: 30px;
  margin-bottom: 30px;
}

.answer {
  font-size: 30px;
}
</style>