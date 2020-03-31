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
    convertTimeInput =(time)=>
    {
        let tempArr=time.split(":");
        return parseInt(tempArr[0])+parseInt(tempArr[1])/100*(3/2);
    }
    handleChange=(event)=>
    {
        if(event.target.name == 'title')
        this.setState({title: event.target.value})
        else if(event.target.name == 'startHour')
        this.setState({startHour: this.convertTimeInput(event.target.value)})
        else if(event.target.name == 'endHour')
        this.setState({endHour: this.convertTimeInput(event.target.value)})
        else if(event.target.name == 'comments')
        this.setState({comments: event.target.value})
        else if(event.target.name == 'entity')
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
            inputResourceArray.push(<option value={this.props.lists[i].key}>{this.props.lists[i].title}</option>)
         }
         return inputResourceArray;
     }

    render()
    {

        let leftPlace=50+this.props.lists.length*140;       
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
                <NumberFormat name="startHour" format="##:##" placeholder="HH:MM" mask={['M', 'M', 'Y', 'Y']} onChange={this.handleChange} style={{width:"100px"}}/>
                {/* <input type="time" name="startHour"  pattern="[0-5][0-9]:[0-5][0-9]"/> */}
            </label>
            <label>
               Ending Hour
               <NumberFormat name="endHour"  format="##:##" placeholder="HH:MM" mask={['M', 'M', 'Y', 'Y']} onChange={this.handleChange} style={{width:"100px"}}/>
                {/* <input type="time" name="endHour" onChange={this.handleChange} style={{width:"auto"}}/> */}
            </label>
            
            <label style={{display:"inline-block"}}>
                 Entity:
                <select name= "entity" style={{display:"inline-block", width:"150px"}} onChange={this.handleChange}>
                    {this.makeSelectInput()}
                </select>
            </label>
            <textarea name="comments" onChange={this.handleChange}>Extra Comments</textarea>
             <input type="submit" value="Submit" /> 
        </form>  
        <a className="close" onClick={close} style={styles.close}>
            &times;
             </a>
             </div>)}
      </Popup>
        )
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