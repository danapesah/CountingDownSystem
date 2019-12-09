import GridLayout from 'react-grid-layout';
import React from 'react';
import 'react-grid-layout/css/styles.css' 
import 'react-resizable/css/styles.css' 
class MyFirstGrid extends React.Component {
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
        <div  className="forKobbi"  key="a">a</div>
        <div   className="forKobbi" key="b">b</div>
        <div   className="forKobbi" key="c">c</div>
        <div   className="forKobbi" key="d">d</div>
        <div   className="forKobbi" key="e">e</div>
        <div   className="forKobbi" key="f">f</div>
      </GridLayout>
    )
  }
}

export default MyFirstGrid;