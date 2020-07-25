import React, {Component} from 'react'
import {connect } from 'react-redux'
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom'; //link to different routs
import NumberFormat from 'react-number-format';
import axios from 'axios';

class ConfirmDeletePopup extends Component {

constructor(props) {
    super(props);
} 
_delete_chosen_table(id){
    axios.delete('http://localhost:5000/counts/'+id)
    .then(response => { console.log(response.data)});
    this.setState({ 
      //db : this.state.DB_info.filter(el => el._id !== id),
      //data_length: this.state.data_length-1,
    }) 
    window.location = '/list';
  }
render(){

  return (
    <div >
      <Popup
        trigger={
        <div style={{color:"#007bff"}} 
        onMouseOver={(e) =>{ e.target.style.textDecorationLine= 'underline';e.target.style.fontWeight='bold';e.target.style.color="blue"} }
        onMouseOut={(e) =>{ e.target.style.textDecorationLine= null ; e.target.style.fontWeight=null ;  e.target.style.color="#007bff"}}
        >מחיקת פעילות </div> } 
        modal closeOnDocumentClick  contentStyle={{width:"auto", height:"auto"}}> 
        {close =>(
          <form >
            <label style={{fontSize: "19px" , color:"black", fontWeight:'bold'}} >
           ?האם ברצונך למחוק פעילות זו מהמערכת
            </label>

            <br></br>


            <Link to={"/"} style={{float:"left",fontSize:'20px',backgroundColor:'#d9d0d0',border:"1px solid",color:"black"}}
            onMouseOver={(e) =>{ e.target.style.fontSize='25px';e.target.style.fontWeight='bold';  } }
            onMouseOut={(e) =>{ e.target.style.fontSize= '20px' ; e.target.style.fontWeight=null;}}
            onClick={()=>null}>     
            לא </Link>  
  
            <Link to={"/delete/"+this.props.id} style={{ float:"right",fontSize:'20px', backgroundColor:'#d9d0d0',border:"1px solid",color:"black"}}
            onMouseOver={(e) =>{ e.target.style.fontSize='25px';e.target.style.fontWeight='bold';  } }
            onMouseOut={(e) =>{ e.target.style.fontSize= '20px' ; e.target.style.fontWeight=null ;}}
            onClick={()=>{this._delete_chosen_table(this.props.id)}}>     
            כן </Link>  
            <br></br>

            <a className="close" onClick={close} style={styles.close}>
            &times;
             </a>
    </form>)}
    
    </Popup> 
  </div>
          
    );
  }
}
const styles = {
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
  }
}


export default ConfirmDeletePopup 