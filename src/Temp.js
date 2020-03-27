import React, {Component} from 'react'
import {connect } from 'react-redux'
import axios from 'axios';

class Temp extends Component {

    constructor(props) {
        super(props);
    
        this.state = {a: [] , b : ''};
       this.state =this.props.countDownlists; //only one item/empty arr of exe
      }

    componentDidMount() {
        axios.get('http://localhost:5000/counts/') //GET REQUEST
          .then(response => {
            this.setState({ a: response.data ,
              b:response.data[0].c.events[2].title
            
            
            }) //get all the filleds at put it in exe array
            console.log(response.data[0].c.events[2].title );
          })
          .catch((error) => { //catch errors 
            console.log(error);
          })
      }


      render(){
        return (
            <div>
              <h1>{this.state.b}</h1>
                <h1>aa</h1>
          </div>
        );
        }
}
const mapStateToProps = (state)=> ({
  countDownlists: state.CountDownlists,
  state: state,
})
export default connect(mapStateToProps)(Temp) ;