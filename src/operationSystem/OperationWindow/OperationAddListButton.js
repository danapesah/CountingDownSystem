import React, {Component} from 'react'
import { connect  } from 'react-redux'
import {addListOperation} from '../../Actions'

class OperationAddListButton extends Component
{

    handleAddListOperation = (e) =>
    {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(addListOperation());
    }

    render()
    {
        return (
            <div>
                <button onClick={this.handleAddListOperation}/>
            </div>

        )
    }
}

export default connect()(OperationAddListButton)