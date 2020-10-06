import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import "react-table-6/react-table.css";
import Axios from '../../../Axios/Axios.js';
import NavigationBar from '../../../components/Navigation/NavigationBar.js';
import Spinner from '../../../components/Spinner/Spinner.js';

class ReactTable6 extends Component {

	constructor(props){
		super(props)

		this.state = {
			employees: [],
			loading:false
		}
	}

	getAllEmployees = () => {
		if(sessionStorage.getItem('apiAccessToken')){

			this.setState({loading : !this.state.loading});
			const apiAccessToken = sessionStorage.getItem('apiAccessToken');

			Axios({
					method: 'get',
					url: '/employees',
					headers: {
				    	'Authorization': `Bearer ${apiAccessToken}`
				   	}
				}).then(response => {
					console.log('response: ', response);
						this.setState({employees:response.data});
						this.setState({loading:!this.state.loading});
				}).catch(error => {
					
				  	this.setState({loading:!this.state.loading});

				});
			}else{
				console.log('not authorised')
			}
	}

	componentDidMount() {
		this.getAllEmployees();
		}

	editEmployee = (id) => {
		console.log('Edit id: ', id)
	}

	deleteEmployee = (id) => {
		console.log('Delete id: ', id)
	}

	render() {
		
		const columns = [
		{
			Header : "Select",
			Cell:props=>{return (<input type="checkbox"/>)},
			filterable: false,
			sortable:false,
			width:100,
			minWidth:100,
			maxWidth:100,
		},
		{
		//	Header : "ID",
		Header : () => {return (<p>ID <i className="fa fa-sort"></i></p>)},
			accessor: "id",
			width:100,
			minWidth:100,
			maxWidth:100,
		},
		{
			Header : "First name",
		//	Filter: () => (<input type="text" placeholder="First name"></input>),
			accessor: "firstName",
			style:{
				textAlign:"center"
			}
		},
		{
			Header : "Last name",
			accessor: "lastName",
			style:{
				textAlign:"center"
			}
		},
		{
			Header : "Skill",
			accessor: "skill",
			style:{
				textAlign:"center"
			}
		},
		{
			Header : "Designation",
			accessor: "designation",
			style:{
				textAlign:"center"
			}
		},
		{
			Header : "Action",
			filterable: false,
			sortable:false,
			width:100,
			minWidth:100,
			maxWidth:100,

			Cell : props => {
				return(
				<div>
						<button className="btn btn-outline-primary btn-sm"
						data-toggle="tooltip" data-placement="top" title="Edit"
						onClick = {()=>{
							this.editEmployee(props.original.id);
						}}>
						<i className="fa fa-edit fa-lg"></i></button>{" "} 

						<button className="btn btn-outline-danger btn-sm"
						data-toggle="tooltip" data-placement="left" title="Delete" 
						onClick = {()=>{
							this.deleteEmployee(props.original.id);
						}}>
						<i className="fa fa-trash fa-lg"></i></button>
						</div>
						)
					}
		}
	
		]

		let loading = null;
		
		if(this.state.loading){
			loading = <Spinner />
		}
		return (
			<div>
			<NavigationBar />
				{loading}
				
				
				<ReactTable /*className="CustomTable"*/
				className="-highlight"
				columns={columns} 
				data={this.state.employees}
			//	resolveData={data => data.map(row => row)}
				pageSizeOptions= {[5, 10, 20, 25, 50, 100]}
				defaultPageSize={10}
				filterable={true}
				minRows={this.state.employees.length < 5 ? this.state.employees.length : 5}

				></ReactTable>
			</div>
		);
	}
}

export default ReactTable6
