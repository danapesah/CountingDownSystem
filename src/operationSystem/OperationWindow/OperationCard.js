import React from 'react'
import Airliner from './Icons/Airliner.png'
import helicopterPic from './Icons/helicopter.png'
import car from './Icons/car.png'
import lightPlane from './Icons/lightPlane.png'
import missile from './Icons/missile.png'
import warAircraft from './Icons/warAircraft.png'
import ship from './Icons/ship.png'
import smallBoat from './Icons/smallBoat.png'
import warship from './Icons/warship.png'
import submarine from './Icons/submarine.png'
import other from './Icons/other.png'

const OperationCard = ({listID, cardID,title, checkBox, picture, deleteCard,changeCheckBoxState}) =>
{
    const picArray=[
        Airliner,
        lightPlane,
        warAircraft,
        helicopterPic,
        car,
        missile,
        ship,
        smallBoat,
        warship,
        submarine,
        other
    ]
    const checkBoxUtil =(checkBox)=>
    {
        let checkBoxDiv =[]
        for(let i=0; i< checkBox.length; i++)
        {
            if(checkBox[i] === 0)
                checkBoxDiv.push(
                    <div key={i}>
                    <label>
                    <input type="checkbox" name={i} style={{width:"5px", height:"5px"}} onChange={()=>changeCheckBoxState(cardID,listID,i)}/>
                    <span></span>
                    </label>
                    <br/> 
                    </div>  
                ) 
            else
                checkBoxDiv.push(
                    <div key={i}>
                    <label>
                    <input type="checkbox" name={i} style={{width:"5px", height:"5px"}} onChange={()=>changeCheckBoxState(cardID,listID,i)} checked/>
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
           <img src={picArray[picture]} style={{width:"35px",height:"35px",paddingRight:"1px"}}></img>
           {deleteAble(cardID,listID)}
            <div style={{paddingTop:"10px"}}>{title}</div>
            <form action="#" style={{paddingTop:"19px"}} >
            {checkBoxUtil(checkBox)}
            </form>
           
        </div>

    )
}

export default OperationCard