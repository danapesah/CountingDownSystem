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
        socket.on("udpCDRCMessage", (message)=>{
            this.setState({CDRClock:message})
          })
        socket.on("udpTodMessage", (message)=>{
            this.setState({TodClock:message})
          })
    }
    render(){
        return(
            <div>
                <div className="center">חלון שעונים</div>
                <br/>
                <div style={{ textAlign:"right",}}>
                <div>-עולמי</div>
                <div style={{borderStyle: "solid",  width: "50%", margin:"auto"}}>
                {this.state.CDRClock}
                </div>
                <br/>
                <div>-מטרה</div>
                <div style={{borderStyle: "solid",  width: "50%", margin:"auto"}}>
                {this.state.TodClock}
                </div>
                </div>


            </div>
        )
    }
}

export default connect()(MainComponentTime);