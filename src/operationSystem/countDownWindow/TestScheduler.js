import React, {Component} from 'react';
import {connect } from 'react-redux'
import CountDownEvent from './CountDownEvent';
import CountDownAddEventButton from './CountDownAddEventButton';
import CountDownAddEntityButton from './CountDownAddEntityButton';
import io from "socket.io-client"
import axios from 'axios'
import CountDownBar from './CountDownBar';
import {deleteEventCountDown,deleteEntityCountDown,changeEventColorCountDown} from '../../Actions';

class TestScheduler extends Component
{ 
    checkMultipleEvent=(originalEvent, secondEvent)=>
    {
        let originalEventStart = this.convertTimeInput(originalEvent.startHour);
        let originalEventEnd = this.convertTimeInput(originalEvent.endHour);
        let originalStartHourBytes;
        let originalEndHourBytes;
        if(originalEventStart[0] === '+' && originalEventEnd[0] == '+')
        {
            originalStartHourBytes = this.convertTimeInput(this.props.hours_before_target)*50 + 1*50+ 50*originalEventStart[1];
            originalEndHourBytes = this.convertTimeInput(this.props.hours_before_target)*50 + 1*50+ 50*originalEventEnd[1];
        }
        else if(originalEventStart[0] === '-' && originalEventEnd[0] == '-')
        {
            originalStartHourBytes =this.convertTimeInput(this.props.hours_before_target)*50 +1*50 - 50*originalEventStart[1];
            originalEndHourBytes = this.convertTimeInput(this.props.hours_before_target)*50 + 1*50 - 50*originalEventEnd[1];
        }
        else if(originalEventStart[0] === '-' && originalEventEnd[0] == '+')
        {
            originalStartHourBytes =this.convertTimeInput(this.props.hours_before_target)*50 +1*50 - 50*originalEventStart[1];
            originalEndHourBytes = this.convertTimeInput(this.props.hours_before_target)*50 + 1*50+ 50*originalEventEnd[1];
        }

        let secondEventStart = this.convertTimeInput(secondEvent.startHour);
        let secondEventEnd = this.convertTimeInput(secondEvent.endHour);
        let secondStartHourBytes;
        let secondEndHourBytes
        if(secondEventStart[0] === '+' && secondEventEnd[0] == '+')
        {
            secondStartHourBytes = this.convertTimeInput(this.props.hours_before_target)*50 + 1*50+ 50*secondEventStart[1];
            secondEndHourBytes = this.convertTimeInput(this.props.hours_before_target)*50 + 1*50+ 50*secondEventEnd[1];
        }
        else if(secondEventStart[0] === '-' && secondEventEnd[0] == '-')
        {
            secondStartHourBytes =this.convertTimeInput(this.props.hours_before_target)*50 +1*50 - 50*secondEventStart[1];
            secondEndHourBytes = this.convertTimeInput(this.props.hours_before_target)*50 + 1*50 - 50*secondEventEnd[1];
        }
        else if(secondEventStart[0] === '-' && secondEventEnd[0] == '+')
        {
            secondStartHourBytes =this.convertTimeInput(this.props.hours_before_target)*50 +1*50 - 50*secondEventStart[1];
            secondEndHourBytes = this.convertTimeInput(this.props.hours_before_target)*50 + 1*50+ 50*secondEventEnd[1];
        }
        if(originalEvent.columID === secondEvent.columID)
        { 
          if((originalEndHourBytes > secondStartHourBytes && secondStartHourBytes > originalStartHourBytes) ||(originalEndHourBytes > secondEndHourBytes && secondEndHourBytes >originalStartHourBytes) ||(originalEndHourBytes<= secondEndHourBytes && secondStartHourBytes <=originalStartHourBytes) ) 
            {
                if(originalEvent.id < secondEvent.id)
                {
                    return 1;
                }
                else
                {
                    return 2;
                }        
            }
        }  
        return -1;

    }

    changeEventColor =(id)=>
    {
        this.props.dispatch(changeEventColorCountDown(id))
        this.save_to_db()
    }
save_to_db(){
//save to the db after the state changed
if(window.location.pathname ==='/display')
{

    try {
        let chosen_state_id=null
        const serializedStateID = localStorage.getItem("chosen_state_id");
        const serializedState = localStorage.getItem("chosen_state"); 
        if (serializedStateID !== null ) 
        {

        chosen_state_id = JSON.parse(JSON.parse(serializedStateID ))
        let copyState = JSON.parse(JSON.parse(serializedState ))
        let copy_state={...copyState}
        copy_state.CountDownlists.events=this.props.events
        // copy_state.OperationRows=this.props.operationRows
        axios.post('http://localhost:5000/counts/edit/' + chosen_state_id, copy_state)
        .then(res => console.log(res.data)).
        finally (function (){
        let socket = io.connect('http://localhost:4000')
        socket.emit("update_message" ,copy_state,chosen_state_id )
        })
            

        
        return 0
        }
        
    }
    catch (err) 
    {
        console.log(err)
        return -1
    }
    }
}
    timeValidator =(inputTime) =>
    {
        let hourInput = parseInt(inputTime.substring(1,3));
        let minInput = parseInt(inputTime.substring(4));
        if(inputTime[0] == "-")
        {
            let hourBefore = parseInt(this.props.hours_before_target.substring(0,2));
            let minBefore  = parseInt(this.props.hours_before_target.substring(3));
            return(hourInput<=hourBefore && minInput<60)


        }
        if(inputTime[0] == "+")
        {
            let hourafter = parseInt(this.props.hours_after_target.substring(0,2));
            let minafter  = parseInt(this.props.hours_after_target.substring(3));
             return (hourInput<=hourafter && minInput<60)
        }
    }

    convertTimeInput =(time)=>
    {
        if(time[0] === '-' || time[0] === '+')
        {
            let timeArr =[];
            timeArr[0] = time[0];
            let tempArr=time.slice(1).split(":"); 
            timeArr[1] = parseInt(tempArr[0])+parseInt(tempArr[1])/100*(3/2);
            return timeArr;
        }
        else
        {
            let tempArr=time.split(":");
            return parseInt(tempArr[0])+parseInt(tempArr[1])/100*(3/2);
        }
        
    }
    
    deleteColumn=(event)=>
    {
        
        this.props.dispatch(deleteEntityCountDown(event.target.getAttribute('name')));
    }

    createTimeColumn =()=>
    {
        let numOfHoursBeforeCount = Math.ceil(this.convertTimeInput(this.props.hours_before_target));
        let numOfHoursAfterCount = Math.ceil(this.convertTimeInput(this.props.hours_after_target));
        let divTable=[]
        for(let i=numOfHoursBeforeCount;i>=1;i--)
        {
            let placeOnScreen=(numOfHoursBeforeCount-i+1)*50+"px";
            if(i == 1)
                divTable.push(<div key={i+'p'} style={{top:placeOnScreen, position:"absolute", height:"50px",width:"50px", border:"solid", borderBottomColor:"#a32217"}}>-{i}:00</div>)
            else
                divTable.push(<div key={i+'x'} style={{top:placeOnScreen, position:"absolute", height:"50px",width:"50px", border:"solid"}}>-{i}:00</div>)
        }
        for(let i=numOfHoursAfterCount;i>=1;i--)
        {
            let placeOnScreen=numOfHoursBeforeCount*50+i*50+"px";
            divTable.push(<div key={i} style={{top:placeOnScreen, position:"absolute", height:"50px",width:"50px", border:"solid"}}>
                <div style={{bottom:"0",position:"absolute"}}>+{i}:00</div></div>)
        }

        return divTable;
    }
    createMissionColumn =()=>
    {
        let divTable=[]
        let numOfHoursBeforeCount = Math.ceil(this.convertTimeInput(this.props.hours_before_target));
        let numOfHoursAfterCount =  Math.ceil(this.convertTimeInput(this.props.hours_after_target));
        for(let j=0;j<this.props.lists.length;j++)
        {
            let leftPlace=50+j*140;     
            if(window.location.pathname.search("display") == -1) 
                divTable.push(<div key={'q'+j} style={{top:0,left:leftPlace, position:"absolute", height:"50px",width:"140px", border:"solid",textAlign:"center"}}>
                <div name={this.props.lists[j].key} style={{float:"right",color:"#a32217",cursor:"help", width:"10px",height:"auto"}} onClick={this.deleteColumn}>x</div>
                {this.props.lists[j].title}</div>)
            else
               divTable.push(<div key={'z'+j} style={{top:0,left:leftPlace, position:"absolute", height:"50px",width:"140px", border:"solid",textAlign:"center"}}>{this.props.lists[j].title}</div>)
        for(let i=1;i<=numOfHoursBeforeCount+numOfHoursAfterCount;i++)
        {   
            let placeOnScreenTop=i*50;
            let placeOnScreenBottom=i*50+25;
            if(j === 0)
            {
                
                divTable.push(<div key={'b'+i} style={{top:placeOnScreenTop,left:leftPlace, position:"absolute", height:"25px",width:"140px",borderRight:"dotted",borderBottom:"solid"}}></div>)
                if(i == numOfHoursBeforeCount)
                divTable.push(<div key={'abc'+i} style={{top:placeOnScreenBottom,left:leftPlace, position:"absolute", height:"25px",width:"140px",borderRight:"dotted",borderBottom:"solid",borderBottomColor:"#a32217"}}></div>)
                else
                divTable.push(<div key={'d'+i} style={{top:placeOnScreenBottom,left:leftPlace, position:"absolute", height:"25px",width:"140px",borderRight:"dotted",borderBottom:"solid"}}></div>)
            }
            else
            {
                divTable.push(<div key={j+'d'+i} style={{top:placeOnScreenTop,left:leftPlace, position:"absolute", height:"25px",width:"140px", borderLeft:"dotted",borderRight:"dotted",borderBottom:"solid"}}></div>)
                if(i == numOfHoursBeforeCount)
                    divTable.push(<div key={j+'e'+i} style={{top:placeOnScreenBottom,left:leftPlace, position:"absolute", height:"25px",width:"140px", borderLeft:"dotted",borderRight:"dotted",borderBottom:"solid",borderBottomColor:"#a32217"}}></div>)
                else
                    divTable.push(<div key={j+'f'+i} style={{top:placeOnScreenBottom,left:leftPlace, position:"absolute", height:"25px",width:"140px", borderLeft:"dotted",borderRight:"dotted",borderBottom:"solid"}}></div>)
            }
        }
        }
        return divTable;
    }
    editEvent =(key)=>
    {
        this.props.dispatch(deleteEventCountDown(key));
    }
    createEvent =(title,startHour,endHour,columID,comments,key,color,multipleEvent) =>
    {
            let startHourArr = this.convertTimeInput(startHour);
            let endHourArr = this.convertTimeInput(endHour);
            let validMission= true;
            if(this.timeValidator(startHour) == false || this.timeValidator(endHour) == false)
            {
                validMission = false;
            }
                
            if(startHourArr[0] === '+' && endHourArr[0] == '+')
            {
                let startHourBytes = this.convertTimeInput(this.props.hours_before_target)*50 + 1*50+ 50*startHourArr[1];
                let eventDuration =(endHourArr[1]-startHourArr[1])*50;
                return <CountDownEvent key={key+'n'} id={key} title={title} startHourBytes={startHourBytes} eventDuration={eventDuration} columID={columID} comments={comments} startHour={startHour} endHour={endHour} editEvent={this.editEvent} color={color} changeColor={this.changeEventColor} validMission={validMission} multipleEvent={multipleEvent}/>
            }
            else if(startHourArr[0] === '-' && endHourArr[0] == '-')
            {
                let startHourBytes =this.convertTimeInput(this.props.hours_before_target)*50 +1*50 - 50*startHourArr[1];
                let eventDuration =(startHourArr[1]-endHourArr[1])*50;
                return <CountDownEvent key={key+'bzl'} id={key} title={title} startHourBytes={startHourBytes} eventDuration={eventDuration} columID={columID} comments={comments} startHour={startHour} endHour={endHour} editEvent={this.editEvent} color={color} changeColor={this.changeEventColor} validMission={validMission} multipleEvent={multipleEvent}/>
            }
            else if(startHourArr[0] === '-' && endHourArr[0] == '+')
            {
                let startHourBytes =this.convertTimeInput(this.props.hours_before_target)*50 +1*50 - 50*startHourArr[1];
                let eventDuration =(startHourArr[1]+endHourArr[1])*50;
                return <CountDownEvent key={key+'ckjhl'} id={key} title={title} startHourBytes={startHourBytes} eventDuration={eventDuration} columID={columID} comments={comments} startHour={startHour} endHour={endHour} editEvent={this.editEvent} color={color} changeColor={this.changeEventColor} validMission={validMission} multipleEvent={multipleEvent}/>
            }
    }

    createAllEvents = () =>
    {
        let multipleEvent = -1;
        let eventTable=[];
        let multipleEventPlace =[];
        for(let i=0;i<this.props.events.length; i++)
        {
            multipleEvent = -1;
            for(let j=0; j<this.props.events.length; j++)
            {
                if( j != i)
                {
                    let tempmultipleEvent =  this.checkMultipleEvent(this.props.events[i],this.props.events[j]);
                    if (multipleEvent == -1 && (multipleEventPlace[j] == null || multipleEventPlace[j] == -1))
                    {
                        multipleEvent = tempmultipleEvent;
            
                    }
                    else if (tempmultipleEvent !=-1 && multipleEventPlace[j]!=null && multipleEventPlace[j] != -1)
                    {
                        if(multipleEventPlace[j] == 1)
                            multipleEvent = 2;
                        if(multipleEventPlace[j] == 2)
                            multipleEvent = 1;
                    }
                   
                }    
            }
            multipleEventPlace[i]= multipleEvent;
           eventTable.push(this.createEvent(this.props.events[i].title,this.props.events[i].startHour,this.props.events[i].endHour,this.props.events[i].columID,this.props.events[i].comments, this.props.events[i].id,this.props.events[i].color,multipleEvent));
        }
        return eventTable;
    }

    render(){
    return (

        <div>  
        {this.createTimeColumn()}
        {this.createMissionColumn()}
        {this.createAllEvents()}
        
       
        <CountDownAddEventButton />
        <CountDownAddEntityButton/>
        <CountDownBar/>
      

        </div>
        
    )
}
  
}
const mapStateToProps = (state)=> ({
    lists: state.CountDownWindowReducers.CountDownlists.resources,
    events: state.CountDownWindowReducers.CountDownlists.events,
    hours_before_target: state.MainWindowReducers.hours_before_target,
    hours_after_target: state.MainWindowReducers.hours_after_target
  })


export default  connect(mapStateToProps)(TestScheduler)