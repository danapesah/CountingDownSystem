import React, {Component} from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'; //link to different routs
import {save_user_info_after_login} from '../../Actions'
import Nav from 'react-bootstrap/Nav'

class MyNavbar extends Component {
  constructor(props) {
      super(props);
      this.state = {
        _user_name: '',
        _user_permissions: '',
        _user_logged: false,
        _user_already_logged:false,
        chosen_system_title: '', 

      };

    }
    componentDidMount(){
      try {
        const serializedStateInfo = localStorage.getItem("login_info"); 
        const serializedState = localStorage.getItem("chosen_state"); 
        if (serializedStateInfo === null) {
          return undefined;
        }
        if (serializedState !== null &&( window.location.pathname.search("display")!== -1 ) || window.location.pathname.search("edit")!== -1 )  {
          let _chosen_state_parse = JSON.parse(JSON.parse(serializedState ))
          this.setState({chosen_system_title: _chosen_state_parse.title})
         // console.log(_chosen_state_parse.title)
        }
        if (serializedStateInfo !== null) {
          let _user_info_parse = JSON.parse(JSON.parse(serializedStateInfo ))
          this.setState({
            _user_name:_user_info_parse.username, 
            _user_permissions:_user_info_parse.permissions,
            _user_logged: _user_info_parse.is_logged,
            _user_already_logged :true
          })
          return JSON.parse(serializedStateInfo);
        }
      
      } catch (err) {
        return undefined;
      }

 }   

render() {
    return (
  
  <div style={{backgroundColor:"#343a40", width : "100%" , height:"85px", color:"white",paddingLeft:"50px"}}>
  <div > 
  <h4 style={{textAlign:"center"}}> 
{/* {  alert(this.state.chosen_system_title)} */}
  
  { this.state.chosen_system_title !== '' ?

  " " +this.state.chosen_system_title +" - ":
   null} 

  מערכת פעימה
  </h4> 
  <div style={{textAlign:"center"}}>{this.state._user_already_logged===true ? 
   this.state._user_name+" "+this.state._user_permissions +" "+ ":שלום"  : "יש להתחבר למערכת"}
  </div>

  <Nav className="justify-content-end">
   
  {this.state._user_already_logged ===true ? 
    <div style={{ display:"flex"  }}>
      
    <Nav.Item>
      <Nav.Link style={{color:"white"}} href="/"
  onClick={()=>{this.props.dispatch(save_user_info_after_login('', '',false,''))
  ;localStorage.clear() ; 
    this.setState({
    _user_name:'', 
    _user_permissions:'',
    _user_logged: false,
    _user_already_logged:false,
    })
  }}
      >התנתק</Nav.Link>
    </Nav.Item>
    {this.state._user_permissions==="Admin" ? 
     <div style={{ display:"flex"  }}>
    <Nav.Item>
      <Nav.Link style={{color:"white"}}href="/user" eventKey="link-2">הוספת משתמש</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link style={{color:"white"}} href="/usersList"  eventKey="link-3" >
      רשימת משתמשים
      </Nav.Link>
    </Nav.Item>
    </div>
  :null } 
    <Nav.Item>
      <Nav.Link style={{color:"white"}} href="/list" eventKey="link-1">רשימת פעילויות</Nav.Link>
    </Nav.Item>
 
  </div>
  :null }  
  </Nav>
  
{/* 
  {this.state._user_logged ===true ? 
    <div style={{ display:"flex"  }}>
    <Link  style={{color:"white", display:"flex",width : "60px" }} 
      onClick={()=>{this.props.dispatch(save_user_info_after_login('', '',false,''))
      ;localStorage.clear() ; 
        this.setState({
        _user_name:'', 
        _user_permissions:'',
        _user_logged: false,
        })
      }}
    to ="/">logout </Link>
    <Link  style={{color:"white", display:"flex",width : "100px"  }} to ="/list">Table List </Link>
   
    {this.state._user_permissions==="Admin" ? 
     <div style={{ display:"flex"  }}>
     <Link  style={{color:"white", display:"flex",width : "100px"  }} to ="/user">Add user </Link>  
      <Link  style={{color:"white", display:"flex",width : "100px"  }} to ="/usersList">Users list </Link> </div>: null} 
    </div>
  :null }   */}

  </div>
  </div>

    );
}
}

const mapStateToProps = (state)=> ({
  state: state.MainWindowReducers,
})
export default connect(mapStateToProps)(MyNavbar) ; 