<template>
  <div class="hello">
    <TopBar/>
    <div id="title"> Links </div>

    <div id="body">
      <div class="image"> <img alt="Home" src="../assets/link.png" width=150 height=150> </div>
      <div class="main"> 
        <a href="https://alta.com">Alta Website</a>
        <br>
        <!-- <a href="https://docs.google.com/presentation/d/13AUWjZfSekW8rss-ZnxnJ0T327SvpFuDfunMf62qEqE/present?slide=id.ga9c12f2a4e_0_177">Town Hall Presentation</a>
        <br> -->
        <a href="https://www.alta.com/tickets-and-passes">Ski Tickets</a>
        <br>
        <a href="https://www.alta.com/winter-2020-21">Covid Response</a>
                <br>
        <br> <br><br><br><br><br><br><br><br><br><br><br><br>


      </div>
    </div>
  </div>
</template>

<script>

import TopBar from '../components/TopBar.vue'

export default {
  name: 'Links',
  props: {
    msg: String
  },
  components: {
    TopBar
  }
}
</script>

<style scoped>
.hello {
  height: 100%;
}

div {
  background-color: white;
  margin: 1%;
  position: relative;
}

#title {
  font-size: 48px;
}
#body {
  display: flex;
}
.image {
  padding: 70px 0;
  width: 30%;
}
.main {
  text-align: left;
  font-size: 30px;
}
</style>