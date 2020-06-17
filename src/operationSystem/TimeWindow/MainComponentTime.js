import React, {Component} from 'react'
import {connect } from 'react-redux'
import io from "socket.io-client";
import {updateRealTimeClock} from '../../Actions';
 const socket = io.connect('http://localhost:4000');
 

class MainComponentTime extends Component
{
    state= {
        CDRClock:"",
        TodClock:""
    }
    constructor(...args) {
        super()
        if(window.location.pathname.search("display") != -1) 
        {
        socket.on("udpCDRCMessage", (message)=>{
            this.setState({CDRClock:message})
          })
        socket.on("udpTodMessage", (message)=>{
            this.setState({TodClock:message})
          })
        }
    }
  


    render(){
        if(window.location.pathname.search("display") != -1) 
        return(
            <div>
                <div className="center">חלון שעונים</div>
                <br/>
                <div style={{ textAlign:"right",}}>
                <div>-מטרה</div>
                <div style={{borderStyle: "solid",  width: "50%", margin:"auto"}}>
                {this.state.CDRClock}
                </div>
                <br/>
                <div>-עולמי</div>
                <div style={{borderStyle: "solid",  width: "50%", margin:"auto"}}>
                {this.state.TodClock}
                </div>
                </div>
            </div>
        )
        else
        return(
            <div>
            <div className="center">חלון שעונים</div>
            <div className="right">השעון מוצג במצב תצוגה</div>
            </div>
        )
    }
   
}

export default connect()(MainComponentTime);