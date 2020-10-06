import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const protectedRoute = ({component:Component, ...rest}) => {
  return (
    <Route {...rest} 
    	render = {
    		(props) => {
                //console.log('props: ',props.location.pathname )

    			if(sessionStorage.getItem('apiAccessToken')){

                    if(props.location.pathname==='/users' 
                        && sessionStorage.getItem('role')==="ROLE_EMPLOYEE"){
                            return <Redirect to={
                            {
                                pathname: "/notAuthorised",
                                state: {
                                    from: props.location
                                }
                            }
                        }
                        />
                    }
                    else{
    				    return <Component {...props} />
                    }
    			}

    			else{
    				return <Redirect to={
    					{
    						pathname: "/login",
    						state: {
    							from: props.location
    						}
    					}
    				}
    				/>
    			}
    		}
    	}
    	/>
  )
}

export default protectedRoute;