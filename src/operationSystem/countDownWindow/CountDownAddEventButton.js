import React, {Component} from 'react';
import {connect } from 'react-redux'
import Popup from "reactjs-popup";
import NumberFormat from 'react-number-format';
import { addEventCountDown } from "../../Actions";
class countDownAddEventButton extends Component
{
    state={
        title:"",
        startHour:"",
        endHour:"",
        comments:"",
        entity:"",

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

     }   

     makeSelectInput =()=>
     {
         let inputResourceArray=[];
         for(let i=0;i<this.props.lists.length;i++)
         {
            inputResourceArray.push(<option key={i} value={this.props.lists[i].key}>{this.props.lists[i].title}</option>)
         }
         return inputResourceArray;
     }

    render()
    {

        let leftPlace=50+this.props.lists.length*140;
        if(window.location.pathname.search("display") == -1)       
        return(
  
        <Popup
        trigger={<button style={{position:"absolute", width:"50px", height:"50px"}}className="button">+</button>}
        modal
        closeOnDocumentClick>
          {close =>(
              <div>
       <form onSubmit={this.handleSubmit}>
            <label >
                Mission Title:
                <input type="text" name="title" onChange={this.handleChange} />
            </label>
            <label style={{rightMargin:"10px"}}>
                Starting Hour
                <input name="startHour" placeholder="(+|-)HH:MM" pattern="[+|-]{1}[0-9]{2}:[0-5]{1}[0-9]{1}"
                     onChange={this.handleChange} style={{width:"100px"}} required></input>
          
            </label>
            <label>
               Ending Hour
               <input name="endHour" placeholder="(+|-)HH:MM" pattern="[+|-]{1}[0-9]{2}:[0-5]{1}[0-9]{1}"
                     onChange={this.handleChange} style={{width:"100px"}} required></input>
            </label>
            
            <label style={{display:"inline-block"}}>
                 Entity:
                <select name= "entity" style={{display:"inline-block", width:"150px"}} onChange={this.handleChange}>
                    {this.makeSelectInput()}
                </select>
            </label>
            <textarea name="comments" onChange={this.handleChange} placeholder={"Extra Comments"}/>
             <input type="submit" value="Submit" /> 
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
    lists: state.CountDownlists.resources,
    events: state.CountDownlists.events,
    CountDownlists:state.CountDownlists
  })

export default connect(mapStateToProps)(countDownAddEventButton)