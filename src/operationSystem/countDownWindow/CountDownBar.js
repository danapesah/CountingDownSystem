import React, {Component} from 'react';
import io from "socket.io-client";
import {connect } from 'react-redux'
const socket = io.connect('http://localhost:4000');

class CountDownBar extends Component
{
state= {
    CDRClock:""
}

constructor() {
    super()
    socket.on("udpCDRCMessage", (message)=>{
        this.setState({CDRClock:message});
      })

}



convertCdrcClockInput =(time)=>
{
        let tempArr=time.slice(16).split(":");
        return parseInt(tempArr[0])+parseInt(tempArr[1])/100*(3/2);
}

convertTimeInput =(time)=>
    {
        if(time[0] === '-' || time[0] === '+')
        {
            let timeArr =[];
            timeArr[0] = time[0];
            let tempArr=time.slice(1).split(":"); 
            timeArr[1] = parseInt(tempArr[0])+parseInt(tempArr[1])/100*(3/2);
            return parseInt(tempArr[0])+parseInt(tempArr[1])/100*(3/2);;
        }
        else
        {
            let tempArr=time.split(":");
            return parseInt(tempArr[0])+parseInt(tempArr[1])/100*(3/2);
        }
        
    }

render(){
    let width = this.props.lists.length*140;
    let hourInt = this.convertCdrcClockInput(this.state.CDRClock);
    let top =50;
    if(this.state.CDRClock[13] == "+")
        top += this.convertTimeInput(this.props.hours_before_target)*50+hourInt*50;
    else
    {
        top += this.convertTimeInput(this.props.hours_before_target)*50-hourInt*50;
    }
    
    return(
        <div
        style={{
            color: "red",
            backgroundColor: "red",
            height: "5px",
            top:top,
            width:width,
            left:"50px",
            position:"absolute"
        }}
        />
    )
}
      
}

const mapStateToProps = (state)=> ({
    lists: state.CountDownWindowReducers.CountDownlists.resources,
    hours_before_target: state.MainWindowReducers.hours_before_target
  })


export default  connect(mapStateToProps)(CountDownBar)