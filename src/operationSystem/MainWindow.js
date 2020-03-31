
import React from 'react'
//import './react-resizable.css'
//import './react-grid-layout.css'
import 'react-grid-layout/css/styles.css' 
import 'react-resizable/css/styles.css' 
import GridLayout from 'react-grid-layout';
import MainOperationWindow from './OperationWindow/MainComponent'
import MainStatusWindow from './fieldStatus/mainComponent'
import MessageWindow from './MessageWindow/MessageWindow'
import MainComponentTime from './TimeWindow/MainComponentTime'
import TestScheduler from './countDownWindow/TestScheduler'
import CreatingTable from './countDownWindow/CreatingTable'

import { save_new_table_state } from "../../src/Actions";
import {connect } from 'react-redux'
import { BrowserRouter as Router, Route , useLocation } from "react-router-dom"
class MainWindow extends React.Component {
  render() {
    const curr_location =window.location.pathname

  console.log(window.location.pathname)
    // layout is an array of objects, see the demo for more complete usage
const layout = [
    // {i: 'a', x: 0, y: 0, w: 1, h: 2},
    {i: 'b', x: 0, y: 0, w: 4, h: 2},
    {i: 'c', x: 4, y: 1, w: 1, h: 4},
    {i: 'd', x: 4, y: 0, w: 1, h: 2},
    {i: 'e', x: 0, y: 2, w: 4, h: 1},
    {i: 'f', x: 0, y: 3, w: 4, h: 3},
  ];
  return (
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={100} width={3000}    >
      {/* <div   style={{ backgroundColor: 'blue', overflow: "scroll"}}  key="a">a</div> */}
      <div key="b" style={styles.cardsContainer}>
        {/* <MainOperationWindow/> */}
      </div>
      <div   style={ {backgroundColor: '#d1d1e0', overflow:"auto"}} key="c">
        <MainStatusWindow/>
      </div>
      <div   style={{ backgroundColor: '#ffce99'}} key="d"><MainComponentTime/></div>
      <div   style={{ backgroundColor: '#ffe0b3', overflow:"hidden"}} key="e"><MessageWindow/></div>
      <div   style={{ backgroundColor: '#00b33c',  overflow: "auto"}} key="f"><TestScheduler/></div>
      <div   key="g">   
      {curr_location==="/user"  ?  
        <button  onClick={()=>this.props.dispatch(save_new_table_state(-1) )} >save new table </button>:
        <button  onClick={()=>this.props.dispatch(save_new_table_state(curr_location.slice(6)) ) } >save edit table </button>
        }    </div>  


      
    </GridLayout>


// return(
//   <MainOperationWindow/>
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