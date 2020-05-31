import React, {Component} from 'react'
import {connect } from 'react-redux'
import axios from 'axios';
import { Link , BrowserRouter , useLocation  } from 'react-router-dom'; //link to different routs
import TestScheduler from '../operationSystem/countDownWindow/TestScheduler';
import { change_to_show_chosen_table_state , delete_chosen_table} from "../Actions";
import CountDownAddNewTablePopUp from './CountDownAddNewTablePopUp'; //the popup for create new table
import ConfirmDeletePopup from './ConfirmDeletePopup'; //the popup for confirm delete
import openSocket from 'socket.io-client';
import io from "socket.io-client";


class TablesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          DB_info : {},
          data_length:0,
          curr_permission:'', //the current user permission
        };
      }
   componentDidMount() {
    axios.get('http://localhost:5000/counts/') //GET REQUEST
      .then(response => {
      if (response.data.length===0)return;
      this.setState({ DB_info :response.data, data_length:response.data.length })
    })

    .catch((error) => { //catch errors 
      console.log(error);
    })
    //.removeItem("chosen_state") while exit edit/display
    try {
      const serializedState = localStorage.getItem("chosen_state"); 
      const login_info_state = localStorage.getItem("login_info");
      const chosen_state_id = localStorage.getItem("chosen_state_id"); 
      if (serializedState !== null ) {
        localStorage.removeItem("chosen_state") 
        //let chosen_state = JSON.parse(JSON.parse(serializedState ))
      }
      if (chosen_state_id !== null ) {
        localStorage.removeItem("chosen_state_id") 
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
    for (let i=0 ; i <  this.state.DB_info.length ; i++)
    {
      temp.push(<tr key={i}  ><th> {this.state.DB_info[i]._system_info_object.title} </th ><th >
        <div style={{ display:"flex"}} >
        {/* {this.state.curr_permission === "Admin" || this.state.curr_permission === "Editor" ||this.state.curr_permission === "Viewer " ?   */}
         <div style={{ display:"flex"}} >
        <Link to={"/display"}   onClick={()=>
          
        {this.props.dispatch(change_to_show_chosen_table_state
        (this.state.DB_info[i]._system_info_object));
        //craete local storage of the chosen table when path is '/display'  chosen_state
        try{
          const serializedState = JSON.stringify(this.state.DB_info[i]._system_info_object)
          const serializedStateID = JSON.stringify(this.state.DB_info[i]._id)
          localStorage.setItem("chosen_state", JSON.stringify(serializedState));
          localStorage.setItem("chosen_state_id", JSON.stringify(serializedStateID));
          // console.log(JSON.stringify(serializedState))
          }  
          catch(e){
          console.log(e)
          }   }
            
            }
          
          >display </Link>
          </div>
          {/* : null } */}
       {this.state.curr_permission === "Admin" ||   this.state.curr_permission === "Editor" ?
       <div style={{ display:"flex"}} >
      | <CountDownAddNewTablePopUp 
          new_or_edit={"edit"}
          chosen_table_title={this.state.DB_info[i]._system_info_object.title}
          trigger_name={"edit"}
          form_title={this.state.DB_info[i]._system_info_object.title + " :הינך רוצה לערוך  המערכת "}
          placeholder_before={this.state.DB_info[i]._system_info_object.hours_before_target} 
          placeholder_after={this.state.DB_info[i]._system_info_object.hours_after_target} 
          path={"/edit/"+this.state.DB_info[i]._id}
          link_name={" לחץ כאן לעריכה "}
          color={"#007bff"}
          data = {this.state.DB_info[i]._system_info_object}
          id = {this.state.DB_info[i]._system_info_object._id}
        />
        </div>
            : null }

      {this.state.curr_permission === "Admin" ?
        <div style={{ display:"flex"}} >
      
          |<Link to={"/list"}   onClick={()=>
            { 
              let newTable = this.state.DB_info[i]._system_info_object
              newTable.title = "copy "+  this.state.DB_info[i]._system_info_object.title
              // console.log(this.state.DB_info[i]._system_info_object)
              axios.post('http://localhost:5000/counts/add',  this.state.DB_info[i]._system_info_object)
              .then(res => console.log(res.data  )  )//promise, after its posted well console our the res.data
              alert("new table added: " +"\""+ newTable.title+"\"")
            }
          }
        >copy </Link>
      |<ConfirmDeletePopup id={this.state.DB_info[i]._id}/>
        </div>
      : null }

      </div>
         
    </th></tr>)
    }
    return temp
  }

    render(){

      return (
        
        <div style={{ width : "60%" , paddingLeft:"100px"}}>
            
        <h4 >Tables in the BD</h4>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th  >Table title</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody >
              <tr  >
                <td></td>
            </tr>
                {this.show_all_tables_fromDB()} 
          </tbody>
        </table>
        <CountDownAddNewTablePopUp 
          new_or_edit={"new"}
          chosen_table_title={''}
          trigger_name={"CREATE NEW TABLE"}
          form_title={"שם המערכת החדשה"}
          placeholder_before={"HH:MM"}
          placeholder_after={"HH:MM"} 
          path={"/system"}
          link_name={"צור טבלה חדשה "}
          color={"black"}
        />
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

