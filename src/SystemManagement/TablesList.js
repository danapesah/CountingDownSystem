import React, {Component} from 'react'
import {connect } from 'react-redux'
import axios from 'axios';
import { Link , BrowserRouter , useLocation  } from 'react-router-dom'; //link to different routs
import TestScheduler from '../operationSystem/countDownWindow/TestScheduler';
import { change_to_show_chosen_table_state , set_new_table, delete_chosen_table} from "../Actions";
import CountDownAddNewTablePopUp from './CountDownAddNewTablePopUp'; //the popup for create new table
import ConfirmDeletePopup from './ConfirmDeletePopup'; //the popup for confirm delete

class TablesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          DB_info : {},
          data_length:0,
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
    
  }


  show_all_tables_fromDB(){
    let temp=[]
    for (let i=0 ; i <  this.state.DB_info.length ; i++)
    {
      temp.push(<tr key={i}  ><th> {this.state.DB_info[i]._system_info_object.title} </th ><th >
        <div style={{ display:"flex"}} >
         <Link to={"/display"}   onClick={()=>
          
            {this.props.dispatch(change_to_show_chosen_table_state
            (this.state.DB_info[i]._system_info_object))}}
          
          >display </Link>


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


        |<ConfirmDeletePopup id={this.state.DB_info[i]._id}/>


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
          trigger_name={"CREAT NEW TABLE"}
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
  resources: state.CountDownlists.resources,
  events: state.CountDownlists.events,
//  CountDownlists:state.CountDownlists,

})
export default connect(mapStateToProps)(TablesList) ;

