import React, {Component} from 'react'

class MainComponentTime extends Component
{
    render(){
        return(
            <div>
                <div className="center">חלון שעונים</div>
                <br/>
                <div style={{ textAlign:"right",}}>
                <div>-עולמי</div>
                <div style={{borderStyle: "solid",  width: "50%", margin:"auto"}}>+250:03:17:07</div>
                <br/>
                <div>-מטרה</div>
                <div style={{borderStyle: "solid",  width: "50%", margin:"auto"}}>-04:20:15</div>
                </div>


            </div>
        )
    }
}

export default MainComponentTime;