import React, {Component} from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'; //link to different routs
import Navbar from './navbar'
import { BrowserRouter as Router, Route} from "react-router-dom";


import Temp from './Temp'
import TestScheduler from './operationSystem/countDownWindow/TestScheduler';
class FirstPage extends Component {

    render() {
      return (
   

        // <div>
        //     <h1> {this.props.countDownlists.events[1].title}</h1>
        //     <h1> {this.props.countDownlists.name}</h1>
        //     <h1> {this.props.state.title}</h1>

        // </div>
      

        <Router>
        <div className="container">
          <Navbar />
            <br/>
            <Route path="/" exact component={Temp }/> 
            <Route path="/edit/:id" component={null} />{/*add /edit/:id to the address*/ }
            <Route path="/create" component={null} />
            <Route path="/user" component={TestScheduler} /> {/*add /user to the address*/ }
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
