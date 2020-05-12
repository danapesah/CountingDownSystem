
import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Popup from "reactjs-popup"

import ConfirmDeletePopup from '../ConfirmDeletePopup'

// Admin - All types of permissions.
// Editor - display and edit permissions.
// Viewer - display permissions

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
    title: 'Choose Permission',
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
onChangePermissions(chosen_permission) {
  
  this.setState({
    permissions: chosen_permission, 
    title: chosen_permission 
    })
}
onSubmit(e) {
  e.preventDefault();

  if(this.state.username!=='' && this.state.password!=='' && this.state.permissions!== ''  )
  {
    const user = {
      username: this.state.username,
      password: this.state.password,
      permissions: this.state.permissions
    }
  
    console.log(user);
  
    //send the use data to the backend, send HTTP POST REQUEST to this 'http://localhost:5000/users/add', backend endpoint 
    //that expects a jason object in the request body and we send it as a second arguement
    axios.post('http://localhost:5000/users/add', user)
    .then(res => console.log(res.data)); //promise, after its posted well console our the res.data
    //alert("user: "+ this.state.username + " added!")
    this.setState({
      username: '',
      password:'',
      permissions:''
    })

  //   <Popup
  //   trigger={ <div>  </div>  } >
  //    "New user info:"
  //    {this.state.username}
  //    {this.state.permissions}
  //  </Popup>
    // {/* window.location="/" */}

    

    
  }
  else {
    alert("please choose a permission")
  }
 
 
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
          <DropdownButton id="dropdown-basic-button" title={this.state.title}>
          <Dropdown.Item href="#/action-1" onClick={()=>this.onChangePermissions("Admin")}>Admin</Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={()=>this.onChangePermissions("Editor")} >Editor</Dropdown.Item>
          <Dropdown.Item href="#/action-3" onClick={()=>this.onChangePermissions("Viewer")} >Viewer</Dropdown.Item>
          </DropdownButton>
        
            {/* <input  type="text" 
                required
                className="form-control"
                value={this.state.permissions}
                onChange={this.onChangePermissions}
                /> */}
          </div>
              
              
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
        {/* <ConfirmDeletePopup id={null}/>
     
      <Popup
      trigger={<div>"aaaaa</div>}
      >
     <form onSubmit={null} >
          <label style={{float:"center"}} >
              Button Title:
              <input  type="text" name="button" onChange={null} />
          </label>
           <input type="submit" value="Submit" /> 
      </form>  
    </Popup> */}
      </div>
    );
  }
 }

  
