
import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../navbar'
import { BrowserRouter as Router, Route , useLocation ,Switch, PrivateRoute, Redirect } from "react-router-dom"
import CreateUser from './CreateUser'
import Temp from '../operationSystem/countDownWindow/Temp'
import LoginPage from './LoginPage'
import MainWindow from '../operationSystem/MainWindow'
import { Link } from 'react-router-dom'; //link to different routs
import {connect } from 'react-redux'
import MyNavbar from './MyNavbar'

class Routes extends Component {

    constructor(props) {
        super(props)
        this.state={
          log:''
        }
      }
    render(){
      console.log(this.props)
   
    return (
       
        <div>
     
         
      
        <Router>
        <MyNavbar sharon={this.props._user_name}/>
           <div >
           <br/>
           

         { this.props._logged === false ? 
             <Route path="/" exact component={LoginPage}   /> 
           : 
              <Route path="/" exact component={Temp}   /> 
          } 
          <Route path="/list" exact component={Temp  }/>
          <Route path="/edit/:id" component={MainWindow}  />{/*add /edit/:id to the address */}
          <Route path="/system" component={MainWindow} /> {/*add /user to the address*/ } 
          <Route path="/display" component={MainWindow} /> {/*add /display to the address*/ }
          <Route path="/user" component={CreateUser} /> 
          <Route path="/login" component={LoginPage} />       
           </div>
       </Router>


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
export default connect(mapStateToProps)(Routes) ; 

