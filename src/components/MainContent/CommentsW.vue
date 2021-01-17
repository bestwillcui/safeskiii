<template>
  <div class="hello">
    <div id="title">Comments</div>

    <div id="body">
      <!-- <div class="icon"> <img alt="Home" src="../../assets/logo.png" width=200 height=100> </div> -->
      <!-- <ul> -->
        <div v-if='comments.length'>
          <p id="cmts" class="comments" v-for="comment in comments" :key="comment.message">
            <span style="font-weight: 800;">{{ comment.username }}:</span> {{ comment.comment }}
          </p> 
        </div>
        <div v-else class="comments"><br>No comments yet! Add one :)<br></div>
      <!-- </ul> -->

      <input type="text" id="comment" name="comment" v-model='commentContent' placeholder="Add a comment!">
      <div class="buttons">
        <button type="button" v-on:click="onComment()">Comment!</button>
        <button type="button" v-on:click="onImage()">Add Image!</button>
      </div>

      <div v-if='errors.length' class="error-message">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import Firebase from 'firebase'

export default {
  name: 'CommentsW',
  props: {
    msg: String,
    busi: String
  },
  watch: {
    busi() {
      this.db = Firebase.firestore()
      let authenticated = this.$cookie.get('safeskiii-auth');
      if(!authenticated) {
        console.log('not signed in :(');
      }
      this.$bind('users', this.db.collection('users')).then(users => {
      this.users === users
      });

      this.$bind('comments', this.db.collection('businesses').doc(this.busi).collection('comments')).then(comments => {
        this.comments === comments
      });
    }
  },

  data() {
    return {
      errors: [],  // Not shown for now
      comments: [],
      commentContent: "",
      location: "SkiLines",
      users: [],
      db: []
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

    this.$bind('comments', this.db.collection('businesses').doc(this.busi).collection('comments')).then(comments => {
      this.comments === comments
    });
  },
  
  mounted() {
    axios.get(`/api/comments/${this.location}`)
      .then((res) => {
          const fullResponse = res.response === undefined ? res : res.response;
          if (fullResponse.data.comments.length > 0) {
            // this.comments = fullResponse.data.comments;
            console.log(this.comments);
          }
      })
      .catch((err) => {
          this.errors.push(err);
      });
  },

  methods: {
    onComment() {
      const bodyContent = { location: this.location, comment: this.commentContent };  // TODO: Make location a prop
      axios.post("/api/comments/", bodyContent)
        .then((res) => {
          const fullResponse = res.response === undefined ? res : res.response;
          // this.comments.push({username: this.$cookie.get('safeskiii-auth'), comment: fullResponse.data.comment });
          this.commentContent = "";

          console.log('hi commented');
          // console.log(Date.getTime());

          this.db.collection('businesses').doc(this.busi).collection('comments').add({
              username: this.$cookie.get('safeskiii-auth'),
              comment: fullResponse.data.comment
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });

          this.db.collection('users').doc( this.$cookie.get('safeskiii-auth') ).collection('actions').add({
              type: 'comment',
              data: fullResponse.data.comment + ' on ' + this.busi.replace(/\s/g, '')
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
        })
        .catch((err) => {
          this.errors.push(this.showResponse(err));
          this.clearMessages();
        });
    },
    showResponse: function(axiosResponse) {
      const fullResponse = axiosResponse.response === undefined
          ? axiosResponse
          : axiosResponse.response;
      const abridgedResponse = fullResponse.data;
      return JSON.stringify(abridgedResponse);
    },
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  }
}
</script>

<style scoped>
#title {
  font-size: 30px;
}
.hello {
    background-color: lightblue;
    margin-right: 5px;
    border-style: solid;
    border-width: 2px;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 2px 2px;

    height: 85%;

    overflow-y: scroll;
}

#body {
  font-family: "Red Hat Text";
}

.hello:hover{
    box-shadow: 0 5px 5px;
    transform: scale(1.001);
}

.comments {
  text-align: left;
  font-family: "Red Hat Text";
}

.buttons {
  display: flex;
  justify-content: center;
}

h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
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

button:hover {
  opacity: 0.8;
}


#cmts {
  margin-left: 0;
  padding-left: 0;
  background-color: white;
  border-radius: 15px 50px 30px 5px;
  border: 2px solid black;
  padding: 10px;
}

#comment {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: "Red Hat Text";
}
</style>