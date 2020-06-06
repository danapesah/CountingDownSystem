
import TextScroller from './TextScroller'
import React from "react";
import {connect } from 'react-redux'
import Popup from "reactjs-popup";
import { updateMessage } from '../../Actions'
import axios from 'axios';
import io from "socket.io-client";

class  MessageWindow  extends React.Component  {
  state= 
  {
    message:this.props.messageValue
  }

  handleChange=(event)=>
   {
     console.log(event.target.value)
     this.setState({message: event.target.value})
   }

  handleSubmit =(event)=>
  {
    event.preventDefault();
    this.props.dispatch(updateMessage(this.state.message))
    if(window.location.pathname ==='/display')
    {
      //on display: the message should save automatically to the DB
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
          
            localStorage.removeItem("chosen_state") 
            localStorage.setItem("chosen_state", JSON.stringify(copy_state));

           // alert(chosen_state_id)
            axios.post('http://localhost:5000/counts/edit/' + chosen_state_id, copy_state)
            .then(res => console.log(res.data)); 
            const socket = io.connect('http://localhost:4000')
            socket.emit("message" ,this.state.message)
         //   socket.emit("disconnectThatSoc")
        // window.location.reload()
          }
        }
        catch (err) 
        {
          console.log(err)
        }

    }
   // this.setState({message:''})  
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
              <textarea name="comments" onChange={this.handleChange} defaultValue={this.state.message}/>
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
      <TextScroller text={this.props.messageValue} />
    
        
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
  messageValue: state.MessageWindow,
})

export default  connect(mapStateToProps)(MessageWindow)