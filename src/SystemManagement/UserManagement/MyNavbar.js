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

      };

    }
    componentDidMount(){
      try {
        const serializedState = localStorage.getItem("login_info"); //''something 
        if (serializedState === null) {
          return undefined;
        }
        else{
          let _user_info_parse = JSON.parse(JSON.parse(serializedState ))
          this.setState({
            _user_name:_user_info_parse.username, 
            _user_permissions:_user_info_parse.permissions,
            _user_logged: _user_info_parse.is_logged,
          })
          return JSON.parse(serializedState);
        }
      
      } catch (err) {
        return undefined;
      }

 }   

render() {
    return (
  
  <div style={{backgroundColor:"#343a40", width : "100%" , height:"80px", color:"white",paddingLeft:"50px"}}>
      <h4 style={{textAlign:"center"}} > CountDown System</h4> 
      <div style={{textAlign:"center"}}>{this.state._user_logged===true ? 
    "logged as: " +this.state._user_name+" "+this.state._user_permissions : "please login"} 
  </div>
  {this.state._user_logged ===true ? 
    <div >
     <Nav className="justify-content-end" activeKey="/home">
     {this.state._user_permissions==="Admin" ? 
     <div style={{ display:"flex"  }}>
    <Nav.Item>
      <Nav.Link 
       onClick={()=>{this.props.dispatch(save_user_info_after_login('', '',false,''))
       ;localStorage.clear() ; 
         this.setState({
         _user_name:'', 
         _user_permissions:'',
         _user_logged: false,
         })
       }}
      href="/"  eventKey="link-3">התנתק</Nav.Link>
    </Nav.Item>

 
    <Nav.Item>
      <Nav.Link href="/user"  eventKey="link-3">יצירת משתמש</Nav.Link>
    </Nav.Item>

  <Nav.Item>
    <Nav.Link  href="/usersList" eventKey="link-2">רשימת משתמשים</Nav.Link>
  </Nav.Item>
  </div>
  :null }  
  <Nav.Item>
    <Nav.Link href="/list" eventKey="link-1">
      רשימת ניסויים
    </Nav.Link>
  </Nav.Item>

   
  </Nav>
  </div>
  :null }  
  <div > 
    

  {/* {this.state._user_logged ===true ? 
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