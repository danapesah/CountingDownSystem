
import React, { Component } from 'react';
import axios from 'axios';
//axios will help us connect the frontend to the backend /send data to the backend 
//well use the import axios from 'axios' library to send HTTP reuest to the backend

export default class CreateUser extends Component {

constructor(props) {
  super(props);

  this.onChangeUsername = this.onChangeUsername.bind(this);
  this.onChangePassword =this.onChangePassword.bind(this);
  this.onChangePermissions =this.onChangePermissions.bind(this);

  this.onSubmit = this.onSubmit.bind(this);
  this.state = {
    username: '',
    password:'',
    permissions:'',
  }
}
onChangeUsername(e) {
  this.setState({
    username: e.target.value
  })
}
onChangePassword(e) {
  
  this.setState({
      password: e.target.value
    })
}
onChangePermissions(e) {
  
  this.setState({
      permissions: e.target.value
    })
}
onSubmit(e) {
  e.preventDefault();

  const user = {
    username: this.state.username,
    password: this.state.password,
    permissions:this.state.permissions
  }

  console.log(user);

  //send the use data to the backend, send HTTP POST REQUEST to this 'http://localhost:5000/users/add', backend endpoint 
  //that expects a jason object in the request body and we send it as a second arguement
  axios.post('http://localhost:5000/users/add', user)
  .then(res => console.log(res.data)); //promise, after its posted well console our the res.data
  alert("user: "+ this.state.username + " added!")
  this.setState({
    username: '',
    password:'',
    permissions:''
  })
  window.location="/"
  }

    render(){
    return (
        <div style={{paddingLeft:"400px", width : "900px"}}>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group"> 
            <label>Password: </label>
            <input  type="password" name="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>


          <div className="form-group"> 
            <label>Permissions: </label>
            <input  type="text" 
                required
                className="form-control"
                value={this.state.permissions}
                onChange={this.onChangePermissions}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
 }

  
