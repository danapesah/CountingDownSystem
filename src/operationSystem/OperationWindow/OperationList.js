import React from 'react'
import OperationCard from './OperationCard'
import Popup from "reactjs-popup";

const  OperationList = ({listID,cards, deleteCard,handleChange,handleSubmit}) => 
{


    const addCard =(listID,handleChange,handleSubmit)=>
    {
      if(window.location.pathname.search("display") == -1)
        return(
        <Popup
        trigger={<div style={styles.listsContainer,{cursor:"help",fontSize:"40px",paddingTop:"35px",height:"150px"}}className="button">+</div>}
        modal
        onClose={(event)=>handleChange(event,"closeWindow")}
        closeOnDocumentClick>
          {close =>(
              <div>
            <form name="addCard" onSubmit={handleSubmit}>
            <label >
                Card Title:
                <input type="text" name="cardTitle" onChange={(event)=>{handleChange(event,listID)}}/>
            </label>
            <label style={{display:"inline-block"}}>
                 Type:
                <select name= "cardType" style={{display:"inline-block", width:"150px"}} onChange={(event)=>{handleChange(event)}}>
                <option value={0}>מטוס</option>
                <option value={1}>מסוק</option>
                </select>
            </label>
            <br/>
             <input type="submit" value="Submit" /> 
        </form>  
        <a className="close" onClick={close} style={styles.close}>
            &times;
             </a>
             </div>)}
      </Popup>)
      else
        return(null)
    }


    return (
       
        <div style={styles.listsStyle} > 
        <div style={styles.listsContainer}>
       {cards.map(card => (<OperationCard key={card.id} cardID={card.id} listID={listID} title={card.title} 
                                        checkBox={card.checkBox} picture={card.picture} deleteCard={deleteCard}/> ))} 
        {addCard(listID,handleChange,handleSubmit)}
       </div>
        </div>
    )
}

const styles = {
    listsContainer:
    {
      display:"flex",
      width: "auto",height: "auto", 
      flexDirection:"row",
      backgroundColor : "#dfe3e6",
      boredeRadius : 3,
      paddingLeft:1,
      marginRight:8,
      borderRight: '4px dotted black',
      borderLeft: '4px dotted black'
      
    },

    listsStyle:
    {
        float:"right",
    },
    close:
    {
      cursor: 'pointer',
      position: "absolute",
      display: "block",
      padding: "2px 5px",
      right: "-10px",
      top:"-10px",
      fontSize: "15px",
      background:" #ffffff",
      borderRadius: "18px",
      border: "1px solid #cfcece"
    },
}
export default OperationList