import React,{Component} from 'react'
import { connect  } from 'react-redux'
import StatusList from './StatusList'
import Popup from "reactjs-popup";
import { deleteButtonFieldStatus, addButtonFieldStatus ,addCardFieldStatus, deleteCardFieldStatus,deleteListFieldStatus, addListFieldStatus,changeColorButtonFieldStatus } from "../../Actions";
import axios from 'axios'
import socket from "../../SystemManagement/socketConfig";

class MainComponent extends Component
{
    state=
    {
        deleteList:0,
        addListTitle:"",
    }
    
save_to_db(){
    //save to the db after the state changed
    if(window.location.pathname ==='/display')
    {
    
        try {
          let chosen_state_id=null
          const serializedStateID = localStorage.getItem("chosen_state_id");
          const serializedState = localStorage.getItem("chosen_state"); 
          if (serializedStateID !== null ) 
          {
    
            chosen_state_id = JSON.parse(JSON.parse(serializedStateID ))
            let copyState = JSON.parse(JSON.parse(serializedState ))
            let copy_state={...copyState}
            copy_state.StatusList=this.props.lists
            axios.post('http://localhost:5000/counts/edit/' + chosen_state_id, copy_state)
            .then(res => console.log(res.data)).
            finally (function (){
            socket.emit("update_message" ,copy_state,chosen_state_id)
            })
                
    
            
            return 0
          }
          
        }
        catch (err) 
        {
          console.log(err)
          return -1
        }
      }
    }

    handleChange =(event)=>
    {
        if(event.target.name === "deleteList")
            this.setState({deleteList: event.target.value})
        if(event.target.name === "addList")
            this.setState({addListTitle: event.target.value})
       
    }

    handleSubmit =(event)=>
    {
        event.preventDefault();
        if(event.target.name === "deleteList")
        {
            if(this.state.deleteList >= this.props.lists.length)
            {
              this.props.dispatch(deleteListFieldStatus(this.props.lists[0].listID));
              this.setState({deleteListID:0})
            }
            else
            {
              this.props.dispatch(deleteListFieldStatus(this.props.lists[this.state.deleteList].listID));
            }
        }
        else if(event.target.name === "addList")
            this.props.dispatch(addListFieldStatus(this.state.addListTitle));
       
   }   


   changeColor =(cardID,buttonid,listID)=>
   {     
        let login_info_state = localStorage.getItem("login_info");
        let chosen_info = JSON.parse(JSON.parse(login_info_state));

        if(chosen_info.permissions !== "Viewer")
        {
            this.props.dispatch(changeColorButtonFieldStatus(cardID,buttonid,listID))
            this.save_to_db()
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
        if(window.location.pathname.search("display") == -1)
            return(
            <Popup
            trigger={ <button style={{float:"right",width:"auto",height:"auto", marginLeft:"5px", marginRight:"5px"}}>הוספת רשימה</button>}
            modal
            closeOnDocumentClick
            contentStyle={{width:"auto", height:"auto"}}>
           <form name="addList" onSubmit={this.handleSubmit}  >
                <label className="center" style={{color:"black"}} >
                :שם הרשימה
                    <input style={{textAlign:"right"}}  type="text" name="addList" onChange={this.handleChange} />
                </label>
                <br/>
                 <input className="left" type="submit" value="אישור" /> 
            </form>  
          </Popup>)
        else
            return (null)

    }
    

    makeSelectInput =()=>
    {
        let inputListArray=[];
        this.props.lists.map((list,i)=>{
        inputListArray.push(<option style={{fontSize:"22px"}} key={i} value={i}>{list.listTitle}</option>)})
        return inputListArray;
        
   }
   deleteAble =()=>
   {
       //CHECK IF EDITABLE
       if(window.location.pathname.search("display") == -1 && this.props.lists.length>0)
           return(
           <Popup
           style={{width:"20px"}}
           trigger={ <button style={{float:"right",cursor:"help",display:"inline"}}>מחיקת רשימה</button>}
           modal
           contentStyle={{width:"auto", height:"auto"}}
           closeOnDocumentClick>
          <form name="deleteList" onSubmit={this.handleSubmit}>
          <label style={{display:"inline-block", float:"right", color:"black"}}>
             
               <select name= "deleteList" style={{display:"inline-block", width:"auto"}} onChange={this.handleChange} value={this.state.deleteList}>
                   {this.makeSelectInput()}
               </select>
               :שם כרטיס
           </label>
           <br/><br/>
                <input className="left"  type="submit" value="אישור" /> 
           </form>  
         </Popup>)
         else
            return (null);
   }

    render()
    {  
        const {lists} = this.props;
        return(
        <div>
        <div className ="center"> חלון סטטוס שדה</div>
        
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
        lists: state.FieldStatusReducers.StatusList,
     
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