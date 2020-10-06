import React, {Component} from "react";
import {NavLink as RRNavLink} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
     } from 'reactstrap';

  import './NavigationBar.css';
  import logo from '../../images/my_logo.png';

class NavigationBar extends Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    render() {
    
      let username = sessionStorage.getItem('username');
      let role = sessionStorage.getItem('role');
      let roleDisplay = "Employee";

      let displayUserAdmin = null;
      if(role === "ROLE_ADMIN"){
        roleDisplay = "Admin";

        displayUserAdmin = <NavItem>
                  <NavLink tag={RRNavLink} to="/users">
                  <i className="fa fa-users"></i> User Administration</NavLink>
                </NavItem>
      }

      return (
        <div >
          <Navbar className="MyColor font15" light expand="md">
            <NavbarBrand tag={RRNavLink} to="/home"><img src={logo} alt="Logo" style={{height:'20px', width:'35px'}}/></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
               <NavItem>
                  <NavLink tag={RRNavLink} to="/home">
                  <i className="fa fa-home"></i> Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/employee">Employee</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/admin">Admin</NavLink>
                </NavItem>
                  <NavItem>
                  <NavLink tag={RRNavLink} to="/practice">Practice</NavLink>
                </NavItem>
                 <NavItem>
                  <NavLink tag={RRNavLink} to="/reactTable6">React Table 6</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/fileUpload">File Upload</NavLink>
                </NavItem>
               
              </Nav>
              <Nav navbar>

              {displayUserAdmin}
              <NavItem>
                  <NavLink
                  style={{color:'green'}}>
                  Welcome, {username} <span style={{fontWeight:'bold', fontStyle:'italic'}}>({roleDisplay})</span></NavLink>
                </NavItem>

                  <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                     <i className="fa fa-user"></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    {/*<DropdownItem divider />*/}
                    <DropdownItem>
                     <span>About</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                 <NavItem>
                 <NavLink tag={RRNavLink} to="/logout" 
                 data-toggle="tooltip" data-placement="top" title="logout" 
                 ><i className="fa fa-sign-out"></i> Logout</NavLink>
                 </NavItem>
                 </Nav>
            </Collapse>
          </Navbar>
          <br />
        </div>
      );
    }
  }

  export default NavigationBar;