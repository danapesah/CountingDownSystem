import React, {Component} from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'; //link to different routs
import Navbar from './navbar'
import { BrowserRouter as Router, Route , useLocation ,Switch, PrivateRoute } from "react-router-dom"
import Temp from './operationSystem/countDownWindow/Temp'
import TestScheduler from './operationSystem/countDownWindow/TestScheduler'
import MainWindow from './operationSystem/MainWindow'
import CreateUser from './UserManagement/CreateUser'
import LoginPage from './UserManagement/LoginPage'

class FirstPage extends Component {

    render() {
     // console.log(window.location.pathname); 
      return (
        <div style={{width:"1500px" , paddingRight : "800px"}}>
        <Router>
       
        <div className="container">
          <Navbar />
            <br/>
            <Route path="/" exact component={Temp }/> 
             <Route path="/edit/:id" component={MainWindow}  />{/*add /edit/:id to the address
            {/* <Route path="/create" component={null} /> */}
            <Route path="/system" component={MainWindow} /> {/*add /user to the address*/ }
            <Route path="/display" component={MainWindow} /> {/*add /display to the address*/ }
            <Route path="/user" component={CreateUser} /> {/*add /user to the address*/ }
            <Route path="/login" component={LoginPage} /> {/*add /user to the address*/ }

            </div>
        </Router>
   
        </div>



      );
    }
  }
  const mapStateToProps = (state)=> ({
    countDownlists: state.CountDownlists,
    state: state,
  })
  export default connect(mapStateToProps)(FirstPage)
