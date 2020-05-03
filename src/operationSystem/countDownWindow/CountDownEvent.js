import React from 'react';
import Popup from "reactjs-popup";

const  CountDownEvent = ({id, title,startHourBytes,eventDuration, columID,comments,startHour,endHour, editEvent,color, changeColor})=>
{
  const checkIfEditAble=()=>
  {
    if(window.location.pathname.search("display") == -1)
      return <div style={{float:"right",color:"red",cursor:"help", width:"10px",height:"auto"}} onClick={()=>editEvent({id})}>x</div>
    else
      return(null);
  }
  let textColor;
  if(color == "black")
    textColor = "white";
  else
     textColor = "black";
  
  let nextColor;
  if(color == "green")
   nextColor = "orange"
  else if(color == "orange")
    nextColor = "Red"
  else if(color == "Red")
    nextColor = "black"
  else if(color == "black")
    nextColor = "green"


  let leftPlace=50+columID*140; 
  return(
        
        <div style={{top:startHourBytes,left:leftPlace, position:"absolute", height:eventDuration,width:"140px",backgroundColor:color, border:"solid", color:textColor}} >
           {checkIfEditAble()}
          <Popup trigger={<div style={{cursor:"help", width:"15px",height:"auto"}} > ...</div>} position="right center" >
            <div>
            <div style={{borderRadius:"50%", backgroundColor:nextColor,width:"20px",float:"right",color:"black"}} onClick={()=>changeColor({id})}>=></div>
              <div style={{borderBottom:"solid",color:"black"}}>{startHour} - {endHour}</div>
              <div style={{color:"black"}}>{comments}</div>
            </div>
          </Popup>
          <div  style={{textAlign:"right"}}>{title}</div>
          </div>
  );
}
export default CountDownEvent