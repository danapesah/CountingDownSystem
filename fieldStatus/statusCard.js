import React from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';

const StatusCard = ({title ,buttons, changeColor}) =>
{
    return (
        <div style={styles.cardContainer} >
           
        <div>
        {buttons.map(button=>(<Button style={{backgroundColor: "green"}} onClick={changeColor}>{button.titleButton} </Button>))}
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