import React from 'react'
import StatusCard from './statusCard'
import Popup from "reactjs-popup";

const StatusList = ({listID,title, cards, changeColor, deleteButton, addButton, addCard, deleteCard}) =>
{
    let state= {
        cardTitle:"",
        cardComments:"",
        deleteCard:"",
    }

    const handleSubmit =(event)=>
    {
        event.preventDefault();
        if(event.target.name === "addCard")
        addCard(listID,state.cardTitle,state.cardComments);
        else if(event.target.name === "deleteCard")
        {
            deleteCard(listID, state.deleteCard);

        }
   }   
   
   const handleChange =(event)=>
    {
       if(event.target.name === "cardTitle")
        state.cardTitle= event.target.value;
       else if(event.target.name === "cardComments")
        state.cardComments= event.target.value;
        else if(event.target.name === "deleteCard")
        state.deleteCard=event.target.value;
   }   
    const addAble =()=>
    {
        //CHECK IF EDITABLE
        if(window.location.pathname.search("display") == -1)
            return(
            <Popup
            trigger={ <div style={{color:"green",cursor:"help", width:"2px",height:"auto",display:"inline", marginRight:"5px", fontSize:"12px"}}>+הוספת כרטיס </div>}
            modal
            closeOnDocumentClick>
           <form name="addCard" onSubmit={handleSubmit} >
                <label style={{float:"center"}} >
                    Card Title:
                    <input  type="text" name="cardTitle" onChange={handleChange} />
                    <textarea name="cardComments" onChange={handleChange} placeholder="Extra Comments"/>
                </label>
                 <input type="submit" value="Submit" /> 
            </form>  
          </Popup>)
          else
            return (null)

    }

    const makeSelectInput =()=>
     {
         let inputCardArray=[];
        cards.map((card,i)=>{
        inputCardArray.push(<option key={i} value={card.cardID}>{card.cardTitle}</option>)})
         return inputCardArray;
    }
    const deleteAble =()=>
    {
        //CHECK IF EDITABLE
        if(window.location.pathname.search("display") == -1)
            return(
            <Popup
            trigger={ <div style={{color:"red",cursor:"help", width:"2px",height:"auto",display:"inline", marginRight:"10px", fontSize:"12px"}}>-מחיקת כרטיס</div>}
            modal
            closeOnDocumentClick>
           <form name="deleteCard" onSubmit={handleSubmit} >
           <label style={{display:"inline-block"}}>
                 Card Title:
                <select name= "deleteCard" style={{display:"inline-block", width:"auto"}} onChange={handleChange}>
                    {makeSelectInput()}
                </select>
            </label>
                 <input name="deleteCard" type="submit" value="Submit" /> 
            </form>  
          </Popup>)
          else
            return (null)
    }

    return (
        <div style={{ borderBottom: '2px dotted black',marginBottom:"5px"}} >
            <div style={{fontWeight: "bold"}}>
                {title}
                {addAble()}
                {deleteAble()}
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
       </div >
        </div>
    )
}

export default StatusList; 