
import React, { Component } from 'react';
import axios from 'axios';
//axios will help us connect the frontend to the backend /send data to the backend 
//well use the import axios from 'axios' library to send HTTP reuest to the backend
import { Link , withRouter  } from 'react-router-dom'; //link to different routs
import {connect } from 'react-redux'
import {save_user_info_after_login} from '../../Actions'
import MyNavbar from './MyNavbar'
import Spinner from '../Spinner'
import Popup from "reactjs-popup"
//add tests and checks 
 class LoginPage extends Component {

  constructor(props) {
  super(props);

  this.onChangeUsername = this.onChangeUsername.bind(this);
  this.onChangePassword =this.onChangePassword.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

  this.state = {
    username: '',
    password:'',
    DB_users_info : {},
    isLogged:0,
    user_permissions:'',
    _spinner:"none",
    popup_message: "משתמש לא קיים במערכת",
  }
}

onChangeUsername(e) { //set the username
this.setState({
  username: e.target.value
})
}
onChangePassword(e) { //set the password

this.setState({
    password: e.target.value
  })
}

onSubmit(e) { //check the user input 
e.preventDefault();

axios.get('http://localhost:5000/users/') //GET REQUEST
.then(response => {
if (response.data.length===0)return;
this.setState({ DB_users_info :response.data })
}).finally(()=>this.checkUser())
.catch((error) => { //catch errors 
console.log(error);
})
}


checkUser(){
let temp_permissions=''
for(let i =  0; i < this.state.DB_users_info.length ; i++){
  if(this.state.username ===  this.state.DB_users_info[i].user_info.username &&
      this.state.password ===  this.state.DB_users_info[i].user_info.password  )
      {
        temp_permissions= this.state.DB_users_info[i].user_info.permissions 
      
          this.setState({
            _spinner: "up", 
            isLogged:1,
          user_permissions: this.state.DB_users_info[i].user_info.permissions,
          popup_message:"ברוך הבא"
           
      })
     
      this.props.dispatch(save_user_info_after_login(this.state.username, this.state.DB_users_info[i].user_info.permissions,true,null))
     
      const info = {username:this.state.username,permissions:this.state.DB_users_info[i].user_info.permissions,is_logged:true}
    
        try{
        const serializedState = JSON.stringify(info)
        localStorage.setItem("login_info", JSON.stringify(serializedState));
        }  
        catch(e){
          console.log(e)
        }   
    //  window.location="/list"    
  }
 
}

}


render(){
return (

<div>
<div style={{paddingLeft:"500px", width : "1100px"}} >
<br></br>
<h3 style={{textAlign:"center"}} >התחברות</h3>
<form >
<div style={{textAlign:"right"}} >
<div className="form-group"> 
<label>:שם משתמש </label>
<input  type="text"
required
className="form-control"
value={this.state.username}
onChange={this.onChangeUsername}
style={{textAlign:"right"}} 
/>
</div>
<div className="form-group"> 
<label>:סיסמא </label>
<input  type="password" name="password"
required
className="form-control"
value={this.state.password}
onChange={this.onChangePassword}
style={{textAlign:"right"}} 
/>
</div>
</div>
<br></br>
<br></br>

</form>
<div >
</div> 
      <Popup 
      trigger={

      <div style={{textAlign:"center",color:"#fff" , backgroundColor: "#007bff" , borderColor: "#007bff" , width:"20%", 
      border:" 1px solid transparent", fontSize:"20px",}} 
      onMouseOver={(e) =>{ e.target.style.fontWeight='bold'; } }
      onMouseOut={(e) =>{ e.target.style.fontWeight=null }}
      onClickCapture=  {this.onSubmit}
      > התחבר
      </div> 
      } 
      modal closeOnDocumentClick contentStyle={{width:"auto", height:"auto"}}> 
      {close =>(
      setTimeout(function(){
        window.location = '/'
      },1000),

      <form >
      <label style={{fontSize: "19px" , color:"black", fontWeight:'bold' , border: '30px solid white',textAlign:"center",}} > 
      {this.state.popup_message}
      <div><Spinner/> </div> 
      {/* {this.state._spinner !=="none" ?
      <div><Spinner/> </div> :null} */}
      </label>

</form>
)}
</Popup> 
</div>    
</div>
);
}
}

 const mapStateToProps = (state)=> ({
  state: state,
  _user_name: state.MainWindowReducers._user_info._name,
  _user_permissions: state.MainWindowReducers._user_info._permissions,
  _user_logged: state.MainWindowReducers._user_info._logged,
})


export default connect(mapStateToProps)(LoginPage) ; 
