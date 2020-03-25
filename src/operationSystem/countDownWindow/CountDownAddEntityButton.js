import React, {Component} from 'react';
import {connect } from 'react-redux'
import Popup from "reactjs-popup";
import { addEntityCountDown } from "../../Actions";

class CountDownAddEntityButton extends Component
{
  
  state={
    title:"",
  }
  handleChange=(event)=>
  {
      if(event.target.name === 'title')
      this.setState({title: event.target.value})

  }

   handleSubmit =(event)=>
   {
       event.preventDefault();
      this.props.dispatch(addEntityCountDown(this.state.title));

   }   

    render()
    {
        return(
            <Popup
            trigger={<button style={{position:"absolute",left:(this.props.resources.length*140+50)}}className="button">+</button>}
            modal
            closeOnDocumentClick>
           <form onSubmit={this.handleSubmit}>
                <label >
                    Entity Title:
                    <input type="text" name="title" onChange={this.handleChange} />
                </label>
                 <input type="submit" value="Submit" /> 
            </form>  
        
          </Popup>
        )
    }
}


const mapStateToProps = (state)=> ({
    resources: state.CountDownlists.resources,
  })

export default connect(mapStateToProps)(CountDownAddEntityButton)