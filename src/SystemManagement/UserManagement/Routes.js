
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
        }
      }
  componentDidMount() {
      try {
        const login_curr = localStorage.getItem("login_info");

        if (login_curr !== null ) {
          this.setState({_user_already_logged:true})
        }
      } catch (err) {
        return err;
      }
  
  }


    render(){
    return (
       
        <div>
     
        <Router  forceRefresh={true} >
        <MyNavbar sharon={this.props._user_name}/>
        <Switch>
           <div >
           <br/>

         { this.state._user_already_logged === false ? 
             <Route path="/" exact component={LoginPage}   /> 
           :  <Route path="/" exact component={TablesList}/>
            
          }  

        <Route path="/delete/:id" exact component={TablesList} />
        <Route path="/done" exact component={TablesList} />

          <Route path="/list"  component={TablesList}/>
          <Route path="/edit/:id" component={MainWindow}  />{/*add /edit/:id to the address */}
          <Route path="/system" component={MainWindow} /> {/*add /user to the address*/ } 
          <Route path="/display"  component={MainWindow} /> {/*add /display to the address*/ }
          <Route path="/user" component={CreateUser} /> 
          <Route path="/login" component={LoginPage} />
          <Route path="/usersList" component={UsersList} />          
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

