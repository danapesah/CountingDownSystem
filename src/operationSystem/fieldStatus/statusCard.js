import React from 'react'
import Button from 'react-bootstrap/Button';
import Popup from "reactjs-popup";

const StatusCard = ({title ,buttons, changeColor,cardID, listID, deleteCard}) =>
{
    let state= {
        buttonName:""
    }

    const handleChange =(event)=>
    {
       if(event.target.name = "button")
        state.buttonName= event.target.value;

   }   

    const addAble =()=>
    {
        //CHECK IF EDITABLE
        if(true)
            return(
            <Popup
            trigger={ <Button style={{width:"auto",height:"auto", marginRight:"10px"}}>+</Button>}
            modal
            closeOnDocumentClick>
           <form style={{float:"center"}} >
                <label style={{float:"center"}} >
                    Button Title:
                    <input  type="text" name="button" onChange={handleChange} />
                </label>
                 <input type="submit" value="Submit" /> 
            </form>  
          </Popup>)

    }

    const deleteAble =(cardID,buttonID,listID)=>
    {
        //CHECK IF EDITABLE
        if(true)
        return <div style={{float:"right",color:"red",cursor:"help", width:"2px",height:"auto",marginLeft:"5px"}} onClick={()=>deleteCard(cardID,buttonID,listID)}>x</div>
    }
    return (
        <div style={styles.cardContainer} >
           
        <div>
        {buttons.map(button=>(<Button style={{backgroundColor: "green", width:"auto"}} onClick={changeColor}>
        {deleteAble(cardID,button.id,listID)}
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