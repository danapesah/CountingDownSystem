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
// import { BrowserRouter as Router, Route , useLocation } from "react-router-dom"
import {do_nothing} from '../../"../../src/Actions'
import Update from '../SystemManagement/Update'
class MainWindow extends React.Component {
  
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