import React from 'react'
import MainOperationWindow from './OperationWindow/MainComponent'
import MainStatusWindow from './FieldStatusWindow/mainComponent'
import MessageWindow from './MessageWindow/MessageWindow'
import MainComponentTime from './TimeWindow/MainComponentTime'
import CountDownMainWindow from './countDownWindow/CountDownMainWindow'
import axios from 'axios';
import {connect } from 'react-redux'
import socket from "../SystemManagement/socketConfig";

class MainWindow extends React.Component {

update_data_io() 
{  //update the data from the db by listening to the socket

  try {
    if(window.location.pathname ==='/display')
    {
      socket.on("update_message",( data ,id) => {
        let chosen_state_id=null
        let DB_info = null
        let data_len = null 
        try {
            const serializedStateID = localStorage.getItem("chosen_state_id"); 
            if (serializedStateID !== null) {
       
              chosen_state_id = JSON.parse(JSON.parse(serializedStateID ))
              
              axios.post('http://localhost:5000/counts/edit/' + id , data  )
              .then(res => console.log(res.data))
              .finally(function (){socket.emit("table saved to the DB" ,id)})
            }
        } 
        catch (err) 
        {
          console.log(err)
        }
    })//socket
    socket.on("table saved to the DB", chosen_state_id => {
      let  curr_chosen_state_id =null
      try {
        const serializedStateID = localStorage.getItem("chosen_state_id"); 
       
        if (serializedStateID !== null) {

          curr_chosen_state_id = JSON.parse(JSON.parse(serializedStateID ))
        }
    } 
    catch (err) 
    {
      console.log(err)
    }
    if(curr_chosen_state_id!==null && curr_chosen_state_id===chosen_state_id )
    {
      axios.get('http://localhost:5000/counts/search/'+ curr_chosen_state_id) //GET REQUEST
      .then(response => {
      
        let DB_info = null
        let data_len = null
     // if (response.data.length===0) return;
     // data_len= response.data.length
      DB_info={...response.data}
    //  if(DB_info!== null &&  chosen_state_id!==null  )
      //{  
          // for(let i = 0 ; i <data_len ; i++)
          // {   
          //   if( DB_info[i]._id===chosen_state_id ) 
          //   { 
              localStorage.removeItem("chosen_state") 
              let serializedState1 = JSON.stringify(DB_info._system_info_object)
              localStorage.setItem("chosen_state", JSON.stringify(serializedState1));
             
          //   }
          // }

      //  }

      }).finally(function ()
      {
         window.location.reload()
      }
         )//axios
    }

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
    
    <div>
       {curr_location=== "/display" ? null  :
        curr_location==="/system"   ?  
        <button style={{top:"5%",position:"absolute",left:"3%"}} onClick={()=>{

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
          axios.post('http://localhost:5000/counts/add',  newState)
          .then(res => console.log(res.data  ),  )//promise, after its posted well console our the res.data
          .finally (function (){ window.location = '/list'})
        }} >שמור פעילות חדשה  </button>:
          
        <button style={{top:"5%",position:"absolute",left:"3%"}}  onClick={()=>{
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
            axios.post('http://localhost:5000/counts/edit/' + curr_location.slice(6), newState)
            .then(res => console.log(res.data))
            .finally (function (){ window.location = '/list'})
         }} >שמור עריכת פעילות </button>
  } 
      <div className="row">
      <div style={styles.MainOperationWindow} className="col-sm-8"><MainOperationWindow /></div>
      <div   style={ styles.MainComponentTime} className="col-sm-4"><MainComponentTime /></div>
      </div>
      <div className="row">
      <div  style={ styles.MessageWindow} className="col"><MessageWindow /></div>
      </div>
      <div className="row">
     
      <div  className="col-sm-8"   style={ styles.Logs} > 
      <div style={{textAlign:"center" }} >חלון ספירה יורדת</div>
        <div ><CountDownMainWindow /></div></div>
      <div style={ styles.MainStatusWindow} className="col-sm-4"><MainStatusWindow /></div>
      
      </div>
    </div>

)
  
}
}

const styles = {
  MainOperationWindow:{
      border: "1px solid",
      overflow:"scroll",
      backgroundColor: '#e6f5ff',
      left:"0.5%",
      width:"80%",
      height:"33%",
      position:"absolute",
  },
  MainComponentTime:
  {
    border: "1px solid",
    backgroundColor: '#ffcccc',
    left:"68.8%",
    width:"30%",
    right:"0.5%",
    height:"33%",
    position:"absolute",
  },
  MessageWindow:
  {
    border: "1px solid",
    backgroundColor: '#fff5e6',
    position:"absolute",
    top:"50%",
    position:"absolute",
    left:"0.5%",
    height:"7%",
    overflow:"hidden",
    width:"66.8%",
  },
  Logs:
  {
    border: "1px solid",
    backgroundColor: '#d9f2d9',
    overflow:"scroll",
    top:"58%",
    left:"0.5%",
    height:"43%",
    position:"absolute",
    width:"75%",
  },
  MainStatusWindow:{
    border: "1px solid",
    backgroundColor: '#efeff5',
    overflow:"scroll",
    position:"absolute",
    top:"50%",
    left:"68.8%",
    width:"30%",
    height:"51%",
    right:"0.5%",
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