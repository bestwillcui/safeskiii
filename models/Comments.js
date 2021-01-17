let locationToComments = new Map(); // maps location to list of comments

/**
 * @class Comments
 * Stores all Comments.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Comments {
	/**
	* Create a new comment.
    * @param {string} location - location for the comment to go on
    * @param {string} username - the user that made the comment
	* @param {string} comment - the text for the comment
	* @return {Comment} - new comment
	*/
	static createComment(location, username, comment) {
        let content = { username, comment };
        if (locationToComments.has(location)) {
            let commentsList = locationToComments.get(location).concat(content);
            locationToComments.set(location, commentsList);
        } else {
            locationToComments.set(location, [content]);
        }
        console.log(locationToComments)
		return comment;
    }
    
    /**
	* Gets all comments from a specific location
	* @param {string} location - location for the comments
	* @return {Array} - comments list
	*/
	static getComments(location) {
        let commentsList = [];
        if (locationToComments.has(location)) {
            commentsList = locationToComments.get(location);
        }
		return commentsList;
    }
}

module.exports = Comments;
