import React, { Component} from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar.js';


class Home extends Component {
	render(){
		return (
			<div>
			<NavigationBar />
			<h2>This is home page</h2>
			</div>
			);
	}
}

export default Home;