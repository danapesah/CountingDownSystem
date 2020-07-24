import React from 'react';
import Popup from "reactjs-popup";

const  CountDownEvent = ({id, title,startHourBytes,eventDuration, columID,comments,startHour,endHour, editEvent,color, changeColor,validMission,multipleEvent})=>
{
  const checkIfEditAble=()=>
  {
    let xColor ="Red";
    if(color == "Red")
       xColor="black";
    if(window.location.pathname.search("display") == -1)
      return <div style={{float:"right",color:xColor,cursor:"help", width:"10px",height:"auto"}} onClick={()=>editEvent({id})}>x</div>
    else
      return(null);
  }

  const checkWhereTitle =(titleLocation)=>
  {
    if(eventDuration<50)
    {
      if(titleLocation == "popup")
        return <div style={{borderBottom:"solid",color:"black"}}>{title}</div>
      if(titleLocation == "event")
        return(null);
    }
    else
    {
      if(titleLocation == "popup")
        return(null);
    if(titleLocation == "event")
      return <div style={{textAlign:"right"}}>{title}</div>
    }
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

  let leftPlace;
  let eventWidth;  
  if (multipleEvent === -1)  
  {
    leftPlace=50+columID*140; 
    eventWidth="140px"
  }
  else if(multipleEvent === 1)
  {
    leftPlace=50+columID*140;
    eventWidth ="70px";
  }
  else if(multipleEvent === 2)
  {
    leftPlace=50+columID*140+70;
    eventWidth ="70px";
  }

  if(validMission)
  {
    
    return(
          
          <div style={{top:startHourBytes,left:leftPlace, position:"absolute", height:eventDuration,width:eventWidth,backgroundColor:color, border:"solid", color:textColor}} >
            {checkIfEditAble()}
            <Popup trigger={<div style={{cursor:"help", width:"15px",height:"auto"}} > ...</div>} position="right center" >
              <div>
              <div style={{borderRadius:"50%", backgroundColor:nextColor,width:"20px",float:"right",color:"black",textAlign:"center"}} onClick={()=>changeColor({id})}>()</div>
                <div style={{borderBottom:"solid",color:"black"}}>{startHour} - {endHour}</div>
                {checkWhereTitle("popup")}
                <div style={{color:"black"}}>{comments}</div>
              </div>
            </Popup>
            {checkWhereTitle("event")}
            </div>
    );
  }
  else
  {
    
    editEvent({id})
      return null;
  }
}
export default CountDownEvent