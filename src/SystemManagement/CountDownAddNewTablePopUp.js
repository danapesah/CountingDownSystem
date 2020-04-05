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
   // console.log("state:  " , this.state)
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
    
        if(this.state.up_count[i]=== 'M' || this.state.up_count[i]=== 'Y' || 
            this.state.down_count[i]=== 'M' || this.state.down_count[i]=== 'Y'  )
          { 
            flag=0
          }
          else{flag=1}
      }
      
    }
  }
  if(this.props.new_or_edit==="edit")
  {
  //  console.log(this.state)

    
    // if(this.state.title ==='' )
    // {

    //   alert("do you want to save the mane")
    //  // this.setState({title: this.props.chosen_table_title})
    // }
    // 
    // if(this.state.up_count.length===5 && this.state.down_count.length===5  )
    // { console.log(this.state)
    //   for (let i =0; i < 5 ; i++){
    
    //     if(this.state.up_count[i]=== 'M' || this.state.up_count[i]=== 'Y' || 
    //         this.state.down_count[i]=== 'M' || this.state.up_count[i]=== 'Y'  )
    //       { 
    //         flag=0
    //       }
    //       else{flag=1}
    //   }

    // }
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
        contentStyle={{width:"auto", height:"auto",backgroundColor:"#007bff" }}
        >
 
        {close =>(
          <form >
            <label style={{paddingLeft:"120px",color:"black" }} >
            {this.props.form_title}

            <input type="text"  value = {this.state.title} onChange={(event)=>{this.set_title(event)}} />
            
            </label>
            <br></br>

            <label style={{paddingLeft:"120px", color:"black" }}>
                <NumberFormat  name="startHour" format="##:##" placeholder={this.props.placeholder_before} 
                
                mask={['M', 'M', 'Y', 'Y']}   
              
              onChange={(event)=>this.set_num_of_down_count(event)}  style={{width:"100px",color:"black"}}/>
              שעות לפני הספירה
            </label>

            <br></br> 
            <label style={{paddingLeft:"120px" , color:"black"}}>
              <NumberFormat name="startHour" format="##:##" placeholder={this.props.placeholder_after} 
              mask={['M', 'M', 'Y', 'Y']} onChange={(event)=>this.set_num_of_up_count(event)}  style={{width:"100px", color:"black"}}/>
             שעות אחרי הספירה

            </label>

            <br></br>
         { this.check_input()  === "invalid_input" ? null: 
          this.props.new_or_edit==="new" ? 
        
            
          <Link to={this.props.path} style={{backgroundColor:'lightblue'}}      
          onClick={() =>{ 
           this.props.dispatch(set_new_table(this.state.title,this.state.down_count,this.state.up_count) )  
          } } >
         {this.props.link_name}  </Link>    
        : 
        
        <Link to={this.props.path} style={{backgroundColor:'lightblue'}}      
        onClick={() =>{ 
          this.props.dispatch(change_to_show_chosen_table_state(this.props.data));
          this.props.dispatch(edit_title_hours(this.state.title,this.state.down_count,this.state.up_count,this.props.id) )  

        // this.props.dispatch(save_new_table_state(this.props.id) )  
        } } >
       {this.props.link_name}  </Link>    
        
        }
    
          



    </form>)}</Popup> 
  </div>
          
    );
  }
}

const mapStateToProps = (state)=> ({
    lists: state.CountDownlists.resources,
    events: state.CountDownlists.events
})
export default connect(mapStateToProps)(CountDownAddNewTablePopUp) ;