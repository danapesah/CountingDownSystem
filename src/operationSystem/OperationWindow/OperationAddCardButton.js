import React, {Component} from 'react'
import { connect  } from 'react-redux'
import {addCard} from '../../Actions'

class OperationAddCardButton extends Component
{

    handleAddCard = (e) =>
    {
        e.preventDefault();
        const {dispatch, listID} = this.props;
        dispatch(addCard(listID));
    }

    render()
    {
        return (
            <div>
                <button onClick={this.handleAddCard}/>
            </div>

        )
    }
}

export default connect()(OperationAddCardButton)