import React, {Component} from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'; //link to different routs
import Navbar from './navbar'
import { BrowserRouter as Router, Route , useLocation } from "react-router-dom"
import Temp from './operationSystem/countDownWindow/Temp'
import TestScheduler from './operationSystem/countDownWindow/TestScheduler'
import MainWindow from './operationSystem/MainWindow'

class FirstPage extends Component {

    render() {
      return (
        <Router>
       
        <div className="container">
          <Navbar />
            <br/>
            <Route path="/" exact component={Temp }/> 
             <Route path="/edit/:id" component={MainWindow}  />{/*add /edit/:id to the address
            <Route path="/user" component={MainWindow} /> {/*add /user to the address*/ }
        </div>

        </Router>


      );
    }
  }
  const mapStateToProps = (state)=> ({
    countDownlists: state.CountDownlists,
    state: state,
  })
  export default connect(mapStateToProps)(FirstPage)
