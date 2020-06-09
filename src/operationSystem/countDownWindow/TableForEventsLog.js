
import React, {Component} from 'react'
import {connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
//creating the table for the events log in the countdowm window
//has errors

class TableForEventsLog extends Component {


create_table_columns(){
  let arr_column = []
  let length = 4
  for(let  index= 0 ; index < length  ; index++ )
  {
    arr_column.push(<th key={index}><label style={{color:"black", width:"100px"}}>{length-index} הכנס שם עמודה
    <input type="text" style={{textAlign:"right"}}/></label></th>)
  }
    return arr_column;

}

create_table_rows()
{
    let arr_rows = []
    let length = 4
    for(let  index= 0 ; index < length  ; index++ )
    {
        arr_rows.push(
        <tr key={index} >
        <td>
            <label style={{color:"black"}} >
                הכנס אירוע
            <input type="text"  />
            </label>
        </td>
        <td>
            <label style={{color:"black"}} >
            הכנס אירוע
            <input type="text"/>
            </label>
        </td>
        <td>
            <label style={{color:"black"}} >
            הכנס אירוע
            <input type="text"/>
            </label>
        </td>
        <td>
            <label style={{color:"black"}} >
            הכנס אירוע
            <input type="text"/>
            </label>
        </td>
        <td>{index+1}</td>
        </tr>)
    }
        return arr_rows;
  

}


createEventsLogTable1()
{
     return(
      <div style={{backgroundColor: "#66c2ff",position:"absolute", top:"50px"}} >
        <Table striped bordered hover size="md">
        <thead>{this.create_table_columns()}</thead>

        <tbody>
        {this.create_table_rows()}
        </tbody>
        </Table>
        </div>
    )
}
   

render(){

 return (
    <div>
    {this.createEventsLogTable1()}

</div>)
}


}
const mapStateToProps = (state)=> ({
    // lists: state.CountDownlists.resources,
    // events: state.CountDownlists.events

})
export default connect(mapStateToProps)(TableForEventsLog) ;


{/* <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table> */}