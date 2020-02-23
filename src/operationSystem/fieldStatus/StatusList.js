import React from 'react'
import StatusCard from './statusCard'

const StatusList = ({listID,title, cards, changeColor, deleteCard}) =>
{
    return (
        <div >
            <div style={{fontWeight: "bold"}}>{title}</div>
        <div> 
       {cards.map(card => (<StatusCard key={card.cardID} title={card.cardTitle} buttons={card.buttons} changeColor={changeColor} listID={listID} cardID={card.cardID} deleteCard={deleteCard} /> ))} 
       </div>
        </div>
    )
}

export default StatusList; 