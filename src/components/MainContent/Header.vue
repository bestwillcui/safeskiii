<template>
  <div class="hello">

    <span id="title"> {{this.title}} </span>

    <div id="icons">
      <div class="icon"> 

        <a href="https://www.alta.com/" target="_blank">
          <img alt="Home" src="../../assets/info.png" width=30 height=30>
        </a>

      </div>

      <div class="icon"> 
        <a href="https://www.google.com/maps/dir//Alta,+UT/@40.5790686,-111.6411056,14z/data=!4m9!4m8!1m0!1m5!1m1!1s0x875270e1f7f74419:0x8adbd40109fad83d!2m2!1d-111.6379793!2d40.5888394!3e0" target="_blank">
          <img alt="Home" src="../../assets/worldwide.png" width=30 height=30> 
        </a>
      </div>

      <!-- <div class="icon"> <img alt="Home" src="../../assets/report.png" width=30 height=30> </div>
      <div class="icon"> <img alt="Home" src="../../assets/star.png" width=30 height=30> </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String,
    title: String
  }
}
</script>

<style scoped>
.hello {
  /* background-color: green; */
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
#title {
  font-size: 60px;
  margin-left: 30px;
  margin-right: 20%;
  /* margin-right: 200px; */
}

#icons {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 10px 0;
}

.icon {
  margin-right: 10px;
}

</style>