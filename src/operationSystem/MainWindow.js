import React from 'react'
import MainOperationWindow from './OperationWindow/MainComponent'
import MainStatusWindow from './FieldStatusWindow/mainComponent'
import MessageWindow from './MessageWindow/MessageWindow'
import MainComponentTime from './TimeWindow/MainComponentTime'
import Logs from './countDownWindow/Logs'
import axios from 'axios';
import {connect } from 'react-redux'
// import { BrowserRouter as Router, Route , useLocation } from "react-router-dom"

class MainWindow extends React.Component {
  //ask dana 
//   componentDidMount() {
//   try {
//     const login_info = localStorage.getItem("login_info");
//     if ( login_info !==null)  {
      
//         let user_permission_state = JSON.parse(JSON.parse(login_info ))
  
    
    
//         if(user_permission_state.permissions==="Viewer"){
//        //   setInterval(window.location.reload() ,1000)
//         }
//     }

// } 
// catch (err) 
// {
//     console.log(err)
// }
//   }
  render() {
    const curr_location =window.location.pathname

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
          console.log(this.props.CountDownWindowReducers)
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