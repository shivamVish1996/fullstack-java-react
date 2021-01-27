import React, { Component} from 'react';
import { Alert  } from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import ReactTable from 'react-table-6';
import "react-table-6/react-table.css";
import Accordion from 'react-bootstrap/Accordion';
import {CSVLink} from 'react-csv';

import {toast} from 'react-toastify';

import Axios from '../../Axios/Axios.js';
import Spinner from '../../components/Spinner/Spinner.js';

import successConfig from '../../components/Common/ToastConfig.js';
import {errorConfig} from '../../components/Common/ToastConfig.js';
import ErrorMessages from '../../components/Common/ErrorMessages.js';
import NavigationBar from '../../components/Navigation/NavigationBar.js';

import {DbConfirmationMessages as DbMessages} from '../../components/Common/ErrorMessages.js';


const addEmployeeFormValidate = employee => {
	if(employee.firstName === "" || employee.lastName === "" || 
		employee.skill === "" || employee.designation === "")
		return false;
	else 
		return true;
} 

toast.configure()

class Employee extends Component {
	constructor(props){
		super(props)
		this.fileInput = React.createRef();

		this.state = {
			employee:{
		//	id:0,
		firstName:'',
		lastName:'',
		skill:'',
		designation:''
	},
	employees:[],
	loading:false,
	errorMessage:'',
	dbMessage:'',
	fileName:'',
	count:0
}
}

getCount = () => {
	if(sessionStorage.getItem('apiAccessToken')){

		//	this.setState({loading : !this.state.loading});
		const apiAccessToken = sessionStorage.getItem('apiAccessToken');

		Axios({
			method: 'get',
			url: '/employees/count',
			headers: {
				'Authorization': `Bearer ${apiAccessToken}`
			},
			responseType: 'text'

		}).then(response => {
			//console.log('response: ', response);
			//	this.setState({loading:!this.state.loading});
			if(response.status === 200)
				this.setState({count: response.data});

		}).catch(error => {
			//	this.setState({loading:!this.state.loading});
			console.log('count error: ', error);
		});
	}else{
		this.setState({dbMessage: ErrorMessages.NOT_LOGGED_IN});
		toast.error(this.state.dbMessage, errorConfig);
	}
}

onChangeFile = (event) => {

	event.stopPropagation();
	event.preventDefault();

	console.log('event.target.files[0]: ', event.target.files[0])

	this.fileInput = event.target.files[0]
	this.setState({fileName: event.target.files[0].name});

}

uploadEmployeeFile = () => {
		//event.preventDefault();
		console.log('on submit: ', this.fileInput);

		let formData = new FormData();
		let file = this.fileInput;
		formData.append("file", file);

		this.setState({loading : !this.state.loading});
		const apiAccessToken = sessionStorage.getItem('apiAccessToken');

		Axios({
			method: 'post',
			url: '/employees/upload/file',
			data: formData,
			headers: {
				'Authorization': `Bearer ${apiAccessToken}`,
				"Content-Type": "multipart/form-data"
			},
			responseType: 'text'
		})
		.then(response => {
			console.log('response: ', response);
			this.getCount();
			this.getAllEmployees();
			this.setState({loading:!this.state.loading});

			if(response.status === 200){
				this.setState({dbMessage: response.data});
			}else if(response.status === 201){
				this.setState({dbMessage: DbMessages.ADD_RECORD_SUCCESS_MESSAGE});
			}

			toast.success(this.state.dbMessage, successConfig);
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

			toast.error(this.state.dbMessage,errorConfig);
		});

		this.fileInput=null;
		this.setState({fileName: ''});
	}


	getAllEmployees = () => {
		this.setState({loading : !this.state.loading});
		const apiAccessToken = sessionStorage.getItem('apiAccessToken');

		Axios({
			method: 'get',
			url: '/employees',
			headers: {
				'Authorization': `Bearer ${apiAccessToken}`
			}
		}).then(response => {
			this.setState({employees:response.data});
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
		this.getCount();
		this.getAllEmployees();
	}

	addEmployee = (event) => {
		event.preventDefault();
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
				this.getCount();
				this.getAllEmployees();
		//	console.log(response);

		this.setState({loading:!this.state.loading});
		if(response.status === 201){
			this.setState({dbMessage: DbMessages.ADD_RECORD_SUCCESS_MESSAGE});
		}

		toast.success(this.state.dbMessage, successConfig);

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

				toast.error(this.state.dbMessage,errorConfig);

			});
			this.cancelBtnHandler();
		}else{
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

	editEmployee = (employeeId) => {
		console.log('employee id ',employeeId);
	}

	deleteEmployee = (employeeId) => {
		this.setState({loading : !this.state.loading});
		const apiAccessToken = sessionStorage.getItem('apiAccessToken');

		Axios({
			method: 'delete',
			url: '/employees/' + employeeId,
			headers: {
				'Authorization': `Bearer ${apiAccessToken}`
			}
		})
		.then( response => {
			this.getCount();
			this.getAllEmployees();
			this.setState({loading:!this.state.loading});
		//		console.log(response);
		if(response.status === 200){
			toast.success(DbMessages.DELETE_RECORD_SUCCESS_MESSAGE, successConfig);
		}

	})
		.catch((error) => {
			console.log('delete : ', error);
			this.setState({loading:!this.state.loading});
		});
	}


	deleteAllEmployees = () => {
		this.setState({loading : !this.state.loading});
		const apiAccessToken = sessionStorage.getItem('apiAccessToken');

		Axios({
			method: 'delete',
			url: '/employees',
			headers: {
				'Authorization': `Bearer ${apiAccessToken}`
			},
			responseType: 'text'
		})
		.then( response => {
			this.setState({loading:!this.state.loading});
			if(response.status === 200){
				this.getCount();
				this.getAllEmployees();
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
					this.setState({dbMessage: ErrorMessages.NOT_AUTHORISED});
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

		const csvHeaders = [
		{ label: "ID", key: "id" },
		{ label: "First Name", key: "firstName" },
		{ label: "Last Name", key: "lastName" },
		{ label: "Skill", key: "skill" },
		{ label: "Designation", key: "designation" },
		{ label: "Added By", key: "addedBy" },
		{ label: "Created At", key: "createdAt" }
		];
		
		const columns = [
		{
		//	Header : "ID",
		Header : () => {return (<p style={{textAlign:'right', fontWeight:'bold'}}>ID</p>)},
		accessor: "id",
		style:{
			textAlign:"right"
		},
		width:100,
		minWidth:100,
		maxWidth:100,
	},
	{
		Header : () => {return (<p style={{textAlign:'left', fontWeight:'bold'}}>First name</p>)},
		//	Filter: () => (<input type="text" placeholder="First name"></input>),
		accessor: "firstName",
		style:{
			textAlign:"left"
		}
	},
	{
		Header : () => {return (<p style={{textAlign:'left', fontWeight:'bold'}}>Last name</p>)},
		accessor: "lastName",
		style:{
			textAlign:"left"
		}
	},
	{
		Header : () => {return (<p style={{textAlign:'left', fontWeight:'bold'}}>Skill</p>)},
		accessor: "skill",
		style:{
			textAlign:"left"
		}
	},
	{
		Header : () => {return (<p style={{textAlign:'left', fontWeight:'bold'}}>Designation</p>)},
		accessor: "designation",
		style:{
			textAlign:"left"
		}
	},
	{
		Header : () => {return (<p style={{textAlign:'left', fontWeight:'bold'}}>Added By</p>)},
		accessor: "addedBy",
		width:100,
		minWidth:100,
		maxWidth:100,
		style:{
			textAlign:"left"
		}
	},
	{
		Header : () => {return (<p style={{textAlign:'right', fontWeight:'bold'}}>Created At</p>)},
		accessor: "createdAt",
		style:{
			textAlign:"right"
		}
	},
	{
		Header : () => {return (<p style={{textAlign:'left', fontWeight:'bold'}}>Action</p>)},
		filterable: false,
		sortable:false,
		width:100,
		minWidth:100,
		maxWidth:100,
		style:{
			textAlign:"left"
		},

		Cell : props => {
			return(
				<div>
				<button type="button" className="btn btn-outline-info btn-sm"
				data-toggle="tooltip" data-placement="top" title="Edit"
				//data-toggle="modal" data-target="#exampleModalCenter"
				onClick = {()=>{
					this.editEmployee(props.original.id);
				}}>
				<i className="fa fa-edit"></i></button>{" "} 

				<button className="btn btn-outline-danger btn-sm"
				data-toggle="tooltip" data-placement="left" title="Delete" 
				onClick = {()=>{
					this.deleteEmployee(props.original.id);
				}}>
				<i className="fa fa-trash"></i></button>
				</div>
				)
		}
	}
	
	]

	let fileName="Please select the file...";
	let uploadBtnDisable = true;
	if(this.state.fileName!==''){
		fileName = "Selected file : "+this.state.fileName
		uploadBtnDisable = false;
	}

	let alert = null;
	if(this.state.errorMessage){
		alert = <Alert className="CustomForm" color="danger">{this.state.errorMessage}</Alert>
	}

	let loading = null;
	if(this.state.loading){
		loading = <Spinner />
	}

	let deleteBtnDisable=true;
	if(this.state.employees.length >0){
		deleteBtnDisable=false;
	}

	return (
		<div>
		{loading}
		<NavigationBar />
		<Accordion>
		<table className="container">
		<tr>
		<td>
		<Accordion.Toggle  className="btn btn-outline-primary btn-sm" style={{ marginBottom: '1rem' }} eventKey="0">
		<i className="fa fa-plus"></i>{" "}Add Employee
		</Accordion.Toggle>
		{" "}
		<Accordion.Toggle className="btn btn-outline-primary btn-sm" style={{ marginBottom: '1rem' }} eventKey="1">
		<i className="fa fa-upload"></i>{" "}Mass upload
		</Accordion.Toggle>
		{" "}
		<Accordion.Toggle className="btn btn-outline-danger btn-sm" disabled={deleteBtnDisable} style={{ marginBottom: '1rem' }}
		onClick={this.deleteAllEmployees} data-toggle="tooltip" data-placement="left" title="Delete all">
		<i className="fa fa-trash"></i>{" "}Delete all
		</Accordion.Toggle>

		<Accordion.Collapse eventKey="0" >

		<div className="Add">
		{alert}
		<Form onSubmit={this.addEmployee} className="CustomForm">
		<Row form>
		<Col md={3}>
		<FormGroup>
		<Label for="firstName">First name</Label>
		<Input className="CustomForm" type="text" value={this.state.employee.firstName} onChange={this.onChangeFirstNameHandler} placeholder="First name" />
		</FormGroup>
		</Col>
		<Col md={3}>
		<FormGroup>
		<Label for="lastName">Last name</Label>
		<Input className="CustomForm" type="text" value={this.state.employee.lastName} onChange={this.onChangeLastNameHandler} placeholder="Last name" />
		</FormGroup>
		</Col>
		<Col md={3}>
		<FormGroup>
		<Label for="skill">Skill</Label>
		<Input className="CustomForm" type="text" value={this.state.employee.skill} onChange={this.onChangeSkillHandler} placeholder="Skill" />
		</FormGroup>
		</Col>
		<Col md={3}>
		<FormGroup>
		<Label for="designation">Designation</Label>
		<Input className="CustomForm" type="text" value={this.state.employee.designation} onChange={this.onChangeDesignationHandler} placeholder="Designation" />
		</FormGroup>
		</Col>
		</Row>
		<Row form style={{justifyContent:'center'}}>
		<Col md={6}>
		<FormGroup>

		<button className="btn btn-outline-primary btn-sm" 
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

		</div>

		</Accordion.Collapse>

		<Accordion.Collapse eventKey="1">
		<div className="Add">
		
		<Input className="CustomForm" type="text" disabled value={fileName} 
		/>
		<br />
		<input id="myInput"
		type="file"
		accept=".csv"
		ref={(ref) => this.upload = ref}
		style={{display: 'none'}}
		onChange={(event) => {
			this.onChangeFile(event)
			event.target.value = null;
		}}
		/>

		<button
			className="btn btn-outline-primary btn-sm"
			onClick={()=>{this.upload.click()}}
			data-toggle="tooltip" data-placement="left" title="Browse"
			><i className="fa fa-file-alt"></i>{" "}Browse
		</button>
		{" "}

		<button 
			type="submit"
			disabled={uploadBtnDisable}
			className="btn btn-outline-primary btn-sm"
			onClick={this.uploadEmployeeFile}
			data-toggle="tooltip" data-placement="left" title="Upload"
			><i className="fa fa-file-upload"></i>{" "}Upload
		</button>
		</div>	
		</Accordion.Collapse>

		</td>
		</tr>
		</table>
		</Accordion>
		<hr />

		<div className="d-flex justify-content-between">
			<div className="p-1"><h6>All Employees</h6></div>
			<div className="p-1"><h6>Total Employees : {this.state.count}</h6></div>
			<div className="p-0">
				<CSVLink 
					data={this.state.employees}
					headers={csvHeaders}
					filename={"all_employees_details.csv"}
					className={"btn btn-outline-success btn-sm "+(this.state.employees.length===0?'disabled':null)}
					target="_blank"
					data-toggle="tooltip" data-placement="left" title="Export"
					><i className="fa fa-download"></i>{" "}Export to CSV
				</CSVLink>
			</div>
		</div>

	<ReactTable
		className="-highlight -striped CustomTable"
		columns={columns} 
		data={this.state.employees}
		pageSizeOptions= {[5, 10, 20, 25, 50, 100]}
		defaultPageSize={10}
		filterable={true}
		minRows={this.state.employees.length < 5 ? this.state.employees.length : 5}

	></ReactTable>
	</div>
	);
}
}


export default Employee;