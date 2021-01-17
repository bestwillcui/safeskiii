
# SAFESKIII (https://safeskiii-app.herokuapp.com/)
## Dream Team
### Purpose and Functionality
Safeskiii is a commenting / broadcasting app for Alta, Utah, that a ski lounge could use to inform its residents about current events that also incorporates a “check in” system for visitors to report their visiting time, which can help prevent crowding in this time of COVID. 


### Instructions to Run Locally:
In command line:
```console
$ npm install
$ npm run serve
```
In a separate shell:
```console
$ npm run awesome
```
then you will find the application at `localhost:8080` in the browser

### Authorship:
* **Guang Cui**:
  * src
    * components
      * MainContent
        * BroadcastW.vue
        * CheckinW.vue
        * CommentsW.vue
        * Header.vue
      * HelloWorld.vue
      * LeftBar.vue
      * MainContent.vue
      * Settings.vue
      * TopBar.vue
    * views
      * Feed.vue
      * Links.vue
      * Login.vue
      * MainPage.vue
      * Settings.vue
    * App.vue
  * Boilerplate code (main.js, babel.config.js, router.js, etc.)
* **Tiffany Trinh**:
  * bin
    * www
  * src
    * components
      * MainContent
        * CheckinW.vue
      * TopBar.vue
      * MainContent.vue
    * views
      * Login.vue
      * Settings.vue
  * models:
    * Users.js
    * Checkins.js
  * routes:
    * users.js
    * index.js
    * checkins.js
  * app.js
* **Kevin Jiang**:
  * src
    * components
      * MainContent
        * CommentsW.vue
        * CheckinW.vue
      * MainContent.vue
      * Settings.vue
      * SignIn.vue
      * SignUp.vue
      * TopBar.vue
    * views
      * Login.vue
      * Settings.vue
  * models:
    * Users.js
    * Comments.js
  * routes:
    * users.js
    * comments.js
  * db
    * db_config.js
  * app.js
  * vue.config.js
* **Qiuyue Liu**:
  * src
    * components
      * MainContent
        * CheckinW.vue
      * MainContent.vue
  * models:
    * Checkins.js
  * routes:
    * checkins.js
  * app.js
