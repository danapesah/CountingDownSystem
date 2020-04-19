import React, {Component} from 'react'
import TestScheduler from '../countDownWindow/TestScheduler'
import UploadAirImg from '../countDownWindow/UploadAirImg'
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
this.state._chosen_tab==="#air" ? <div style={{backgroundColor: "#66c2ff",position:"absolute", top:"50px", left:"20px"}}><UploadAirImg/> </div> :
<TestScheduler/>
}</div>

  </div>

    )


    }
}

export default Logs;




