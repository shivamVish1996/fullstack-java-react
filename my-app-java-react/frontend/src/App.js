import React from 'react';
import './App.css';
import {
  Route,
  Switch
} from "react-router-dom";
import Home from './containers/Home/Home.js';
import Employee from './containers/Employee/Employee.js';
import Admin from './containers/Admin/Admin.js';
import User from './containers/User/User.js';
import NotAuthorised from './components/Common/NotAuthorised.js';
import Login from './containers/Login/Login.js';
import TablePrac from './containers/Practice/TablePrac.js';
import ReactTable6 from './containers/Practice/ReactTable6/ReactTable6.js';
import FileUpload from './containers/Practice/FileUpload/FileUpload.js';
import PageNotFound from './components/Common/PageNotFound.js';
import Logout from './components/Common/Logout.js';
import ProtectedRoute from './components/Common/ProtectedRoute.js';

function App(props) {

    return (
	    <div className="App container">
	    <Switch>
	       		<Route path="/login" exact component={Login} />
	       		<ProtectedRoute path="/home" exact component={Home} />
	       		<ProtectedRoute path="/employee" exact component={Employee} />
	       		<ProtectedRoute path="/admin" exact component={Admin} />
	       		<ProtectedRoute path="/practice" exact component={TablePrac} />
	       		<ProtectedRoute path="/reactTable6" exact component={ReactTable6} />
	       		<ProtectedRoute path="/fileUpload" exact component={FileUpload} />
	       		<ProtectedRoute path="/users" exact component={User} />
	       		<ProtectedRoute path="/notAuthorised" exact component={NotAuthorised} />
	       		<ProtectedRoute path="/logout" exact component={Logout} />
			    <ProtectedRoute path="*"  component={PageNotFound} />
		</Switch>
	    </div>
  );
}

export default App;