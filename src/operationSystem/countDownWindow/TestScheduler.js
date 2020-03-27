import React, {Component} from 'react';
import {connect } from 'react-redux'
import CountDownEvent from './CountDownEvent';
import CountDownAddEventButton from './CountDownAddEventButton';
import CountDownAddEntityButton from './CountDownAddEntityButton';
import {deleteEventCountDown,deleteEntityCountDown} from '../../Actions';

class TestScheduler extends Component
{ 
    
    deleteColumn=(event)=>
    {
        
        this.props.dispatch(deleteEntityCountDown(event.target.getAttribute('name')));
    }

    createTimeColumn =()=>
    {
        let divTable=[]
        for(let i=7;i>=1;i--)
        {
            let placeOnScreen=i*50+"px";
            divTable.push(<div style={{top:placeOnScreen, position:"absolute", height:"50px",width:"50px", border:"solid"}}>{i}:00</div>)
        }
        return divTable;
    }
    createMissionColumn =()=>
    {
        let divTable=[]
        for(let j=0;j<this.props.lists.length;j++)
        {
            let leftPlace=50+j*140;       
          divTable.push(<div style={{top:0,left:leftPlace, position:"absolute", height:"50px",width:"140px", border:"solid",textAlign:"center"}}>
              <div name={this.props.lists[j].key} style={{float:"right",color:"red",cursor:"help", width:"10px",height:"auto"}} onClick={this.deleteColumn}>x</div>
              {this.props.lists[j].title}</div>)
        for(let i=1;i<=7;i++)
        {   
            let placeOnScreenTop=i*50;
            let placeOnScreenBottom=i*50+25;
            if(j === 0)
            {
                divTable.push(<div style={{top:placeOnScreenTop,left:leftPlace, position:"absolute", height:"25px",width:"140px",borderRight:"dotted",borderBottom:"solid"}}></div>)
                divTable.push(<div style={{top:placeOnScreenBottom,left:leftPlace, position:"absolute", height:"25px",width:"140px",borderRight:"dotted",borderBottom:"solid"}}></div>)
            }
            else
            {
            divTable.push(<div style={{top:placeOnScreenTop,left:leftPlace, position:"absolute", height:"25px",width:"140px", borderLeft:"dotted",borderRight:"dotted",borderBottom:"solid"}}></div>)
            divTable.push(<div style={{top:placeOnScreenBottom,left:leftPlace, position:"absolute", height:"25px",width:"140px", borderLeft:"dotted",borderRight:"dotted",borderBottom:"solid"}}></div>)
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
        let startHourBytes = 50*startHour;
        let eventDuration =(endHour-startHour)*50;
        return <CountDownEvent key={key} id={key} title={title} startHourBytes={startHourBytes} eventDuration={eventDuration} columID={columID} comments={comments} startHour={startHour} endHour={endHour} editEvent={this.editEvent}/>
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
    events: state.CountDownlists.events



  })


  const styles={

    a : {
        paddingLeft : 30,
         backgroundColor:"#ffe0b3",
         marginTop:"20%"
      },
    
    //   paddingLeft : 90,
    //    backgroundColor:"#F5F5DC",
    b:{
        marginTop:"20%",
    paddingLeft : 30,
    }
   
}


export default  connect(mapStateToProps)(TestScheduler)