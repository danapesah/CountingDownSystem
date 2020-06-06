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
      if(window.location.pathname.search("display") == -1)
        return(
            <Popup
            trigger={<button style={{position:"absolute",left:(this.props.resources.length*140+50)}}className="button">+</button>}
            modal
            closeOnEscape
            repositionOnResize
            closeOnDocumentClick>
            {close =>(
              <div>
           <form onSubmit={this.handleSubmit} >
                <label >
                    Entity Title:
                    <input type="text" name="title" onChange={this.handleChange} />
                </label>
                 <input type="submit" value="Submit" /> 
            </form> 
            <a className="close" onClick={close} style={styles.close}>
            &times;
             </a>
             </div>
            )}
          </Popup>
        )
        else
        return(null)
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
  resources: state.CountDownlists.resources,
})

export default connect(mapStateToProps)(CountDownAddEntityButton)