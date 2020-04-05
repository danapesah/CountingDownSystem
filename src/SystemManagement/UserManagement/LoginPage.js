
import React, { Component } from 'react';
import axios from 'axios';
//axios will help us connect the frontend to the backend /send data to the backend 
//well use the import axios from 'axios' library to send HTTP reuest to the backend
import { Link , withRouter  } from 'react-router-dom'; //link to different routs
import {connect } from 'react-redux'
import {save_user_info_after_login} from '../../Actions'
import MyNavbar from './MyNavbar'


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
  }
}
componentDidMount() {
  axios.get('http://localhost:5000/users/') //GET REQUEST
    .then(response => {
    if (response.data.length===0)return;
    this.setState({ DB_users_info :response.data })
    //console.log(this.state.DB_users_info)
  })

  .catch((error) => { //catch errors 
    console.log(error);
  })

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

onSubmit(e) {
e.preventDefault();
let temp_permissions=''
for(let i =  0; i < this.state.DB_users_info.length ; i++){
  if(this.state.username ===  this.state.DB_users_info[i].user_info.username &&
      this.state.password ===  this.state.DB_users_info[i].user_info.password  )
      {
        temp_permissions= this.state.DB_users_info[i].user_info.permissions 
      
        //  console.log(this.state.DB_users_info[i].user_info.permissions)
          this.setState({
            isLogged:1,
          user_permissions: this.state.DB_users_info[i].user_info.permissions,   
      })
      console.log("user_permissions ", this.state.DB_users_info[i].user_info.permissions)
      this.props.dispatch(save_user_info_after_login(this.state.username, this.state.DB_users_info[i].user_info.permissions,true))
      window.location="/list"
  }
}


}

render(){
  // const Button = withRouter(({ history }) => (
  //   <button
  //     type='button'
  //     onClick={() => { history.push('/user') }}
  //   >
  //     LOGIN!
  //   </button>
  // ))
return (

  <div>
    <div style={{paddingLeft:"400px", width : "900px"}} >
      <br></br>
    <h3>Enter your username and password</h3>
    <form >
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


    <div style={{paddingLeft:"190px", width : "100px"}} >
      <Link  className="btn btn-primary" to={"/temp"} 
        onClick={this.onSubmit}
          > LOGIN </Link>  
    </div>
    </form>


          {/* <Button/> */}
      </div>    
  </div>
    );
  }
 }

 const mapStateToProps = (state)=> ({
  state: state,
  _user_name: state._user_info._name,
  _user_permissions: state._user_info._permissions,
  _user_logged: state._user_info._logged,
})
export default connect(mapStateToProps)(LoginPage) ; 
