import React, {Component} from 'react';
import {connect } from 'react-redux'
import Popup from "reactjs-popup";
import { addEventCountDown } from "../../Actions";
class countDownAddEventButton extends Component
{
    state={
        title:"",
        startHour:"",
        endHour:"",
        comments:"",
        entity:"0",

    }

    timeValidator =(inputTime) =>
    {
        let hourInput = parseInt(inputTime.substring(1,3));
        let minInput = parseInt(inputTime.substring(4));
        if(inputTime[0] == "-")
        {
            let hourBefore = parseInt(this.props.hours_before_target.substring(0,2));
            let minBefore  = parseInt(this.props.hours_before_target.substring(3));
             return (hourInput<=hourBefore && minInput<60)

        }
        if(inputTime[0] == "+")
        {
            let hourafter = parseInt(this.props.hours_after_target.substring(0,2));
            let minafter  = parseInt(this.props.hours_after_target.substring(3));
             return (hourInput<=hourafter && minInput<60)
        }
    }
  
    InputValidation =()=>
    {
        if(this.timeValidator(this.state.startHour) && this.timeValidator(this.state.endHour) && this.state.title !="") 
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

    }

     handleSubmit =(event)=>
     {
         event.preventDefault();
         if(this.state.entity == "")
            this.state.entity=this.props.lists[0].key;

        this.props.dispatch(addEventCountDown(this.state.title,this.state.startHour,this.state.endHour,this.state.comments, this.state.entity));
        this.setState({title:"",
        startHour:"",
        endHour:"",
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
        trigger={<button style={{position:"absolute", width:"50px", height:"50px",textAlign:"center",fontSize:"13px",left:"0"}}className="button">הוספת אירוע  </button>}
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

        <label style={{ color:"black"}} >
        
        <input name="endHour" placeholder="(+|-)HH:MM" pattern="[+|-]{1}[0-9]{2}:[0-5]{1}[0-9]{1}"
                onChange={this.handleChange} style={{width:"100px"}} value={this.state.endHour} required></input>
                :שעת סיום
        </label>

         <label style={{rightMargin:"10px", color:"black"}}>
    
        <input name="startHour" placeholder="(+|-)HH:MM" pattern="[+|-]{1}[0-9]{2}:[0-5]{1}[0-9]{1}"
                onChange={this.handleChange} style={{width:"100px"}} value={this.state.startHour} required></input>
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