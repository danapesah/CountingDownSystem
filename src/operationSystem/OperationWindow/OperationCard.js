
import React from 'react'

const OperationCard = ({title}) =>
{
    
    return(
       <div style={{lineHeight: '0',}}>
            <div>{title}</div>
            <form action="#">
            <p >
            <label>
            <input type="checkbox" />
            <span></span>
             </label>
            </p>

            <p>
            <label>
            <input type="checkbox" />
            <span></span>
             </label>
            </p>

            <p>
            <label>
            <input type="checkbox" />
            <span></span>
             </label>
            </p>
            </form>
        </div>
       
    )
}


export default OperationCard