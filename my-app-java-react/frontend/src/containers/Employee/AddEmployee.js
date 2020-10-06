import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import {toast} from 'react-toastify';

import Axios from '../../Axios/Axios.js';
import Spinner from '../../components/Spinner/Spinner.js';

import './AddEmployee.css';
import EmployeeApiAccess from '../../components/ApiAccessLayer/EmployeeApiAccess.js';
import ErrorMessages from '../../components/Common/ErrorMessages.js';
import {DbConfirmationMessages as DbMessages} from '../../components/Common/ErrorMessages.js';

const addEmployeeFormValidate = employee => {
	if(employee.firstName === "" || employee.lastName === "" || 
		employee.skill === "" || employee.designation === "")
		return false;
	else 
		return true;
} 

toast.configure()

class AddEmployee extends Component {

	state ={
		employee:{
			firstName:'',
			lastName:'',
			skill:'',
			designation:''
		},
		loading:false,
		errorMessage:'',
		dbMessage:''
	}

	addEmployee = (event) => {
		event.preventDefault();
		console.log(EmployeeApiAccess.getAllEmployees())
		
		if(addEmployeeFormValidate(this.state.employee)){

			this.setState({loading: !this.state.loading});
			const apiAccessToken = sessionStorage.getItem('apiAccessToken');

			Axios({
				method: 'post',
				url: '/employees',
				data: this.state.employee,
				headers: {
			    	'Authorization': `Bearer ${apiAccessToken}`
			   	}
			})
			.then(response => {
				console.log(response);
				
				this.setState({loading:!this.state.loading});
				if(response.status === 201){
					this.setState({dbMessage: DbMessages.ADD_RECORD_SUCCESS_MESSAGE});
				}

				toast.success(this.state.dbMessage,{
							position: toast.POSITION.TOP_CENTER,
							draggable: false,
							autoClose: 3500
						});
				
			})
			.catch(error => {

				this.setState({loading: !this.state.loading});
				console.log('error ', error);

				if (error.response){
					if(error.response.status === 403) {
						this.setState({dbMessage: ErrorMessages.NOT_AUTHORISED});
					} 
			  	} else {
					this.setState({dbMessage: ErrorMessages.DATABASE_DOWN});
			  	}

			  	toast.error(this.state.dbMessage, {
						position: toast.POSITION.TOP_CENTER,
						draggable: false,
						autoClose: false
					});

				/*toast.error(ConfirmationMessages.RECORD_NOT_ADDED_MESSAGE,{
						position: toast.POSITION.TOP_CENTER,
						autoClose: false
					});*/

			});
			this.cancelBtnHandler();
		}else{
			//console.log('all are mandatory');
			this.setState({errorMessage: ErrorMessages.ALL_FIELDS_ARE_MANDATORY});
		}
	}

	onChangeFirstNameHandler = event => {
		let employee = {...this.state.employee}
		employee.firstName = event.target.value;
		this.setState({employee: employee});
	}
	onChangeLastNameHandler = event => {
		let employee = {...this.state.employee}
		employee.lastName = event.target.value;
		this.setState({employee: employee});
	}
	onChangeSkillHandler = event => {
		let employee = {...this.state.employee}
		employee.skill = event.target.value;
		this.setState({employee: employee});
	}
	onChangeDesignationHandler = event => {
		let employee = {...this.state.employee}
		employee.designation = event.target.value;
		this.setState({employee: employee});
	}
	cancelBtnHandler = () => {
		this.setState({errorMessage: ''});
		let employee = {...this.state.employee}
		employee.firstName = '';
		employee.lastName = '';
		employee.skill = '';
		employee.designation = '';
		this.setState({employee:employee});
	}

	render() {
		let loading = null;
		let alertError = null;

		if(this.state.loading){
			loading = <Spinner />
		}

		if(this.state.errorMessage){
			alertError = <Alert color="danger">{this.state.errorMessage}</Alert>
      	}


		return (
			<div className="AddEmployee">
			{loading}
			{alertError}
				<Form onSubmit={this.addEmployee}>
			      <Row form>
			        <Col md={3}>
			          <FormGroup>
			            <Label for="firstName">First name</Label>
			            <Input type="text" value={this.state.employee.firstName} onChange={this.onChangeFirstNameHandler} placeholder="First name" />
			          </FormGroup>
			        </Col>
			        <Col md={3}>
			          <FormGroup>
			            <Label for="lastName">Last name</Label>
			            <Input type="text" value={this.state.employee.lastName} onChange={this.onChangeLastNameHandler} placeholder="Last name" />
			          </FormGroup>
			        </Col>
			        <Col md={3}>
			          <FormGroup>
			            <Label for="skill">Skill</Label>
			            <Input type="text" value={this.state.employee.skill} onChange={this.onChangeSkillHandler} placeholder="Skill" />
			          </FormGroup>
			        </Col>
			        <Col md={3}>
			          <FormGroup>
			            <Label for="designation">Designation</Label>
			            <Input type="text" value={this.state.employee.designation} onChange={this.onChangeDesignationHandler} placeholder="Designation" />
			          </FormGroup>
			        </Col>
			      </Row>
			      <Row form style={{justifyContent:'center'}}>
			        <Col md={6}>
			          <FormGroup>

				          <button className="btn btn-outline-primary" 
				          type="submit">
				          <i className="fa fa-floppy-o" aria-hidden="true"></i>{" "}
				          Save</button>{" "}

				           <button className="btn btn-outline-info"
				           id="toggler" 
				           onClick={this.cancelBtnHandler} type="reset">
				           <i className="fa fa-window-close"></i> Cancel</button>
			          
			          </FormGroup>
			       </Col>
			        </Row>
      			</Form>
      			<hr />
			</div>
		);
	}
}

export default AddEmployee