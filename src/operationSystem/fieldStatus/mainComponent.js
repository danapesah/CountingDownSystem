
import React,{Component} from 'react'
import { connect  } from 'react-redux'
import StatusList from './StatusList'
import Popup from "reactjs-popup";
import { deleteButtonFieldStatus, addButtonFieldStatus ,addCardFieldStatus, deleteCardFieldStatus,deleteListFieldStatus } from "../../Actions";

class MainComponent extends Component
{
    state={
        deleteList:"",
        addListTitle:"",
    }
  
    handleChange =(event)=>
    {
        if(event.target.name == "deleteList")
            this.state.deleteList = event.target.value;
        console.log(this.state.deleteList);
    }

    handleSubmit =(event)=>
    {
        event.preventDefault();
        if(event.target.name == "deleteList")
        {
            if(this.state.deleteList == "")
            {
                this.props.dispatch(deleteListFieldStatus(this.props.lists[0].listID));
                this.state.deleteList = ""
            }
            else
            {
                this.props.dispatch(deleteListFieldStatus(this.state.deleteList));
                this.state.deleteList = ""
            }
                
        }
       
   }   


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
        this.props.dispatch(addCardFieldStatus(listID,cardTitle, cardComments));
    }

    deleteCard = (listID, cardID) =>
    {
        this.props.dispatch(deleteCardFieldStatus(listID,cardID));
    }
     addAble =()=>
    {
        //CHECK IF EDITABLE
        if(true)
            return(
            <Popup
            trigger={ <button style={{float:"right",width:"auto",height:"auto", marginLeft:"5px", marginRight:"5px"}}>הוספת רשימה</button>}
            modal
            closeOnDocumentClick>
           <form name="listTitle" onSubmit={this.handleSubmit} >
                <label style={{float:"center"}} >
                    List Title:
                    <input  type="text" name="listTitle" onChange={this.handleChange} />
                </label>
                 <input type="submit" value="Submit" /> 
            </form>  
          </Popup>)

    }
    

    makeSelectInput =()=>
    {
        let inputListArray=[];
        this.props.lists.map(list=>{
        inputListArray.push(<option value={list.listID}>{list.listTitle}</option>)})
        return inputListArray;
   }
   deleteAble =()=>
   {
       //CHECK IF EDITABLE
       if(true)
           return(
           <Popup
           trigger={ <button style={{float:"right",cursor:"help",display:"inline"}}>מחיקת רשימה</button>}
           modal
           closeOnDocumentClick>
          <form name="deleteList" onSubmit={this.handleSubmit}>
          <label style={{display:"inline-block"}}>
                Card Title:
               <select name= "deleteList" style={{display:"inline-block", width:"auto"}} onChange={this.handleChange}>
                   {this.makeSelectInput()}
               </select>
           </label>
                <input type="submit" value="Submit" /> 
           </form>  
         </Popup>)
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
                        deleteCard ={this.deleteCard}
                        />))}
          </div> 
          {this.addAble()}
          {this.deleteAble()}
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