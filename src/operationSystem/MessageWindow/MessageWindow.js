
import TextScroller from './TextScroller'
import React from "react";
import {connect } from 'react-redux'
import Popup from "reactjs-popup";
import { updateMessage } from '../../Actions'
import io from "socket.io-client";
import axios from 'axios';

class  MessageWindow  extends React.Component  {
  state= 
  {
    message:this.props.messageValue
  }
  save_to_db()
  {
    //save to the db after the state changed
  if(window.location.pathname ==='/display')
  {
  
      try {
        let chosen_state_id=null
        const serializedStateID = localStorage.getItem("chosen_state_id");
        const serializedState = localStorage.getItem("chosen_state"); 
        if (serializedStateID !== null ) 
        {

          chosen_state_id = JSON.parse(JSON.parse(serializedStateID ))
          let copyState = JSON.parse(JSON.parse(serializedState ))
          let copy_state={...copyState}
          copy_state.MessageWindow =this.state.message

          axios.post('http://localhost:5000/counts/edit/' + chosen_state_id, copy_state)
          .then(res => console.log(res.data)).
          finally (function (){
          let socket = io.connect('http://localhost:4000')
          socket.emit("update_message" ,copy_state,chosen_state_id)
            })
              

          
          return 0
        }
        
      }
      catch (err) 
      {
        console.log(err)
        return -1
      }
    }
  }
  handleChange=(event)=>
   {
     console.log(event.target.value)
     this.setState({message: event.target.value})
   }

   handleSubmit =(event)=>
     {
        event.preventDefault();
        this.props.dispatch(updateMessage(this.state.message));
        let success = this.save_to_db()
     }   
   editMessage=()=>
   { //CHECK IF EDITABLE
     if(true)
      return(
        <Popup
        trigger={<button style={{float:"right",position:"absolute", width:"25px", height:"25px"}}>+</button>}
        modal
        closeOnDocumentClick>
          {close =>(
              <div>
               <form onSubmit={this.handleSubmit}>
              <textarea name="comments" onChange={this.handleChange} defaultValue={this.state.message} style={{height:"250px"}}/>
              <input type="submit" value="Submit" /> 
              </form>  
              <a className="close" onClick={close} style={styles.close}>
               &times;
             </a>
             </div>)}
       </Popup>
      )
   }
  render()
  {
      return (
        <div>
        {this.editMessage()}
        <div className="center"> חלון הודעות רץ  </div>  
      <TextScroller text={this.props.messageValue} length={this.props.messageValue.length} />
    
        
      </div>
  
    );
  }

  }
  const styles={
    close:
    {
      cursor: 'pointer',
      position: "absolute",
      display: "block",
      padding: "2px 5px",
      right: "-10px",
      top:"-10px",
      fontSize: "15px",
      background:" #ffffff",
      borderRadius: "18px",
      border: "1px solid #cfcece"
    }
}

const mapStateToProps = (state)=> ({
  messageValue: state.MessageWindowReducer.MessageWindow,
})

export default  connect(mapStateToProps)(MessageWindow)