import React, {Component} from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'; //link to different routs
import {save_user_info_after_login} from '../../Actions'

class MyNavbar extends Component {
  constructor(props) {
      super(props);
      this.state = {
        flag:0,
      };

    }

  componentDidMount(){
  let if_logged = localStorage.getItem('my-state')
  let if_logged_parse ={}
  if_logged_parse=JSON.parse(if_logged)
  //  console.log("sdede", w.includes(true) )
  if (if_logged_parse){
    if( if_logged_parse.includes(true))
      this.props.dispatch(save_user_info_after_login('sharon', 'admin',true))
  }

    
}
render() {
 // console.log(this.props._logged)
    return (
  
      <div style={{backgroundColor:"#343a40", width : "100%" , height:"80px", color:"white",paddingLeft:"50px"}}>
      <div > 
      <h4 > CountDown System</h4> 
      <div>{this.props._logged===true ? "logged as: " +this.props._user_name : "please login"} 
       {this.props._user_permissions==="admin" ? " admin" : null} 
      </div>
      {this.props._logged ? 
      <div style={{ display:"flex"  }}>
      <Link  style={{color:"white", display:"flex",width : "60px" }} 
      onClick={()=>{this.props.dispatch(save_user_info_after_login('', '',false))
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
 _user_name: state._user_info._name,
 _user_permissions: state._user_info._permissions,
 _logged:state._user_info._logged
})
export default connect(mapStateToProps)(MyNavbar) ; 