const express = require('express');

const router = express.Router();

const Users = require('../models/Users');

/**
 * Create a Safeskiii user.
 * @name POST/api/users
 * @param {string} username - username for the new Safeskiii user
 * @param {string} password - password for the new Safeskiii user
 * @throws {409} - if username is already taken or the username/password fields are empty
 */
router.post('/', (req, res) => {
	if (req.session.username === undefined) {
		if (req.body.username.length === 0 || req.body.password.length === 0){
			res.status(400).json({ message: 'The username and password must be at least 1 character.' });
		} else if (Users.userExists(req.body.username)){
			res.status(409).json({ message: 'User already exists. Try a different username' });
		} else {
			Users.createUser(req.body.username, req.body.password, req.body.code);
			res.status(200).json({ username: req.session.username });
		}
	} else{
		res.status(400).json({ message: 'Cannot create account while logged in to an existing account. Please log out to create a new account' });
	}
});

/**
 * Change a Safeskiii user's username.
 * @name PUT/api/users/username
 * @param {string} username - new username for the new Safeskiii user
 * @throws {400} - if the username field is empty
 * @throws {401} - if user is not logged in
 * @throws {409} - if username is already taken
 */
router.put('/username', (req, res) => {
	if (req.session.username === undefined) {
		res.status(401).json({ message: 'Must be logged in to change the username' });
	} else if (req.body.username === undefined) {
		res.status(400).json({ message: 'The new username must be at least 1 character.' });
	} else if (Users.userExists(req.body.username)) {
		res.status(409).json({ message: `Username '${req.body.username}' already taken. Please try a different username.` });
	} else {
		Users.updateUsername(req.session.username, req.body.username);
		req.session.username = req.body.username;
		res.status(200).json({ username: req.body.username });
	}
});

/**
 * Change a Safeskiii user's password.
 * @name PUT/api/users/password
 * @param {string} password - new password for the new Safeskiii user
 * @throws {400} - if the password field is empty
 * @throws {401} - if user is not logged in
 */
router.put('/password', (req, res) => {
	if (req.session.username === undefined) {
		res.status(401).json({ message: 'Must be logged in to change the password' });
	} else if (req.body.password.length === 0) {
		res.status(400).json({ message: 'The new password must be at least 1 character.' });
	} else {
		Users.updatePassword(req.session.username, req.body.password);
		res.status(200).json({ message: 'Successfully changed password' });
	}
});

/**
 * Delete a Safeskiii user's account.
 * @name DELETE/api/users
 * @throws {401} - if user is not logged in
 */
router.delete('/', (req, res) => {
	if (req.session.username === undefined) {
		res.status(401).json({ message: 'Must be logged in to delete the user' });
	} else {
		const username = req.session.username;
		Users.deleteAccount(username);
		delete req.session.username;
		res.status(200).json({ message: `Successfully deleted '${username}'` });
	}
});

/**
 * Login to an existing Safeskiii user.
 * @name POST/api/users/session
 * @param {string} username - username for the existing Safeskiii user
 * @param {string} password - password for the new Safeskiii user
 * @throws {400} - if username/password do not match or the username/password field is empty
 * @throws {401} - if user is already logged in
 * @throws {404} - if username does not exist
 */
router.post('/session', (req, res) => {
	if (req.session.username === undefined) {
		if (req.body.username.length === 0 || req.body.password.length === 0){
			res.status(400).json({ message: 'The username and password must be at least 1 character.' });
		} else if (!Users.userExists(req.body.username)){
			res.status(404).json({ message: 'Username does not exist. Try a different username' });
		} else if (Users.signIn(req.body.username, req.body.password)) {
			req.session.username = req.body.username;
			res.status(200).json({ message: `Signed in to '${req.body.username}'`, username: req.body.username });
		} else {
			res.status(400).json({ message: 'Username and password do not match' });
		}
	} else{
		res.status(401).json({ message: `Already signed in to ${req.session.username}. Please sign out to sign into another account.` });
	}
});

/**
 * Sign out of a Safeskiii user's account.
 * @name DELETE/api/users/session
 * @throws {401} - if user is not logged in
 */
router.delete('/session', (req, res) => {
	if (req.session.username === undefined) {
		res.status(401).json({ message: 'No account to sign out of' });
	} else {
		const username = req.session.username;
		delete req.session.username;
		res.status(200).json({ message: `Successfully signed out of '${username}'` });
	}
});

/**
 * Create a broadcast as a business user.
 * @name POST/api/users/broadcast
 * @throws {401} - if user is not logged in
 * @throws {400} - if user is not a business
 */
router.post('/broadcast', (req, res) => {
	if(req.session.username === undefined){
		res.status(401).json({ message: 'Not signed in' });
	}
	else{
		const username = req.session.username;
		if (!Users.isBusiness(username)){
			res.status(400).json({ message: 'No permission for broadcast'});
		}
		else{
			console.log(req.body)
			Users.broadcast(username, req.body.message);
			res.status(200).json({message: req.body.message});
		}
	}
})

/**
 * Get the information about the current user signed in
 * @name GET/api/users/
 */
router.get('/', (req, res) => {
	if(req.session.username === undefined){
		res.status(401).json({ message: 'Not signed in' });
	}
	else{
		const logged_in = req.session.username
		//console.log(logged_in);
		res.status(200).json({ user: Users.getUserId(logged_in), isBusiness: Users.isBusiness(logged_in)});
	}
})

/**
 * Get particular business user's announcements
 * @name GET/api/users/
 */
router.get('/announcements/:username?', (req, res) => {
	//console.log(req.body);
	// const requesting = req.body.username;
	const requesting = req.params.username;
	console.log("requesting: ", requesting)
	console.log("testing ", req.params.username);
	if (requesting === undefined){
		res.status(401).json( {message: "requesting undefined"});
	} else if (!Users.userExists(requesting)) {
		res.status(401).json( {message: 'User/business not found'});
	}
	else if(! Users.isBusiness(requesting)){
		res.status(401).json({ message: 'Not a business' });
	}
	else{
		//console.log(logged_in);
		res.status(200).json({ announcements: Users.getAnnouncements(requesting)});
	}
})

module.exports = router;
