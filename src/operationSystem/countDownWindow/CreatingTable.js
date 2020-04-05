/*פה היוזר יכניס אתכותרת, מספר שעות לפני ספירה, משפה שעות אחרי הספירה  */

import React, {Component} from 'react'
import {connect } from 'react-redux'
import axios from 'axios';
import CountDownEvent from './CountDownEvent';
import CountDownAddEventButton from './CountDownAddEventButton';
import CountDownAddEntityButton from './CountDownAddEntityButton';
import {deleteEventCountDown,deleteEntityCountDown} from '../../Actions';

class CreatingTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title:"", //לא נשמר בסטור עדיין 
          up_count:0, //numbers of up hours
          down_count:0,//numbers of down hours
          flag:1,  

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    } 
    set_title(event){
       this.setState({title: event.target.value})
    }
    set_num_of_up_count(event){
       this.setState({up_count: event.target.value})
    }
    set_num_of_down_count(event){
        this.setState({down_count: event.target.value})
    }

    handleSubmit(event) {
        console.log(this.state)
        this.setState({flag: 0})

        event.preventDefault();
      }
    deleteColumn=(event)=>
    {
        
        this.props.dispatch(deleteEntityCountDown(event.target.getAttribute('name')));
    }

createTimeColumn =()=>
{

    let _up =  parseInt(this.state.up_count)
    let _down = parseInt(this.state.down_count)
    let time = _up + _down

    let divTable=[]

    for(let i=_down,j= 1; i>=1, j<=_down  ; i-- , j++)
    {
        let placeOnScreen=i*50+"px";
        divTable.push(<div style={{top:placeOnScreen, position:"absolute", height:"50px",width:"50px", border:"solid"}}>
            -{j}:00</div>)
    }

    for(let i=time, j=_up; i>=_up , j>0 ; i-- , j--)
    {
        let placeOnScreen=i*50+"px";
        divTable.push(<div style={{top:placeOnScreen, position:"absolute", height:"50px",width:"50px", border:"solid"}}>
            +{j}:00</div>)
    }

    return divTable;
}
createMissionColumn =()=>
{
let time = parseInt(this.state.up_count) + parseInt(this.state.down_count)
    let divTable=[]
    for(let j=0;j<this.props.lists.length;j++)
    {
        let leftPlace=50+j*140;    
        
        divTable.push(<div style={{top:0,left:leftPlace, position:"absolute", height:"50px",width:"140px", border:"solid",textAlign:"center"}}>
        <div name={this.props.lists[j].key} style={{float:"right",color:"red",cursor:"help", width:"10px",height:"auto"}} onClick={this.deleteColumn}>x</div>
        {this.props.lists[j].title}</div>)
    for(let i=1; i<=time; i++)
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
    return <CountDownEvent key={key} id={key} title={title} startHourBytes={startHourBytes} eventDuration={eventDuration} 
    columID={columID} comments={comments} startHour={startHour} endHour={endHour} editEvent={this.editEvent}/>
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
            {this.state.flag ? 
            <form  onSubmit={this.handleSubmit}>
            <label style={{color:"black"}} >
            enter the title 
            <input type="text" value = {this.state.title} onChange={(event)=>this.set_title(event)} />
            </label>
            <br></br>
            <label style={{color:"black"}} >
            down 
            <input type="number" value={this.state.set_num_of_down_count} onChange={(event)=>this.set_num_of_down_count(event)} />
            </label>

            <br></br>
            <label style={{color:"black"}}>
            up
            <input type="number" value={this.state.set_num_of_up_count} onChange={(event)=>this.set_num_of_up_count(event)} />
            </label>
           
            <br></br>
            <input type="submit" value="Submit" />
        </form>
      :
      

      <div>
           
      {this.createTimeColumn()}
      {this.createMissionColumn()}
      {this.createAllEvents()}
        
     
      <CountDownAddEventButton />
      <CountDownAddEntityButton/>
    

      </div>
      }
            </div>
        );
        }
}




const mapStateToProps = (state)=> ({
    lists: state.CountDownlists.resources,
    events: state.CountDownlists.events

})
export default connect(mapStateToProps)(CreatingTable) ;






