import React from 'react'
import Button from 'react-bootstrap/Button';

const StatusCard = ({title ,buttons, changeColor,cardID, listID, deleteCard}) =>
{
    console.log(listID);
    const ifEditAble =(cardID,buttonID,listID)=>
    {
        //CHECK IF EDITABLE
        if(true)
        return <div style={{float:"right",color:"red",cursor:"help", width:"2px",height:"auto",marginLeft:"5px"}} onClick={()=>deleteCard(cardID,buttonID,listID)}>x</div>
    }
    return (
        <div style={styles.cardContainer} >
           
        <div>
        {buttons.map(button=>(<Button style={{backgroundColor: "green", width:"auto"}} onClick={changeColor}>
        {ifEditAble(cardID,button.id,listID)}
        {button.titleButton} </Button>))}
        </div>
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