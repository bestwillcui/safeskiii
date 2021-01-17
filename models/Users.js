let users = new Map();
let userIdMap = new Map(); // maps username to unique id

/**
 * @class Users
 * Stores all Users.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
	/**
	* Create a Safeskiii user.
	* @param {string} username - username for new user
	* @param {string} password - password for new user
	* @return {User} - new Safeskiii user
	*/
	static createUser(username, password, code = "") {
		let user_id = uuidv4();
		const user = { id: user_id, username, password, business: false };
		console.log(code);
		if (code === "BUSINESS2020") {
			user.business = true;
			user.announcements = []
		}
		users.set(user_id, user);
		userIdMap.set(username, user_id);
		return user;
	}

	/**
	* Check if a Safeskiii username already exists.
	* @param {string} username - username we are looking for
	* @return {bool} - True if the username exists, else False
	*/
	static userExists(username) {
		return userIdMap.has(username);
	}

	/**
	* Update a Safeskiii user's username.
	* @param {string} oldUsername - original username of the user
	* @param {string} newUsername - new username of the user
	* @return {User} - the updated Safeskiii user
	*/
	static updateUsername(oldUsername, newUsername) {
		const user_id = userIdMap.get(oldUsername);
		const user = users.get(user_id);
		user.username = newUsername;
		userIdMap.delete(oldUsername);
		userIdMap.set(newUsername, user_id);
		return user;
	}

	/**
	* Update a Safeskiii user's password.
	* @param {string} username - username of the user
	* @param {string} newPassword - new password of the user
	* @return {User} - the updated Safeskiii user
	*/
	static updatePassword(username, newPassword) {
		const user = users.get(userIdMap.get(username));
		user.password = newPassword;
		return user;
	}

	/**
	* Sign In to a Safeskiii user's account.
	* @param {string} username - username of the user
	* @param {string} newPassword - password of the user
	* @return {bool} - True if the username/password match the existing account, else False
	*/
	static signIn(username, password) {
		const user = users.get(userIdMap.get(username));
		return (username === user.username && password === user.password);
	}

	/**
	* Delete a Safeskiii user's account.
	* @param {string} username - username of the user to be deleted
	*/
	static deleteAccount(username) {
		users.delete(userIdMap.get(username));
		userIdMap.delete(username);
	}

	/**
	 * Get a user id based on the user name.
	 * @param {string} username - the name of the user
	 */
	static getUserId(username) {
		return userIdMap.get(username);
	}

	/**
	 * Checks if a user is a business
	 * @param {string} username - the name of the user
	 */
	static isBusiness(username) {
		//console.log(users.get(userIdMap.get(username)))
		return users.get(userIdMap.get(username)).business;
	}

	static getAnnouncements(username){
		return users.get(userIdMap.get(username)).announcements;
	}
	

	static broadcast(username, message){
		if (!this.isBusiness(username)){
			return [];
		}
		else{
			users.get(userIdMap.get(username)).announcements.push(message);
			return this.getAnnouncements(username);
		}
	}
}

/**
 * Function that creates unique random ids for users, following the UUID format
 * @return {string} randomly generated UUID
 */
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
 }

module.exports = Users;
