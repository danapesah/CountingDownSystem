import React from 'react'

const OperationCard = ({title}) =>
{
    
    return(
       <div style={{lineHeight: '0',}}>
            <div>{title}</div>
            <form action="#">
            <label>
            <input type="checkbox" style={{width:"5px", height:"5px"}}/>
            <span></span>
             </label>
    `       <br/>   
            <label>
            <input type="checkbox" />
            <span></span>
             </label>
             <br/> 
            <label>
            <input type="checkbox" />
            <span></span>
             </label>
            </form>
        </div>

    )
}

export default OperationCard