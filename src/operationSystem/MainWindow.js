import React from 'react'
//import './react-resizable.css'
//import './react-grid-layout.css'
import 'react-grid-layout/css/styles.css' 
import 'react-resizable/css/styles.css' 
import GridLayout from 'react-grid-layout';
import MainOperationWindow from './OperationWindow/MainComponent'
import ScrollArea from 'react-scrollbar';


class MainWindow extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
const layout = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2},
    {i: 'b', x: 1, y: 0, w: 3, h: 2},
    {i: 'c', x: 4, y: 0, w: 1, h: 2},
    {i: 'd', x: 3, y: 0, w: 1, h: 2},
    {i: 'e', x: 2, y: 0, w: 1, h: 2},
    {i: 'f', x: 0, y: 0, w: 1, h: 2},
  ];
  return (
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={100} width={3000}>
      <div   style={{ backgroundColor: 'blue', overflow: "scroll"}}  key="a">a</div>
      <div key="b" style={styles.cardsContainer}>
        <MainOperationWindow/>
      </div>
      <div   style={{ backgroundColor: 'blue'}} key="c">
      <input type="text" placeholder="{title}" style={{width:90}}></input></div>
      <div   style={{ backgroundColor: 'blue'}} key="d">d</div>
      <div   style={{ backgroundColor: 'blue'}} key="e">e</div>
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
    backgroundColor: 'red',
    height:  "100%",
    overflow: "scroll"
    
  },
  
}
export default MainWindow;