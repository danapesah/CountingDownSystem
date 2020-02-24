import React,{Component} from 'react'
import { connect  } from 'react-redux'
import StatusList from './StatusList'
import { deleteButtonFieldStatus, addButtonFieldStatus ,addCardFieldStatus } from "../../Actions";

class MainComponent extends Component
{
  
   changeColor =(e)=>
   {    
       if( e.target.style.backgroundColor=="green")
          {
              e.target.style.backgroundColor="orange";
           }
       else if( e.target.style.backgroundColor=="orange")
         {
              e.target.style.backgroundColor="Red";
        }
        else if( e.target.style.backgroundColor=="red")
          {
              e.target.style.backgroundColor="black";
          }
       else if( e.target.style.backgroundColor=="black")
         { 
             e.target.style.backgroundColor="green";
        }
   }
   
    deleteButton = (cardID,buttonID,listID)=>
    {
       this.props.dispatch(deleteButtonFieldStatus(cardID,buttonID,listID));
    }

    addButton = ( cardID, listID,buttonTitle ) =>
    {
        this.props.dispatch(addButtonFieldStatus(cardID, listID,buttonTitle));
    }

    addCard = ( listID,cardTitle, cardComments ) =>
    {
        console.log(cardTitle);
        this.props.dispatch(addCardFieldStatus(listID,cardTitle, cardComments));
    }




    render()
    {  
        const {lists} = this.props;
        return(
        <div>
        <div class="center"> חלון סטטוס שדה</div>
        
        <div style={styles.listsStyle}>
        {lists.map(list => 
          ( <StatusList listID={list.listID} 
                        key ={list.listID}
                        title = {list.listTitle} 
                        cards = {list.cards} 
                        changeColor={this.changeColor} 
                        deleteButton={this.deleteButton} 
                        addButton={this.addButton} 
                        addCard ={this.addCard}
                        />))}
          </div> 
        </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        lists: state.StatusList
    }
}

const styles = {
    listsStyle:
    {
        display:"flex",
        flexDirection:"column",
        textAlign: 'right',
        position:'relative'
    }
}

export default connect(mapStateToProps)(MainComponent)