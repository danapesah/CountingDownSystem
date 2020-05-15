import React, {Component} from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'; //link to different routs
import {save_user_info_after_login} from '../../Actions'
// import Navbar from 'react-bootstrap/Navbar'
// import { Button,Form, FormControl, Nav, Tab} from 'react-bootstrap';

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

<div style={{backgroundColor:"#343a40", width : "100%" , height:"80px", color:"white",}}>
  <div  style={{textAlign:"center"}}> 
    <h4  > מערכת ניהול לספירה יורדת</h4> 
      <div>{this.state._user_logged===true ? 
      this.state._user_name+" "+this.state._user_permissions+ " :שלום  " : "התחברות"} 
      </div >
  <div style={{display:"block",alignItems:"center" ,paddingRight:"20px"}}>
      {this.state._user_logged ===true ? 
      <>
      <Link  style={{color:"white" }} 
          onClick={()=>{this.props.dispatch(save_user_info_after_login('', '',false,''))
          ;localStorage.clear() ; 
          this.setState({
          _user_name:'', 
          _user_permissions:'',
          _user_logged: false,
          })
        }}
        to ="/">      התנתק    </Link>
        
        <Link  style={{color:"white"  }} to ="/list">רשימת מערכות   </Link>
        
        </>:null }  

    {this.state._user_logged ===true  && this.state._user_permissions==="Admin" ? 
       <> 
        <Link  style={{color:"white"  }}  to ="/user">    {"  "}     {'  הוספת משתמש  '}  {"  "}</Link>  
        <Link  style={{color:"white"  }} to ="/usersList">רשימת משתמשים </Link>
        </> : null}  
  </div >


     </div>
     
    </div> 

    );
}
}

const mapStateToProps = (state)=> ({
  state: state.MainWindowReducers,
})
export default connect(mapStateToProps)(MyNavbar) ; 