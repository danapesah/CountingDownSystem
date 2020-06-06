import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import MainOperationWindow from './OperationWindow/MainComponent'
import MainStatusWindow from './FieldStatusWindow/mainComponent'
import MessageWindow from './MessageWindow/MessageWindow'
import MainComponentTime from './TimeWindow/MainComponentTime'
import TestScheduler from './countDownWindow/TestScheduler'
import Logs from './countDownWindow/Logs'
import { Link } from 'react-router-dom'; 
import { save_new_table_state } from "../../src/Actions";
import {connect } from 'react-redux'
import { change_to_show_chosen_table_state } from "../Actions";
import io from "socket.io-client";
import axios from 'axios';

class MainWindow extends React.Component {
componentDidMount() 
{
  try {
    if(window.location.pathname ==='/display')
    {
      const socket = io.connect('http://localhost:4000')
      // for (let i = 0 ; i < 9 ; i ++ )
      // {
        socket.on("message", data => {
            alert("1")
        let chosen_state_id=null
        let DB_info = null
        let data_len = null 
        try {
            const serializedStateID = localStorage.getItem("chosen_state_id"); 
            if (serializedStateID !== null) {
              chosen_state_id = JSON.parse(JSON.parse(serializedStateID ))
            }
        } 
        catch (err) 
        {
          console.log(err)
        }
        axios.get('http://localhost:5000/counts/') //GET REQUEST
        .then(response => {
        if (response.data.length===0) return;
        data_len= response.data.length
        DB_info={...response.data}
        if(DB_info!== null &&  chosen_state_id!==null )
         {  
            for(let i = 0 ; i <data_len ; i++)
            {   
                if( DB_info[i]._id===chosen_state_id ) 
                {
                  localStorage.removeItem("chosen_state") 
                  let serializedState1 = JSON.stringify(DB_info[i]._system_info_object)
                  localStorage.setItem("chosen_state", JSON.stringify(serializedState1));
                  console.log("local storage has changed")
                  // this.props.dispatch(change_to_show_chosen_table_state
                  //       (DB_info[i]._system_info_object))
                 //   console.log(JSON.parse(JSON.parseserializedState1).MessageWindow)
                    window.location.reload()
                 // window.location = '/display'
             
                }
            }
          
          }
   
        })
  
    })
   }
}

//} 
catch (err) 
{
    console.log(err)
}
}
        
  render() {
    const curr_location =window.location.pathname

  //console.log(window.location.pathname)
  return (
    
    <div >
       {curr_location=== "/display" ? null  :
        curr_location==="/system"   ?  
        <button  onClick={()=>this.props.dispatch(save_new_table_state(-1) )} >שמור טבלה חדשה  </button>:
        <button  onClick={()=>this.props.dispatch(save_new_table_state(curr_location.slice(6)) ) } >שמור טבלה ערוכה </button>
  } 
      <div class="row">
      <div style={{backgroundColor:'#66c2ff'}} class="col-sm-8"><MainOperationWindow /></div>
      <div style={{backgroundColor:'#ffce99'}} class="col-sm-4"><MainComponentTime /></div>
      </div>
      <div class="row">
      <div  style={{backgroundColor:'#ffe0b3',width:"20px"}} class="col"><MessageWindow /></div>
      </div>
      <div class="row">
      <div  class="col-sm-8"  ><Logs /></div>
      <div style={{backgroundColor:'#d1d1e0'}} class="col-sm-4"><MainStatusWindow /></div>
      </div>
    </div>

)
  
}
}

const styles = {
  cardsContainer:
  {
    width:"100%",
    backgroundColor: '#66c2ff',
    height:  "100%",
    overflow: "auto"
    
  },
  
}
const mapStateToProps = (state)=> ({
  state: state,
})
export default connect(mapStateToProps)(MainWindow) ;
//export default MainWindow;