import React from 'react'
import OperationCard from './OperationCard'

const  OperationList = ({listID,cards, deleteCard}) => 
{
    return (
       
        <div style={styles.listsStyle} > 
        <div style={styles.listsContainer}>
       {cards.map(card => (<OperationCard key={card.id} cardID={card.id} listID={listID} title={card.title} 
                                        checkBox={card.checkBox} picture={card.picture} deleteCard={deleteCard}/> ))} 
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
}
export default OperationList