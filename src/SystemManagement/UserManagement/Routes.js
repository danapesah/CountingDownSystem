
import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route } from "react-router-dom"
import CreateUser from './CreateUser'
import TablesList from '../TablesList'
import LoginPage from './LoginPage'
import MainWindow from '../../operationSystem/MainWindow'
import { Link } from 'react-router-dom'; //link to different routs
import {connect } from 'react-redux'
import MyNavbar from './MyNavbar'
import store from '../../store'

class Routes extends Component {

    constructor(props) {
        super(props)
        this.state={
          log:''
        }
      }





    render(){
      // let y=store.getState()
      // console.log(store.getState())
   
    return (
       
        <div>
     
         
      
        <Router >
        <MyNavbar sharon={this.props._user_name}/>
        {/* <Switch> */}
           <div >
           <br/>

         { this.props._logged === false ? 
             <Route path="/" exact component={LoginPage}   /> 
           :  <Route path="/" exact component={TablesList}/>
            
          }  

        <Route path="/delete/:id" exact component={TablesList} />
        <Route path="/done" exact component={TablesList} />
        {/* <Route path="/" exact component={TablesList} /> */}
          <Route path="/list" exact component={TablesList}/>
          <Route path="/edit/:id" component={MainWindow}  />{/*add /edit/:id to the address */}
          <Route path="/system" component={MainWindow} /> {/*add /user to the address*/ } 
          <Route path="/display" component={MainWindow} /> {/*add /display to the address*/ }
          <Route path="/user" component={CreateUser} /> 
          <Route path="/login" component={LoginPage} />       
           </div>
       {/* </Switch> */}
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

