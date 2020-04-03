import React from 'react'
import planePic from './Icons/plane.jpeg'
import helicopterPic from './Icons/helicopter.jpeg'

const OperationCard = ({listID, cardID,title, checkBox, picture, deleteCard}) =>
{
    const picArray=[
        planePic,
        helicopterPic
    ]

    const onChangeTest =()=>{}
    
    const checkBoxUtil =(checkBox)=>
    {
        let checkBoxDiv =[]
        for(let i=0; i< checkBox.length; i++)
        {
            if(checkBox[i] === 0)
                checkBoxDiv.push(
                    <div key={i}>
                    <label>
                    <input type="checkbox" name={i} style={{width:"5px", height:"5px"}} onChange={onChangeTest}/>
                    <span></span>
                    </label>
                    <br/> 
                    </div>  
                ) 
            else
                checkBoxDiv.push(
                    <div key={i}>
                    <label>
                    <input type="checkbox" name={i} style={{width:"5px", height:"5px"}} onChange={onChangeTest} checked/>
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
        if(window.location.pathname.search("display") == -1)
            return <div style={{float:"right",color:"red",cursor:"help",fontSize:"small",paddingTop:"15px"}}
            onClick={()=>deleteCard(cardID,listID)} >x</div>
        else
            return(null);
    }

    
    return(
       <div style={{lineHeight: '0',borderRight: '2px dotted black',paddingLeft:"3px",paddingRight:"1px"}}>
           <img src={picArray[picture]} style={{width:"50px",height:"40px"}}></img>
           {deleteAble(cardID,listID)}
            <div style={{paddingTop:"10px"}}>{title}</div>
            <form action="#" style={{paddingTop:"19px"}} >
            {checkBoxUtil(checkBox)}
            </form>
           
        </div>

    )
}

export default OperationCard