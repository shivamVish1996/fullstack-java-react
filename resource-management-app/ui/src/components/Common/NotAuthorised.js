import React from 'react';
import {NavLink} from 'react-router-dom';

const notAuthorised = (props) => {
  return (
    <h5 style={{textAlign:'center'}}>
    	Not Authorised. Click <NavLink to="/home" activeClassName="active">here</NavLink> to navigate to homepage
    </h5>
  )
}

export default notAuthorised;