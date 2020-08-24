import React, {Component} from 'react'
import {connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'; //link to different routs
import CountDownMainWindow from '../operationSystem/countDownWindow/CountDownMainWindow'
import { change_to_show_chosen_table_state , delete_chosen_table} from "../Actions"
import CountDownAddNewTablePopUp from './CountDownAddNewTablePopUp' //the popup for create new table
import ConfirmDeletePopup from './ConfirmDeletePopup' //the popup for confirm delete
// import openSocket from 'socket.io-client'
// import io from "socket.io-client"
import Spinner from "./Spinner"

class TablesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          DB_titles_id_info:null,
          data_length:0,
          curr_permission:'', //the current user permission
          spinner_on:true,
        };
      }
   componentDidMount() {
    axios.get('http://localhost:5000/counts/title-id') //GET REQUEST
    .then(response => {
      //console.log(response.data)
    this.setState({ 
      DB_titles_id_info: response.data,
      data_length: response.data.length,
     spinner_on:false, 
    })
  }).catch((error) => { //catch errors 
    console.log(error);
  })

    //removeItem("chosen_state") while exit edit/display
    try {
      const serializedState = localStorage.getItem("chosen_state"); 
      const login_info_state = localStorage.getItem("login_info"); 
      const serializedStateID = localStorage.getItem("chosen_state_id");
      const edit_state_id = localStorage.getItem("edit_state_id");
      if (serializedStateID !== null ) {
        localStorage.removeItem("chosen_state_id") 
      }
      if (serializedState !== null ) {
        localStorage.removeItem("chosen_state") 
      }
      if (edit_state_id !== null ) {
        localStorage.removeItem("edit_state_id") 
      }
      if(login_info_state !== null)
      {
        let chosen_info = JSON.parse(JSON.parse(login_info_state ))
        this.setState({ curr_permission: chosen_info.permissions })
      }
     
    } catch (err) {
      return err;
    }

  }


  show_all_tables_fromDB(){
  let temp=[]
  if (this.state.DB_titles_id_info)
  {
    for (let i=0 ; i <  this.state.data_length ; i++)
    {
      temp.push(<tr key={i}><th style={{ display:"inline-block" }} >
        <div style={{ display:"flex" }} >

        {this.state.curr_permission === "Admin" ?
        <div style={{ display:"flex",cursor:'pointer'}} >
        <ConfirmDeletePopup id={this.state.DB_titles_id_info[i].id}/> | 
        <Link to={"/list"} onClick={()=>
        { 
          axios.post('http://localhost:5000/counts/copy/'+this.state.DB_titles_id_info[i].id)
          .then(res => console.log(res.data))
        }
        }
        >העתקת פעילות  </Link>
       | </div>
       : null }
          
      <div style={{ display:"flex", color: "#007bff" ,cursor:'pointer' }} 
       onClickCapture={(e)=>this.search_table_and_save_to_local_storage(i)}
       onMouseOver={(e) =>{ e.target.style.textDecorationLine= 'underline';e.target.style.fontWeight='bold';e.target.style.color="blue"}}
       onMouseOut={(e) =>{ e.target.style.textDecorationLine= null ; e.target.style.fontWeight=null ;  e.target.style.color="#007bff"}}
      >      הצגת פעילות
        </div>
       {this.state.curr_permission === "Admin" || this.state.curr_permission === "Editor" ?
       <div style={{ display:"flex",cursor:'pointer'}} >
      | <CountDownAddNewTablePopUp  
          new_or_edit={"edit"}
          chosen_table_title={this.state.DB_titles_id_info[i].title}
          trigger_name={"עריכת פעילות"}
          form_title={this.state.DB_titles_id_info[i].title + " : עריכת פעילות "}
          path={"/edit/"+this.state.DB_titles_id_info[i].id}
          link_name={" לחץ כאן לעריכה "}
          color={"#007bff"}
          id = {this.state.DB_titles_id_info[i].id }
        />
        
        </div>
            : null }


      </div>
     
    </th><th>{this.state.DB_titles_id_info[i].title}</th></tr>)
    }
    return temp
  }
}
search_table_and_save_to_local_storage(i)
{
  axios.get('http://localhost:5000/counts/search/'+this.state.DB_titles_id_info[i].id)
  .then(res =>{
    this.props.dispatch(change_to_show_chosen_table_state(res.data._system_info_object))
      //create local storage of the chosen table when path is '/display'  chosen_state
      try{
        const serializedState = JSON.stringify(res.data._system_info_object)
        const serializedStateID = JSON.stringify(this.state.DB_titles_id_info[i].id)
        localStorage.setItem("chosen_state", JSON.stringify(serializedState));
        localStorage.setItem("chosen_state_id", JSON.stringify(serializedStateID));
        }  
        catch(e){
        console.log(e)
        } 
      window.location.pathname="/display"
      })
}

    render(){
      

      return (
   
        <div style={{ width : "60%", marginLeft:"30%"}}>
          {this.state.spinner_on === true ? 
        <div style={{ width : "60%", marginLeft:"30%"}}>
          <Spinner/>
        </div>
        :
        <div style={{cursor: 'pointer'}}>
        
        
        <h4  style={{textAlign:"center"}} >רשימת כל הפעילויות</h4>
        <table  className="table"  style={{textAlign:"center"}}  >
          <thead className="thead-light">
            <tr>
              <th>פעולה</th>
              <th>שם פעילות</th>
            </tr>
          </thead>
          <tbody >
              <tr  >
                <td></td>
            </tr>
                {this.show_all_tables_fromDB()} 
          </tbody>
        </table>
        {this.state.curr_permission === "Admin" ?
        <CountDownAddNewTablePopUp 
          new_or_edit={"new"}
          chosen_table_title={''}
          trigger_name={"הוספת פעילות חדשה"}
          form_title={"שם פעילות החדשה"}
          placeholder_before={"HH:MM"}
          placeholder_after={"HH:MM"} 
          path={"/system"}
          link_name={"צור פעילות חדשה "}
          color={"black"}
        />
        :null}
        </div>
        }
           
      </div>
      );
    }
}
const mapStateToProps = (state)=> ({
  // resources: state.CountDownWindowReducers.CountDownlists.resources,
  // events: state.CountDownWindowReducers.CountDownlists.events,
//  CountDownlists:state.CountDownlists,

})
export default connect(mapStateToProps)(TablesList) ;

