import React from 'react'
import MainOperationWindow from './OperationWindow/MainComponent'
import MainStatusWindow from './FieldStatusWindow/mainComponent'
import MessageWindow from './MessageWindow/MessageWindow'
import MainComponentTime from './TimeWindow/MainComponentTime'
import Logs from './countDownWindow/Logs'
import axios from 'axios';
import {connect } from 'react-redux'
import {change_to_show_chosen_table_state} from "../Actions"
// import { BrowserRouter as Router, Route , useLocation } from "react-router-dom"
import io from "socket.io-client";

class MainWindow extends React.Component {
update_data_io() 
{  //update the data from the db by listening to the socket

  try {
    if(window.location.pathname ==='/display')
    {
     
      const socket = io.connect('http://localhost:4000')
      socket.on("message1", data => {
        //console.log(data) 
       //alert("some changes")
        let chosen_state_id=null
        let DB_info = null
        let data_len = null 
        try {
            const serializedStateID = localStorage.getItem("chosen_state_id"); 
            if (serializedStateID !== null) {
       
              chosen_state_id = JSON.parse(JSON.parse(serializedStateID ))
              
              axios.post('http://localhost:5000/counts/edit/' + chosen_state_id, data  )
              .then(res => console.log(res.data),
              socket.emit("table saved to the DB" ,chosen_state_id))
            
            


            }
        } 
        catch (err) 
        {
          console.log(err)
        }
    })//socket
    const socket1 = io.connect('http://localhost:4000')
    socket1.on("table saved to the DB", chosen_state_id => {

      console.log("table saved to the DB") 
   //   setTimeout(function(){ 
    axios.get('http://localhost:5000/counts/') //GET REQUEST
    .then(response => {
   
      let DB_info = null
      let data_len = null
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
          //  console.log("local storage has changed") 

              window.location.reload()
          }
        }

      }

    })//axios
 // }, 3000);
  })//socket
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
    { this.update_data_io()}

  return (
    
    <div >
       {curr_location=== "/display" ? null  :
        curr_location==="/system"   ?  
        <button  onClick={()=>{

        let newState ={
          _user_info: this.props.MainWindowReducers._user_info,
          title: this.props.MainWindowReducers.title,
          hours_before_target: this.props.MainWindowReducers.hours_before_target,
          hours_after_target: this.props.MainWindowReducers.hours_after_target,
          MessageWindow:this.props.MessageWindowReducer.MessageWindow,
          OperationRows:this.props.OperationWindowReducers.OperationRows,
          OperationList:this.props.OperationWindowReducers.OperationList,
          StatusList: this.props.FieldStatusReducers.StatusList,
          CountDownlists: this.props.CountDownWindowReducers.CountDownlists
        }
          console.log("count: SAVE_STATE " , this.props.state);
          axios.post('http://localhost:5000/counts/add',  newState)
          .then(res => console.log(res.data  ),  );//promise, after its posted well console our the res.data
          window.location = '/list';
        }} >שמור טבלה חדשה  </button>:
          
        <button  onClick={()=>{
          let newState ={
            _user_info: this.props.MainWindowReducers._user_info,
            title: this.props.MainWindowReducers.title,
            hours_before_target: this.props.MainWindowReducers.hours_before_target,
            hours_after_target: this.props.MainWindowReducers.hours_after_target,
            MessageWindow:this.props.MessageWindowReducer.MessageWindow,
            OperationRows:this.props.OperationWindowReducers.OperationRows,
            OperationList:this.props.OperationWindowReducers.OperationList,
            StatusList: this.props.FieldStatusReducers.StatusList,
            CountDownlists: this.props.CountDownWindowReducers.CountDownlists
          }
          //console.log(this.props.CountDownWindowReducers)
          console.log("count edit: SAVE_STATE " , newState);
            axios.post('http://localhost:5000/counts/edit/' + curr_location.slice(6), newState)
            .then(res => console.log(res.data)); 
           window.location = '/list';
         }} >שמור טבלה ערוכה </button>
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
  MainWindowReducers: state.MainWindowReducers,
  MessageWindowReducer: state.MessageWindowReducer,
  OperationWindowReducers: state.OperationWindowReducers,
  FieldStatusReducers: state.FieldStatusReducers,
  CountDownWindowReducers: state.CountDownWindowReducers,
})
export default connect(mapStateToProps)(MainWindow) ;
//export default MainWindow;