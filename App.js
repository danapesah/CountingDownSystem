import React from 'react';
import logo from './logo.svg';
import './Style.css';
import Counting from './Counting';
import Massage from './Massage';
import Operation from './Operation';
import FieldStatus from './FieldStatus';
import Clock from './Clock';

class App extends React.Component {
 

  render ()
  {
    
      return (
        <div className="App">
    
         
         <Counting/> 
          <Massage/>
          <Operation />
          <FieldStatus />
           <Clock /> 
    
         
        </div>
      );
    }

  }

export default App;
