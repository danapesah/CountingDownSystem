import React from 'react' 
import TrelloCard from  './TrelloCard'


const  TrelloList = ({title}) => {
    return (
        <div style = {styles.container}> 
        <h3>{title} </h3>
        <TrelloCard />
        </div>
    )
}
const styles={
    container : {
        backgroundColor : "#ccc",
        boredeRadius : 3,
        width: 300,
        padding :8,

    }
}

export default TrelloList;