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
            if(state.deleteCard == "")
            {
                state.deleteCard=cards[0].cardID;
            }
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
            contentStyle={{width:"auto", height:"auto"}}
            closeOnDocumentClick>
           <form name="addCard" onSubmit={handleSubmit} >
                <label style={{float:"center",color:"black"}} >
                    :שם הכרטיס
                    <input  style={{textAlign:"right"}}  type="text" name="cardTitle" onChange={handleChange} />
                    <textarea style={{textAlign:"right", color:"black"}} name="cardComments" onChange={handleChange} placeholder="הערות נוספות"/>
                </label>
                <br/>
                 <input className="left" type="submit" value="אישור" /> 
            </form>  
          </Popup>)
          else
            return (null)

    }

    const makeSelectInput =()=>
     {
         let inputCardArray=[];
        cards.map((card,i)=>{
        inputCardArray.push(<option style={{fontSize:"22px"}} key={i} value={card.cardID}>{card.cardTitle}</option>)})
         return inputCardArray;
    }
    const deleteAble =()=>
    {
        //CHECK IF EDITABLE
        if(window.location.pathname.search("display") == -1 && cards.length >=1)
            return(
            <Popup
            trigger={ <div style={{color:"red",cursor:"help", width:"2px",height:"auto",display:"inline", marginRight:"10px", fontSize:"12px"}}>-מחיקת כרטיס</div>}
            modal
            contentStyle={{width:"auto", height:"auto"}}
            closeOnDocumentClick>
           <form name="deleteCard" onSubmit={handleSubmit} >
           <label style={{display:"inline-block" , color:"black"}}>
         
                <select name= "deleteCard" style={{display:"inline-block", width:"auto"}} onChange={handleChange}>
                    {makeSelectInput()}
                </select>
                :שם הכרטיס
            </label>
            <br/>
                 <input className="left" name="deleteCard" type="submit" value="אישור" /> 
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