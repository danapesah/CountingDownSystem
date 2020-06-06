import React from 'react';
import Popup from "reactjs-popup";

const  CountDownEvent = ({id, title,startHourBytes,eventDuration, columID,comments,startHour,endHour, editEvent})=>
{

  const checkIfEditAble=()=>
  {
    if(window.location.pathname.search("display") == -1)
      return <div style={{float:"right",color:"red",cursor:"help", width:"10px",height:"auto"}} onClick={()=>editEvent({id})}>x</div>
    else
      return(null);
  }

 
  let leftPlace=50+columID*140; 
  return(
        <div style={{top:startHourBytes,left:leftPlace, position:"absolute", height:eventDuration,width:"140px",backgroundColor:"Yellow", border:"solid"}} >
           {checkIfEditAble()}
          <Popup trigger={<div style={{cursor:"help", width:"15px",height:"auto"}} > ...</div>} position="right center" >
            <div>
              <div>{startHour}-{endHour}</div>
              <div>{comments}</div>
            </div>
          </Popup>
          <div  style={{textAlign:"right"}}>{title}</div>
          </div>
  );
}
export default CountDownEvent