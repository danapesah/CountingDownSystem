
import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Popup from "reactjs-popup"
import AlertPopup from "./AlertPopup" 
import ConfirmDeletePopup from '../ConfirmDeletePopup'
// import Alert from "../Alert" 
import Alert from 'react-bootstrap/Alert'

// import Spinner from "../Spinner" 

// Admin - All types of permissions.
// Editor - display and edit permissions.
// Viewer - display permissions

export default class CreateUser extends Component {

constructor(props) {
  super(props);

  this.onChangeUsername = this.onChangeUsername.bind(this);
  this.onChangePassword =this.onChangePassword.bind(this);
  this.onChangePermissions =this.onChangePermissions.bind(this);

  // this.onSubmit = this.onSubmit.bind(this);

  this.state = {
    username: '',
    password:'',
    permissions:'',
    title: 'לחץ כאן לבחירת הרשאה',
    user_added: "no_user_added",
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
onSubmitUser() {
  // alert(this.state.permissions)
  if(this.state.username!=='' && this.state.password!=='' && this.state.permissions!== ''  )
  {
    this.setState({
      username: '',
      password:'',
      permissions:'',
      user_added: "_user_added",
    })
    const user = {
      username: this.state.username,
      password: this.state.password,
      permissions: this.state.permissions
    }
    //console.log(user);
    //send the use data to the backend, send HTTP POST REQUEST to this 'http://localhost:5000/users/add', backend endpoint 
    //that expects a jason object in the request body and we send it as a second arguement
    axios.post('http://localhost:5000/users/add', user)
    .then(res => console.log(res.data)); //promise, after its posted well console our the res.data
   


  }
}
change(){
  this.setState({user_added: false,
  })
}

    render(){
    return (
      
        <div style={{paddingLeft:"400px", width : "900px"}}>
        <h3 style={{textAlign:"center"}} >יצירת משתמש חדש</h3>
        <div style={{textAlign:"right"}} >
        <label>בחר שם משתמש </label>
        <input  type="text"
            required
            className="form-control"
            value={this.state.username}
            onChange={this.onChangeUsername}
            style={{textAlign:"right"}}            />


        <label>בחר סיסמא: </label>
        <input  type="password" name="password"
          required
          className="form-control"
          value={this.state.password}
          onChange={this.onChangePassword}
          style={{textAlign:"right"}}
          />

        <label>בחירת הרשאה: </label>
          <DropdownButton id="dropdown-basic-button" title={this.state.title}>
          <Dropdown.Item onClick={()=>this.onChangePermissions("Admin")}>Admin</Dropdown.Item>
          <Dropdown.Item onClick={()=>this.onChangePermissions("Editor")} >Editor</Dropdown.Item>
          <Dropdown.Item onClick={()=>this.onChangePermissions("Viewer")} >Viewer</Dropdown.Item>
          </DropdownButton>
        </div>
        <br></br>
        <br></br>
        <div style={{textAlign:"center"}} >
      <Popup
        trigger={
        <div style={{color:"#007bff"}} 
          onMouseOver={(e) =>{ e.target.style.fontWeight='bold';e.target.style.color="blue"} }
          onMouseOut={(e) =>{ e.target.style.fontWeight=null ;  e.target.style.color="#007bff"}}
        > צור משתמש
        </div> 
        } 
        modal closeOnDocumentClick  contentStyle={{width:"auto", height:"auto"}}> 
        {close =>(
            setTimeout(function(){
              window.location = '/user'
            },1000),
        
        <form >
        {this.onSubmitUser()}
        <label style={{fontSize: "19px" , color:"black", fontWeight:'bold' , border: '30px solid lightblue'}} >
        {this.state.user_added === "_user_added"? 
           "משתמש חדש נוסף למערכת "  
        :"יש למלא את השדה החסר"}
        </label>
        </form>)}
    </Popup> 
    </div>

  
    </div>

    );
  }
 }

  
