import React from 'react';


const  SchedulerButton = ({startHourBytes,eventDuration})=>
{
  return(
        <div style={{top:startHourBytes,left:50, position:"absolute", height:eventDuration,width:"140px",backgroundColor:"Yellow", border:"solid"}} >Event</div>
  );
}
export default SchedulerButton