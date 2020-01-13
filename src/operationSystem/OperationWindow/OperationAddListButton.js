import React, {Component} from 'react'
import { connect  } from 'react-redux'
import {addList} from '../../Actions'

class OperationAddListButton extends Component
{

    handleAddList = (e) =>
    {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(addList());
    }

    render()
    {
        return (
            <div>
                <button onClick={this.handleAddList}/>
            </div>

        )
    }
}

export default connect()(OperationAddListButton)