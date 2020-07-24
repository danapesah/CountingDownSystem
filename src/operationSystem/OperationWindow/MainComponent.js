import React,{Component} from 'react'
import { connect  } from 'react-redux'
import OperationList from './OperationList'
import { deleteCardOperation,addRowOperation,deleteRowOperation,addCardOperation, addListOperation,deleteListOperation,changeCheckBoxStateOperation } from '../../Actions';
import Popup from "reactjs-popup";
import axios from 'axios'
import socket from "../../SystemManagement/socketConfig";

class MainWindow extends Component
{
    state = 
    {
        rowTitle:"",
        deleteRow:0,
        cardTitle:"",
        cardType:0,
        newCardListID:0,
        deleteListID:0
    }

    changeCheckBoxState =(cardID,listID,checkBoxID)=>
    {
      let login_info_state = localStorage.getItem("login_info");
      let chosen_info = JSON.parse(JSON.parse(login_info_state));

      if(chosen_info.permissions !== "Viewer")
      {
      this.props.dispatch(changeCheckBoxStateOperation(cardID,listID,checkBoxID));
      this.save_to_db()
      }
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
        copy_state.OperationList=this.props.lists
        copy_state.OperationRows=this.props.operationRows
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
    addRow =()=>
    {
        //CHECK IF EDITABLE
        if(window.location.pathname.search("display") == -1)
            return(
            <Popup
            trigger={ <div style={{float:"right",cursor:"help",color:"green",height:"auto",display:"inline", fontSize:"15px",fontWeight:'bold'}}> הוספת שורה +</div>}
            modal
            closeOnEscape
            repositionOnResize
            contentStyle={{width:"auto", height:"auto"}}
            closeOnDocumentClick>
            {close =>(
            <div >
            <form name="addRow" onSubmit={this.handleSubmit}>
                <label className="center" style={{float:"center", color:"black"}} >
                    :שם השורה
                    <input style={{textAlign:"right"}}  type="text" name="addRow" value={this.state.rowTitle} onChange={this.handleChange}/>
                </label>
                <br/>
                 <input  className="left" type="submit" value="אישור" /> 
            </form>  
            <button className="close" onClick={close} style={styles.close}>
            &times;
             </button>
            </div>
            )}
          </Popup>)
        else 
              return (null)
    }

    deleteRow =()=>
    {
        //CHECK IF EDITABLE
        if(window.location.pathname.search("display") == -1 && this.props.operationRows.length>0)
            return(
            <Popup
            trigger={ <div style={{float:"right",cursor:"help",color:"red",height:"auto",display:"inline", fontSize:"15px", paddingRight:"10px",fontWeight:'bold'}}> מחק שורה -</div>}
            modal
            closeOnEscape
            repositionOnResize
            contentStyle={{width:"auto", height:"auto"}}
            closeOnDocumentClick>
            {close =>(
            <div >
            <form name="deleteRow" onSubmit={this.handleSubmit}>
                <label  className="center" style={{float:"center", color:"black"}} >
           
                    <select name= "deleteRow" style={{display:"inline-block", width:"auto"}} onChange={this.handleChange}>
                    {this.props.operationRows.map((row,i)=>(<option style={{fontSize:"22px"}} key={i} value={i}>{row}</option>))}
                    </select>
                    :שם השורה
                </label>
                <br/>
                 <input  className="left" type="submit" value="אישור" /> 
            </form>  
            <a className="close" onClick={close} style={styles.close}>
            &times;
             </a>
            </div>
            )}
          </Popup>)
        else
            return (null)
    }

    handleChange=(event,listID)=>
    {
      if(event.target.name === 'addRow')
        this.setState({rowTitle: event.target.value})
      else if(event.target.name === 'deleteRow')
        this.setState({deleteRow: event.target.value})
      else if(event.target.name === 'cardTitle')
      {
        this.setState({cardTitle: event.target.value})
        this.setState({newCardListID: listID})
      }
      else if(event.target.name === 'cardType')
        this.setState({cardType: event.target.value})
      else if(event.target.name === 'deleteList')
        this.setState({deleteListID: event.target.value})
      else if(listID === 'closeWindow')
      {
        this.setState({cardTitle: ""})
        this.setState({newCardListID: 0})
        this.setState({cardType: 0})
        this.setState({deleteListID:0})
      }
      
    }

    handleSubmit =(event)=>
   {
       event.preventDefault();
      if(event.target.name === 'addRow')
      {
          this.props.dispatch(addRowOperation(this.state.rowTitle));
          this.setState({rowTitle:""})
      }
      if(event.target.name === 'deleteRow')
      {
          this.props.dispatch(deleteRowOperation(this.state.deleteRow));
          this.setState({deleteRow:0})
      }
      if(event.target.name === 'addCard')
      {
          this.props.dispatch(addCardOperation(this.state.newCardListID,this.state.cardTitle,this.state.cardType));
      }
      if(event.target.name === 'addList')
      {
          this.props.dispatch(addListOperation());
      }
      if(event.target.name === 'deleteList')
      {
          if(this.state.deleteListID >= this.props.lists.length)
          {
            this.props.dispatch(deleteListOperation(this.props.lists[0].listID));
            this.setState({deleteListID:0})
          }
          else
          {
            this.props.dispatch(deleteListOperation(this.props.lists[this.state.deleteListID].listID));
          }
          
      }
    
   }   

    deleteCard = (cardID,listID) =>
    {
        this.props.dispatch(deleteCardOperation(cardID,listID));
    }

    addList= () =>
    {
      if(window.location.pathname.search("display") == -1)
        return(<button name ="addList" style={{display:"inline", fontSize:"15px"}} onClick={this.handleSubmit}> הוספת קבוצה +</button>)
      else
        return (null)
    }

    deleteList= () =>
    {
      if(window.location.pathname.search("display") == -1 && this.props.lists.length>0)
        return(
        <Popup
            trigger={<button name ="deleteList" style={{display:"inline", fontSize:"15px"}} onClick={this.handleSubmit}>מחיקת קבוצה -</button>}
            modal
            closeOnEscape
            repositionOnResize
            contentStyle={{width:"auto", height:"auto"}}
            closeOnDocumentClick>
            {close =>(
            <div >
            <form name="deleteList" onSubmit={(event)=>this.handleSubmit(event,"closeWindow")}>
                <label style={{float:"center",color:"black"}} >
               
                    <select name= "deleteList" style={{display:"inline-block", width:"auto"}} onChange={this.handleChange} value={this.state.deleteListID}>
                    {this.props.lists.map((list,i)=>(<option style={{fontSize:"22px"}} key={i} value={i}>{i+1}</option>))}
                    </select>
                    :מספר רשימה
                </label><br/>
                 <input type="submit" value="אישור" /> 
            </form>  
            <a className="close" onClick={close} style={styles.close}>
            &times;
             </a>
            </div>
            )}
          </Popup>)
          else
              return(null)
    }
    render()
    {  
        const {lists} = this.props;
        const {operationRows} =this.props;
        return(
        <div>
        {this.addRow()}
        {this.deleteRow()}
        <div className="center">חלון אופרציה</div>
        <div>
        <div style={styles.lineContainer}>
            <p style={ {marginBottom:"10%"}}> שם משימה </p>
             {operationRows.map((row,i) =>(<div key={i} style={{marginTop:"11%"}}>{row}<br/></div>))}
        </div  >
        <div style={styles.listsContainer}>
        {lists.map(list => 
          ( <OperationList key ={list.listID} listID={list.listID} cards = {list.cards} 
                            deleteCard={this.deleteCard} handleChange={this.handleChange} handleSubmit={this.handleSubmit} changeCheckBoxState={this.changeCheckBoxState}  />))}
          {this.addList()}<br/>
          {this.deleteList()}
          </div> 
        </div>
        </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        lists: state.OperationWindowReducers.OperationList,
        operationRows: state.OperationWindowReducers.OperationRows,
    }
}

const styles = {
    listsContainer:
    {
     display:"inline",
     float:"right",
     margin:"auto",
    },
    lineContainer:
    {   
     width:"auto",
     float:"right",

     flexDirection:"column",
     marginTop:"3.5%",
    },
    close:
    {
      cursor: 'pointer',
      position: "absolute",
      display: "block",
      padding: "2px 5px",
      right: "-10px",
      top:"-10px",
      fontSize: "15px",
      background:" #ffffff",
      borderRadius: "18px",
      border: "1px solid #cfcece"
    },
    menuBar:
    {
        borderTop: "1px solid #cfcece",
        cursor: 'pointer',
        
    }

}
export default connect(mapStateToProps)(MainWindow)