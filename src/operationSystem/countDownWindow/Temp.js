import React, {Component} from 'react'
import {connect } from 'react-redux'
import axios from 'axios';
import { Link , BrowserRouter , useLocation  } from 'react-router-dom'; //link to different routs
import TestScheduler from './TestScheduler';
import { change_to_show_chosen_table_state , set_new_table, delete_chosen_table} from "../../Actions";
import Popup from "reactjs-popup";

class Temp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          length_res:0, 
          arr_title :[],
          arr_resources:[],
          arr_events:[],
          arr_tableID:[],

        
        };
       //this.onClick = this.onClick.bind(this);
      }
      componentDidMount() {
        axios.get('http://localhost:5000/counts/') //GET REQUEST
          .then(response => {
          if (response.data.length===0)return;
          let arr_temp_title= []
          let arr_temp_resources= []
          let arr_temp_events= []
          let arr_temp_tableID=[]
          for (let i=0 ; i< response.data.length ; i++)
          {
            arr_temp_title[i]=  response.data[i].c.title
            arr_temp_resources[i] =response.data[i].c.resources
            arr_temp_events[i] =response.data[i].c.events
            arr_temp_tableID[i]=response.data[i]._id
          }
         // console.log(arr_temp_tableID)
          this.setState({ 
            arr_tableID:[...arr_temp_tableID]  ,
            arr_title : [...arr_temp_title ],
            arr_resources : [...arr_temp_resources ],
            arr_events : [...arr_temp_events ],
            length_res: response.data.length,
          }) 
        })
          
        .catch((error) => { //catch errors 
          console.log(error);
        })
   
      }
    
      _delete_chosen_table(id,i){
        let arr_temp_title= []
        let arr_temp_resources= []
        let arr_temp_events= []
        let arr_temp_tableID=[]
        let tempLength = this.state.length_res-1

        if (this.state.length_res!==1 )
        {
          for (let index=0 ; index< this.state.length_res ; index++)
          {
            if(index<i) 
            {
              arr_temp_title[index]=  this.state.arr_title[index]
              arr_temp_resources[index] =this.state.arr_resources[index]
              arr_temp_events[index] =this.state.arr_events[index]
              arr_temp_tableID[index]=this.state.arr_tableID[index]
            }
            if(index >= i)
            {
              arr_temp_title[index]=  this.state.arr_title[index+1]
              arr_temp_resources[index] =this.state.arr_resources[index+1]
              arr_temp_events[index] =this.state.arr_events[index+1]
              arr_temp_tableID[index]=this.state.arr_tableID[index+1]
            }
          }
     
        }
        axios.delete('http://localhost:5000/counts/'+id)
        .then(response => { console.log(response.data)});
        this.setState({ 
          arr_tableID:[...arr_temp_tableID]  ,
          arr_title : [...arr_temp_title ],
          arr_resources : [...arr_temp_resources ],
          arr_events : [...arr_temp_events ],
          length_res: tempLength,
        }) 
      }

 
      show_all_tables_fromDB(){
        let temp=[]
        for (let i=0 ; i <  this.state.length_res ; i++)
        {
          temp.push(<tr key={i} ><th> {this.state.arr_tableID[i]} </th><th>
            | <Link to={"/user"}  onClick={()=>
              
               {this.props.dispatch(change_to_show_chosen_table_state(this.state.arr_resources[i], this.state.arr_events[i]))}} 
              
              > display </Link>

              
            | <Link to={"/edit/"+this.state.arr_tableID[i]} 
              
            onClick={()=>
              
              {this.props.dispatch(change_to_show_chosen_table_state(this.state.arr_resources[i], this.state.arr_events[i]))}} 
       
            >edit </Link>
           

          |  <a  
          onClick=
          {() =>
            
            {this._delete_chosen_table(this.state.arr_tableID[i],i) }
          }
            href="#"
            > delete </a> 
            
        </th></tr>)

        }
        return temp
      }

      render(){
  
        return (
          <div>

            {/* <Popup
                  trigger={<button className="button">lala</button>}
                  modal
                  closeOnDocumentClick>
                {/* <form onSubmit={null}> */}
                      {/* <label >
                          האם אתה בטוח שאתה למחוק את הטבלה 
                      </label> */}
                      {/* <input type="submit" value="לא" onChange={null}  />  */}
                  {/* </form>   */}

                  {/* <form onSubmit={null}>
                    
                          <input type="submit" value="כן"  />
                      
                  </form>  
                  <form onSubmit={null}>
                    
                    <input type="submit" value="לא"  />
                
            </form> </Popup> */}

          <h4 >Tables in the BD</h4>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Table title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td></td>
              </tr>
                 {this.show_all_tables_fromDB()} 
            </tbody>
          </table>

         <Link to={"/user"} style={{backgroundColor:'lightblue'}} 
          onClick={() =>{ 
          
          
            this.props.dispatch(set_new_table() )} }
          >  add new table </Link>
  
        </div>
        );
        }
}
const mapStateToProps = (state)=> ({
  resources: state.CountDownlists.resources,
  events: state.CountDownlists.events,
  CountDownlists:state.CountDownlists,

})
export default connect(mapStateToProps)(Temp) ;

