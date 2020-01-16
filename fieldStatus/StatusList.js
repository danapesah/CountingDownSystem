import React from 'react'
import StatusCard from './statusCard'

const StatusList = ({listID,title, cards, changeColor}) =>
{
  
    return (
        <div >
            <div style={{fontWeight: "bold"}}>{title}</div>
        <div style={styles.listsContainer}> 
       {cards.map(card => (<StatusCard key={card.cardID} title={card.cardTitle} buttons={card.buttons} changeColor={changeColor} /> ))} 
       </div>
        </div>
    )
}
const styles = {
    listsContainer:
    {
        
    },
}   
export default StatusList; 