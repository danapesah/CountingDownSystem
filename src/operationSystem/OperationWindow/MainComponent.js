import React,{Component} from 'react'
import { connect  } from 'react-redux'
import OperationList from './OperationList'
import { deleteCardOperation } from '../../Actions';

class MainWindow extends Component
{
    deleteCard = (cardID,listID) =>
    {
        this.props.dispatch(deleteCardOperation(cardID,listID));
    }
    render()
    {  
        const {lists} = this.props;
        return(
        <div>
        <div class="center">חלון אופרציה</div>
        <div>
        <div style={styles.lineContainer}>
            <p style={ {marginBottom:"10%"}}> שם משימה </p>
             אישור ירידה<br/>
             אישור המראה <br/>
             המראה <br/>
        </div  >
        <div style={styles.listsContainer}>
        {lists.map(list => 
          ( <OperationList key ={list.listID} listID={list.listID} cards = {list.cards} deleteCard={this.deleteCard}/>))}
          </div> 
        </div>
        </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        lists: state.OperationList
    }
}

const styles = {
    listsContainer:
    {
     display:"inline",
     float:"right",
     margin:"auto",
    },
    lineContainer:
    {   
     width:"auto",
     float:"right",
    flexDirection:"column",
     marginTop:"25px"
    }
}
export default connect(mapStateToProps)(MainWindow)