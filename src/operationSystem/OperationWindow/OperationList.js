import React from 'react'
import OperationCard from './OperationCard'
import OperationAddCardButton from './OperationAddCardButton'
import planePic from './plane.jpeg'

const  OperationList = ({title , cards , listID, changePic}) => {


    return (
        <div style={styles.listsStyle} > 
        <img id={"pic"+listID} src={planePic} style={{width:"50%"}} onClick={changePic}></img>
        <form>
        <input type="text" placeholder={title} style={{width:90}}></input>
        </form>
        <div style={styles.listsContainer}>
       {cards.map(card => (<OperationCard key={card.id} title={card.title}/> ))} 
       <OperationAddCardButton listID={listID}/>
       </div>
        </div>
    )
}

const styles = {
    listsContainer:
    {
      display:"flex",
      //lineHeight: '0',
      width: "auto",height: "auto", 
      flexDirection:"row",
      backgroundColor : "#dfe3e6",
      boredeRadius : 3,
      //padding :2,
     // paddingBottom:-50,
      paddingLeft:1,
      marginRight:8,
    // height:  "100%",

      
    },

    listsStyle:
    {
        float:"right",
        ///float:"right",
        //position: "absolute",
       
    },
}
export default OperationList