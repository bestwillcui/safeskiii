const express = require('express');
const router = express.Router();
const Comments = require('../models/Comments');


/**
 * Create a Safeskiii comment.
 * @name POST/api/comments
 * @param {string} location - location of the new Safeskiii comment
 * @param {string} comment - text for the new Safeskiii comment
 * @throws {401} - if user not logged in
 * @throws {400} - if comment is empty or undefined
 */
router.post('/', (req, res) => {
    if (req.session.username === undefined) {
		res.status(401).json({ message: 'Must be logged in to comment on a location.' });
    } else if (req.body.comment === undefined || req.body.comment === "") {
		res.status(400).json({ message: 'The comment must be at least 1 character.' });
	} else {
		Comments.createComment(req.body.location, req.session.username, req.body.comment);
		res.status(200).json({ location: req.body.location, username: req.session.username, comment: req.body.comment });
	}
});


/**
 * View comments at a Safeskiii location.
 * @name GET/api/comments
 * @param {string} location - location of the Safeskiii comments
 * @throws {400} - if location is undefined
 */
router.get('/:location?', (req, res) => {
    if (req.params.location === undefined) {
		res.status(400).json({ message: 'The location must be at least 1 character.' });
	} else {
        let locationComments = Comments.getComments(req.params.location);
		res.status(200).json({ comments: locationComments });
	}
});

module.exports = router;
