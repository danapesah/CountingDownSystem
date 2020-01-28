import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SchedulerButton from './SchedulerButton'


class TestScheduler extends Component
{ 
    state={
        columnNum:5
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
        for(let j=0;j<this.state.columnNum;j++)
        {
            let leftPlace=50+j*140;       
          divTable.push(<div style={{top:0,left:leftPlace, position:"absolute", height:"50px",width:"140px", border:"solid"}}>משימה</div>)
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

    createEvent =(startHour,endHour) =>
    {
        let startHourBytes = 50*startHour;
        let eventDuration =(endHour-startHour)*50;
        return <SchedulerButton startHourBytes={startHourBytes} eventDuration={eventDuration}/>

    }
    
    render(){
        // let numOfHours=8;
    //  console.log(this.createTimeColumn);
    return (

        <div>
        {/* <div style={{top:"50px", position:"absolute", height:"50px", border:"solid"}}>07:00</div>
        <div style={{top:"100px",  position:"absolute", height:"50px", border:"solid"}}>08:00</div>
        <div style={{top:"150px",position:"absolute", height:"50px", border:"solid"}}>09:00</div>
        <div style={{top:"200px",position:"absolute", height:"50px", border:"solid"}}>10:00</div> */}
        {this.createTimeColumn()}
        {this.createMissionColumn()}
        {this.createEvent(3,4)}
        {this.createEvent(6,8)}
        {/* <SchedulerButton/> */}
        </div>
    )
}
  
}

export default TestScheduler