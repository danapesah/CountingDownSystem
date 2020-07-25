import React from 'react'
import Button from 'react-bootstrap/Button';
import Popup from "reactjs-popup";

const StatusCard = ({title ,buttons, changeColor,cardID, listID, deleteButton, addButton, cardComments}) =>
{
    let state= {
        buttonName:""
    }
    const handleSubmit =(event)=>
    {
        event.preventDefault();
        addButton(cardID, listID,state.buttonName)

   }   

    const handleChange =(event)=>
    {
       if(event.target.name === "button")
        state.buttonName= event.target.value;

   }   

    const addAble =()=>
    {
        //CHECK IF EDITABLE
        if(window.location.pathname.search("display") == -1)
            return(
            <Popup
            trigger={ <Button style={{width:"auto",height:"auto", marginRight:"10px"}}>+</Button>}
            modal
            contentStyle={{width:"auto", height:"auto"}}
            closeOnDocumentClick>
           <form onSubmit={handleSubmit} >
                <label style={{float:"center", color:"black"}} >
                    :שם כפתור
                    <input  type="text" name="button" onChange={handleChange} />
                </label>
                <br/>
                 <input className="left" type="submit" value="אישור" /> 
            </form>  
          </Popup>)
        else 
          return (null)

    }
    

    const deleteAble =(cardID,buttonID,listID, buttonColor)=>
    {
        let xColor ="red";
        if(buttonColor == "red")
           xColor="black";
        if(window.location.pathname.search("display") == -1)
            return <div style={{float:"right",color:xColor,cursor:"help", width:"2px",height:"auto",marginLeft:"5px"}} onClick={()=>deleteButton(cardID,buttonID,listID)}>x</div>
        else
            return (null);
    }

    const showCardComments =()=>
    {
        let positionPopUp ="";
        if(buttons.length == 1)
            positionPopUp="left center";
        else if(buttons.length > 1 && buttons.length <4)
            positionPopUp="center center";
        else
            positionPopUp="right center";
        return(
            <Popup 
            trigger={<div style={{color:"black",cursor:"help", width:"10px",height:"auto",display:"inline", marginRight:"5px", fontSize:"22px"}} onClick={showCardComments}>?</div>} 
            position={positionPopUp} >
            <div>
            <div>{cardComments}</div>
            </div>
          </Popup>
        )
    }

    return (
        <div style={styles.cardContainer} >
         {showCardComments()}
        <div>
        {buttons.map((button,i)=>(<Button key={i} style={{backgroundColor: button.color, width:"auto"}} onClick={()=>changeColor(cardID,button.id,listID)}>
        {deleteAble(cardID,button.id,listID, button.color)}
        {button.titleButton} </Button>))}
        </div>
      {addAble()}
        <div>{title}</div>
        </div>
    )
}

const styles = {
    cardContainer:
    {
        float:"right",
        display:"flex",
        flexDirection:"row",
        marginTop: "5%",
        marginLeft: "5%"
    }
}
export default StatusCard; 