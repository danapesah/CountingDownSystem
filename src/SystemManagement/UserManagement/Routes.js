
import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route , Switch ,Link } from "react-router-dom"
import CreateUser from './CreateUser'
import UsersList from './UsersList'
import TablesList from '../TablesList'
import LoginPage from './LoginPage'
import MainWindow from '../../operationSystem/MainWindow'
import {connect } from 'react-redux'
import MyNavbar from './MyNavbar'
import store from '../../store'

class Routes extends Component {

    constructor(props) {
        super(props)
        this.state={
          _user_already_logged : false,
<<<<<<< HEAD
        }
      }
  componentDidMount() {
      try {
        const login_curr = localStorage.getItem("login_info");

        if (login_curr !== null ) {
          this.setState({_user_already_logged:true})
        }
      } catch (err) {
=======
          _curr_location: 'page_found',
        }
      }
componentDidMount(){

  this.check_path_name()     
}

check_path_name(){
  try {
    const curr_login = localStorage.getItem("login_info");
    const _edit_id = localStorage.getItem("edit_state_id");
    const _display_id = localStorage.getItem("chosen_state_id");
    const _chosen_state = localStorage.getItem("chosen_state");
    if (curr_login !== null ) 
    {
      let _user_info_parse = JSON.parse(JSON.parse(curr_login))
      let parse_permission = _user_info_parse.permissions
       this.setState({_user_already_logged:true,})
      //alert(_user_info_parse.permissions)
      if( window.location.pathname === "/display" && _display_id===null  )
      {
        this.setState({_curr_location:"page_not_found"})
      }
      
      if(_user_info_parse.permissions==="Admin")
      {//Admin Only
        if (window.location.pathname !== "/" && 
        window.location.pathname.search("/delete") === -1  && 
        window.location.pathname !== "/list" &&
        window.location.pathname.search("/edit") === -1 &&
        window.location.pathname !== "/system" &&
        window.location.pathname !== "/display" &&
        window.location.pathname !== "/user" &&
        window.location.pathname !== "/usersList" )
        {  
          this.setState({_curr_location:"page_not_found"})
        //  return;
        } 

        if( window.location.pathname.search("/edit") !== -1 && _edit_id!==null )
        {
          try{
          let tempID = JSON.parse(JSON.parse(_edit_id))
          let temp_path_id =window.location.pathname.slice(window.location.pathname.indexOf("edit")+5) 
           if(temp_path_id !== tempID)
           {
            this.setState({_curr_location:"page_not_found"})
            }
          }
          catch (err) {
          return err
          } 
        }
        if( window.location.pathname === "/system" && _chosen_state===null  )
        {
          this.setState({_curr_location:"page_not_found"})
        }

    }

      if(_user_info_parse.permissions==="Editor")
      {//Editor Only
        if (window.location.pathname !== "/" && 
        window.location.pathname !== "/list" &&
        window.location.pathname.search("/edit") === -1 &&
        window.location.pathname !== "/display")
        {  
          this.setState({_curr_location:"page_not_found"})
        } 
        if( window.location.pathname.search("/edit") !== -1 && _edit_id!==null  )
        try{
          let tempID = JSON.parse(JSON.parse(_edit_id))
          let temp_path_id =window.location.pathname.slice(window.location.pathname.indexOf("edit")+5) 
          if(temp_path_id !== tempID)
          {
            this.setState({_curr_location:"page_not_found"})
          }
        }
        catch (err) {
          return err
      }
      }


      if(_user_info_parse.permissions==="Viewer")
      {//Viewer Only
        if (window.location.pathname !== "/" && 
        window.location.pathname !== "/list" &&
        window.location.pathname !== "/display")
        {  
          this.setState({_curr_location:"page_not_found"})
        } 
      }
     }
    } 
      
      catch (err) {
>>>>>>> master
        return err;
      }
  
  }


<<<<<<< HEAD
    render(){
    return (
       
        <div>
     
        <Router  forceRefresh={true} >
        <MyNavbar sharon={this.props._user_name}/>
        <Switch>
           <div >
           <br/>
=======
render(){
return (
       
<div>
    
{ this.state._curr_location === 'page_found' &&  this.state._user_already_logged === true ?
>>>>>>> master

         { this.state._user_already_logged === false ? 
           <div >
             <Route path="/" exact component={LoginPage}   />
             <Route path="/delete/:id" exact component={LoginPage} />
             <Route path="/list"  component={LoginPage}/>
             <Route path="/edit/:id" component={LoginPage}  />{/*add /edit/:id to the address */}
             <Route path="/system" component={LoginPage} /> {/*add /user to the address*/ } 
             <Route path="/display"  component={LoginPage} /> {/*add /display to the address*/ }
             <Route path="/user" component={LoginPage} /> 
             <Route path="/login" component={LoginPage} />
             <Route path="/usersList" component={LoginPage} />  
            </div>
           :  
           <div >
           <Route path="/" exact component={TablesList}/>
          <Route path="/delete/:id" exact component={TablesList} />
          {/* <Route path="/done" exact component={TablesList} /> */}
          <Route path="/list"  component={TablesList}/>
          <Route path="/edit/:id" component={MainWindow}  />{/*add /edit/:id to the address */}
          <Route path="/system" component={MainWindow} /> {/*add /user to the address*/ } 
          <Route path="/display"  component={MainWindow} /> {/*add /display to the address*/ }
          <Route path="/user" component={CreateUser} /> 
          <Route path="/login" component={LoginPage} />
          <Route path="/usersList" component={UsersList} />  
          </div>
          }  

        
           </div>
       </Switch>
       </Router>


    </div>
    );
  }
 }

 const mapStateToProps = (state)=> ({
   state: state,
  _user_name: state.MainWindowReducers._user_info._name,
  _user_permissions: state.MainWindowReducers._user_info._permissions,
  _logged:state.MainWindowReducers._user_info._logged
})
export default connect(mapStateToProps)(Routes) ; 
