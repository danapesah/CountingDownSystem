import React, {Component} from 'react'
import {connect } from 'react-redux'
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom'; //link to different routs

class AlertPopup extends Component {

constructor(props) {
    super(props);
} 

render(){

  return (
    <div >
      <Popup
        trigger={
        <div style={{color:"#007bff"}} 
        // onMouseOver={(e) =>{ e.target.style.textDecorationLine= 'underline';e.target.style.fontWeight='bold';e.target.style.color="blue"} }
        // onMouseOut={(e) =>{ e.target.style.textDecorationLine= null ; e.target.style.fontWeight=null ;  e.target.style.color="#007bff"}}
        >
         
        create user
        </div> 
    
    } 
        modal closeOnDocumentClick  contentStyle={{width:"auto", height:"auto"}}> 
        {close =>(
          <form >
            <label style={{fontSize: "19px" , color:"black", fontWeight:'bold'}} >
       
            {this.props.message} 

            </label>

            <br></br>
            <br></br>
     
    </form>)}
    
    </Popup> 
  </div>
          
    );
  }
}


export default AlertPopup 