
# SAFESKIII (https://safeskiii-app.herokuapp.com/)
## Routes
### Checkins

/**
 * @name POST/api/checkins/
 * @param userName - username of user checking in
 * @param timeslot - timeslot to check-in to
 * @throws {401} - if user is not logged in
 * @throws {400} - if timeslot is full
 */

/**
 * @name GET/api/checkins/
 * @param timeslot - timeslot to get number of check-ins
 * @throws {400} - if unable to get number of check-ins (invalid timeslot)
 */

/**
 * @name DELETE/api/checkins/
 * @param userName - username of user removing their check-in
 * @param timeSlot - timeslot to remove check-in from
 * @throws {401} - if user not logged in
 * @throws {400} - if user has not been checked-in to that timeslot
 */

### Comments

/**
 * Create a Safeskiii comment.
 * @name POST/api/comments
 * @param {string} location - location of the new Safeskiii comment
 * @param {string} comment - text for the new Safeskiii comment
 * @throws {401} - if user not logged in
 * @throws {400} - if comment is empty or undefined
 */


/**
 * View comments at a Safeskiii location.
 * @name GET/api/comments
 * @param {string} location - location of the Safeskiii comments
 * @throws {400} - if location is undefined
 */

### Users

/**
 * Create a Safeskiii user.
 * @name POST/api/users
 * @param {string} username - username for the new Safeskiii user
 * @param {string} password - password for the new Safeskiii user
 * @throws {409} - if username is already taken or the username/password fields are empty
 */

 /**
 * Change a Safeskiii user's username.
 * @name PUT/api/users/:username?/username
 * @param {string} username - new username for the new Safeskiii user
 * @throws {400} - if the username field is empty
 * @throws {401} - if user is not logged in
 * @throws {409} - if username is already taken
 */

/**
 * Change a Safeskiii user's password.
 * @name PUT/api/users/password
 * @param {string} password - new password for the new Safeskiii user
 * @throws {400} - if the password field is empty
 * @throws {401} - if user is not logged in
 */

 /**
 * Delete a Safeskiii user's account.
 * @name DELETE/api/users
 * @throws {401} - if user is not logged in
 */

 /**
 * Login to an existing Safeskiii user.
 * @name POST/api/users/signin
 * @param {string} username - username for the existing Safeskiii user
 * @param {string} password - password for the new Safeskiii user
 * @throws {400} - if username/password do not match or the username/password field is empty
 * @throws {401} - if user is already logged in
 * @throws {404} - if username does not exist
 */

 /**
 * Sign out of a Safeskiii user's account.
 * @name DELETE/api/users/signout
 * @throws {401} - if user is not logged in
 */
