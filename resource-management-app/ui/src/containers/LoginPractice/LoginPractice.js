import React, { Component } from "react";
import { Alert } from "reactstrap";

import Axios from "../../Axios/Axios.js";
import Spinner from "../../components/Spinner/Spinner.js";
import ErrorMessages from "../../components/Common/ErrorMessages.js";

import './LoginPractice.css'

const loginFormValidate = (data) => {
  if (data.username === "" || data.username === "") return false;
  else return true;
};

class LoginPractice extends Component {
  state = {
    loginData: {
      username: "",
      password: "",
    },
    loading: false,
    loginResult: false,
    errorMessage: "",
  };

  usernameChangeHandler = (event) => {
    let loginData = { ...this.state.loginData };
    loginData.username = event.target.value;
    this.setState({ loginData: loginData });
  };

  passwordChangeHandler = (event) => {
    let loginData = { ...this.state.loginData };
    loginData.password = event.target.value;
    this.setState({ loginData: loginData });
  };

  resetForm = () => {
    this.setState({ errorMessage: "" });
    let loginData = { ...this.state.loginData };
    loginData.username = "";
    loginData.password = "";
    this.setState({ loginData: loginData });
  };

  submitLoginForm = (event) => {
    event.preventDefault();

    if (loginFormValidate(this.state.loginData)) {
      this.setState({ loading: !this.state.loading });
      Axios({
        method: "post",
        url: "/authenticate",
        data: this.state.loginData,
      })
        .then((response) => {
          this.setState({ loginResult: true });

          //adding access token and username to session storage
          // console.log('response: ',response);
          // console.log('jwt: ',response.data.jwt);
          // console.log('username: ',response.data.username);
          // console.log('role: ',response.data.roles[0].authority);

          let apiAccessToken = response.data.jwt;
          let username = response.data.username;
          let role = response.data.roles[0].authority;

          sessionStorage.setItem("apiAccessToken", apiAccessToken);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("role", role);

          this.setState({ loading: !this.state.loading });

          if (sessionStorage.getItem("apiAccessToken"))
            this.props.history.push("/home");
        })
        .catch((error) => {
          this.setState({ loading: !this.state.loading });

          if (error.response) {
            if (error.response.status === 403) {
              this.setState({
                errorMessage: ErrorMessages.INVALID_USERNAME_OR_PASSWORD,
              });
            }
          } else {
            this.setState({ errorMessage: ErrorMessages.DATABASE_DOWN });
          }
        });
    } else {
      this.setState({ errorMessage: ErrorMessages.USERNAME_OR_PASSWORD_EMPTY });
    }
  };

  render() {
    let loading = null;
    let alert = null;

    if (this.state.loading) {
      loading = <Spinner />;
    }

    if (this.state.errorMessage) {
      alert = (
        <Alert color="danger">
          {this.state.errorMessage}
        </Alert>
      );
    }

    return (
      <div className="container customMargin">
       
        {loading}
        <h3 className="text-center">Login</h3>
        <br />
        {alert}
        <form onSubmit={this.submitLoginForm}>
          <div className="form-group">
            <label htmlFor="Username">Username</label>{" "}
            <i className="fa fa-user fa-sm"></i>
            <input
              type="text"
              placeholder="username"
              className="form-control"
              value={this.state.loginData.username}
              onChange={this.usernameChangeHandler}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>{" "}
            <i className="fa fa-lock fa-sm"></i>
            <input
              type="password"
              placeholder="password"
              className="form-control"
              value={this.state.loginData.password}
              onChange={this.passwordChangeHandler}
              autoComplete="off"
            />
          </div>
          <div className="text-center">
            <button className="btn btn-outline-primary" type="submit">
              Log in <i className="fa fa-sign-in fa-sm"></i>
            </button>{" "}
            <button
              className="btn btn-outline-info"
              type="reset"
              onClick={this.resetForm}
            >
              Reset <i className="fa fa-undo fa-sm"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPractice;
