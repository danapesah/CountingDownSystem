import TextScroller from './TextScroller'
import React from "react";
import { TextField } from '@material-ui/core';
import { Input } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';


class  MessageWindow  extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

   
  render()
  {
      return (
        <div  style={{...styles.showText}} >
        <InputLabel style= {{...styles.labelInput}} >   
        <Input  style= {{...styles.inputText}}
        id="text"
        value={this.state.text}
        onChange={this.handleChange}

      />
        חלון הודעות רץ   
      
    </InputLabel>
        
    <TextScroller  text={this.state.value}  >
     
   </TextScroller>
        
      </div>
    
    
    );
  }

  }
  const styles={
    inputText : {
      paddingLeft : 30,
       backgroundColor:"#F5F5DC",
    },
    labelInput : {
     backgroundColor:"#FF8C00",
     textAlign: "right",     
    },
    showText: {
      backgroundColor:"#FF8C00",
      fontSize:15,
    }
}


  export default MessageWindow;