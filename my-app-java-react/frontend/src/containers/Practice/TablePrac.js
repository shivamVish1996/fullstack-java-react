import React,{Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import NavigationBar from '../../components/Navigation/NavigationBar.js';
import './TablePrac.css';

class TablePrac extends Component {

	render(){
	

		var products = [
	{
		id: 1,
		name: "Product ID",
		price: 120,
		
	}, {
		id: 2,
		name: "Product Name",
		price: 80
	}, {
		id: 3,
		name: "Product Price",
		price: 80
	}, {
		id: 2,
		name: "Product Name",
		price: 80
	}, {
		id: 3,
		name: "Product Price",
		price: 80
	}, {
		id: 2,
		name: "Product Name",
		price: 80
	}, {
		id: 3,
		name: "Product Price",
		price: 80
	}, {
		id: 2,
		name: "Product Name",
		price: 80
	}, {
		id: 3,
		name: "Product Price",
		price: 80
	}, {
		id: 2,
		name: "Product Name",
		price: 80
	}, {
		id: 3,
		name: "Product Price",
		price: 80
	}, {
		id: 2,
		name: "Product Name",
		price: 80
	}, {
		id: 3,
		name: "Product Price",
		price: 80
	}
	];

	var fields = [
	{
		name: "Product ID",
		dataField: 'id',
	}, {
		name: "Product Name",
		type: 'fixedText',
		dataField: 'name',
	}, {
		name: "Product Price",
		dataField: 'price',
	}
	];

	var listCols = fields.map(  (field, index) => {
            return (
                <TableHeaderColumn
                    key={index}
                    isKey = {field.dataField === 'id' ? true : false}
                 //   isKey={field.dataField == 'userId' ? true : false}
                  //  hidden={field.hidden || false}
                    /*width={field.width}
                    dataAlign={field.dataAlign}*/
                 //   dataSort = {true}
                   dataSort={field.dataField === 'actions' ? false : true}
                    
                    dataField={field.dataField}
                    ref={field.dataField}
                    filter={
                    	 field.dataField === "actions" 
                    	 ? false 
                    	 : {type: "TextFilter", delay: 500} 
                    	}
                     
                    // filter={
                    //     field.dataField !== "actions" && field.dataField !== "active"
                    //         ? { type: "TextFilter", delay: 1000 }
                    //         : null
                    // }
                >
                    {field.name}
                </TableHeaderColumn>
            );
        }
        );


return (
		<div>
		<NavigationBar />
			<BootstrapTable 
			className="TableBootstrap" 
			data={products} 
			version='4'
		
			striped pagination exportCSV >
      {listCols}
  </BootstrapTable>
		</div>
		)
	}

}

export default TablePrac;