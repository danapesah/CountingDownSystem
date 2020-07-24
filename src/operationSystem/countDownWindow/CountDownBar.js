import React, {Component} from 'react';
import io from "socket.io-client";
import {connect } from 'react-redux'
import socket from "../../SystemManagement/socketConfig";

class CountDownBar extends Component
{
state= {
    CDRClock:""
}

constructor() {
    super()
    if(window.location.pathname.search("display") != -1)
    {
        socket.on("udpCDRCMessage", (message)=>{
            this.setState({CDRClock:message});
          })
    }
}



convertCdrcClockInput =(time)=>
{
        let tempArr=time.slice(16);
        tempArr = tempArr.split(":");
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
            return parseInt(tempArr[0])+parseInt(tempArr[1])/100*(3/2);
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
    let top = 47;
    if(this.state.CDRClock[13] == "+")
    {
        top = top + this.convertTimeInput(this.props.hours_before_target)*50+hourInt*50;
        if(top > (47 + this.convertTimeInput(this.props.hours_after_target)*50+this.convertTimeInput(this.props.hours_before_target)*50))
         {
             top = 47 + this.convertTimeInput(this.props.hours_after_target)*50+this.convertTimeInput(this.props.hours_before_target)*50;
         }
    }
    else
    {
        top = top + this.convertTimeInput(this.props.hours_before_target)*50-hourInt*50;
        if(top < 47)
        {
            top= 47;
        }
           
    }
    if(isNaN(top))
    {
        top = 45;
    }
     
    if(window.location.pathname.search("display") != -1)
    {
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
    else
    {
        return(null);
    }
}
      
}

const mapStateToProps = (state)=> ({
    lists: state.CountDownWindowReducers.CountDownlists.resources,
    hours_before_target: state.MainWindowReducers.hours_before_target,
    hours_after_target: state.MainWindowReducers.hours_after_target,
  })


export default  connect(mapStateToProps)(CountDownBar)