import React from 'react'
import StatusCard from './statusCard'
import Popup from "reactjs-popup";

const StatusList = ({listID,title, cards, changeColor, deleteButton, addButton, addCard}) =>
{
    let state= {
        cardTitle:"",
        cardComments:"",
    }

    const handleSubmit =(event)=>
    {
        event.preventDefault();
        addCard(listID,state.cardTitle,state.cardComments);
   }   
   const handleChange =(event)=>
    {
       if(event.target.name == "cardTitle")
        state.cardTitle= event.target.value;
      else if(event.target.name == "cardComments")
        state.cardComments= event.target.value;
   }   
    const addAble =()=>
    {
        //CHECK IF EDITABLE
        if(true)
            return(
            <Popup
            trigger={ <div style={{color:"red",cursor:"help", width:"2px",height:"auto",display:"inline", marginRight:"5px", fontSize:"12px"}}>+הוספת שורה </div>}
            modal
            closeOnDocumentClick>
           <form onSubmit={handleSubmit} >
                <label style={{float:"center"}} >
                    List Title:
                    <input  type="text" name="cardTitle" onChange={handleChange} />
                    <textarea name="cardComments" onChange={handleChange}>Extra Comments</textarea>
                </label>
                 <input type="submit" value="Submit" /> 
            </form>  
          </Popup>)

    }

    return (
        <div >
            <div style={{fontWeight: "bold"}}>
                {title}
                {addAble()}
                </div>   
        <div> 
       {cards.map(card => (<StatusCard key={card.cardID} 
                                       title={card.cardTitle} 
                                       buttons={card.buttons} 
                                       changeColor={changeColor} 
                                       listID={listID} 
                                       cardID={card.cardID} 
                                       deleteButton={deleteButton} 
                                       addButton={addButton} 
                                       cardComments={card.cardComments} /> ))} 
       </div>
        </div>
    )
}

export default StatusList; 