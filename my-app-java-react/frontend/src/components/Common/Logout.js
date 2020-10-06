//import React from 'react';

const logout = (props) => {

	if(sessionStorage.getItem('apiAccessToken')){
	   sessionStorage.removeItem('apiAccessToken');
		sessionStorage.removeItem('username');
		sessionStorage.removeItem('role');
		sessionStorage.clear();
			props.history.push('/login');
	}
	return null;
	}


export default logout;