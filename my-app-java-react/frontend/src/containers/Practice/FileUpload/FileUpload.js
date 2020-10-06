import React, { Component } from 'react';
// import { Button, Card, CardBody, UncontrolledCollapse } from 'reactstrap';
//import { Col, Row, Form, FormGroup, Label, Input, Alert, UncontrolledCollapse } from 'reactstrap';
// import Accordion from 'react-bootstrap/Accordion';
// import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';

//import NavigationBar from '../../../components/Navigation/NavigationBar.js';
//import Axios from '../../../Axios/Axios.js';

class FileUpload extends Component {

	constructor(props){
		super(props);
		this.fileInput = React.createRef();
		this.upload = React.createRef();
		this.state={
			fileName:''
		}
	}

	// onChangeFile = (event) => {

	// 	event.stopPropagation();
	// 	event.preventDefault();

	// 	this.fileInput = event.target.files[0]
	// 	this.setState({fileName: event.target.files[0].name});

	// }

	// onSubmit = () => {
	// 	console.log('on submit: ', this.fileInput);
	// 	this.fileInput=null;
	// 	this.setState({fileName: ''});
	// }


	// render(){
	// 	let fileName="Please select a file"
	// 	let disableBtn = true;
	// 	if(this.state.fileName!==''){
	// 		fileName = this.state.fileName;
	// 		disableBtn = false;
	// 	}


	// 	return(
	// 		<div>
	// 		<NavigationBar />

	// <Accordion>
	// <table className="container">
	// <tr>
	// <td>
	// <Accordion.Toggle as={Button} className="btn btn-primary btn-sm" eventKey="0">
	// Add Employee
	// </Accordion.Toggle>
	// {" "}
	// <Accordion.Toggle as={Button} className="btn btn-primary btn-sm" eventKey="1">
	// Employee file upload
	// </Accordion.Toggle>

	// <Accordion.Collapse eventKey="0" >

	// </Accordion.Collapse>

	// <Accordion.Collapse eventKey="1" style={{backgroundColor:'#F8F8FF',  padding: '10px',
 //  paddingBottom: '5px'}}>
	
	// 	<div>
	// 	<br />
	// 	<input type="text" disabled value={fileName} onClick={()=>{this.upload.click()}}/>

	// 	<input id="myInput"
	// 	type="file"
	// 	accept=".csv"
	// 	ref={(ref) => this.upload = ref}
	// 	style={{display: 'none'}}
	// 	onChange={(event) => {this.onChangeFile(event)}}
	// 	/>
	// 	{" "}
	// 	<button
	// 	className="btn btn-primary btn-sm"
	// 	onClick={()=>{this.upload.click()}}
	// 	>Browse</button>
	// 	{" "}
	// 	<button type="submit"
	// 	disabled={disableBtn}
	// 	className="btn btn-primary btn-sm"
	// 	onClick={this.onSubmit}
	// 	>Upload</button>
	// 	</div>	
	// </Accordion.Collapse>

	// </td>
	// </tr>
	// </table>
	// </Accordion>
	

	// </div>
	// );


	// }









// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			selectedFile:null
// 		}
// 		this.fileInput = React.createRef();
// 	}

// 	selectFile = (event) => {
// 		event.preventDefault();
// 		console.log(event.target.files[0]);
// 	//	if(event.target.files.length >0)
// 	//	this.uploadFile(event.target.files[0])
// }

// uploadFile = (file) => {
// 	let formData = new FormData();
// 	formData.append("file", file);
// 	Axios({
// 		method: 'post',
// 		url: '/testcsv/upload/file',
// 		data: formData,
// 		headers: {
// 			//	'Authorization': `Bearer ${apiAccessToken}`,
// 			"Content-Type": "multipart/form-data"
// 		}
// 	})
// 	.then(response => {
// 		console.log('response: ', response)

// 	})
// 	.catch(error => {
// 		console.log('error: ',error);

// 	});

// }

	onChangeFile = (event) => {

		event.stopPropagation();
		

		console.log('event.target.files[0]: ', event.target.files[0])

		this.fileInput = event.target.files[0]
		this.setState({fileName: event.target.files[0].name});
		//event.preventDefault();
	}

	uploadEmployeeFile = () => {
		//event.preventDefault();
		console.log('on submit: ', this.fileInput);

		let formData = new FormData();
		let file = this.fileInput;
		formData.append("file", file);
		this.setState({fileName:''});
    this.fileInput=null;
    this.output=null;
}

render() {

let fileName="Please select a file"
	let disableBtn = true;
	if(this.state.fileName!==''){
		fileName = this.state.fileName;
		disableBtn = false;
	}

	return (
		<div>
		{/*<form onSubmit={this.uploadEmployeeFile}>*/}

		<input className="CustomForm" type="text" disabled value={fileName} 
		 />
		<br />

		<input
		type="file"
		accept=".csv"
	//	ref={(ref) => this.upload = ref}
	//	 ref={this.fileInput}
		 ref={(inputFile)=>this.upload=inputFile}
		style={{display: 'none'}}
		onChange={(event) => {
				this.onChangeFile(event)
				event.target.value = null;
			}}
		/>

		<button
		className="btn btn-primary btn-sm"
		onClick={()=>{this.upload.click()}}
		>Browse</button>
		{" "}
		<button type="submit"
		disabled={disableBtn}
		className="btn btn-primary btn-sm"
		onClick={this.uploadEmployeeFile}
		>Upload</button>

	{/*	<label>
		Upload file:
		<input type="file" ref={this.fileInput} />
		</label>
		<br />
		<button type="submit">Submit</button>*/}
		{/*</form>*/}
	</div>

		);
}



// 	render() {

// 		return (
// 			<div>
// 			<NavigationBar />
// 			<div className="row">
//                 <div className="col-md-6">
//                         <div className="form-group files color">

// 			<label>Upload file</label>
// 			<input type="file" name="file" 
// 			className="form-control" onChange={this.selectFile} />
// 			</div>
// 			</div>
// 			</div>

// 			</div>
// 			);
// 	}
}

export default FileUpload;
