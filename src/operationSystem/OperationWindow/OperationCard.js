import React from 'react'
import planePic from './Icons/plane.jpeg'
import helicopterPic from './Icons/helicopter.jpeg'

const OperationCard = ({listID, cardID,title, checkBox, picture, deleteCard}) =>
{
    const picArray=[
        planePic,
        helicopterPic
    ]
    const checkBoxUtil =(checkBox)=>
    {
        let checkBoxDiv =[]
        for(let i=0; i< checkBox.length; i++)
        {
            if(checkBox[i] == 0)
                checkBoxDiv.push(
                    <div>
                    <label>
                    <input type="checkbox" name={i} style={{width:"5px", height:"5px"}}/>
                    <span></span>
                    </label>
                    <br/> 
                    </div>  
                ) 
            else
                checkBoxDiv.push(
                    <div>
                    <label>
                    <input type="checkbox" name={i} style={{width:"5px", height:"5px"}} checked/>
                    <span></span>
                    </label>
                    <br/> 
                    </div>  
                ) 
        }
        return checkBoxDiv
    }

    const deleteAble =(cardID,listID)=>
    {
        //CHECK IF EDITABLE
        if(true)
        return <div style={{float:"center",color:"red",cursor:"help",fontSize:"small",paddingTop:"15px"}}
        onClick={()=>deleteCard(cardID,listID)} >מחיקת כרטיסx</div>
    }

    
    return(
       <div style={{lineHeight: '0',borderRight: '2px dotted black',paddingLeft:"3px",paddingRight:"1px"}}>
           <img src={picArray[picture]} style={{width:"50px",height:"40px"}}></img>
            <div style={{paddingTop:"10px"}}>{title}</div>
            <form action="#" style={{paddingTop:"19px"}} >
            {checkBoxUtil(checkBox)}
            </form>
            {deleteAble(cardID,listID)}
        </div>

    )
}

export default OperationCard