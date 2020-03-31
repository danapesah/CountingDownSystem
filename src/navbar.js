import React, {Component} from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'; //link to different routs

class Navbar extends Component {

    render() {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg"  
         >
          <Link to="/" className="navbar-brand"> Tables List</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
         <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
         <Link to="/user" className="nav-link">Create User</Link>
        </li>
        </ul>
        </div>
      </nav>


      );
    }
  }
  const mapStateToProps = (state)=> ({
    countDownlists: state.CountDownlists,
    state: state,
  })
  export default connect(mapStateToProps)(Navbar)
