import React, {Component} from 'react';
import {connect } from 'react-redux'
import Popup from "reactjs-popup";
import { addEventCountDown } from "../../Actions";
import NumberFormat from 'react-number-format';
class countDownAddEventButton extends Component
{
    state={
        title:"",
        startHour:"",
        startHourDefiner:"-",
        endHour:"",
        endHourDefiner:"-",
        comments:"",
        entity:"0",

    }

    timeValidator =(inputTime) =>
    {
        if(inputTime!= "" ||inputTime != null)
        {
        let hourInput = parseInt(inputTime.substring(1,3));
        let minInput = parseInt(inputTime.substring(4));
        if(inputTime[0] == "-")
        {
            let hourBefore = parseInt(this.props.hours_before_target.substring(0,2));
            let minBefore  = parseInt(this.props.hours_before_target.substring(3));
            return ((hourBefore == hourInput && minInput == 0) || (hourInput<hourBefore && minInput<60))

        }
        if(inputTime[0] == "+")
        {
            let hourafter = parseInt(this.props.hours_after_target.substring(0,2));
            let minafter  = parseInt(this.props.hours_after_target.substring(3));
             return ((hourInput == hourafter && minInput == 0) || (hourInput<hourafter && minInput<60))
        }
    }
    }
  
    InputValidation =()=>
    {
        let startHour = this.state.startHourDefiner+this.state.startHour;
        let endHour = this.state.endHourDefiner+this.state.endHour;
        if(this.timeValidator(startHour) && this.timeValidator(endHour) && this.state.title !="") 
             return <input className="left" type="submit" value="אישור" />  
    }    

    handleChange=(event)=>
    {
        if(event.target.name === 'title')
            this.setState({title: event.target.value})
        else if(event.target.name === 'startHour')
            this.setState({startHour: event.target.value})
        else if(event.target.name === 'endHour')
            this.setState({endHour: event.target.value})
        else if(event.target.name === 'comments')
            this.setState({comments: event.target.value})
        else if(event.target.name === 'entity')
            this.setState({entity: event.target.value})
        else if(event.target.name === 'startHourDefiner')
            this.setState({startHourDefiner: event.target.value})
        else if(event.target.name === 'endHourDefiner')
            this.setState({endHourDefiner: event.target.value})

    }

     handleSubmit =(event)=>
     {
         event.preventDefault();
         if(this.state.entity == "")
            this.state.entity=this.props.lists[0].key;
       
        let startHour = this.state.startHourDefiner+this.state.startHour;
        let endHour = this.state.endHourDefiner+this.state.endHour;
        this.props.dispatch(addEventCountDown(this.state.title,startHour,endHour,this.state.comments, this.state.entity));
        this.setState({title:"",
        startHour:"",
        startHourDefiner:"-",
        endHour:"",
        endHourDefiner:"-",
        comments:"",
        entity:"0",})
     }   

     makeSelectInput =()=>
     {
         let inputResourceArray=[];
         for(let i=0;i<this.props.lists.length;i++)
         {
            inputResourceArray.push(<option style={{fontSize:"22px"}}key={i} value={this.props.lists[i].key}>{this.props.lists[i].title}</option>)
         }
         return inputResourceArray;
     }

    render()
    {

        let leftPlace=50+this.props.lists.length*140;
        if(window.location.pathname.search("display") == -1 && this.props.lists.length>0)       
        return(
  
        <Popup
        trigger={<button style={{position:"absolute", width:"50px", height:"50px",textAlign:"center",fontSize:"13px"}}className="button">הוספת אירוע  </button>}
        modal
        closeOnDocumentClick>
          {close =>(
              <div>
       <form className="center"  onSubmit={this.handleSubmit}>
     
            
        <label style={{width:"auto",color:"black"}}>
            :שם אירוע
            <input style={{ display:"inline-block", textAlign:"right"}}  type="text" name="title" onChange={this.handleChange} value={this.state.title}/>
        </label>
        <br/>

        <label style={{display:"inline-block" , color:"black"}}>
            
            <select name= "entity" style={{display:"inline-block", width:"150px"}} onChange={this.handleChange} value={this.state.entity}>
                {this.makeSelectInput()}
                </select>
            :בחירת עמודה
        </label>

        <br/>
        
        <select name= "endHourDefiner" style={{display:"inline-block", width:"auto"}} onChange={this.handleChange} value={this.state.entity}>
        <option style={{fontSize:"22px"}}key="start-" value="-">-</option>
        <option style={{fontSize:"22px"}}key="start+" value="+">+</option>
        </select>
        <label style={{color:"black", paddingRight:"50px" }}>
                <NumberFormat  name="endHour" format="##:##"  value={this.state.endHour} placeholder="HH:MM" mask={['H', 'H', 'M', 'M']} style={{width:"100px",color:"black"}} onChange={this.handleChange} required/>
                  שעת סיום
        </label>

        <select name= "startHourDefiner" style={{display:"inline-block", width:"auto"}} onChange={this.handleChange} value={this.state.entity}>
        <option style={{fontSize:"22px"}}key="start-" value="-">-</option>
        <option style={{fontSize:"22px"}}key="start+" value="+">+</option>
        </select>
        <label style={{color:"black" }}>
                <NumberFormat  name="startHour" format="##:##"  value={this.state.startHour} placeholder="HH:MM" mask={['H', 'H', 'M', 'M']} style={{width:"100px",color:"black"}} onChange={this.handleChange} required/>
                  :שעת התחלה
        </label>
    
            <textarea style={{ textAlign:"right"}}   name="comments" onChange={this.handleChange} placeholder={"הערות נוספות"} value={this.state.comments}/>
            {this.InputValidation()}
        </form>  
        <a className="close" onClick={close} style={styles.close}>
            &times;
             </a>
             </div>)}
      </Popup>
        )
        else
        return null;
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
    lists: state.CountDownWindowReducers.CountDownlists.resources,
    events: state.CountDownWindowReducers.CountDownlists.events,
    CountDownlists:state.CountDownWindowReducers.CountDownlists,
    hours_before_target: state.MainWindowReducers.hours_before_target,
    hours_after_target: state.MainWindowReducers.hours_after_target
  })

export default connect(mapStateToProps)(countDownAddEventButton)