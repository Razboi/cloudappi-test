module.exports = {
	invalidInput: () => {
		var err = new Error( "Invalid input" );
		err.statusCode = 405;
		return err;
	},
	invalidUserId: () => {
		var err = new Error( "Invalid user id" );
		err.statusCode = 400;
		return err;
	},
	userNotFound: () => {
		var err = new Error( "User not found" );
		err.statusCode = 404;
		return err;
	}
};