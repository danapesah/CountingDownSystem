import React, {Component} from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'; //link to different routs
import {save_user_info_after_login} from '../../Actions'

class MyNavbar extends Component {
  constructor(props) {
      super(props);
      this.state = {
        _user_name: '',
        _user_permissions: '',
        _user_logged: false,

      };

    }

  componentDidMount(){
  //save the data to the local storage and handke refresh/F5 action
  let system_state = localStorage.getItem('system-state')
  let system_state_parse = JSON.parse(JSON.parse(system_state ))


   if(system_state!==null){
//     console.log( system_state_parse.system_state._user_info._logged)
     if (system_state_parse.system_state._user_info._logged){
       this.setState({
        _user_name:system_state_parse.system_state._user_info._name, 
        _user_permissions:system_state_parse.system_state._user_info._permissions,
        _user_logged: system_state_parse.system_state._user_info._logged,
      })
//     this.props.dispatch(save_user_info_after_login(
//     system_state_parse.system_state._user_info._name, 
//     system_state_parse.system_state._user_info._permissions,
//     system_state_parse.system_state._user_info._logged,
//     system_state_parse.system_state ))
   }
 }
 
}

render() {
 // console.log(this.state._logged)
    return (
  
      <div style={{backgroundColor:"#343a40", width : "100%" , height:"80px", color:"white",paddingLeft:"50px"}}>
      <div > 
      <h4 > CountDown System</h4> 
      <div>{this.state._user_logged===true ? "logged as: " +this.state._user_name+" "+this.state._user_permissions : "please login"} 
       {/* {this.state._user_permissions==="admin" ? " admin" : null}  */}
      </div>
      {this.state._user_logged ===true ? 
      <div style={{ display:"flex"  }}>
      <Link  style={{color:"white", display:"flex",width : "60px" }} 
      onClick={()=>{this.props.dispatch(save_user_info_after_login('', '','',false,''))
      ;localStorage.clear() }}
      to ="/login">logout </Link>
      <Link  style={{color:"white", display:"flex",width : "100px"  }} to ="/list">Table List </Link>
      <Link  style={{color:"white", display:"flex",width : "100px"  }} to ="/user">Add user </Link>
      </div>
      :null } 

      </div>
      </div>

    );
}
}

const mapStateToProps = (state)=> ({
  state: state,
})
export default connect(mapStateToProps)(MyNavbar) ; 