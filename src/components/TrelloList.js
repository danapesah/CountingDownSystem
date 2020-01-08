import React from 'react' 
import TrelloCard from  './TrelloCard'
import TrelloActionButton from './TrelloActionButton'
import {Droppable} from "react-beautiful-dnd"
import { Provider } from 'react-redux'

const  TrelloList = ({title , cards , listID}) => {
    // console.log(cards);
    return (
        <Droppable droppableId = {String(listID)}>
            {   provided=>(
                <div {...provided.droppableProps} ref={provided.innerRef} 
                style = {styles.container}> 
                <h3>{title} </h3>
                {cards.map((card, index) => (
                <TrelloCard key={card.id} 
                text={card.text} 
                id={card.id}
                flag={card.flag}
                index = {index} 
                duration={card.duration}
                percentage={card.percentage}
                passed={card.passed}
                /> ))} 
                <TrelloActionButton  listID={listID} />
                {provided.placeholder} 
                </div>
                )
            }
           
        </Droppable>
    )
}
const styles={
    container : {
        backgroundColor : "#dfe3e6",
        boredeRadius : 3,
        width: 300,
        padding :8,
        marginRight:8,
        height:  "100%",

    }
}

export default TrelloList;