import React, {Component} from 'react'
import { connect  } from 'react-redux'
import {addCardOperation} from '../../Actions'

class OperationAddCardButton extends Component
{

    handleAddCardOpertion = (e) =>
    {
        e.preventDefault();
        const {dispatch, listID} = this.props;
        dispatch(addCardOperation(listID));
    }

    render()
    {
        return (
            <div>
                <button onClick={this.handleAddCardOpertion}/>
            </div>

        )
    }
}

export default connect()(OperationAddCardButton)