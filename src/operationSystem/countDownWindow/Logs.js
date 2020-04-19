import React, {Component} from 'react'
import {connect } from 'react-redux'
import TestScheduler from '../countDownWindow/TestScheduler'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          _chosen_tab:"", 
        };
    } 
 render() {
  console.log(this.state._chosen_tab)
  return (
      <div>
    <Nav style={{backgroundColor: ""}}
    activeKey="display#countdown"

    onSelect={(selectedKey) =>   this.setState({_chosen_tab: selectedKey}) }
  >
    <Nav.Item>
        <Nav.Link href="#countdown" eventKey="#countdown">לשונית ספירה יורדת </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="#evets" eventKey="#evets">לשונית לוג אירועים </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="#sea" eventKey="#sea">לשונית סגירות ים</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="#air" eventKey="#air" >לשונית סגירות אוויר</Nav.Link>
    </Nav.Item>
  </Nav>
<div style={{position:"absolute", top:"50px"}}>
{this.state._chosen_tab==="#evets" ? "events" :
this.state._chosen_tab==="#sea" ? "sea"  :
this.state._chosen_tab==="#air" ? "air"  :
<TestScheduler/>
}</div>

  </div>
    // <ul class="nav nav-tabs">
    // <li class="nav-item">
    // <a class="nav-link active" href="#countdown">לשונית ספירה יורדת</a>
    // <div style={{position:"absolute", top:"50px"}} ><TestScheduler /></div>
    // </li>
    // <li class="nav-item">
    // <a class="nav-link " href="#evets">לשונית לוג אירועים </a>
    // <div style={{position:"absolute", top:"50px"}} ></div>
    // </li>
    // <li class="nav-item">
    // <a class="nav-link" href="#sea">לשונית סגירות ים</a>
    // </li>
    // <li class="nav-item">
    // <a class="nav-link" href="#air">לשונית סגירות אוויר</a>
    // </li>
    // </ul>
    // <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
    // <Tab eventKey="countdown" title="לשונית ספירה יורדת"
    // onSelect={alert("kaka")}
    // ></Tab>
    // <Tab eventKey="evets" title=" לשונית לוג אירועים"></Tab>
    // <Tab eventKey="sea" title="לשונית סגירות ים" ></Tab>
    // <Tab eventKey="air" title="לשונית סגירות אוויר" ></Tab>
    // </Tabs>

    )


    }
}




const mapStateToProps = (state)=> ({
    lists: state.CountDownlists.resources,
    events: state.CountDownlists.events

})
export default connect(mapStateToProps)(Logs) ;




