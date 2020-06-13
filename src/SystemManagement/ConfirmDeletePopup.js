import React, {Component} from 'react'
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom'; //link to different routs
import axios from 'axios';

class ConfirmDeletePopup extends Component {

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
        >מחיקת ניסוי </div> } 
        modal closeOnDocumentClick  contentStyle={{width:"auto", height:"auto"}}> 
        {close =>(
          <form >
            <label style={{fontSize: "19px" , color:"black", fontWeight:'bold'}} >
           ?האם ברצונך למחוק ניסוי זה מהמערכת
            </label>

            <br></br>

            <Link to={"/"} style={{float:"left" , backgroundColor : "blue" ,fontSize:'20px', color:'black'}}
            onMouseOver={(e) =>{ e.target.style.fontSize='25px';e.target.style.fontWeight='bold'; e.target.style.backgroundColor= "red"  } }
            onMouseOut={(e) =>{ e.target.style.fontSize= '20px' ; e.target.style.fontWeight=null ; e.target.style.backgroundColor= "blue"}}
            onClick={()=>null}>     
            לא </Link>  
  
            <Link to={"/delete/"+this.props.id} style={{ float:"right", backgroundColor : "blue" ,fontSize:'20px', color:'black'}}
            onMouseOver={(e) =>{ e.target.style.fontSize='25px';e.target.style.fontWeight='bold'; e.target.style.backgroundColor= "red"  } }
            onMouseOut={(e) =>{ e.target.style.fontSize= '20px' ; e.target.style.fontWeight=null ; e.target.style.backgroundColor= "blue"}}
            onClick={()=>{this._delete_chosen_table(this.props.id)}}>     
            כן </Link>  
            <br></br>
     
    </form>)}
    
    </Popup> 
  </div>
          
    );
  }
}


export default ConfirmDeletePopup 