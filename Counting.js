import React from 'react';

import AddingState  from './AddingState';
import AddingColumn  from './AddingColumn';

class Counting extends React.Component {
  constructor()
  {
    super()
    this.state= {
      arrForFiled: [],
      filed : 0  ,
      ob : "sharon"
    }
  }
  render()
  {
    console.log(this.state.arrForFiled[0])
    console.log(this.state.filed)
    return (
      <div className="Counting">
        <h3>Counting Window</h3>
        <button className="AddEntity"  onClick={() =>
       
          this.setState(prevState => {
          const copy = [...prevState.arrForFiled];
          copy.push(<AddingState/> )
            return {
              arrForFiled: copy, 
              filed: prevState.filed+1
            };
          })
            
      }> add state </button> 
     <h1 > {this.state.filed >0 ?  this.state.arrForFiled[0] : null} </h1>  
     <h1 > {this.state.filed >1 ?  this.state.arrForFiled[1] : null} </h1>  
     <h1 > {this.state.filed >2 ?  this.state.arrForFiled[2] : null} </h1>  
     <AddingColumn 
    
     
     
     name = "testing 1 "/> 
       
       <AddingColumn name = " testing 2 "/>  
       <AddingColumn name = " testing 3"/> 
      </div>
    );

  }
}


export default Counting;
