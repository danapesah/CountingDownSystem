import React from 'react'
import OperationCard from './OperationCard'
import OperationAddCardButton from './OperationAddCardButton'
import planePic from './plane.jpeg'

const  OperationList = ({title , cards , listID, changePic}) => {



    const cardsUtil =({})=>
    {

        return (
            <div style={{lineHeight: '0',}}>
            <div>{title}</div>
            <form action="#">
            <label>
            <input type="checkbox" style={{width:"5px", height:"5px"}}/>
            <span></span>
             </label>
    `       <br/>   
            <label>
            <input type="checkbox" />
            <span></span>
             </label>
             <br/> 
            <label>
            <input type="checkbox" />
            <span></span>
             </label>
            </form>
        </div>


        )

    }



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
      width: "auto",height: "auto", 
      flexDirection:"row",
      backgroundColor : "#dfe3e6",
      boredeRadius : 3,
      paddingLeft:1,
      marginRight:8,

      
    },

    listsStyle:
    {
        float:"right",
        ///float:"right",
        //position: "absolute",
       
    },
}
export default OperationList