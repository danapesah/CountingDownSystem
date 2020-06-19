
import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Popup from "reactjs-popup"
import Spinner from "../Spinner"

// Admin - All types of permissions.
// Editor - display and edit permissions.
// Viewer - display permissions

export default class CreateUser extends Component {

constructor(props) {
  super(props);

  this.onChangeUsername = this.onChangeUsername.bind(this);
  this.onChangePassword =this.onChangePassword.bind(this);
  this.onChangePermissions =this.onChangePermissions.bind(this);

  this.state = {
    username: '',
    password:'',
    permissions:'',
    title: 'לחץ כאן לבחירת הרשאה',
    user_added: "no_user_added",
    DB_users_info : {},
    data_length:0,
    valid_user_input: false,
    popup_message:"יש למלא את השדה החסר" ,
    spinner_on:true,

  }
}
componentDidMount() {
  axios.get('http://localhost:5000/users/') //GET REQUEST - gets all the tables from the DB
    .then(response => {
    if (response.data.length===0)return;
    this.setState({ DB_users_info :response.data, 
      data_length:response.data.length, spinner_on:false,})

    try {
      const serializedState = localStorage.getItem("chosen_state");
      const serializedStateID = localStorage.getItem("chosen_state_id");
      const edit_state_id = localStorage.getItem("edit_state_id");
      if (serializedStateID !== null ) {
        localStorage.removeItem("chosen_state_id") 
      }
      if (serializedState !== null ) {
        localStorage.removeItem("chosen_state") 
      }
      if (edit_state_id !== null ) {
        localStorage.removeItem("edit_state_id") 
      }
    } catch (err) {
      return err;
    }
  })

  .catch((error) => { //catch errors 
    console.log(error);
  })
}

check_input_and_save(_user_name , _password ,_permissions )
{//check if the  input is legal and if the username isnt already exist in the db
  if(_user_name!=='' && _password!=='' && _permissions!== ''  )
  {
      for(let i=0 ; i < this.state.data_length ; i ++ )
      { 

        if(_user_name===this.state.DB_users_info[i].user_info.username && _password.length < 8){
          this.setState({popup_message: "משתמש כבר קיים במערכת, הסיסמא חייבת להכיל לפחות שמונה תווים"})
          return;
        }   
        if(_user_name===this.state.DB_users_info[i].user_info.username){
          this.setState({popup_message: "שם משתמש כבר קיים במערכת"})
          return;
        }  
      }
      if(_user_name< 2){
        this.setState({popup_message: "שם משתמש חייב להכיל לפחות 3 תווים"})
        return;
      }
      if(_password.length < 8){
        this.setState({popup_message: "הסיסמא חייבת להכיל לפחות 8 תווים"})
        return;
      }

      const user = {
        username:_user_name,
        password: _password,
        permissions: _permissions
      }
    //send the use data to the backend, send HTTP POST REQUEST to this 'http://localhost:5000/users/add', backend endpoint 
    //that expects a jason object in the request body and we send it as a second arguement
    axios.post('http://localhost:5000/users/add', user)
    .then(res => console.log(res.data)) //promise, after its posted well console our the res.data
    // .catch(e=>  console.log(e))
    .finally(
    this.setState({popup_message: "משתמש חדש נוסף למערכת " ,})
    )
    
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

change(){
  this.setState({user_added: false,
  })
}

add_user_inputs()
{
  let arr_add_user_inputs = []
  arr_add_user_inputs.push(
    <div key={1} style={{paddingLeft:"400px", width : "900px"}}>
    <h3 style={{textAlign:"center"}} >יצירת משתמש חדש</h3>
    <div style={{textAlign:"right"}} >
    <label>בחר שם משתמש </label>
    <input type="text"
        required
        className="form-control"
        value={this.state.username}
        onChange={this.onChangeUsername}
        style={{textAlign:"right"}}            />



    <label>בחר סיסמא </label>
    <input type="password" name="password"
      required
      className="form-control"
      value={this.state.password}
      onChange={this.onChangePassword}
      style={{textAlign:"right"}}
      />

    <label>בחר הרשאה </label>
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
      onMouseOver={(e) =>{ e.target.style.fontWeight='bold'; e.target.style.color="blue"} }
      onMouseOut={(e) =>{ e.target.style.fontWeight=null ; e.target.style.color="#007bff"}}
      onClickCapture=  {()=>this.check_input_and_save(this.state.username,this.state.password, this.state.permissions )}
    > צור משתמש
    </div> 
    } 
    modal closeOnDocumentClick contentStyle={{width:"auto", height:"auto"}}> 
    {close =>(
        setTimeout(function(){
          window.location = '/user'
        },1000),

    <form >
   <label style={{fontSize: "19px" , color:"black", fontWeight:'bold' , border: '30px solid white'}} > 
    {this.state.popup_message}
    </label>

 </form>
     )}
</Popup>  
</div>


</div>

)
return arr_add_user_inputs

}



    render(){
    return (
      <div>
      {this.state.spinner_on === true ? 
        <div style={{ marginLeft:"45%"}}>
          <Spinner/>
        </div>
        :
        <div>
         
      {this.add_user_inputs()}
     </div>
      }
     </div>

    );
  }
 }

  
