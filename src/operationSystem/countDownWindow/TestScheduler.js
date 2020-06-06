import React, {Component} from 'react';
import {connect } from 'react-redux'
import CountDownEvent from './CountDownEvent';
import CountDownAddEventButton from './CountDownAddEventButton';
import CountDownAddEntityButton from './CountDownAddEntityButton';
import {deleteEventCountDown,deleteEntityCountDown} from '../../Actions';

class TestScheduler extends Component
{ 
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
        let numOfHoursBeforeCount = this.convertTimeInput(this.props.hours_before_target);
        let numOfHoursAfterCount = this.convertTimeInput(this.props.hours_after_target);
        let divTable=[]
        for(let i=numOfHoursBeforeCount;i>=1;i--)
        {
            let placeOnScreen=(numOfHoursBeforeCount-i+1)*50+"px";
            if(i == 1)
                divTable.push(<div key={i+'a'} style={{top:placeOnScreen, position:"absolute", height:"50px",width:"50px", border:"solid", borderBottomColor:"red"}}>-{i}:00</div>)
            else
                divTable.push(<div key={i+'b'} style={{top:placeOnScreen, position:"absolute", height:"50px",width:"50px", border:"solid"}}>-{i}:00</div>)
        }
        for(let i=numOfHoursAfterCount;i>=1;i--)
        {
            let placeOnScreen=numOfHoursBeforeCount*50+i*50+"px";
            divTable.push(<div key={i} style={{top:placeOnScreen, position:"absolute", height:"50px",width:"50px", border:"solid"}}>+{i}:00</div>)
        }

        return divTable;
    }
    createMissionColumn =()=>
    {
        let divTable=[]
        let numOfHoursBeforeCount = this.convertTimeInput(this.props.hours_before_target);
        let numOfHoursAfterCount = this.convertTimeInput(this.props.hours_after_target);
        for(let j=0;j<this.props.lists.length;j++)
        {
            let leftPlace=50+j*140;     
            if(window.location.pathname.search("display") == -1) 
                divTable.push(<div key={'a'+j} style={{top:0,left:leftPlace, position:"absolute", height:"50px",width:"140px", border:"solid",textAlign:"center"}}>
                <div name={this.props.lists[j].key} style={{float:"right",color:"red",cursor:"help", width:"10px",height:"auto"}} onClick={this.deleteColumn}>x</div>
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
                divTable.push(<div key={'c'+i} style={{top:placeOnScreenBottom,left:leftPlace, position:"absolute", height:"25px",width:"140px",borderRight:"dotted",borderBottom:"solid",borderBottomColor:"red"}}></div>)
                else
                divTable.push(<div key={'d'+i} style={{top:placeOnScreenBottom,left:leftPlace, position:"absolute", height:"25px",width:"140px",borderRight:"dotted",borderBottom:"solid"}}></div>)
            }
            else
            {
                divTable.push(<div key={j+'d'+i} style={{top:placeOnScreenTop,left:leftPlace, position:"absolute", height:"25px",width:"140px", borderLeft:"dotted",borderRight:"dotted",borderBottom:"solid"}}></div>)
                if(i == numOfHoursBeforeCount)
                    divTable.push(<div key={j+'e'+i} style={{top:placeOnScreenBottom,left:leftPlace, position:"absolute", height:"25px",width:"140px", borderLeft:"dotted",borderRight:"dotted",borderBottom:"solid",borderBottomColor:"red"}}></div>)
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
    createEvent =(title,startHour,endHour,columID,comments,key) =>
    {
        let startHourArr = this.convertTimeInput(startHour);
        let endHourArr = this.convertTimeInput(endHour);
        if(startHourArr[0] === '+' && endHourArr[0] == '+')
        {
            let startHourBytes = this.convertTimeInput(this.props.hours_before_target)*50 + 1*50+ 50*startHourArr[1];
            let eventDuration =(endHourArr[1]-startHourArr[1])*50;
            return <CountDownEvent key={key+'a'} id={key} title={title} startHourBytes={startHourBytes} eventDuration={eventDuration} columID={columID} comments={comments} startHour={startHour} endHour={endHour} editEvent={this.editEvent}/>
        }
        else if(startHourArr[0] === '-' && endHourArr[0] == '-')
        {
            let startHourBytes =this.convertTimeInput(this.props.hours_before_target)*50 +1*50 - 50*startHourArr[1];
            let eventDuration =(startHourArr[1]-endHourArr[1])*50;
            return <CountDownEvent key={key+'b'} id={key} title={title} startHourBytes={startHourBytes} eventDuration={eventDuration} columID={columID} comments={comments} startHour={startHour} endHour={endHour} editEvent={this.editEvent}/>
        }
        else if(startHourArr[0] === '-' && endHourArr[0] == '+')
        {
            let startHourBytes =this.convertTimeInput(this.props.hours_before_target)*50 +1*50 - 50*startHourArr[1];
            let eventDuration =(startHourArr[1]+endHourArr[1])*50;
            return <CountDownEvent key={key+'c'} id={key} title={title} startHourBytes={startHourBytes} eventDuration={eventDuration} columID={columID} comments={comments} startHour={startHour} endHour={endHour} editEvent={this.editEvent}/>
        }
        
    }

    createAllEvents = () =>
    {
        let eventTable=[];
        for(let i=0;i<this.props.events.length; i++)
            eventTable.push(this.createEvent(this.props.events[i].title,this.props.events[i].startHour,this.props.events[i].endHour,this.props.events[i].columID,this.props.events[i].comments, this.props.events[i].id));
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
      

        </div>
        
    )
}
  
}
const mapStateToProps = (state)=> ({
    lists: state.CountDownlists.resources,
    events: state.CountDownlists.events,
    hours_before_target: state.hours_before_target,
    hours_after_target: state.hours_after_target
  })


export default  connect(mapStateToProps)(TestScheduler)