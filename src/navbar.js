import React, {Component} from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'; //link to different routs

class Navbar extends Component {

    render() {
      return (
        <nav style = {{width:"1500px"}} className="navbar navbar-dark bg-dark navbar-expand-lg"  
         >
          {/* <Link to="/" className="navbar-brand"> Tables List</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
          <li className="navbar-item"> */}

          <Link to="/login" className="navbar-brand">Login </Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
          <li className="navbar-item">


          <Link to="/" className="nav-link"> Tables List </Link>
          </li>
          
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User-Only to admin </Link>
          </li>
{/* 
          <li className="navbar-item">
          <Link to="/" className="nav-link">users </Link>
          </li> */}
{/* 
         <li className="navbar-item">
          <Link to="/edit/:id" className="nav-link">ee </Link>
          </li>  */}
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


  // style={{ marginTop:"50%"}}