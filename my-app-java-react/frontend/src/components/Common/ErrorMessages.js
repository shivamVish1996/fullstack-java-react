class ErrorMessages{
	static USERNAME_OR_PASSWORD_EMPTY = "Username or password cannot be empty";
	static INVALID_USERNAME_OR_PASSWORD = "Invalid username/password or User may be deactivated";
	static DATABASE_DOWN = "Database is down. Please contact your database admin";
	static NOT_AUTHORISED = "You are not authorised";
	static NOT_LOGGED_IN = "User is not authenticated or Session has expired, Please re-login";
	static ALL_FIELDS_ARE_MANDATORY = "All fields are mandatory";
	static INTERNAL_SERVER_ERROR = "Internal server error. Something went wrong"
}

class DbConfirmationMessages{
	static ADD_RECORD_SUCCESS_MESSAGE = "Record added successfully!";
	static RECORD_NOT_ADDED_MESSAGE = "Record not added";
	static UPDATE_RECORD_SUCCESS_MESSAGE = "Record updated successfully!";
	static DELETE_RECORD_SUCCESS_MESSAGE = "Record deleted successfully!";
}

export default ErrorMessages;
export {DbConfirmationMessages};