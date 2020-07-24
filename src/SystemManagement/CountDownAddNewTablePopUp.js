//popup for the 'create new table' btm

import React, {Component} from 'react'
import {connect } from 'react-redux'
import Popup from "reactjs-popup";
import NumberFormat from 'react-number-format';
import {set_new_table, edit_title_hours, change_to_show_chosen_table_state} from "../Actions";
import { Link } from 'react-router-dom'; //link to different routs

class CountDownAddNewTablePopUp extends Component {

constructor(props) {
    super(props);
    this.state = {
      title: this.props.chosen_table_title, // the name of the new table  
      up_count: this.props.placeholder_after, //numbers of up hours
      down_count:this.props.placeholder_before,//numbers of down hours
    };
} 
set_title(event){
    this.setState({title: event.target.value})
}
set_num_of_up_count(event){
    this.setState({up_count: event.target.value})
}
set_num_of_down_count(event){
  this.setState({down_count: event.target.value})
}
check_input() //check if the input is valid
{
  let flag = 0
  if(this.props.new_or_edit==="new")
  {
    if(this.state.up_count.length===5 && this.state.down_count.length===5 && this.state.title !=='' )
    {
      for (let i =0; i < 5 ; i++){
    
        if(this.state.up_count[i]=== 'H' || this.state.up_count[i]=== 'M' || 
            this.state.down_count[i]=== 'H' || this.state.down_count[i]=== 'M'  )
          { 
            flag=0
          }
          else{flag=1}
      }
      
    }
  }
  if(this.props.new_or_edit==="edit")
  {

    flag=1
  }

  if(flag===1)
    return "valid_input"
  if(flag===0)
    return "invalid_input"

}

render(){

  return (
    <div>
      <Popup
        trigger={<div  style={{color: this.props.color }}
        onMouseOver={(e) =>{ e.target.style.textDecorationLine= 'underline';e.target.style.fontWeight='bold';e.target.style.color="blue"} }
        onMouseOut={(e) =>{ e.target.style.textDecorationLine= null ; e.target.style.fontWeight=null ;  e.target.style.color= this.props.color}} 
        >{this.props.trigger_name}</div>}
        modal closeOnDocumentClick 
        contentStyle={{width:"auto", height:"auto"}}
        >
 
        {close =>(
          <form >
            <label style={{paddingLeft:"120px",color:"black" }} >
            {this.props.form_title}

            <input style={{textAlign:"right"}} type="text"  value = {this.state.title} onChange={(event)=>{this.set_title(event)}} />
            
            </label>
            <br></br>

            <label style={{paddingLeft:"120px", color:"black" }}>
                <NumberFormat  name="startHour" format="##:##" placeholder={this.props.placeholder_before} 
                
                mask={['H', 'H', 'M', 'M']}   
              
              onChange={(event)=>this.set_num_of_down_count(event)}  style={{width:"100px",color:"black"}}/>
              שעות לפני הספירה
            </label>

            <br></br> 
            <label style={{paddingLeft:"120px" , color:"black"}}>
              <NumberFormat name="startHour" format="##:##" placeholder={this.props.placeholder_after} 
              mask={['H', 'H', 'M', 'M']} onChange={(event)=>this.set_num_of_up_count(event)}  style={{width:"100px", color:"black"}}/>
             שעות אחרי הספירה

            </label>

            <br></br>
         { this.check_input()  === "invalid_input" ? null: 
          this.props.new_or_edit==="new" ? 
        
            
          <Link to={this.props.path} style={{backgroundColor:'#d9d0d0',border:"1px solid",color:"black"}}      
          onClick={() =>{ 
           this.props.dispatch(set_new_table(this.state.title,this.state.down_count,this.state.up_count) )  
          } } >
         {this.props.link_name}  </Link>    
        : 
        
        <Link to={this.props.path} style={{backgroundColor:'#d9d0d0',border:"1px solid",color:"black"}}      
        onClick={() =>{ 
          this.props.dispatch(change_to_show_chosen_table_state(this.props.data));
          this.props.dispatch(edit_title_hours(this.state.title,this.state.down_count,this.state.up_count,this.props.id) ) 
         try{
             //create local storage of the chosen table when path is  '/edit'  that saves a copy of the table
         let chosen_state = {...this.props.data}
         chosen_state.title= this.state.title
         chosen_state.hours_before_target= this.state.down_count
         chosen_state.hours_after_target= this.state.up_count

          const serializedState = JSON.stringify(chosen_state)
          localStorage.setItem("chosen_state", JSON.stringify(serializedState));

          const serializedStateID = JSON.stringify(this.props.id)
          localStorage.setItem("edit_state_id",  JSON.stringify(serializedStateID));

          }  
          catch(e){
          console.log(e)
          }

        // this.props.dispatch(save_new_table_state(this.props.id) )  
        } } >
       {this.props.link_name}  </Link>    
        
        }
    
          


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

const mapStateToProps = (state)=> ({
  
})
export default connect(mapStateToProps)(CountDownAddNewTablePopUp) ;