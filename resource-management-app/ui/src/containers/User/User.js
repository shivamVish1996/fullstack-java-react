import React, { Component } from 'react';
import { UncontrolledCollapse } from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import ReactTable from 'react-table-6';
import "react-table-6/react-table.css";

import Switch from 'react-switch';

import NavigationBar from '../../components/Navigation/NavigationBar.js';

import {toast} from 'react-toastify';
import Axios from '../../Axios/Axios.js';

import Spinner from '../../components/Spinner/Spinner.js';
import successConfig from '../../components/Common/ToastConfig.js';
import {errorConfig} from '../../components/Common/ToastConfig.js';
import ErrorMessages from '../../components/Common/ErrorMessages.js';
//import {DbConfirmationMessages as DbMessages} from '../../components/Common/ErrorMessages.js';

const addUserFormValidate = user => {
	if(user.username === "" || user.password === "" 
		|| user.role === "" || user.role === "select")
		return false;
	else 
		return true; 
} 

toast.configure()

 class User extends Component {
constructor(props){
		super(props)
		this.state = {
				user:{
					username:'',
					password:'',
					role:''
				},
				users:[],
				loading:false,
				errorMessage:'',
				dbMessage:''
			}
	}

	getAllUsers = () => {

			this.setState({loading : !this.state.loading});
			const apiAccessToken = sessionStorage.getItem('apiAccessToken');

			Axios({
					method: 'get',
					url: '/users',
					headers: {
				    	'Authorization': `Bearer ${apiAccessToken}`
				   	}
				}).then(response => {
						this.setState({users:response.data});
					//	console.log(response.data)
						this.setState({loading:!this.state.loading});
				}).catch(error => {

					this.setState({dbMessage: ErrorMessages.DATABASE_DOWN});
					if (error.response){
						if(error.response.status === 403) {
							this.setState({dbMessage : ErrorMessages.NOT_LOGGED_IN});
						}
				  	}
				  	this.setState({loading:!this.state.loading});

				  	toast.error(this.state.dbMessage, errorConfig);
				});
	}

	componentDidMount(){
		this.getAllUsers();
	}

	addUser = (event) => {
		event.preventDefault();
		
		if(addUserFormValidate(this.state.user)){

			this.setState({loading: !this.state.loading});
			const apiAccessToken = sessionStorage.getItem('apiAccessToken');

			Axios({
				method: 'post',
				url: '/users',
				data: this.state.user,
				headers: {
			    	'Authorization': `Bearer ${apiAccessToken}`
			   	},
			   	responseType: 'text'
			})
			.then(response => {
				this.setState({loading:!this.state.loading});
				if(response.status === 201){
					this.getAllUsers();
					this.setState({dbMessage: response.data});
					toast.success(this.state.dbMessage, successConfig);
				}
			})
			.catch(error => {
				this.setState({loading: !this.state.loading});
			//	console.log('error response ', error.response);

				if (error.response){
				//	console.log('error: ',error)
					if(error.response.status === 400) {
						this.setState({dbMessage: error.response.data});
					} else if(error.response.status === 403) {
						this.setState({dbMessage: ErrorMessages.NOT_AUTHORISED});
					} else if(error.response.status === 500) {
						this.setState({dbMessage: ErrorMessages.INTERNAL_SERVER_ERROR});
					}
			  	} else {
					this.setState({dbMessage: ErrorMessages.DATABASE_DOWN});
			  	}

			  	toast.error(this.state.dbMessage,errorConfig);

			});
			this.cancelBtnHandler();
		}else{
			this.setState({errorMessage: ErrorMessages.ALL_FIELDS_ARE_MANDATORY});
		}
	}

	onChangeUsernameHandler = event => {
		let user = {...this.state.user}
		user.username = event.target.value;
		this.setState({user: user});
	}
	onChangePasswordHandler = event => {
		let user = {...this.state.user}
		user.password = event.target.value;
		this.setState({user: user});
	}
	onChangeRoleHandler = event => {
		let user = {...this.state.user}
		user.role = event.target.value;
		this.setState({user: user});
	}
	
	cancelBtnHandler = () => {
		this.setState({errorMessage: ''});
		let user = {...this.state.user}
		user.username = '';
		user.password = '';
		user.role = '';
		this.setState({user:user});
	}

	editUser = (username) => {
		console.log('username ',username);
	}

	deleteUser = (username) => {
		console.log('username: ',username)

			this.setState({loading : !this.state.loading});
			const apiAccessToken = sessionStorage.getItem('apiAccessToken');
			
			Axios({
				method: 'delete',
				url: '/users/' + username,
				headers: {
				    	'Authorization': `Bearer ${apiAccessToken}`
				   	},
				responseType: 'text'
			})
			.then( response => {
				this.setState({loading:!this.state.loading});
				if(response.status === 200){
					this.getAllUsers();
					this.setState({dbMessage: response.data});
					toast.success(this.state.dbMessage, successConfig);
				}
			})
			.catch((error) => {
				console.log('delete error: ', error);
				this.setState({loading:!this.state.loading});

				if (error.response){
					if(error.response.status === 400) {
						this.setState({dbMessage: error.response.data});
					} else if(error.response.status === 403) {
						this.setState({dbMessage: ErrorMessages.NOT_LOGGED_IN});
					} else if(error.response.status === 500) {
						this.setState({dbMessage: error.response.data});
					}
			  	} else {
					this.setState({dbMessage: ErrorMessages.DATABASE_DOWN});
			  	}

			  	toast.error(this.state.dbMessage, errorConfig);
			});
	}

	 handleActive = (checked, username) => {
		let active=0
		if(!checked){
			active=1;
		}

			this.setState({loading : !this.state.loading});
			const apiAccessToken = sessionStorage.getItem('apiAccessToken');

			Axios({
					method: 'get',
					url: '/users/'+username+'/'+active,
					headers: {
				    	'Authorization': `Bearer ${apiAccessToken}`
				   	},
				   	responseType: 'text'
				}).then(response => {
						this.setState({loading:!this.state.loading});
						if(response.status === 200){
							this.getAllUsers();
							this.setState({dbMessage: response.data});
							toast.success(this.state.dbMessage, successConfig);
						}
				}).catch(error => {

					console.log('active error: ', error);
					this.setState({loading:!this.state.loading});

					if (error.response){
					//	console.log('error: ',error)
						if(error.response.status === 400) {
							this.setState({dbMessage: error.response.data});
						} else if(error.response.status === 403) {
							this.setState({dbMessage: ErrorMessages.NOT_LOGGED_IN});
						} else if(error.response.status === 500) {
							this.setState({dbMessage: error.response.data});
						}
				  	} else {
						this.setState({dbMessage: ErrorMessages.DATABASE_DOWN});
				  	}

				  	toast.error(this.state.dbMessage, errorConfig);
				});
	}

		render() {
		
		const columns = [
		{
		//	Header : "ID",
			Header : () => {return (<p style={{textAlign:'left', fontWeight:'bold'}}>Username</p>)},
			accessor: "username",
			style:{
				textAlign:"left"
			},
		},
		{
			Header : () => {return (<p style={{textAlign:'left', fontWeight:'bold'}}>Role</p>)},
		//	Filter: () => (<input type="text" placeholder="First name"></input>),
			accessor: "role",
			style:{
				textAlign:"left"
			}
			// Cell: props => {
			// 	let role = "Employee";
			// 	if(props.original.role === "ROLE_ADMIN")
			// 		role = "Admin";
			// 	return(<div>{role}</div>)
			// }
		},
		{
			Header : () => {return (<p style={{textAlign:'center', fontWeight:'bold'}}>Status 
				(Activate/Deactivate)</p>)},
			filterable: false,
			sortable:false,
			style:{
				textAlign:"center"
			},
			Cell: props => {
				let disabled=false;
				let checked=false;
				let toolTip="Activate"
				if(props.original.active === 1){
					checked=true; 
					toolTip="Deactivate"
				}
				//console.log("props: ",props.original.active)

				if(sessionStorage.getItem('username')===props.original.username){
				//	console.log(true);
				toolTip='';
					disabled=true;
				}
				return(
					<div data-toggle="tooltip" data-placement="top" title={toolTip}>
					<Switch 
						className="react-switch CustomForm" 

						onChange={()=>{this.handleActive(checked, props.original.username)}}
						checked={checked}
						offColor="#FF0000"
						height={19}
						width={37}
						disabled={disabled}
					/>
					</div>
					)
			}
		},
		{
			Header : () => {return (<p style={{textAlign:'center', fontWeight:'bold'}}>Action</p>)},
			filterable: false,
			sortable:false,
			style:{
				textAlign:"center"
			},

			Cell : props => {
				let disabled=false;
				//console.log("props: ",props.original.username)
				if(sessionStorage.getItem('username')===props.original.username){
				//	console.log(true);
					disabled=true;
				}
				return(
				<div>
						<button className="btn btn-outline-info btn-sm" disabled={disabled}
						data-toggle="tooltip" data-placement="top" title="Edit user"
						onClick = {()=>{
							this.editUser(props.original.username);
						}}>
						<i className="fa fa-user-edit fa-md"></i></button>{" "} 

						<button className="btn btn-outline-danger btn-sm" disabled={disabled}
						data-toggle="tooltip" data-placement="left" title="Delete user" 
						onClick = {()=>{
							this.deleteUser(props.original.username);
						}}>
						<i className="fa fa-user-times fa-md"></i></button>
						</div>
						)
					}
		}
	
		]

		let loading = null;
		let alert = null;

		if(this.state.errorMessage){
			alert = <Alert className="CustomForm" color="danger">{this.state.errorMessage}</Alert>
		}

		if(this.state.loading){
			loading = <Spinner />
		}

		return (
			<div>
			{loading}
			<NavigationBar />
				
				<div>
				<button className="btn btn-outline-primary btn-sm"
				type="button" id="toggler" style={{ marginBottom: '1rem' }}>
				<i className="fa fa-user-plus fa-sm"></i>{" "}Add User
				</button>

				<UncontrolledCollapse toggler="#toggler">
					<div className="Add">
				{alert}
				<Form onSubmit={this.addUser} className="CustomForm">
			      <Row form>
			        <Col md={3}>
			          <FormGroup>
			            <Label for="firstName">Username{" "}
			            <span 
			            	style={{fontSize:'13px', color: 'red'}}>(*must be unique)
			            	</span>
			            </Label>
			            <Input className="CustomForm" 
			            type="text" 
			            value={this.state.user.username} 
			            onChange={this.onChangeUsernameHandler} 
			            placeholder="Username" />
			          </FormGroup>
			        </Col>
			        <Col md={3}>
			          <FormGroup>
			            <Label for="lastName">Password</Label>
			            <Input className="CustomForm" 
			            type="text" 
			            value={this.state.user.password} 
			            onChange={this.onChangePasswordHandler} 
			            placeholder="Password" />
			          </FormGroup>
			        </Col>
			       
			        <Col md={3}>
			        <FormGroup>
				        <Label for="roleSelect">Role</Label>
				        <Input className="CustomForm"
				        type="select" 
				        name="roleSelect" 
				        id="roleSelect"
				        value={this.state.user.role}
				        onChange={this.onChangeRoleHandler} >
				          <option value="select">Select</option>
				          <option value="ROLE_EMPLOYEE">Employee</option>
				          <option value="ROLE_ADMIN">Admin</option>
				        </Input>
				      </FormGroup>
			        </Col>
			      </Row>

			      <Row form style={{justifyContent:'center'}}>
			        <Col md={6}>
			          <FormGroup>

				          <button className="btn btn-outline-primary btn-sm" 
				          onClick={this.addUser}
				          type="submit">
				          <i className="fa fa-floppy-o" aria-hidden="true"></i>{" "}
				          Save</button>{" "}

				           <button className="btn btn-outline-info btn-sm"
				           id="toggler" 
				           onClick={this.cancelBtnHandler} type="reset">
				           <i className="fa fa-window-close"></i> Cancel</button>
			          
			          </FormGroup>
			       </Col>
			        </Row>
      			</Form>
      			<hr />
			</div>
				</UncontrolledCollapse>
				</div>
				<h6>All Users</h6>
				
				<ReactTable /*className="CustomTable"*/
				className="-highlight -striped CustomTable"
				columns={columns} 
				data={this.state.users}
				pageSizeOptions= {[5, 10, 20, 25, 50, 100]}
				defaultPageSize={10}
				filterable={true}
				minRows={this.state.users.length < 5 ? this.state.users.length : 5}
				></ReactTable>
			</div>
		);
	}
}

export default User