import React from 'react'
//import './react-resizable.css'
//import './react-grid-layout.css'
import 'react-grid-layout/css/styles.css' 
import 'react-resizable/css/styles.css' 
import GridLayout from 'react-grid-layout';
import MainOperationWindow from './OperationWindow/MainComponent'
import MainStatusWindow from './fieldStatus/mainComponent'
import MessageWindow from './MessageWindow/MessageWindow'

class MainWindow extends React.Component {
  render() {
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
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={100} width={3000}>
      {/* <div   style={{ backgroundColor: 'blue', overflow: "scroll"}}  key="a">a</div> */}
      <div key="b" style={styles.cardsContainer}>
        <MainOperationWindow/>
      </div>
      <div   style={styles.cardsContainer} key="c">
        <MainStatusWindow/>
      </div>
      <div   style={{ backgroundColor: 'blue'}} key="d">d</div>
      <div   style={{ backgroundColor: 'blue', overflow:"hidden"}} key="e"><MessageWindow/></div>
      <div   style={{ backgroundColor: 'blue'}} key="f">f</div>
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
    //backgroundColor: 'red',
    height:  "100%",
    overflow: "scroll"
    
  },
  
}
export default MainWindow;